// 菜谱推荐引擎（静态数据 + 规则推荐）
const recipeEngine = require('../../utils/recipe-engine.js')
// 图标映射
const { getDishIcon } = require('../../utils/icons.js')

Page({
  data: {
    greeting: '',
    recommendList: [],
    isLoading: true,
    quickActions: [
      { icon: '🧊', title: '冰箱推荐', desc: '看看冰箱里有什么', url: '/pages/fridge/fridge', imageUrl: '/images/features/fridge.png' },
      { icon: '🥗', title: '减脂餐', desc: '健康低卡食谱', url: '/pages/diet/diet', imageUrl: '/images/features/diet.png' },
      { icon: '🗳️', title: '发起投票', desc: '和朋友一起选', url: '/pages/vote/room', imageUrl: '/images/features/vote.png' },
      { icon: '🎰', title: '随机转盘', desc: '帮你决定吃什么', url: '/pages/index/index', imageUrl: '/images/features/wheel.png' }
    ]
  },

  onLoad() {
    this.setGreeting()
    this.loadRecommendations()
  },

  // 根据时间显示不同问候语
  setGreeting() {
    const hour = new Date().getHours()
    let greeting = '晚上好'
    if (hour < 6) greeting = '夜深了'
    else if (hour < 11) greeting = '早上好'
    else if (hour < 14) greeting = '中午好'
    else if (hour < 17) greeting = '下午好'
    this.setData({ greeting })
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
    const idx = e.currentTarget.dataset.index
    const recipe = this.data.recommendList[idx]
    if (recipe) {
      wx.navigateTo({
        url: `/pages/recipe/detail?id=${encodeURIComponent(recipe.name)}`,
        events: {},
        success: (res) => {
          res.eventChannel.emit('recipeData', recipe)
        }
      })
    }
  },

  onGoProfile() {
    wx.switchTab({ url: '/pages/profile/profile' })
  },

  onRefresh() {
    this.loadRecommendations(true)
  },

  onGoSearch() {
    wx.switchTab({ url: '/pages/recipe/list' })
  },

  // 图片加载失败时的处理
  onImageError(e) {
    const index = e.currentTarget.dataset.index
    console.log(`图片加载失败: ${this.data.quickActions[index].title}`)
    // 可以在这里设置备用图片或隐藏图片
  }
})
