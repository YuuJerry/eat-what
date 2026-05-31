App({
  // 应用生命周期：启动时触发
  onLaunch() {
    console.log('今天吃什么 v2.0 启动')

    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloudbase-d0ggsef0eee4e6534', // 云开发环境 ID
        traceUser: true // 开启用户访问记录，用于统计分析
      })
    }
  },

  // 全局共享数据，所有页面可通过 getApp() 访问
  globalData: {
    userInfo: null, // 当前用户信息（昵称、头像等）
    openid: ''      // 用户唯一标识，登录后赋值
  }
})
