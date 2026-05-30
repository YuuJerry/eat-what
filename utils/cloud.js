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

// ========== 投票相关 API ==========
const voteApi = {
  // 创建投票房间（如"今天中午吃什么"投票）
  // @param {Object} options - 房间配置
  // @param {string} options.title - 投票标题
  // @param {string[]} options.options - 候选选项列表
  // @param {number} options.maxVoters - 最大参与人数（默认 20）
  async createRoom({ title, options, maxVoters = 20 }) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'createRoom',
        data: { title, options, maxVoters }
      })
      return result
    } catch (e) {
      console.error('创建投票失败', e)
      return null
    }
  },

  // 通过房间码加入已有的投票房间
  async joinRoom(roomCode) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'joinRoom',
        data: { roomCode }
      })
      return result
    } catch (e) {
      console.error('加入投票失败', e)
      return null
    }
  },

  // 提交投票选择
  // @param {string} roomId - 房间 ID
  // @param {string} option - 用户选择的选项
  async submitVote(roomId, option) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'submitVote',
        data: { roomId, option }
      })
      return result
    } catch (e) {
      console.error('提交投票失败', e)
      return null
    }
  },

  // 获取投票房间的实时结果（各选项票数统计）
  async getResult(roomId) {
    try {
      const { result } = await wx.cloud.callFunction({
        name: 'getResult',
        data: { roomId }
      })
      return result
    } catch (e) {
      console.error('获取结果失败', e)
      return null
    }
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
