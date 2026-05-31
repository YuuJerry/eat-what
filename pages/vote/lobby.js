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

  // 点击"加入投票"按钮，弹出输入框让用户输入6位房间码
  onJoinRoom() {
    wx.showModal({
      title: '加入投票',
      editable: true,
      placeholderText: '输入6位房间码',
      success: (res) => {
        // 用户确认输入后，携带房间码跳转到投票房间页面（自动转为大写）
        if (res.confirm && res.content) {
          wx.navigateTo({ url: `/pages/vote/room?code=${res.content.toUpperCase()}` })
        }
      }
    })
  },

  // 点击历史房间卡片，通过房间ID跳转到对应的投票房间
  onRoomTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/vote/room?id=${id}` })
  }
})
