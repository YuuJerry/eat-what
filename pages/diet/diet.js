// 引入菜谱相关的云函数 API
const { recipeApi } = require('../../utils/cloud.js')

// 热量筛选条件列表
const CALORIE_FILTERS = [
  { key: 0, label: '全部' },
  { key: 300, label: '<300kcal' },
  { key: 500, label: '300-500kcal' }
]

// 推荐博主数据（手动维护）
const BLOGGERS = [
  { name: '美食作家王刚', platform: 'bilibili', desc: '专业厨师，硬核教学', avatar: '👨‍🍳' },
  { name: '日食记', platform: 'bilibili', desc: '治愈系美食，画面精美', avatar: '🎬' },
  { name: '小高姐的魔法调料', platform: 'bilibili', desc: '科学做饭，详细讲解', avatar: '👩‍🍳' },
  { name: '减脂餐小课堂', platform: 'douyin', desc: '专注减脂餐，简单实用', avatar: '💪' }
]

Page({
  data: {
    calorieFilters: CALORIE_FILTERS,   // 热量筛选条件列表
    activeCalorie: 0,                  // 当前选中的热量筛选值（0表示全部）
    recipes: [],                       // 减脂餐列表数据
    bloggers: BLOGGERS,                // 推荐博主列表
    isLoading: false                   // 加载状态
  },

  // 页面加载时请求减脂餐列表
  onLoad() {
    this.loadDietRecipes()
  },

  // 下拉刷新：重新加载减脂餐列表
  onPullDownRefresh() {
    this.loadDietRecipes().then(() => wx.stopPullDownRefresh())
  },

  // 请求减脂餐列表（支持热量筛选）
  async loadDietRecipes() {
    this.setData({ isLoading: true })
    try {
      const res = await recipeApi.getDietRecipes({
        maxCalories: this.data.activeCalorie || undefined
      })
      if (res.success) {
        this.setData({ recipes: res.data })
      }
    } catch (e) {
      console.error('加载减脂餐失败', e)
    }
    this.setData({ isLoading: false })
  },

  // 切换热量筛选条件：重新加载列表
  onCalorieFilter(e) {
    const cal = e.currentTarget.dataset.cal
    this.setData({ activeCalorie: cal })
    this.loadDietRecipes()
  },

  // 点击菜谱卡片：跳转到菜谱详情页
  onRecipeTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe/detail?id=${id}` })
  },

  // 点击博主卡片：显示关注提示（暂为占位功能）
  onBloggerTap(e) {
    const blogger = e.currentTarget.dataset.blogger
    wx.showToast({ title: `关注${blogger.name}`, icon: 'none' })
  }
})
