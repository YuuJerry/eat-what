// 投票大厅页面逻辑 - 提供创建投票和加入投票的入口，展示用户的历史投票记录

Page({
  data: {
    myRooms: [],    // 用户参与过的投票房间列表
    isLoading: false // 加载状态标记
  },

  onLoad() {
    // 页面加载时触发，后续可以从云数据库加载用户的历史投票房间
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
