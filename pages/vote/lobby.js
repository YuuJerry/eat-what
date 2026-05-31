// 投票大厅页面逻辑
const { voteApi } = require('../../utils/cloud.js')

Page({
  data: {
    myRooms: [],
    isLoading: false
  },

  onLoad() {
    this.loadHistory()
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
    } catch (e) {
      console.error('加载历史失败', e)
    }
    this.setData({ isLoading: false })
  },

  // 点击"发起投票"按钮，跳转到投票房间创建页面
  onCreateRoom() {
    wx.navigateTo({ url: '/pages/vote/room' })
  },

  // 点击"加入投票"按钮，提示从分享链接进入
  onJoinRoom() {
    wx.showModal({
      title: '如何加入投票',
      content: '请让好友把投票链接分享给你，点击链接即可直接加入投票。',
      confirmText: '我知道了',
      showCancel: false
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
