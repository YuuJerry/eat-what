/**
 * 根据用户已有食材搜索匹配的菜谱
 * 匹配算法：
 *   1. 遍历所有菜谱，计算用户食材对每道菜所需食材的覆盖率（matchRate）
 *   2. 过滤掉匹配度低于 50% 的菜谱
 *   3. 按匹配度降序排列，匹配度相同时缺少食材少的优先
 * 参数:
 *   ingredients - 用户拥有的食材名称数组（如 ["鸡蛋","番茄"]）
 * 返回: { success, data } data 中每项额外包含 matchRate、missing 等字段
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  // 用户拥有的食材名称数组
  const { ingredients } = event

  // 参数校验：至少需要一种食材才能搜索
  if (!ingredients || ingredients.length === 0) {
    return { success: false, error: '请至少选择一种食材' }
  }

  try {
    // 获取所有菜谱（最多100条）用于本地匹配计算
    const { data: recipes } = await db.collection('recipes').limit(100).get()

    // 遍历每道菜谱，计算食材匹配度
    const results = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients || []
      // 跳过没有记录食材的菜谱
      if (recipeIngredients.length === 0) return null

      // 提取菜谱所需食材的名称列表
      const neededNames = recipeIngredients.map(i => i.name)

      // 计算用户已拥有的食材（交集）
      const owned = neededNames.filter(name => ingredients.includes(name))

      // 匹配度 = 已有食材数 / 所需食材总数
      const matchRate = owned.length / neededNames.length

      // 计算缺少的食材列表
      const missing = neededNames.filter(name => !ingredients.includes(name))

      // 返回菜谱信息 + 匹配详情
      return {
        ...recipe,
        matchRate: Math.round(matchRate * 100), // 匹配百分比（0-100）
        ownedCount: owned.length,                // 已有食材数
        totalCount: neededNames.length,          // 所需食材总数
        missing                                  // 缺少的食材列表
      }
    })
    // 过滤：只保留匹配度 >= 50% 的菜谱
    .filter(r => r && r.matchRate >= 50)
    // 排序：先按匹配度降序，匹配度相同则缺少食材少的优先
    .sort((a, b) => b.matchRate - a.matchRate || a.missing.length - b.missing.length)

    return { success: true, data: results }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
