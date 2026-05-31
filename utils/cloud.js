// 投票 API（纯本地 + 投票码包含完整数据）

function genCode() {
  const c = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let s = ''
  for (let i = 0; i < 6; i++) s += c[Math.floor(Math.random() * c.length)]
  return s
}

function saveLocal(code, data) {
  const rooms = wx.getStorageSync('vote_rooms') || {}
  rooms[code] = data
  wx.setStorageSync('vote_rooms', rooms)
}

function loadLocal(code) {
  return (wx.getStorageSync('vote_rooms') || {})[code] || null
}

function saveHistory(code, title) {
  const list = wx.getStorageSync('vote_history') || []
  const idx = list.findIndex(r => r.code === code)
  if (idx > -1) list.splice(idx, 1)
  list.unshift({ code, title, time: Date.now() })
  wx.setStorageSync('vote_history', list.slice(0, 50))
}

// 编码投票数据为短字符串
function encodeInvite(roomData) {
  try {
    const compact = { t: roomData.title, o: roomData.options }
    return encodeURIComponent(JSON.stringify(compact))
  } catch (e) { return '' }
}

// 解码投票码
function decodeInvite(text) {
  if (!text) return null
  text = text.trim()
  // 格式1: 投票码:XXXXXX|encoded_data
  const m1 = text.match(/投票码:([A-Z0-9]+)\|(.+)/)
  if (m1) {
    try {
      const data = JSON.parse(decodeURIComponent(m1[2]))
      return { code: m1[1], title: data.t, options: data.o }
    } catch (e) { /* ignore */ }
  }
  // 格式2: 投票码:XXXXXX（纯房间码，无数据）
  const m2 = text.match(/投票码:([A-Z0-9]+)/)
  if (m2) return { code: m2[1] }
  return null
}

const voteApi = {
  async createRoom({ title, options }) {
    const code = genCode()
    const room = { code, title, options, voters: {}, created: Date.now() }
    saveLocal(code, room)
    saveHistory(code, title)
    return { success: true, code, room }
  },

  async joinRoom(code) {
    code = code.toUpperCase()
    const local = loadLocal(code)
    if (local) return { success: true, data: local }
    return { success: false, error: '未找到此投票' }
  },

  // 从投票码数据加入（跨设备）
  async joinFromInvite(code, title, options) {
    code = code.toUpperCase()
    let room = loadLocal(code)
    if (!room) {
      room = { code, title, options, voters: {}, created: Date.now() }
      saveLocal(code, room)
      saveHistory(code, title)
    }
    return { success: true, data: room }
  },

  async submitVote(code, option) {
    code = code.toUpperCase()
    const local = loadLocal(code)
    if (!local) return { success: false, error: '投票不存在' }
    const uid = getApp().globalData.openid || 'u' + Date.now()
    local.voters[uid] = option
    saveLocal(code, local)
    return { success: true }
  },

  async getResult(code) {
    code = code.toUpperCase()
    const room = loadLocal(code)
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

  async getMyRooms() {
    return { success: true, data: wx.getStorageSync('vote_history') || [] }
  },

  async getRoom(code) { return this.joinRoom(code) },

  encodeInvite,
  decodeInvite
}

module.exports = { voteApi }
