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

// 食材名称归一化映射：将菜谱中的食材名映射到用户可选的食材名
const NORMALIZE_MAP = {
  '花椒粉': '花椒',
  '花椒粒': '花椒',
  '葱花': '葱',
  '葱段': '葱',
  '葱丝': '葱',
  '葱末': '葱',
  '姜片': '姜',
  '姜丝': '姜',
  '姜末': '姜',
  '蒜末': '蒜',
  '蒜片': '蒜',
  '蒜蓉': '蒜',
  '辣椒面': '辣椒油',
  '干辣椒段': '干辣椒',
  '淀粉': '淀粉',
  '水淀粉': '淀粉',
  '玉米淀粉': '淀粉',
  '生抽': '生抽',
  '酱油': '生抽',
  '老抽': '老抽',
  '料酒': '料酒',
  '米酒': '料酒',
  '醋': '醋',
  '白醋': '醋',
  '香醋': '醋',
  '橄榄油': '橄榄油',
  '食用油': '橄榄油',
  '植物油': '橄榄油',
  '盐': '盐',
  '白胡椒粉': '黑胡椒',
  '胡椒粉': '黑胡椒',
  '鸡精': '盐',
  '味精': '盐',
}

// 复合食材拆分规则：将组合名拆分为独立食材
const SPLIT_MAP = {
  '葱姜蒜': ['葱', '姜', '蒜'],
  '葱姜': ['葱', '姜'],
  '姜蒜': ['姜', '蒜'],
  '葱蒜': ['葱', '蒜'],
}

/**
 * 归一化单个食材名称
 */
function normalizeName(name) {
  return NORMALIZE_MAP[name] || name
}

/**
 * 归一化食材列表：拆分复合食材 + 映射别名
 */
function normalizeIngredients(names) {
  const result = []
  for (const name of names) {
    if (SPLIT_MAP[name]) {
      result.push(...SPLIT_MAP[name])
    } else {
      result.push(normalizeName(name))
    }
  }
  return result
}

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

    // 归一化用户食材列表
    const userIngredients = normalizeIngredients(ingredients)

    // 遍历每道菜谱，计算食材匹配度
    const results = recipes.map(recipe => {
      const recipeIngredients = recipe.ingredients || []
      // 跳过没有记录食材的菜谱
      if (recipeIngredients.length === 0) return null

      // 提取菜谱所需食材的名称列表并归一化
      const rawNames = recipeIngredients.map(i => i.name)
      const neededNames = normalizeIngredients(rawNames)
      // 去重（归一化后可能有重复）
      const uniqueNeeded = [...new Set(neededNames)]

      // 计算用户已拥有的食材（交集）
      const owned = uniqueNeeded.filter(name => userIngredients.includes(name))

      // 匹配度 = 已有食材数 / 所需食材总数
      const matchRate = owned.length / uniqueNeeded.length

      // 计算缺少的食材列表
      const missing = uniqueNeeded.filter(name => !userIngredients.includes(name))

      // 返回菜谱信息 + 匹配详情
      return {
        ...recipe,
        matchRate: Math.round(matchRate * 100), // 匹配百分比（0-100）
        ownedCount: owned.length,                // 已有食材数
        totalCount: uniqueNeeded.length,         // 所需食材总数
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
