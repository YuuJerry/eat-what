// 菜谱推荐引擎（静态数据 + 规则推荐）
const recipeEngine = require('../../utils/recipe-engine.js')
// 图标映射
const { getDishIcon } = require('../../utils/icons.js')

const CATEGORIES = ['全部', '中餐', '西餐', '日料', '韩餐', '减脂']

Page({
  data: {
    categories: CATEGORIES,
    activeCategory: '全部',
    keyword: '',
    recipes: [],
    isLoading: false
  },

  onLoad() {
    this.loadRecipes()
  },

  onPullDownRefresh() {
    this.loadRecipes(true).then(() => wx.stopPullDownRefresh())
  },

  // 加载菜谱
  async loadRecipes(forceRefresh) {
    this.setData({ isLoading: true })
    try {
      const { activeCategory, keyword } = this.data

      let recipes
      if (keyword) {
        recipes = await recipeEngine.searchRecipes(keyword)
      } else if (activeCategory === '减脂') {
        recipes = await recipeEngine.getDietRecipes(forceRefresh)
      } else {
        recipes = await recipeEngine.getRecipesByCategory(activeCategory, forceRefresh)
      }

      const list = recipes.map(r => ({
        ...r,
        coverIcon: getDishIcon(r.name, r.category)
      }))

      this.setData({ recipes: list })
    } catch (e) {
      console.error('加载菜谱失败', e)
      wx.showToast({ title: '加载失败，请下拉刷新', icon: 'none' })
    }
    this.setData({ isLoading: false })
  },

  // 切换分类
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ activeCategory: cat, keyword: '', recipes: [] })
    this.loadRecipes()
  },

  // 搜索框输入
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  // 执行搜索
  onSearch() {
    this.setData({ recipes: [] })
    this.loadRecipes()
  },

  // 点击菜谱卡片
  onRecipeTap(e) {
    const recipe = e.currentTarget.dataset.recipe
    if (recipe) {
      wx.navigateTo({
        url: `/pages/recipe/detail?id=${recipe._id}`,
        success: (res) => {
          res.eventChannel.emit('recipeData', recipe)
        }
      })
    }
  }
})
