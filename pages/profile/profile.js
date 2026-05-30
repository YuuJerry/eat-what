// 个人偏好设置页面逻辑 - 管理用户的口味偏好、饮食目标、过敏源和忌口

const { userApi } = require('../../utils/cloud.js')

// 饮食目标选项列表
const DIET_GOALS = ['无', '减脂', '增肌', '均衡']
// 常见过敏源列表
const COMMON_ALLERGIES = ['花生', '牛奶', '鸡蛋', '海鲜', '大豆', '小麦']
// 常见忌口食物列表
const COMMON_DISLIKES = ['香菜', '葱', '姜', '蒜', '辣椒', '苦瓜', '芹菜', '茄子']

Page({
  data: {
    // 口味偏好（辣度、甜度、酸度，范围 0-5）
    preferences: {
      spicy: 2,
      sweet: 2,
      sour: 1
    },
    dietGoal: '无',       // 当前选择的饮食目标
    allergies: [],        // 用户选择的过敏源列表
    dislikes: [],         // 用户选择的忌口食物列表
    dietGoals: DIET_GOALS,         // 饮食目标选项
    commonAllergies: COMMON_ALLERGIES, // 常见过敏源选项
    commonDislikes: COMMON_DISLIKES,   // 常见忌口选项
    isSaving: false       // 保存中的加载状态标记
  },

  onLoad() {
    // 页面加载时触发，后续从云数据库加载用户偏好
  },

  // 口味偏好滑块变更处理 - 辣度
  onSpicyChange(e) {
    this.setData({ 'preferences.spicy': e.detail.value })
  },
  // 口味偏好滑块变更处理 - 甜度
  onSweetChange(e) {
    this.setData({ 'preferences.sweet': e.detail.value })
  },
  // 口味偏好滑块变更处理 - 酸度
  onSourChange(e) {
    this.setData({ 'preferences.sour': e.detail.value })
  },

  // 饮食目标选择处理，根据索引从常量列表中取值
  onDietGoalChange(e) {
    const idx = e.currentTarget.dataset.idx
    this.setData({ dietGoal: DIET_GOALS[idx] })
  },

  // 过敏源切换处理 - 选中则添加，已选中则移除
  onToggleAllergy(e) {
    const name = e.currentTarget.dataset.name
    const allergies = this.data.allergies
    const idx = allergies.indexOf(name)
    if (idx > -1) {
      // 已选中，从列表中移除
      allergies.splice(idx, 1)
    } else {
      // 未选中，添加到列表
      allergies.push(name)
    }
    this.setData({ allergies: [...allergies] })
  },

  // 忌口食物切换处理 - 选中则添加，已选中则移除
  onToggleDislike(e) {
    const name = e.currentTarget.dataset.name
    const dislikes = this.data.dislikes
    const idx = dislikes.indexOf(name)
    if (idx > -1) {
      // 已选中，从列表中移除
      dislikes.splice(idx, 1)
    } else {
      // 未选中，添加到列表
      dislikes.push(name)
    }
    this.setData({ dislikes: [...dislikes] })
  },

  // 保存用户偏好到云数据库
  async onSave() {
    this.setData({ isSaving: true })
    try {
      const { preferences, dietGoal, allergies, dislikes } = this.data
      const res = await userApi.saveProfile({ preferences, dietGoal, allergies, dislikes })
      if (res.success) {
        wx.showToast({ title: '保存成功', icon: 'success' })
      } else {
        wx.showToast({ title: '保存失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '保存失败', icon: 'none' })
    }
    this.setData({ isSaving: false })
  },

  // 跳转到收藏页面（功能开发中）
  onGoFavorites() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  },

  // 跳转到浏览历史页面（功能开发中）
  onGoHistory() {
    wx.showToast({ title: '功能开发中', icon: 'none' })
  }
})
