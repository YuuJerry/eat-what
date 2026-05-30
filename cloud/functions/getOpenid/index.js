/**
 * 获取当前用户的 openid
 * 云函数通过微信上下文直接获取用户唯一标识，无需额外鉴权
 * 返回: { openid: string }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

exports.main = async (event, context) => {
  // 从微信上下文中解构出当前用户的 OPENID
  const { OPENID } = cloud.getWXContext()
  // 返回用户唯一标识
  return { openid: OPENID }
}
