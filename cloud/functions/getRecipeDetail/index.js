/**
 * 获取菜谱详情
 * 通过菜谱 ID 精确查询单个菜谱的完整信息
 * 参数:
 *   recipeId - 菜谱的数据库文档 ID
 * 返回: { success, data } 其中 data 为菜谱完整对象
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  // 从请求参数中获取菜谱 ID
  const { recipeId } = event

  try {
    // 通过 doc().get() 精确查询单条记录
    const { data } = await db.collection('recipes').doc(recipeId).get()
    return { success: true, data }
  } catch (err) {
    // 查询失败（如 ID 不存在）返回错误信息
    return { success: false, error: err.message }
  }
}
