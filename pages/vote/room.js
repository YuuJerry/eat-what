// 投票房间页面逻辑 - 支持创建投票、参与投票和查看投票结果三种模式

const { voteApi } = require('../../utils/cloud.js')

Page({
  data: {
    mode: 'create', // 页面模式：'create'=创建投票, 'vote'=投票中, 'result'=查看结果
    // 创建投票相关数据
    title: '',          // 投票标题
    options: ['', ''],  // 投票选项列表，默认两个空选项
    maxVoters: 20,      // 最大投票人数
    // 投票房间相关数据
    room: null,         // 当前房间信息
    myVote: '',         // 当前用户选择的投票选项
    // 结果相关数据
    result: null,       // 投票结果数据
    isCreating: false   // 创建中的加载状态标记
  },

  // 页面加载时，根据参数决定进入模式
  onLoad(options) {
    if (options.code && options.fileID) {
      // 通过分享链接加入（带 fileID）
      this.joinByFileID(options.code, decodeURIComponent(options.fileID))
    } else if (options.code) {
      // 通过房间码加入（本地缓存 fileID）
      this.joinByCode(options.code)
    }
    // 无参数时默认进入创建模式
  },

  // 监听投票标题输入，实时更新到 data
  onTitleInput(e) {
    this.setData({ title: e.detail.value })
  },

  // 监听投票选项输入，根据索引更新对应的选项值
  onOptionInput(e) {
    const idx = e.currentTarget.dataset.idx
    const options = [...this.data.options]
    options[idx] = e.detail.value
    this.setData({ options })
  },

  // 添加新的投票选项，最多允许6个
  onAddOption() {
    if (this.data.options.length >= 6) {
      wx.showToast({ title: '最多6个选项', icon: 'none' })
      return
    }
    this.setData({ options: [...this.data.options, ''] })
  },

  // 删除指定索引的投票选项，最少保留2个
  onRemoveOption(e) {
    const idx = e.currentTarget.dataset.idx
    if (this.data.options.length <= 2) return
    const options = this.data.options.filter((_, i) => i !== idx)
    this.setData({ options })
  },

  // 创建投票房间：校验输入后调用云函数创建，成功后自动加入
  async onCreateRoom() {
    const { title, options, maxVoters } = this.data
    // 校验标题不能为空
    if (!title.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    // 过滤空选项，校验至少需要2个有效选项
    const validOptions = options.filter(o => o.trim())
    if (validOptions.length < 2) {
      wx.showToast({ title: '至少需要2个选项', icon: 'none' })
      return
    }

    this.setData({ isCreating: true })
    try {
      const res = await voteApi.createRoom({ title, options: validOptions, maxVoters })
      if (res && res.success) {
        // 创建成功后，通过返回的房间码自动加入投票
        this.joinByCode(res.roomCode)
      } else {
        wx.showToast({ title: res.error || '创建失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '创建失败', icon: 'none' })
    }
    this.setData({ isCreating: false })
  },

  // 通过分享链接加入（带 fileID）
  async joinByFileID(code, fileID) {
    try {
      const res = await voteApi.joinRoomByFileID(code, fileID)
      if (res && res.success) {
        this.enterRoom(res.data)
      } else {
        wx.showToast({ title: '房间不存在或已过期', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '加入失败', icon: 'none' })
    }
  },

  // 通过房间码加入（本地缓存 fileID）
  async joinByCode(code) {
    try {
      const res = await voteApi.joinRoom(code)
      if (res && res.success) {
        this.enterRoom(res.data)
      } else {
        wx.showToast({ title: '房间不存在或已过期', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '加入失败', icon: 'none' })
    }
  },

  // 进入投票房间（统一处理）
  enterRoom(room) {
    const openid = getApp().globalData.openid || 'user_' + Date.now()
    const myVote = (room.voters && room.voters[openid]) || ''
    if (myVote) {
      this.setData({ room, myVote })
      this.loadResult()
    } else {
      this.setData({ room, mode: 'vote' })
    }
  },

  // 加载已有房间
  async loadRoom(roomCode) {
    this.joinByCode(roomCode)
  },

  // 用户点击选择某个投票选项
  onSelectOption(e) {
    const option = e.currentTarget.dataset.option
    this.setData({ myVote: option })
  },

  // 提交投票：校验房间和选项后调用云函数提交，成功后自动加载结果
  async onSubmitVote() {
    if (!this.data.room) {
      wx.showToast({ title: '房间未加载', icon: 'none' })
      return
    }
    if (!this.data.myVote) {
      wx.showToast({ title: '请选择一个选项', icon: 'none' })
      return
    }

    try {
      const res = await voteApi.submitVote(this.data.room.roomCode, this.data.myVote)
      if (res && res.success) {
        wx.showToast({ title: '投票成功', icon: 'success' })
        // 投票成功后自动加载并展示结果
        this.loadResult()
      } else {
        wx.showToast({ title: res.error || '投票失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '投票失败', icon: 'none' })
    }
  },

  // 加载投票结果，成功后切换到结果模式
  async loadResult() {
    if (!this.data.room) return
    try {
      const res = await voteApi.getResult(this.data.room.roomCode)
      if (res && res.success) {
        this.setData({ result: res.data, mode: 'result' })
      }
    } catch (e) {
      console.error('加载结果失败', e)
    }
  },

  // 微信分享配置：带 fileID 确保接收者能加入
  onShareAppMessage() {
    const room = this.data.room
    if (room) {
      const fileID = voteApi.getFileID(room.roomCode)
      const fidParam = fileID ? `&fileID=${encodeURIComponent(fileID)}` : ''
      return {
        title: `来投票：${room.title}`,
        path: `/pages/vote/room?code=${room.roomCode}${fidParam}`
      }
    }
    return {
      title: '来一起投票决定吃什么',
      path: '/pages/vote/lobby'
    }
  },

  // 复制房间码到剪贴板，方便用户分享给好友
  onCopyCode() {
    wx.setClipboardData({
      data: this.data.room.roomCode,
      success() {
        wx.showToast({ title: '房间码已复制', icon: 'success' })
      }
    })
  }
})
