// 个人偏好设置页面逻辑 - 管理用户偏好和收藏

const { userApi } = require('../../utils/cloud.js')
const { getDishIcon } = require('../../utils/icons.js')

const DIET_GOALS = ['无', '减脂', '增肌', '均衡']
const COMMON_ALLERGIES = ['花生', '牛奶', '鸡蛋', '海鲜', '大豆', '小麦']
const COMMON_DISLIKES = ['香菜', '葱', '姜', '蒜', '辣椒', '苦瓜', '芹菜', '茄子']
const FAVORITES_KEY = 'eat_what_favorites'

Page({
  data: {
    preferences: { spicy: 2, sweet: 2, sour: 1 },
    dietGoal: '无',
    allergies: [],
    allergyMap: {},
    dislikes: [],
    dislikeMap: {},
    dietGoals: DIET_GOALS,
    commonAllergies: COMMON_ALLERGIES,
    commonDislikes: COMMON_DISLIKES,
    isSaving: false,
    // 收藏列表
    favorites: [],
    showFavorites: false
  },

  onLoad() {
    this.loadFavorites()
  },

  onShow() {
    this.loadFavorites()
  },

  // 加载收藏列表
  loadFavorites() {
    try {
      let favs = wx.getStorageSync(FAVORITES_KEY) || []
      // 为每个收藏添加用料文本
      favs = favs.map(f => ({
        ...f,
        ingredientsText: (f.ingredients || []).map(i => i.name + ' ' + i.amount).join('、')
      }))
      this.setData({ favorites: favs })
    } catch (e) {
      this.setData({ favorites: [] })
    }
  },

  // 切换显示收藏列表
  onToggleFavorites() {
    this.setData({ showFavorites: !this.data.showFavorites })
  },

  // 删除收藏
  onDeleteFavorite(e) {
    const name = e.currentTarget.dataset.name
    wx.showModal({
      title: '取消收藏',
      content: `确定取消收藏「${name}」吗？`,
      success: (res) => {
        if (res.confirm) {
          const favs = this.data.favorites.filter(f => f.name !== name)
          wx.setStorageSync(FAVORITES_KEY, favs)
          this.setData({ favorites: favs })
          wx.showToast({ title: '已取消收藏', icon: 'none' })
        }
      }
    })
  },

  // 展开/收起收藏的步骤
  onToggleFavSteps(e) {
    const idx = e.currentTarget.dataset.index
    const favs = [...this.data.favorites]
    favs[idx] = { ...favs[idx], showSteps: !favs[idx].showSteps }
    this.setData({ favorites: favs })
  },

  // 口味偏好滑块
  onSpicyChange(e) { this.setData({ 'preferences.spicy': e.detail.value }) },
  onSweetChange(e) { this.setData({ 'preferences.sweet': e.detail.value }) },
  onSourChange(e) { this.setData({ 'preferences.sour': e.detail.value }) },

  onDietGoalChange(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ dietGoal: DIET_GOALS[idx] })
  },

  onToggleAllergy(e) {
    const name = e.currentTarget.dataset.name
    const idx = this.data.allergies.indexOf(name)
    if (idx > -1) {
      const map = { ...this.data.allergyMap }
      delete map[name]
      this.setData({ allergies: this.data.allergies.filter(a => a !== name), allergyMap: map })
    } else {
      this.setData({
        allergies: [...this.data.allergies, name],
        allergyMap: { ...this.data.allergyMap, [name]: true }
      })
    }
  },

  onToggleDislike(e) {
    const name = e.currentTarget.dataset.name
    const idx = this.data.dislikes.indexOf(name)
    if (idx > -1) {
      const map = { ...this.data.dislikeMap }
      delete map[name]
      this.setData({ dislikes: this.data.dislikes.filter(d => d !== name), dislikeMap: map })
    } else {
      this.setData({
        dislikes: [...this.data.dislikes, name],
        dislikeMap: { ...this.data.dislikeMap, [name]: true }
      })
    }
  },

  async onSave() {
    this.setData({ isSaving: true })
    try {
      const { preferences, dietGoal, allergies, dislikes } = this.data
      const res = await userApi.saveProfile({ preferences, dietGoal, allergies, dislikes })
      if (res && res.success) {
        wx.showToast({ title: '保存成功', icon: 'success' })
      } else {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
    this.setData({ isSaving: false })
  },

  onGoHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  }
})
