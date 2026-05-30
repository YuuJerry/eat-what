/**
 * 获取减脂餐菜谱列表
 * 仅返回标记为减脂友好的菜谱，按热量升序排列（低卡优先）
 * 参数:
 *   maxCalories - 可选，热量上限（卡路里），只返回热量 <= 该值的菜谱
 *   page        - 页码（默认第1页）
 *   pageSize    - 每页数量（默认20条）
 * 返回: { success, data }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  // 解构请求参数，dietGoal 预留但当前未使用
  const { dietGoal, maxCalories, page = 1, pageSize = 20 } = event

  // 基础查询条件：只获取减脂友好菜谱
  let query = { isDietFriendly: true }

  // 可选热量筛选：指定了 maxCalories 时，只返回热量不超过该值的菜谱
  if (maxCalories) {
    query.calories = _.lte(maxCalories)
  }

  try {
    // 按热量升序排列，优先展示低卡菜谱，支持分页
    const { data } = await db.collection('recipes')
      .where(query)
      .orderBy('calories', 'asc')   // 热量从低到高
      .skip((page - 1) * pageSize)  // 分页偏移
      .limit(pageSize)              // 每页条数限制
      .get()

    return { success: true, data }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
