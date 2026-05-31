App({
  onLaunch() {
    console.log('今天吃什么 v2.0 启动')

    // 初始化云开发环境
    if (wx.cloud) {
      wx.cloud.init({
        env: 'cloudbase-d0ggsef0eee4e6534',
        traceUser: true
      })
    }

    // 后台预加载热门菜谱（不阻塞启动）
    try {
      const aiRecipes = require('./utils/ai-recipes.js')
      aiRecipes.preloadHotRecipes()
    } catch (e) { /* ignore */ }
  },

  // 全局共享数据，所有页面可通过 getApp() 访问
  globalData: {
    userInfo: null, // 当前用户信息（昵称、头像等）
    openid: ''      // 用户唯一标识，登录后赋值
  }
})
