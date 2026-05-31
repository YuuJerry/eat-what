// AI 菜谱引擎
const aiRecipes = require('../../utils/ai-recipes.js')
// 图标映射
const { getDishIcon, getIngredientIcon } = require('../../utils/icons.js')
// 收藏 key
const FAVORITES_KEY = 'eat_what_favorites'

Page({
  data: {
    recipe: null,
    isLoading: true,
    isFavorited: false,
    checkedIngredients: []
  },

  onLoad(options) {
    this.recipeId = options.id || ''

    // 优先从 eventChannel 接收完整数据（列表页/首页传入）
    const eventChannel = this.getOpenerEventChannel()
    if (eventChannel && eventChannel.on) {
      eventChannel.on('recipeData', (data) => {
        if (data && data.name) {
          this.showRecipe(data)
          this.setData({ isLoading: false })
          return
        }
      })
    }

    // eventChannel 无数据时，延迟检查（异步回调）
    setTimeout(() => {
      if (!this.data.recipe) {
        this.loadRecipe(this.recipeId)
      }
    }, 300)
  },

  // 展示菜谱数据（统一处理）
  showRecipe(recipe) {
    const r = { ...recipe }
    r.coverIcon = getDishIcon(r.name, r.category)
    if (r.ingredients) {
      r.ingredients = r.ingredients.map(i => ({
        ...i,
        iconPath: getIngredientIcon(i.name)
      }))
    }
    this.recipeId = r._id || r.name
    this.setData({ recipe: r })
    this.checkFavorited()
  },

  // 从本地/AI 加载菜谱
  async loadRecipe(id) {
    this.setData({ isLoading: true })
    try {
      const recipe = await aiRecipes.getRecipeDetail(id)
      this.showRecipe(recipe)
    } catch (e) {
      console.error('加载菜谱失败', e)
      wx.showToast({ title: '加载失败', icon: 'none' })
    }
    this.setData({ isLoading: false })
  },

  // 检查是否已收藏
  checkFavorited() {
    try {
      const favs = wx.getStorageSync(FAVORITES_KEY) || []
      const name = this.data.recipe?.name
      this.setData({ isFavorited: favs.some(f => f.name === name) })
    } catch (e) {
      // ignore
    }
  },

  // 收藏/取消收藏
  onToggleFavorite() {
    const recipe = this.data.recipe
    if (!recipe) return

    try {
      let favs = wx.getStorageSync(FAVORITES_KEY) || []
      const existIdx = favs.findIndex(f => f.name === recipe.name)

      if (existIdx > -1) {
        favs.splice(existIdx, 1)
        wx.showToast({ title: '已取消收藏', icon: 'none' })
      } else {
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
      this.setData({ isFavorited: existIdx === -1 })
    } catch (e) {
      console.error('收藏操作失败', e)
    }
  },

  // 勾选/取消食材
  onCheckIngredient(e) {
    const name = e.currentTarget.dataset.name
    const checked = this.data.checkedIngredients
    const idx = checked.indexOf(name)
    if (idx > -1) { checked.splice(idx, 1) } else { checked.push(name) }
    this.setData({ checkedIngredients: [...checked] })
  },

  // 视频教程
  onVideoTap(e) {
    const video = e.currentTarget.dataset.video
    if (video.platform === 'bilibili') {
      wx.navigateToMiniProgram({
        appId: 'wx7564fd5313fa0a90',
        path: `pages/video/video?bvid=${video.videoId}`,
        fail() {
          wx.setClipboardData({
            data: `https://www.bilibili.com/video/${video.videoId}`,
            success() { wx.showToast({ title: '链接已复制', icon: 'success' }) }
          })
        }
      })
    }
  },

  // 分享
  onShareAppMessage() {
    const recipe = this.data.recipe
    return {
      title: recipe ? `来看看${recipe.name}怎么做` : '今天吃什么',
      path: `/pages/recipe/detail?id=${this.recipeId}`
    }
  }
})
