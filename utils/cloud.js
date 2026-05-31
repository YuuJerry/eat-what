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

// ========== 投票相关 API（基于云文件存储，无需数据库）==========
const ROOM_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'
const VOTE_DIR = 'eat-what-votes/' // 云存储中的投票文件目录

function generateRoomCode() {
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += ROOM_CHARS[Math.floor(Math.random() * ROOM_CHARS.length)]
  }
  return code
}

// 上传投票数据到云存储
async function uploadVoteData(roomCode, data) {
  const filePath = VOTE_DIR + roomCode + '.json'
  const tempPath = `${wx.env.USER_DATA_PATH}/vote_${roomCode}.json`
  const fs = wx.getFileSystemManager()
  fs.writeFileSync(tempPath, JSON.stringify(data), 'utf-8')
  await wx.cloud.uploadFile({
    cloudPath: filePath,
    filePath: tempPath
  })
}

// 从云存储下载投票数据
async function downloadVoteData(roomCode) {
  const filePath = VOTE_DIR + roomCode + '.json'
  try {
    const res = await wx.cloud.downloadFile({ fileID: `cloud://${getApp().globalData.openid ? '' : ''}${filePath}` })
    // fileID 需要完整路径，用 getTempFileURL 更可靠
  } catch (e) {
    // 文件不存在
  }
  return null
}

const voteApi = {
  // 创建投票房间（存到云存储）
  async createRoom({ title, options, maxVoters = 20 }) {
    try {
      const code = generateRoomCode()
      const roomData = {
        roomCode: code,
        title,
        options,
        voters: {},
        status: 'active',
        maxVoters,
        createdAt: Date.now(),
        expiresAt: Date.now() + 24 * 60 * 60 * 1000
      }
      await uploadVoteData(code, roomData)
      // 同时保存到本地历史
      const history = wx.getStorageSync('vote_history') || []
      history.unshift({ roomCode: code, title, createdAt: Date.now() })
      wx.setStorageSync('vote_history', history.slice(0, 50))
      return { success: true, roomId: code, roomCode: code }
    } catch (e) {
      console.error('创建投票失败', e)
      return null
    }
  },

  // 通过房间码加入投票（从云存储读取）
  async joinRoom(roomCode) {
    try {
      const code = roomCode.toUpperCase()
      const filePath = VOTE_DIR + code + '.json'
      // 通过云存储下载
      const dlRes = await wx.cloud.downloadFile({ cloudPath: filePath })
      const fs = wx.getFileSystemManager()
      const content = fs.readFileSync(dlRes.tempFilePath, 'utf-8')
      const roomData = JSON.parse(content)
      if (roomData.status !== 'active') return null
      if (roomData.expiresAt < Date.now()) {
        roomData.status = 'closed'
        return null
      }
      return { success: true, data: roomData }
    } catch (e) {
      console.error('加入投票失败', e)
      return null
    }
  },

  // 提交投票（下载-修改-上传）
  async submitVote(roomCode, option) {
    try {
      const filePath = VOTE_DIR + roomCode + '.json'
      const dlRes = await wx.cloud.downloadFile({ cloudPath: filePath })
      const fs = wx.getFileSystemManager()
      const content = fs.readFileSync(dlRes.tempFilePath, 'utf-8')
      const roomData = JSON.parse(content)
      const openid = getApp().globalData.openid || 'user_' + Date.now()
      roomData.voters[openid] = option
      // 上传更新后的数据
      const tempPath = `${wx.env.USER_DATA_PATH}/vote_${roomCode}.json`
      fs.writeFileSync(tempPath, JSON.stringify(roomData), 'utf-8')
      await wx.cloud.uploadFile({ cloudPath: filePath, filePath: tempPath })
      return { success: true }
    } catch (e) {
      console.error('提交投票失败', e)
      return null
    }
  },

  // 获取投票结果
  async getResult(roomCode) {
    try {
      const filePath = VOTE_DIR + roomCode + '.json'
      const dlRes = await wx.cloud.downloadFile({ cloudPath: filePath })
      const fs = wx.getFileSystemManager()
      const content = fs.readFileSync(dlRes.tempFilePath, 'utf-8')
      const roomData = JSON.parse(content)
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
    } catch (e) {
      console.error('获取结果失败', e)
      return null
    }
  },

  // 获取用户投票历史（从本地存储）
  async getMyRooms() {
    try {
      const history = wx.getStorageSync('vote_history') || []
      return { success: true, data: history }
    } catch (e) {
      return { success: true, data: [] }
    }
  },

  // 通过房间码获取投票（别名）
  async getRoom(roomCode) {
    return this.joinRoom(roomCode)
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
