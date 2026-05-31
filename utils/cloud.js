// 云开发工具封装
// 提供数据库操作、云函数调用等常用能力的统一封装

// 获取数据库实例
// 采用延迟初始化，避免模块加载顺序问题导致 db 为 undefined
function getDb() {
  return wx.cloud.database()
}

// 获取数据库命令对象（用于条件查询、更新等高级操作）
function getCmd() {
  return getDb().command
}

// 通过云函数获取当前用户的 openid
// openid 是用户的唯一标识，用于关联用户数据
async function getOpenid() {
  try {
    const { result } = await wx.cloud.callFunction({ name: 'getOpenid' })
    return result ? result.openid : ''
  } catch (e) {
    console.error('获取openid失败', e)
    return ''
  }
}

// ========== 菜谱相关 API ==========
const recipeApi = {
  /**
   * 获取菜谱列表（支持筛选、搜索、排序、分页）
   * @param {Object} options - 筛选条件
   * @param {string} options.category - 分类筛选（如"中餐"、"西餐"）
   * @param {string[]} options.tags - 标签筛选
   * @param {boolean} options.isDiet - 是否仅获取减脂餐
   * @param {string} options.keyword - 搜索关键词
   * @param {string} options.sort - 排序方式
   * @param {number} options.page - 页码（默认第 1 页）
   * @param {number} options.pageSize - 每页条数（默认 20）
   */
  async getList({ category, tags, isDiet, keyword, sort, page = 1, pageSize = 20 } = {}) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getRecipes',
        data: { category, tags, isDiet, keyword, sort, page, pageSize }
      })
      return result
    } catch (e) {
      console.error('获取菜谱列表失败', e)
      return null
    }
  },

  // 获取单个菜谱的详细信息（用料、步骤等）
  async getDetail(recipeId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getRecipeDetail',
        data: { recipeId }
      })
      return result
    } catch (e) {
      console.error('获取菜谱详情失败', e)
      return null
    }
  },

  // 根据食材列表推荐匹配的菜谱
  // 传入食材名称数组，返回可用这些食材制作的菜谱
  async searchByIngredients(ingredients) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'searchByIngredients',
        data: { ingredients }
      })
      return result
    } catch (e) {
      console.error('食材推荐失败', e)
      return null
    }
  },

  // AI 智能推荐：根据食材调用 AI 动态生成菜谱
  async aiRecommend(ingredients) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'aiRecommend',
        data: { ingredients }
      })
      return result
    } catch (e) {
      console.error('AI 推荐失败', e)
      return null
    }
  },

  // 智能推荐：根据用户偏好、历史记录等综合因素推荐菜谱
  async smartRecommend() {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'smartRecommend',
        data: {}
      })
      return result
    } catch (e) {
      console.error('智能推荐失败', e)
      return null
    }
  },

  // 获取减脂餐推荐列表
  // @param {Object} options - 筛选条件
  // @param {string} options.dietGoal - 减脂目标
  // @param {number} options.maxCalories - 最大卡路里限制
  // @param {number} options.page - 分页页码
  async getDietRecipes({ dietGoal, maxCalories, page = 1 } = {}) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getDietRecipes',
        data: { dietGoal, maxCalories, page }
      })
      return result
    } catch (e) {
      console.error('获取减脂餐失败', e)
      return null
    }
  }
}

// ========== 投票相关 API（数据编码进链接，零依赖）==========

// 编码投票数据为 URL 安全字符串
function encodeVoteData(data) {
  try {
    const json = JSON.stringify(data)
    return encodeURIComponent(json)
  } catch (e) {
    return ''
  }
}

// 解码投票数据
function decodeVoteData(encoded) {
  try {
    const json = decodeURIComponent(encoded)
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

// 生成短房间码（基于时间戳+随机）
function generateRoomCode() {
  const chars = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

// 保存到本地历史
function saveToHistory(roomCode, title) {
  const list = wx.getStorageSync('vote_history') || []
  const existing = list.findIndex(r => r.roomCode === roomCode)
  if (existing > -1) list.splice(existing, 1)
  list.unshift({ roomCode, title, createdAt: Date.now() })
  wx.setStorageSync('vote_history', list.slice(0, 50))
}

// 从本地加载投票数据
function loadFromLocal(roomCode) {
  const rooms = wx.getStorageSync('vote_rooms') || {}
  return rooms[roomCode] || null
}

// 保存到本地
function saveToLocal(roomCode, data) {
  const rooms = wx.getStorageSync('vote_rooms') || {}
  rooms[roomCode] = data
  wx.setStorageSync('vote_rooms', rooms)
}

const voteApi = {
  // 创建投票
  async createRoom({ title, options }) {
    const code = generateRoomCode()
    const roomData = {
      roomCode: code,
      title,
      options,
      voters: {},
      createdAt: Date.now()
    }
    saveToLocal(code, roomData)
    saveToHistory(code, title)
    return { success: true, roomCode: code }
  },

  // 通过房间码加入投票
  async joinRoom(roomCode) {
    const code = roomCode.toUpperCase()
    const local = loadFromLocal(code)
    if (local) {
      return { success: true, data: local }
    }
    return { success: false, error: '未找到此投票' }
  },

  // 提交投票
  async submitVote(roomCode, option) {
    const code = roomCode.toUpperCase()
    const local = loadFromLocal(code)
    if (!local) return { success: false, error: '投票不存在' }
    const openid = getApp().globalData.openid || 'user_' + Date.now()
    local.voters[openid] = option
    saveToLocal(code, local)
    return { success: true }
  },

  // 获取投票结果
  async getResult(roomCode) {
    const code = roomCode.toUpperCase()
    const roomData = loadFromLocal(code)
    if (!roomData) return { success: false, error: '投票不存在' }
    const voters = roomData.voters || {}
    const tally = {}
    Object.values(voters).forEach(v => { tally[v] = (tally[v] || 0) + 1 })
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1])
    return {
      success: true,
      data: {
        room: roomData,
        tally,
        winner: sorted[0]?.[0] || '',
        winnerVotes: sorted[0]?.[1] || 0,
        isTie: sorted.length > 1 && sorted[0][1] === sorted[1][1],
        totalVotes: Object.keys(voters).length
      }
    }
  },

  // 获取历史
  async getMyRooms() {
    const list = wx.getStorageSync('vote_history') || []
    return { success: true, data: list }
  },

  // 获取房间
  async getRoom(roomCode) {
    return this.joinRoom(roomCode)
  },

  // 编码投票数据为分享链接参数
  encodeForShare(roomData) {
    return encodeVoteData({
      t: roomData.title,
      o: roomData.options
    })
  },

  // 从分享链接参数解码投票数据
  decodeFromShare(encoded) {
    return decodeVoteData(encoded)
  }
}

// ========== 用户相关 API ==========
const userApi = {
  // 保存或更新用户偏好设置（如口味偏好、忌口等）
  async saveProfile(data) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'saveProfile',
        data
      })
      return result
    } catch (e) {
      console.error('保存偏好失败', e)
      return null
    }
  },

  // 收藏/取消收藏菜谱（切换收藏状态）
  async toggleFavorite(recipeId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'toggleFavorite',
        data: { recipeId }
      })
      return result
    } catch (e) {
      console.error('收藏操作失败', e)
      return null
    }
  }
}

module.exports = {
  getDb,       // 数据库实例获取
  getCmd,      // 数据库命令对象获取
  getOpenid,   // 获取用户 openid
  recipeApi,   // 菜谱相关接口
  voteApi,     // 投票相关接口
  userApi      // 用户相关接口
}
