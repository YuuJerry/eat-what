const { voteApi } = require('../../utils/cloud.js')

Page({
  data: {
    mode: 'create',
    title: '',
    options: ['', ''],
    maxVoters: 20,
    room: null,
    myVote: '',
    result: null,
    isCreating: false
  },

  onLoad(options) {
    if (options.data) {
      // 从投票码加入（带完整数据）
      this.joinFromData(options.code || '', options.data)
    } else if (options.code) {
      this.joinByCode(options.code)
    }
  },

  // 从投票码数据加入
  async joinFromData(code, encoded) {
    try {
      wx.showLoading({ title: '加入中...' })
      const decoded = JSON.parse(decodeURIComponent(encoded))
      const res = await voteApi.joinFromInvite(code, decoded.t, decoded.o)
      wx.hideLoading()
      if (res && res.success && res.data) {
        this.enterRoom(res.data)
      } else {
        wx.showModal({ title: '加入失败', content: '投票数据无效', showCancel: false })
      }
    } catch (e) {
      wx.hideLoading()
      wx.showModal({ title: '加入失败', content: '投票码格式错误', showCancel: false })
    }
  },

  onTitleInput(e) { this.setData({ title: e.detail.value }) },

  onOptionInput(e) {
    const idx = e.currentTarget.dataset.idx
    const options = [...this.data.options]
    options[idx] = e.detail.value
    this.setData({ options })
  },

  onAddOption() {
    if (this.data.options.length >= 6) {
      wx.showToast({ title: '最多6个选项', icon: 'none' })
      return
    }
    this.setData({ options: [...this.data.options, ''] })
  },

  onRemoveOption(e) {
    const idx = e.currentTarget.dataset.idx
    if (this.data.options.length <= 2) return
    this.setData({ options: this.data.options.filter((_, i) => i !== idx) })
  },

  async onCreateRoom() {
    const { title, options, maxVoters } = this.data
    if (!title.trim()) {
      wx.showToast({ title: '请输入标题', icon: 'none' })
      return
    }
    const validOptions = options.filter(o => o.trim())
    if (validOptions.length < 2) {
      wx.showToast({ title: '至少需要2个选项', icon: 'none' })
      return
    }
    this.setData({ isCreating: true })
    try {
      const res = await voteApi.createRoom({ title, options: validOptions, maxVoters })
      if (res && res.success) {
        this.joinByCode(res.code)
      } else {
        wx.showToast({ title: '创建失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '创建失败', icon: 'none' })
    }
    this.setData({ isCreating: false })
  },

  async joinByCode(code) {
    try {
      wx.showLoading({ title: '加入中...' })
      const res = await voteApi.joinRoom(code)
      wx.hideLoading()
      if (res && res.success && res.data) {
        this.enterRoom(res.data)
      } else {
        wx.showModal({ title: '加入失败', content: res?.error || '投票不存在', showCancel: false })
      }
    } catch (e) {
      wx.hideLoading()
      wx.showModal({ title: '加入失败', content: '网络错误', showCancel: false })
    }
  },

  enterRoom(room) {
    if (!room || !room.options || room.options.length === 0) {
      wx.showModal({ title: '数据异常', content: '投票数据不完整', showCancel: false })
      return
    }
    const uid = getApp().globalData.openid || 'u' + Date.now()
    const myVote = (room.voters && room.voters[uid]) || ''
    if (myVote) {
      this.setData({ room, myVote })
      this.loadResult()
    } else {
      this.setData({ room, mode: 'vote' })
    }
  },

  onSelectOption(e) {
    this.setData({ myVote: e.currentTarget.dataset.option })
  },

  async onSubmitVote() {
    if (!this.data.room) { wx.showToast({ title: '房间未加载', icon: 'none' }); return }
    if (!this.data.myVote) { wx.showToast({ title: '请选择一个选项', icon: 'none' }); return }
    try {
      const code = this.data.room.code
      const res = await voteApi.submitVote(code, this.data.myVote)
      if (res && res.success) {
        wx.showToast({ title: '投票成功', icon: 'success' })
        this.loadResult()
      } else {
        wx.showToast({ title: '投票失败', icon: 'none' })
      }
    } catch (e) {
      wx.showToast({ title: '投票失败', icon: 'none' })
    }
  },

  async loadResult() {
    if (!this.data.room) return
    try {
      const res = await voteApi.getResult(this.data.room.code)
      if (res && res.success) {
        this.setData({ result: res.data, mode: 'result' })
      }
    } catch (e) {
      console.error('加载结果失败', e)
    }
  },

  // 复制投票码到剪贴板
  onCopyInvite() {
    const room = this.data.room
    if (!room) return
    const encoded = voteApi.encodeInvite(room)
    const inviteCode = `投票码:${room.code}|${encoded}`
    wx.setClipboardData({
      data: inviteCode,
      success() {
        wx.showToast({ title: '已复制，粘贴发给好友', icon: 'success', duration: 2000 })
      }
    })
  }
})
