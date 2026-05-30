// 引入菜谱相关的云函数 API
const { recipeApi } = require('../../utils/cloud.js')
// 食材分类列表
const INGREDIENT_CATEGORIES = ['蔬菜', '肉类', '海鲜', '蛋奶', '主食', '调料']

// 预设食材数据（替代云数据库查询，降低依赖）
const DEFAULT_INGREDIENTS = {
  '蔬菜': ['番茄', '黄瓜', '土豆', '胡萝卜', '洋葱', '西兰花', '菠菜', '生菜', '青椒', '大白菜', '芹菜', '小番茄', '黄豆芽'],
  '肉类': ['猪肉', '猪肉末', '鸡胸肉', '鸡腿肉', '牛肉', '羊肉', '排骨'],
  '海鲜': ['虾仁', '鱼', '三文鱼', '鱿鱼'],
  '蛋奶': ['鸡蛋', '牛奶', '豆腐', '嫩豆腐'],
  '主食': ['米饭', '面条', '面粉', '馒头', '面包'],
  '调料': ['盐', '糖', '醋', '生抽', '老抽', '料酒', '豆瓣酱', '蒜', '葱', '姜', '淀粉', '花椒', '干辣椒', '辣椒油', '香油', '橄榄油', '黑胡椒', '花生米', '韩式辣酱', '咖喱块']
}

Page({
  data: {
    categories: INGREDIENT_CATEGORIES,       // 食材分类列表
    activeCategory: '蔬菜',                   // 当前选中的食材分类
    ingredients: DEFAULT_INGREDIENTS['蔬菜'],  // 当前分类下的食材列表
    selectedIngredients: [],                  // 用户已选中的食材
    results: [],                              // 推荐菜谱搜索结果
    isSearching: false,                       // 是否正在搜索
    hasSearched: false,                       // 是否已执行过搜索
    keyword: ''                               // 搜索关键词
  },

  // 切换食材分类：更新当前显示的食材列表
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({
      activeCategory: cat,
      ingredients: DEFAULT_INGREDIENTS[cat] || []
    })
  },

  // 切换食材选中状态：已选中则移除，未选中则添加
  onToggleIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients
    const idx = selected.indexOf(name)
    if (idx > -1) {
      this.setData({ selectedIngredients: selected.filter(n => n !== name) })
    } else {
      this.setData({ selectedIngredients: [...selected, name] })
    }
  },

  // 移除已选中的某个食材
  onRemoveIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients.filter(n => n !== name)
    this.setData({ selectedIngredients: selected })
  },

  // 清空所有已选食材和搜索结果
  onClearAll() {
    this.setData({ selectedIngredients: [], results: [], hasSearched: false })
  },

  // 搜索框输入事件：更新关键词
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  // 按关键词搜索食材：在所有分类中模糊匹配
  onSearchIngredient() {
    const { keyword } = this.data
    if (!keyword) return
    // 在所有分类中搜索
    const allIngredients = Object.values(DEFAULT_INGREDIENTS).flat()
    const filtered = allIngredients.filter(n => n.includes(keyword))
    if (filtered.length > 0) {
      this.setData({ ingredients: filtered, activeCategory: '' })
    }
  },

  // 根据已选食材搜索推荐菜谱
  async onSearchRecipes() {
    if (this.data.selectedIngredients.length === 0) {
      wx.showToast({ title: '请先选择食材', icon: 'none' })
      return
    }

    this.setData({ isSearching: true })
    try {
      const res = await recipeApi.searchByIngredients(this.data.selectedIngredients)
      if (res.success) {
        this.setData({ results: res.data, hasSearched: true })
      }
    } catch (e) {
      console.error('搜索失败', e)
      wx.showToast({ title: '搜索失败，请重试', icon: 'none' })
    }
    this.setData({ isSearching: false })
  },

  // 点击推荐结果：跳转到菜谱详情页
  onResultTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe/detail?id=${id}` })
  }
})
