/**
 * 收藏/取消收藏菜谱（toggle 模式）
 * 如果菜谱已在收藏列表中则取消收藏，否则添加收藏
 * 若用户还没有 profile 文档，会自动创建并直接收藏该菜谱
 * 参数:
 *   recipeId - 菜谱的数据库文档 ID
 * 返回: { success, action } action 为 'favorited' 或 'unfavorited'
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  // 获取当前用户 openid
  const { OPENID } = cloud.getWXContext()
  const { recipeId } = event

  // 参数校验：菜谱 ID 不能为空
  if (!recipeId) {
    return { success: false, error: '菜谱ID无效' }
  }

  try {
    // 尝试获取用户的 profile 文档
    let profile
    try {
      profile = (await db.collection('user_profiles').doc(OPENID).get()).data
    } catch (e) {
      // 用户没有 profile 文档：自动创建新文档，并直接收藏该菜谱
      await db.collection('user_profiles').add({
        data: {
          _id: OPENID,
          preferences: {},
          dietGoal: '无',
          allergies: [],
          dislikes: [],
          history: [],
          favorites: [recipeId],   // 首次收藏直接写入
          createdAt: new Date(),
          updatedAt: new Date()
        }
      })
      return { success: true, action: 'favorited' }
    }

    // 获取当前收藏列表
    const favorites = profile.favorites || []

    let action
    if (favorites.includes(recipeId)) {
      // 已收藏：使用 _.pull 从数组中移除该菜谱 ID
      await db.collection('user_profiles').doc(OPENID).update({
        data: { favorites: _.pull(recipeId) }
      })
      action = 'unfavorited'
    } else {
      // 未收藏：使用 _.push 将菜谱 ID 追加到收藏数组
      await db.collection('user_profiles').doc(OPENID).update({
        data: { favorites: _.push(recipeId) }
      })
      action = 'favorited'
    }

    return { success: true, action }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
