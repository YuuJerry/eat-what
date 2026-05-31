// 投票 API（JSONBin 跨设备同步 + 本地缓存）

const BIN_URL = 'https://api.jsonbin.io/v3'

// JSONBin 操作
function createBin(data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BIN_URL + '/b',
      method: 'POST',
      header: { 'Content-Type': 'application/json' },
      data: data,
      success: res => resolve(res.data?.metadata?.id || null),
      fail: reject
    })
  })
}

function readBin(binId) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BIN_URL + '/b/' + binId + '/latest',
      success: res => resolve(res.data?.record || null),
      fail: reject
    })
  })
}

function updateBin(binId, data) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BIN_URL + '/b/' + binId,
      method: 'PUT',
      header: { 'Content-Type': 'application/json' },
      data: data,
      success: res => resolve(true),
      fail: reject
    })
  })
}

// 本地存储
function saveLocal(code, data) {
  const rooms = wx.getStorageSync('vote_rooms') || {}
  rooms[code] = data
  wx.setStorageSync('vote_rooms', rooms)
}

function loadLocal(code) {
  return (wx.getStorageSync('vote_rooms') || {})[code] || null
}

function saveHistory(code, title, binId) {
  const list = wx.getStorageSync('vote_history') || []
  const idx = list.findIndex(r => r.code === code)
  if (idx > -1) list.splice(idx, 1)
  list.unshift({ code, title, binId, time: Date.now() })
  wx.setStorageSync('vote_history', list.slice(0, 50))
}

function genCode() {
  const c = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)]
  return s
}

const voteApi = {
  // 创建投票
  async createRoom({ title, options }) {
    const code = genCode()
    const room = { code, title, options, voters: {}, created: Date.now() }
    try {
      const binId = await createBin(room)
      room.binId = binId
      saveLocal(code, room)
      saveHistory(code, title, binId)
      return { success: true, code }
    } catch (e) {
      // JSONBin 失败，降级到纯本地
      saveLocal(code, room)
      saveHistory(code, title, '')
      return { success: true, code, local: true }
    }
  },

  // 加入投票
  async joinRoom(code) {
    code = code.toUpperCase()
    // 先查本地
    const local = loadLocal(code)
    if (local) return { success: true, data: local }
    // 本地没有，查 JSONBin（通过 binId）
    // binId 存在历史记录里
    const history = wx.getStorageSync('vote_history') || []
    const record = history.find(r => r.code === code && r.binId)
    if (record && record.binId) {
      try {
        const data = await readBin(record.binId)
        if (data) {
          saveLocal(code, data)
          return { success: true, data }
        }
      } catch (e) { /* ignore */ }
    }
    return { success: false, error: '未找到此投票' }
  },

  // 通过 binId 加入（用于跨设备）
  async joinByBinId(code, binId) {
    code = code.toUpperCase()
    try {
      const data = await readBin(binId)
      if (data) {
        saveLocal(code, data)
        saveHistory(code, data.title, binId)
        return { success: true, data }
      }
    } catch (e) { /* ignore */ }
    return { success: false, error: '投票数据获取失败' }
  },

  // 提交投票
  async submitVote(code, option) {
    code = code.toUpperCase()
    const local = loadLocal(code)
    if (!local) return { success: false, error: '投票不存在' }
    const uid = getApp().globalData.openid || 'u' + Date.now()
    local.voters[uid] = option
    saveLocal(code, local)
    // 同步到 JSONBin
    if (local.binId) {
      try { await updateBin(local.binId, local) } catch (e) { /* ignore */ }
    }
    return { success: true }
  },

  // 获取结果
  async getResult(code) {
    code = code.toUpperCase()
    let room = loadLocal(code)
    // 尝试从 JSONBin 刷新
    if (room && room.binId) {
      try {
        const fresh = await readBin(room.binId)
        if (fresh) {
          room = fresh
          saveLocal(code, room)
        }
      } catch (e) { /* ignore */ }
    }
    if (!room) return { success: false, error: '投票不存在' }
    const voters = room.voters || {}
    const tally = {}
    Object.values(voters).forEach(v => { tally[v] = (tally[v] || 0) + 1 })
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1])
    return {
      success: true,
      data: {
        room, tally,
        winner: sorted[0]?.[0] || '',
        winnerVotes: sorted[0]?.[1] || 0,
        isTie: sorted.length > 1 && sorted[0][1] === sorted[1][1],
        totalVotes: Object.keys(voters).length
      }
    }
  },

  // 历史记录
  async getMyRooms() {
    return { success: true, data: wx.getStorageSync('vote_history') || [] }
  },

  async getRoom(code) { return this.joinRoom(code) }
}

module.exports = { voteApi }
