// 菜谱推荐引擎
// 静态数据 + 规则推荐 + AI fallback（冰箱推荐）
// 替代 ai-recipes.js，对外接口不变

const RAW_RECIPES = require('../data/recipes.js')
const VIDEO_MAP = require('../data/videos.js')

// 合并视频数据到菜谱
const ALL_RECIPES = RAW_RECIPES.map(r => {
  const videos = VIDEO_MAP[r.name]
  if (videos && videos.length > 0) {
    return { ...r, videos }
  }
  return r
})

// ===== AI 配置（从配置文件读取，仅冰箱推荐 fallback 用）=====
let AI_CONFIG
try {
  AI_CONFIG = require('../config/api.js').AI
} catch (e) {
  AI_CONFIG = { url: '', key: '', model: '' }
}

// ===== 规则引擎：打分推荐 =====

/**
 * 对菜谱打分排序
 * @param {Array} recipes - 菜谱数组
 * @param {Object} options - 推荐条件
 * @param {string} options.category - 分类筛选
 * @param {string} options.keyword - 搜索关键词
 * @param {Array} options.userIngredients - 用户拥有的食材名称
 * @param {boolean} options.dietOnly - 仅减脂
 * @param {number} options.count - 返回数量，默认 6
 * @returns {Array} 排序后的菜谱
 */
function recommend(recipes, options = {}) {
  const { category, keyword, userIngredients, dietOnly, count = 6 } = options

  let pool = recipes

  // 分类预筛
  if (category && category !== '全部' && category !== '热门') {
    if (category === '减脂') {
      pool = pool.filter(r => r.isDietFriendly)
    } else {
      pool = pool.filter(r => r.category === category)
    }
  }

  // 减脂标记
  if (dietOnly) {
    pool = pool.filter(r => r.isDietFriendly)
  }

  // 关键词预筛
  if (keyword) {
    const kw = keyword.toLowerCase()
    const matched = pool.filter(r =>
      r.name.toLowerCase().includes(kw) ||
      r.tags.some(t => t.toLowerCase().includes(kw)) ||
      r.ingredients.some(i => i.name.toLowerCase().includes(kw))
    )
    if (matched.length > 0) pool = matched
  }

  // 打分
  const scored = pool.map(r => {
    let score = 0

    // 分类匹配
    if (category && category !== '全部' && r.category === category) score += 30

    // 减脂标记匹配
    if (dietOnly && r.isDietFriendly) score += 20

    // 标签关键词匹配
    if (keyword) {
      const kw = keyword.toLowerCase()
      if (r.name.toLowerCase().includes(kw)) score += 25
      if (r.tags.some(t => t.includes(kw))) score += 15
      if (r.ingredients.some(i => i.name.includes(kw))) score += 10
    }

    // 食材匹配（冰箱推荐）
    if (userIngredients && userIngredients.length > 0) {
      const owned = userIngredients.map(i => i.toLowerCase())
      const matched = r.ingredients.filter(ing =>
        owned.some(o => ing.name.includes(o) || o.includes(ing.name))
      ).length
      score += matched * 15
    }

    // 难度适中加分
    if (r.difficulty <= 2) score += 5

    // 随机因子（保证每次推荐有变化）
    score += Math.random() * 20

    return { ...r, _score: score }
  })

  // 按分数降序取前 N 个
  return scored
    .sort((a, b) => b._score - a._score)
    .slice(0, count)
    .map(({ _score, ...r }) => r)
}

// ===== 对外接口（与 ai-recipes.js 兼容）=====

/**
 * 获取首页热门推荐（优先 isHot 标记的菜谱）
 */
function getHotRecipes(forceRefresh) {
  if (!forceRefresh) {
    const cached = loadCache('hot')
    if (cached) return cached
  }
  const hotRecipes = ALL_RECIPES.filter(r => r.isHot)
  // 从热门菜中随机取 4 道，每次刷新不同
  const shuffled = [...hotRecipes].sort(() => Math.random() - 0.5)
  const result = shuffled.slice(0, 4)
  saveCache('hot', result)
  return result
}

/**
 * 按分类获取菜谱
 */
function getRecipesByCategory(category, forceRefresh) {
  if (!forceRefresh) {
    const cached = loadCache('cat_' + category)
    if (cached) return cached
  }
  const result = recommend(ALL_RECIPES, { category, count: 6 })
  saveCache('cat_' + category, result)
  return result
}

/**
 * 搜索菜谱
 */
function searchRecipes(keyword) {
  if (!keyword) return recommend(ALL_RECIPES, { count: 6 })
  return recommend(ALL_RECIPES, { keyword, count: 6 })
}

/**
 * 获取菜谱详情（按名称或 ID 查找）
 */
function getRecipeDetail(idOrName) {
  if (!idOrName) return null
  // 精确匹配
  const found = ALL_RECIPES.find(r => r.name === idOrName)
  if (found) return found
  // 模糊匹配（包含关键词）
  const fuzzy = ALL_RECIPES.find(r => r.name.includes(idOrName))
  if (fuzzy) return fuzzy
  return null
}

/**
 * 获取减脂菜谱
 */
function getDietRecipes(forceRefresh) {
  return getRecipesByCategory('减脂', forceRefresh)
}

/**
 * 预加载热门菜谱（首页用，同步操作瞬间完成）
 */
function preloadHotRecipes() {
  // 静态数据不需要预加载，此函数保留兼容
}

// ===== 冰箱推荐：食材匹配 =====

/**
 * 按食材匹配菜谱
 * @param {Array} selectedIngredients - 用户选中的食材名称数组
 * @returns {Array} 匹配结果，按匹配率降序
 */
function matchByIngredients(selectedIngredients) {
  if (!selectedIngredients || selectedIngredients.length === 0) {
    return recommend(ALL_RECIPES, { count: 3 })
  }

  const owned = selectedIngredients.map(i => i.toLowerCase())

  const results = ALL_RECIPES.map(r => {
    const matched = r.ingredients.filter(ing =>
      owned.some(o => ing.name.includes(o) || o.includes(ing.name))
    ).length
    const total = r.ingredients.length
    const matchRate = Math.round((matched / total) * 100)

    const missing = r.ingredients
      .filter(ing => !owned.some(o => ing.name.includes(o) || o.includes(ing.name)))
      .map(i => i.name)

    return { ...r, matchRate, ownedCount: matched, totalCount: total, missing }
  })
  .filter(r => r.matchRate > 0)
  .sort((a, b) => b.matchRate - a.matchRate || b.ownedCount - a.ownedCount)
  .slice(0, 6)

  return results
}

// ===== AI Fallback（冰箱推荐专用）=====

function callAI(prompt) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: AI_CONFIG.url,
      method: 'POST',
      header: {
        'Content-Type': 'application/json',
        'x-api-key': AI_CONFIG.key,
        'anthropic-version': '2023-06-01'
      },
      data: {
        model: AI_CONFIG.model,
        max_tokens: 1500,
        messages: [{ role: 'user', content: prompt }]
      },
      success: res => {
        if (res.statusCode === 200 && res.data && res.data.content) {
          resolve(res.data.content[0].text)
        } else {
          reject(new Error('AI 返回异常'))
        }
      },
      fail: err => reject(err)
    })
  })
}

/**
 * AI 推荐菜谱（冰箱 fallback）
 */
async function aiRecommendByIngredients(selectedIngredients) {
  const ingredientStr = selectedIngredients.join('、')
  const prompt = `用户冰箱里有：${ingredientStr}。推荐3道可以用这些食材做的菜。每道菜列出：菜名、需要的食材及用量（标出用户没有的食材）、做法步骤（3-5步）、烹饪时间、预估卡路里。只返回JSON数组格式：[{"name":"菜名","category":"分类","cookTime":分钟,"calories":卡路里,"isDietFriendly":false,"tags":["标签"],"difficulty":1,"servings":2,"ingredients":[{"name":"食材","amount":"用量"}],"steps":["步骤1","步骤2"],"missing":["缺少食材1"],"matchRate":80}]`

  try {
    const content = await callAI(prompt)
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) throw new Error('无法解析 AI 返回')
    const recipes = JSON.parse(jsonMatch[0])
    return recipes.map(r => ({
      ...r,
      _id: 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
      isAI: true
    }))
  } catch (e) {
    console.error('AI 推荐失败:', e)
    return []
  }
}

// ===== 本地缓存 =====

const CACHE_KEY = 'eat_what_recipe_cache'

function loadCache(key) {
  try {
    const all = wx.getStorageSync(CACHE_KEY) || {}
    return all[key] || null
  } catch (e) {
    return null
  }
}

function saveCache(key, data) {
  try {
    const all = wx.getStorageSync(CACHE_KEY) || {}
    all[key] = data
    wx.setStorageSync(CACHE_KEY, all)
  } catch (e) { /* ignore */ }
}

/**
 * 生成 Bilibili 搜索链接（视频 fallback）
 */
function getBilibiliSearchUrl(recipeName) {
  return 'https://search.bilibili.com/all?keyword=' + encodeURIComponent(recipeName + ' 做法')
}

module.exports = {
  getHotRecipes,
  getRecipesByCategory,
  searchRecipes,
  getRecipeDetail,
  getDietRecipes,
  preloadHotRecipes,
  matchByIngredients,
  aiRecommendByIngredients,
  getBilibiliSearchUrl,
  ALL_RECIPES
}
