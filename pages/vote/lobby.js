const { voteApi } = require('../../utils/cloud.js')

Page({
  data: {
    myRooms: [],
    isLoading: false
  },

  onLoad() {
    this.loadHistory()
    this.checkClipboard()
  },

  onShow() {
    this.loadHistory()
  },

  async loadHistory() {
    this.setData({ isLoading: true })
    try {
      const res = await voteApi.getMyRooms()
      if (res && res.success) {
        this.setData({ myRooms: res.data || [] })
      }
    } catch (e) { /* ignore */ }
    this.setData({ isLoading: false })
  },

  // 检测剪贴板中的投票码
  checkClipboard() {
    wx.getClipboardData({
      success: (res) => {
        const text = (res.data || '').trim()
        const parsed = this.parseInviteCode(text)
        if (parsed) {
          wx.showModal({
            title: '🗳️ 发现投票',
            content: '检测到好友发来的投票码，是否加入？',
            confirmText: '加入',
            success: (modalRes) => {
              if (modalRes.confirm) {
                wx.navigateTo({ url: `/pages/vote/room?code=${parsed.code}&binId=${parsed.binId}` })
              }
            }
          })
        }
      }
    })
  },

  // 解析投票码格式: 投票码:XXXXXX|binId
  parseInviteCode(text) {
    if (!text || !text.includes('投票码:')) return null
    const match = text.match(/投票码:([A-Z0-9]+)\|(.+)/)
    if (match) {
      return { code: match[1], binId: match[2] }
    }
    // 兼容旧格式
    const match2 = text.match(/投票码:([A-Z0-9]+)/)
    if (match2) {
      return { code: match2[1], binId: '' }
    }
    return null
  },

  onCreateRoom() {
    wx.navigateTo({ url: '/pages/vote/room' })
  },

  // 粘贴投票码加入
  onPasteInvite() {
    wx.getClipboardData({
      success: (res) => {
        const text = (res.data || '').trim()
        const parsed = this.parseInviteCode(text)
        if (parsed) {
          wx.navigateTo({ url: `/pages/vote/room?code=${parsed.code}&binId=${parsed.binId}` })
        } else {
          wx.showModal({
            title: '未检测到投票码',
            content: '请先让好友复制投票码发给你，然后点击此按钮。',
            showCancel: false
          })
        }
      }
    })
  },

  onRoomTap(e) {
    const item = e.currentTarget.dataset.item
    if (item && item.binId) {
      wx.navigateTo({ url: `/pages/vote/room?code=${item.code}&binId=${item.binId}` })
    } else if (item && item.code) {
      wx.navigateTo({ url: `/pages/vote/room?code=${item.code}` })
    }
  }
})
