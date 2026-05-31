// 引入图标映射
const { getIngredientIcon, getCategoryIcon, getDishIcon } = require('../../utils/icons.js')
// 菜谱推荐引擎（静态匹配 + AI fallback）
const recipeEngine = require('../../utils/recipe-engine.js')

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
const FAVORITES_KEY = 'eat_what_favorites'

// 防抖定时器
let searchTimer = null

Page({
  data: {
    categories: INGREDIENT_CATEGORIES,
    activeCategory: '蔬菜',
    ingredients: DEFAULT_INGREDIENTS['蔬菜'].map(name => ({ name, icon: getIngredientIcon(name) })),
    selectedIngredients: [],
    selectedMap: {},
    results: [],
    isSearching: false,
    hasSearched: false,
    keyword: '',
    // 购物清单弹窗
    showShoppingList: false,
    shoppingList: '',
    // 展开的菜谱步骤索引
    expandedSteps: -1
  },

  onLoad() {
    this.loadSavedSelection()
  },

  onShow() {
    this.loadSavedSelection()
  },

  // 从本地存储加载已保存的选中食材
  loadSavedSelection() {
    try {
      const saved = wx.getStorageSync(STORAGE_KEY)
      if (saved && saved.length > 0) {
        const map = {}
        saved.forEach(n => { map[n] = true })
        this.setData({ selectedIngredients: saved, selectedMap: map })
      }
    } catch (e) {
      // ignore
    }
  },

  // 保存选中食材到本地存储
  saveSelection() {
    wx.setStorageSync(STORAGE_KEY, this.data.selectedIngredients)
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
      const filtered = selected.filter(n => n !== name)
      const map = { ...this.data.selectedMap }
      delete map[name]
      this.setData({ selectedIngredients: filtered, selectedMap: map })
    } else {
      this.setData({
        selectedIngredients: [...selected, name],
        selectedMap: { ...this.data.selectedMap, [name]: true }
      })
    }
    this.saveSelection()
  },

  // 移除已选中的某个食材
  onRemoveIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients.filter(n => n !== name)
    const map = { ...this.data.selectedMap }
    delete map[name]
    this.setData({ selectedIngredients: selected, selectedMap: map })
    this.saveSelection()
  },

  // 清空所有已选食材和搜索结果
  onClearAll() {
    this.setData({ selectedIngredients: [], selectedMap: {}, results: [], hasSearched: false, expandedSteps: -1 })
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

  // 推荐菜谱（先静态匹配，不足再 AI 补充）
  async onSearchRecipes() {
    if (this.data.selectedIngredients.length === 0) {
      wx.showToast({ title: '请先选择食材', icon: 'none' })
      return
    }
    if (this.data.isSearching) return

    this.setData({ isSearching: true, expandedSteps: -1 })
    try {
      // 第一步：从预置数据中按食材匹配（秒开）
      const matched = recipeEngine.matchByIngredients(this.data.selectedIngredients)
      const goodMatches = matched.filter(r => r.matchRate >= 30)

      let results = []

      if (goodMatches.length >= 2) {
        // 静态匹配足够，直接使用
        results = goodMatches
      } else {
        // 静态匹配不足，用 AI 补充
        this.setData({ isSearching: true })
        const aiResults = await recipeEngine.aiRecommendByIngredients(this.data.selectedIngredients)
        // 合并去重
        const seenNames = new Set(goodMatches.map(r => r.name))
        results = [...goodMatches, ...aiResults.filter(r => !seenNames.has(r.name))]
      }

      if (results.length > 0) {
        const favNames = this.getFavoriteNames()
        results = results.map(r => {
          const videos = (r.videos || []).map(v => ({
            ...v,
            playText: v.play ? (v.play >= 10000 ? Math.round(v.play / 10000) + '万 播放' : v.play + ' 播放') : ''
          }))
          const missing = r.missing || []
          return {
            ...r,
            videos,
            missing,
            missingText: missing.join('、'),
            steps: r.steps || [],
            ingredients: r.ingredients || [],
            coverIcon: getDishIcon(r.name, r.category),
            stepsExpanded: false,
            isFavorited: favNames.has(r.name)
          }
        })
        this.setData({ results, hasSearched: true })
      } else {
        wx.showToast({ title: '未找到匹配菜谱，请换个食材试试', icon: 'none' })
      }
    } catch (e) {
      console.error('推荐失败', e)
      wx.showToast({ title: '推荐失败: ' + e.message, icon: 'none' })
    }
    this.setData({ isSearching: false })
  },

  // 展开/收起菜谱步骤
  onToggleSteps(e) {
    const idx = e.currentTarget.dataset.index
    if (this.data.expandedSteps === idx) {
      this.setData({ expandedSteps: -1 })
    } else {
      this.setData({ expandedSteps: idx })
    }
  },

  // 点击视频 - 跳转Bilibili小程序
  onVideoTap(e) {
    const video = e.currentTarget.dataset.video
    if (!video) return
    const bvid = video.bvid || ''
    const url = video.url || ''
    wx.navigateToMiniProgram({
      appId: 'wx7564fd5313fa0a90',
      path: 'pages/index/index',
      extraData: { bvid, url },
      success() {
        wx.showToast({ title: '正在打开 Bilibili...', icon: 'loading', duration: 1500 })
      },
      fail() {
        if (url) {
          wx.setClipboardData({
            data: url,
            success() { wx.showToast({ title: '链接已复制，打开Bilibili粘贴', icon: 'none', duration: 2500 }) }
          })
        }
      }
    })
  },

  // 显示购物清单弹窗
  onShowShoppingList() {
    const { results } = this.data
    const withMissing = results.filter(r => r.missing && r.missing.length > 0)
    if (withMissing.length === 0) {
      wx.showToast({ title: '所有食材都有，不用买啦', icon: 'success' })
      return
    }

    let listText = '📝 购物清单\n\n'
    withMissing.forEach(r => {
      listText += `🍽 ${r.name}\n`
      listText += `· 还差：${r.missing.join('、')}\n\n`
    })

    this.setData({ showShoppingList: true, shoppingList: listText })
  },

  // 复制购物清单
  onCopyShoppingList() {
    wx.setClipboardData({
      data: this.data.shoppingList,
      success: () => {
        wx.showToast({ title: '已复制到剪贴板', icon: 'success' })
        this.setData({ showShoppingList: false })
      }
    })
  },

  // 关闭购物清单弹窗
  onHideShoppingList() {
    this.setData({ showShoppingList: false })
  },

  // 获取收藏的菜名集合
  getFavoriteNames() {
    try {
      const favs = wx.getStorageSync(FAVORITES_KEY) || []
      return new Set(favs.map(f => f.name))
    } catch (e) {
      return new Set()
    }
  },

  // 收藏/取消收藏菜谱
  onToggleFavorite(e) {
    const idx = e.currentTarget.dataset.index
    const recipe = this.data.results[idx]
    if (!recipe) return

    try {
      let favs = wx.getStorageSync(FAVORITES_KEY) || []
      const existIdx = favs.findIndex(f => f.name === recipe.name)

      if (existIdx > -1) {
        // 取消收藏
        favs.splice(existIdx, 1)
        wx.showToast({ title: '已取消收藏', icon: 'none' })
      } else {
        // 收藏
        favs.push({
          name: recipe.name,
          ingredients: recipe.ingredients,
          steps: recipe.steps,
          cookTime: recipe.cookTime,
          calories: recipe.calories,
          category: recipe.category,
          coverIcon: recipe.coverIcon,
          savedAt: Date.now()
        })
        wx.showToast({ title: '已收藏 ❤️', icon: 'success' })
      }

      wx.setStorageSync(FAVORITES_KEY, favs)

      // 更新当前结果的收藏状态
      const results = [...this.data.results]
      results[idx] = { ...recipe, isFavorited: existIdx === -1 }
      this.setData({ results })
    } catch (e2) {
      console.error('收藏操作失败', e2)
    }
  }
})
