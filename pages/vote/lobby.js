// 投票大厅页面逻辑
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

  // 检测剪贴板中是否有投票码
  checkClipboard() {
    wx.getClipboardData({
      success: (res) => {
        const text = res.data || ''
        if (text.startsWith('VOTE#')) {
          const parts = text.split('#')
          if (parts.length === 3) {
            wx.showModal({
              title: '发现投票',
              content: '检测到好友发来的投票码，是否加入？',
              confirmText: '加入',
              success: (modalRes) => {
                if (modalRes.confirm) {
                  const encoded = parts[2]
                  wx.navigateTo({ url: `/pages/vote/room?data=${encoded}` })
                }
              }
            })
          }
        }
      }
    })
  },

  async loadHistory() {
    this.setData({ isLoading: true })
    try {
      const res = await voteApi.getMyRooms()
      if (res && res.success) {
        this.setData({ myRooms: res.data || [] })
      }
    } catch (e) {
      console.error('加载历史失败', e)
    }
    this.setData({ isLoading: false })
  },

  // 点击"发起投票"按钮，跳转到投票房间创建页面
  onCreateRoom() {
    wx.navigateTo({ url: '/pages/vote/room' })
  },

  // 粘贴投票码加入
  onPasteInvite() {
    wx.getClipboardData({
      success: (res) => {
        const text = res.data || ''
        if (text.startsWith('VOTE#')) {
          const parts = text.split('#')
          if (parts.length === 3) {
            wx.navigateTo({ url: `/pages/vote/room?data=${parts[2]}` })
          } else {
            wx.showToast({ title: '投票码格式错误', icon: 'none' })
          }
        } else {
          wx.showModal({
            title: '未检测到投票码',
            content: '请先让好友复制投票码发给你，然后点击此按钮加入。',
            showCancel: false
          })
        }
      }
    })
  },

  // 点击历史房间卡片，通过房间码跳转到对应的投票房间
  onRoomTap(e) {
    const code = e.currentTarget.dataset.code
    if (code) {
      wx.navigateTo({ url: `/pages/vote/room?code=${code}` })
    }
  }
})
