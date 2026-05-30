/**
 * 智能推荐菜谱（基于用户画像的个性化推荐）
 *
 * 评分算法说明：
 *   基础分 = 0，各维度加减分后按总分排序取 Top 10
 *   - 口味匹配: +20（用户偏好与菜谱标签吻合）
 *   - 饮食目标: +30（减脂/增肌目标匹配）
 *   - 低卡加成: +15（减脂目标下热量<400卡）
 *   - 快手菜加成: +15（工作日且烹饪时间<=20分钟）
 *   - 忌口惩罚: -50（含用户忌口食材）
 *   - 过敏惩罚: -100（含用户过敏食材）
 *   - 历史降权: -25（最近看过的10道菜降低重复推荐）
 *   - 热门加成: likes/10，上限+15
 *
 * 若用户未设置偏好，降级为按点赞数排序的热门推荐
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  // 获取当前用户 openid
  const { OPENID } = cloud.getWXContext()

  try {
    // 获取用户偏好画像（可能不存在，此时降级为热门推荐）
    let profile = null
    try {
      const { data } = await db.collection('user_profiles').doc(OPENID).get()
      profile = data
    } catch (e) {
      // 用户没有设置偏好，使用默认推荐（不做额外处理）
    }

    // 获取所有菜谱（最多100条）用于评分排序
    const { data: recipes } = await db.collection('recipes').limit(100).get()

    // 如果没有用户偏好，按点赞数降序返回热门菜谱 Top 10
    if (!profile) {
      const sorted = recipes.sort((a, b) => (b.likes || 0) - (a.likes || 0)).slice(0, 10)
      return { success: true, data: sorted, isPersonalized: false }
    }

    // ---- 智能评分算法 ----
    const scored = recipes.map(recipe => {
      let score = 0
      const tags = recipe.tags || []
      const ingredients = recipe.ingredients || []

      // 维度一：口味匹配（+20）
      // 用户嗜辣（spicy>=3）且菜谱含"辣"标签，加分
      if (tags.includes('辣') && (profile.preferences?.spicy || 0) >= 3) score += 20
      // 用户嗜甜（sweet>=3）且菜谱含"甜"标签，加分
      if (tags.includes('甜') && (profile.preferences?.sweet || 0) >= 3) score += 20
      // 用户不嗜辣（spicy<=1）且菜谱含"清淡"标签，加分
      if (tags.includes('清淡') && (profile.preferences?.spicy || 0) <= 1) score += 20

      // 维度二：饮食目标匹配（+30 / +15）
      // 减脂目标：优先推荐减脂友好菜谱（+30），低卡再加成（+15）
      if (profile.dietGoal === '减脂' && recipe.isDietFriendly) score += 30
      if (profile.dietGoal === '减脂' && recipe.calories < 400) score += 15
      // 增肌目标：优先推荐高蛋白菜谱（蛋白质>25g）
      if (profile.dietGoal === '增肌' && (recipe.nutritionInfo?.protein || 0) > 25) score += 30

      // 维度三：忌口惩罚（-50）
      // 菜谱中包含用户忌口的食材则大幅扣分
      const hasDislike = ingredients.some(i => (profile.dislikes || []).includes(i.name))
      if (hasDislike) score -= 50

      // 维度四：过敏惩罚（-100）
      // 菜谱中包含用户过敏的食材则严重扣分（几乎不会被推荐）
      const hasAllergy = ingredients.some(i => (profile.allergies || []).includes(i.name))
      if (hasAllergy) score -= 100

      // 维度五：工作日快手菜加成（+15）
      // 周一到周五优先推荐烹饪时间 <= 20 分钟的快手菜
      const day = new Date().getDay()
      const isWeekday = day !== 0 && day !== 6
      if (isWeekday && recipe.cookTime <= 20) score += 15

      // 维度六：历史浏览降权（-25）
      // 用户最近看过的10道菜降低推荐权重，避免重复
      if ((profile.history || []).slice(0, 10).includes(recipe._id)) score -= 25

      // 维度七：热门加成（最高+15）
      // 点赞数每10个加1分，上限15分，防止过度偏向热门菜
      score += Math.min((recipe.likes || 0) / 10, 15)

      return { ...recipe, score }
    })
    // 按总分降序排列
    .sort((a, b) => b.score - a.score)
    // 取前10道菜作为推荐结果
    .slice(0, 10)

    return { success: true, data: scored, isPersonalized: true }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
