// 菜谱推荐引擎（静态数据 + 规则推荐）
const recipeEngine = require('../../utils/recipe-engine.js')
// 图标映射
const { getDishIcon } = require('../../utils/icons.js')

Page({
  data: {
    recommendList: [],
    isLoading: true,
    quickActions: [
      { icon: '🧊', title: '冰箱推荐', desc: '看看冰箱里有什么', url: '/pages/fridge/fridge' },
      { icon: '🏋️', title: '减脂餐', desc: '健康低卡食谱', url: '/pages/diet/diet' },
      { icon: '🗳️', title: '发起投票', desc: '和朋友一起选', url: '/pages/vote/room' },
      { icon: '🎰', title: '随机转盘', desc: '帮你决定吃什么', url: '/pages/index/index' }
    ]
  },

  onLoad() {
    this.loadRecommendations()
  },

  onPullDownRefresh() {
    this.loadRecommendations(true).then(() => wx.stopPullDownRefresh())
  },

  // 加载热门推荐
  async loadRecommendations(forceRefresh) {
    this.setData({ isLoading: true })
    try {
      const recipes = await recipeEngine.getHotRecipes(forceRefresh)
      const list = recipes.map(r => ({
        ...r,
        coverIcon: getDishIcon(r.name, r.category)
      }))
      this.setData({ recommendList: list })
    } catch (e) {
      console.error('加载推荐失败', e)
      wx.showToast({ title: '加载失败，请下拉刷新', icon: 'none' })
    }
    this.setData({ isLoading: false })
  },

  onQuickAction(e) {
    const url = e.currentTarget.dataset.url
    if (url === '/pages/recipe/list') {
      wx.switchTab({ url })
    } else {
      wx.navigateTo({ url })
    }
  },

  onRecipeTap(e) {
    const recipe = e.currentTarget.dataset.recipe
    if (recipe) {
      // 通过 eventChannel 传递完整菜谱数据到详情页
      wx.navigateTo({
        url: `/pages/recipe/detail?id=${recipe._id}`,
        events: {},
        success: (res) => {
          res.eventChannel.emit('recipeData', recipe)
        }
      })
    }
  }
})
