// 引入云函数 API 封装模块，用于获取智能推荐菜谱
const { recipeApi } = require('../../utils/cloud.js')
// 引入图标映射
const { getDishIcon } = require('../../utils/icons.js')

// 首页逻辑
Page({
  data: {
    // 智能推荐菜谱列表
    recommendList: [],
    // 是否为个性化推荐（根据用户偏好）
    isPersonalized: false,
    // 快捷操作入口配置（冰箱推荐、减脂餐、投票、转盘）
    quickActions: [
      { icon: '🧊', title: '冰箱推荐', desc: '看看冰箱里有什么', url: '/pages/fridge/fridge' },
      { icon: '🏋️', title: '减脂餐', desc: '健康低卡食谱', url: '/pages/diet/diet' },
      { icon: '🗳️', title: '发起投票', desc: '和朋友一起选', url: '/pages/vote/room' },
      { icon: '🎰', title: '随机转盘', desc: '帮你决定吃什么', url: '/pages/index/index' }
    ],
    // 页面加载状态标记
    isLoading: true
  },

  // 页面加载时触发，拉取推荐数据
  onLoad() {
    this.loadRecommendations()
  },

  // 下拉刷新回调，重新加载推荐数据后停止刷新动画
  onPullDownRefresh() {
    this.loadRecommendations().then(() => wx.stopPullDownRefresh())
  },

  // 异步加载智能推荐菜谱数据
  async loadRecommendations() {
    this.setData({ isLoading: true })
    try {
      // 调用云函数获取智能推荐结果
      const res = await recipeApi.smartRecommend()
      if (res && res.success) {
        const list = res.data.map(r => ({ ...r, coverIcon: getDishIcon(r.name, r.category) }))
        this.setData({
          recommendList: list,
          isPersonalized: !!res.isPersonalized
        })
      }
    } catch (e) {
      console.error('加载推荐失败', e)
      wx.showToast({ title: '加载失败，请下拉刷新', icon: 'none' })
    }
    this.setData({ isLoading: false })
  },

  // 快捷操作点击事件，根据 URL 跳转到对应页面
  // switchTab 用于 tabBar 页面，navigateTo 用于普通页面
  onQuickAction(e) {
    const url = e.currentTarget.dataset.url
    if (url === '/pages/recipe/list') {
      wx.switchTab({ url })
    } else {
      wx.navigateTo({ url })
    }
  },

  // 推荐菜谱卡片点击事件，跳转到菜谱详情页
  onRecipeTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe/detail?id=${id}` })
  }
})
