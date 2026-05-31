App({
  onLaunch() {
    console.log('今天吃什么 v2.0 启动')

    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'yuujerry-d1gb9d22v44f569ad',
        traceUser: true
      })
    }

    // 预加载菜谱数据模块（静态数据，瞬间完成）
    try {
      require('./utils/recipe-engine.js')
    } catch (e) { /* ignore */ }
  },

  // 全局共享数据，所有页面可通过 getApp() 访问
  globalData: {
    userInfo: null, // 当前用户信息（昵称、头像等）
    openid: ''      // 用户唯一标识，登录后赋值
  }
})
