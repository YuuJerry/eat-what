// 引入菜谱和用户相关的云函数 API
const { recipeApi, userApi } = require('../../utils/cloud.js')

Page({
  data: {
    recipe: null,                  // 菜谱详情数据
    isLoading: true,               // 加载状态
    isFavorited: false,            // 当前用户是否已收藏
    checkedIngredients: []         // 用户已勾选的食材列表
  },

  // 页面加载：从路由参数获取菜谱 ID 并请求详情
  onLoad(options) {
    if (options.id) {
      this.recipeId = options.id
      this.loadRecipe(options.id)
    }
  },

  // 请求菜谱详情数据
  async loadRecipe(id) {
    this.setData({ isLoading: true })
    try {
      const res = await recipeApi.getDetail(id)
      if (res.success) {
        this.setData({ recipe: res.data })
      }
    } catch (e) {
      console.error('加载菜谱失败', e)
    }
    this.setData({ isLoading: false })
  },

  // 勾选/取消勾选食材（标记"我有这个"）
  onCheckIngredient(e) {
    const name = e.currentTarget.dataset.name
    const checked = this.data.checkedIngredients
    const idx = checked.indexOf(name)
    if (idx > -1) {
      checked.splice(idx, 1)
    } else {
      checked.push(name)
    }
    this.setData({ checkedIngredients: [...checked] })
  },

  // 收藏/取消收藏菜谱
  async onToggleFavorite() {
    if (!this.recipeId) {
      wx.showToast({ title: '菜谱ID无效', icon: 'none' })
      return
    }
    try {
      const res = await userApi.toggleFavorite(this.recipeId)
      if (res.success) {
        this.setData({ isFavorited: res.action === 'favorited' })
        wx.showToast({
          title: res.action === 'favorited' ? '已收藏' : '已取消收藏',
          icon: 'success'
        })
      }
    } catch (e) {
      wx.showToast({ title: '操作失败', icon: 'none' })
    }
  },

  // 点击视频教程：尝试打开B站小程序，失败则复制链接到剪贴板
  onVideoTap(e) {
    const video = e.currentTarget.dataset.video
    if (video.platform === 'bilibili') {
      // 尝试打开B站小程序
      wx.navigateToMiniProgram({
        appId: 'wx7564fd5313fa0a90',
        path: `pages/video/video?bvid=${video.videoId}`,
        fail() {
          // 回退到复制链接
          wx.setClipboardData({
            data: `https://www.bilibili.com/video/${video.videoId}`,
            success() {
              wx.showToast({ title: '链接已复制', icon: 'success' })
            }
          })
        }
      })
    }
  },

  // 分享给好友：自定义分享标题和路径
  onShareAppMessage() {
    const recipe = this.data.recipe
    return {
      title: recipe ? `来看看${recipe.name}怎么做` : '今天吃什么',
      path: `/pages/recipe/detail?id=${this.recipeId}`
    }
  }
})
