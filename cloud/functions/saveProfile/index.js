/**
 * 保存用户偏好设置（upsert 模式：存在则更新，不存在则创建）
 * 参数:
 *   preferences - 口味偏好对象（如 { spicy: 4, sweet: 2 }，值 1-5）
 *   dietGoal    - 饮食目标（"减脂" / "增肌" / "无"）
 *   allergies   - 过敏食材数组（如 ["花生","虾"]）
 *   dislikes    - 忌口食材数组（如 ["香菜","苦瓜"]）
 * 返回: { success }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event, context) => {
  // 获取当前用户 openid
  const { OPENID } = cloud.getWXContext()
  // 解构偏好参数
  const { preferences, dietGoal, allergies, dislikes } = event

  try {
    // 优先尝试更新已有文档
    await db.collection('user_profiles').doc(OPENID).update({
      data: {
        preferences: preferences || {},        // 口味偏好，默认空对象
        dietGoal: dietGoal || '无',            // 饮食目标，默认"无"
        allergies: allergies || [],            // 过敏食材列表
        dislikes: dislikes || [],              // 忌口食材列表
        updatedAt: new Date()                  // 更新时间戳
      }
    })
    return { success: true }
  } catch (e) {
    // 文档不存在时（update 会抛错），创建新的用户画像文档
    await db.collection('user_profiles').add({
      data: {
        _id: OPENID,                           // 以 openid 作为文档 ID，方便后续直接查询
        preferences: preferences || {},
        dietGoal: dietGoal || '无',
        allergies: allergies || [],
        dislikes: dislikes || [],
        history: [],                           // 浏览历史（新用户初始化为空）
        favorites: [],                         // 收藏列表（新用户初始化为空）
        createdAt: new Date(),                 // 首次创建时间
        updatedAt: new Date()                  // 更新时间
      }
    })
    return { success: true }
  }
}
