// 引入菜谱相关的云函数 API
const { recipeApi } = require('../../utils/cloud.js')
// 引入图标映射
const { getIngredientIcon, getCategoryIcon, getDishIcon } = require('../../utils/icons.js')

// 食材分类列表
const INGREDIENT_CATEGORIES = ['蔬菜', '肉类', '海鲜', '蛋奶', '主食', '调料']

// 预设食材数据
const DEFAULT_INGREDIENTS = {
  '蔬菜': ['番茄', '黄瓜', '土豆', '胡萝卜', '洋葱', '西兰花', '菠菜', '生菜', '青椒', '大白菜', '芹菜', '小番茄', '黄豆芽'],
  '肉类': ['猪肉', '猪肉末', '鸡胸肉', '鸡腿肉', '牛肉', '羊肉', '排骨'],
  '海鲜': ['虾仁', '鱼', '三文鱼', '鱿鱼'],
  '蛋奶': ['鸡蛋', '牛奶', '豆腐', '嫩豆腐'],
  '主食': ['米饭', '面条', '面粉', '馒头', '面包'],
  '调料': ['盐', '糖', '醋', '生抽', '老抽', '料酒', '豆瓣酱', '蒜', '葱', '姜', '淀粉', '花椒', '干辣椒', '辣椒油', '香油', '橄榄油', '黑胡椒', '花生米', '韩式辣酱', '咖喱块']
}

// 本地存储 key
const STORAGE_KEY = 'eat_what_fridge_selected'

// 防抖定时器
let searchTimer = null

Page({
  data: {
    categories: INGREDIENT_CATEGORIES,
    activeCategory: '蔬菜',
    ingredients: DEFAULT_INGREDIENTS['蔬菜'].map(name => ({ name, icon: getIngredientIcon(name) })),
    selectedIngredients: [],
    results: [],
    isSearching: false,
    hasSearched: false,
    keyword: ''
  },

  onLoad() {
    this.loadSavedSelection()
  },

  onShow() {
    // 页面显示时恢复上次选中的食材
    this.loadSavedSelection()
  },

  // 从本地存储加载已保存的选中食材
  loadSavedSelection() {
    try {
      const saved = wx.getStorageSync(STORAGE_KEY)
      if (saved && saved.length > 0) {
        this.setData({ selectedIngredients: saved })
        // 恢复后自动搜索
        this.autoSearch()
      }
    } catch (e) {
      // ignore
    }
  },

  // 保存选中食材到本地存储
  saveSelection() {
    wx.setStorageSync(STORAGE_KEY, this.data.selectedIngredients)
  },

  // 防抖自动搜索
  autoSearch() {
    if (this.data.selectedIngredients.length === 0) {
      this.setData({ results: [], hasSearched: false })
      return
    }
    clearTimeout(searchTimer)
    searchTimer = setTimeout(() => {
      this.onSearchRecipes()
    }, 500)
  },

  // 切换食材分类
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({
      activeCategory: cat,
      ingredients: DEFAULT_INGREDIENTS[cat].map(name => ({ name, icon: getIngredientIcon(name) })),
      keyword: ''
    })
  },

  // 切换食材选中状态
  onToggleIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients
    const idx = selected.indexOf(name)
    if (idx > -1) {
      this.setData({ selectedIngredients: selected.filter(n => n !== name) })
    } else {
      this.setData({ selectedIngredients: [...selected, name] })
    }
    this.saveSelection()
    this.autoSearch()
  },

  // 移除已选中的某个食材
  onRemoveIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients.filter(n => n !== name)
    this.setData({ selectedIngredients: selected })
    this.saveSelection()
    this.autoSearch()
  },

  // 清空所有已选食材和搜索结果
  onClearAll() {
    this.setData({ selectedIngredients: [], results: [], hasSearched: false })
    wx.removeStorageSync(STORAGE_KEY)
  },

  // 搜索框输入事件
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  // 按关键词搜索食材
  onSearchIngredient() {
    const { keyword } = this.data
    if (!keyword) return
    const allNames = Object.values(DEFAULT_INGREDIENTS).flat()
    const filtered = allNames.filter(n => n.includes(keyword))
    if (filtered.length > 0) {
      this.setData({
        ingredients: filtered.map(name => ({ name, icon: getIngredientIcon(name) })),
        activeCategory: ''
      })
    }
  },

  // 根据已选食材搜索推荐菜谱
  async onSearchRecipes() {
    if (this.data.selectedIngredients.length === 0) return
    if (this.data.isSearching) return

    this.setData({ isSearching: true })
    try {
      const res = await recipeApi.searchByIngredients(this.data.selectedIngredients)
      if (res && res.success) {
        // 为每个结果添加菜品图标
        const results = res.data.map(r => ({
          ...r,
          coverIcon: getDishIcon(r.name, r.category)
        }))
        this.setData({ results, hasSearched: true })
      }
    } catch (e) {
      console.error('搜索失败', e)
    }
    this.setData({ isSearching: false })
  },

  // 点击推荐结果
  onResultTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe/detail?id=${id}` })
  }
})
