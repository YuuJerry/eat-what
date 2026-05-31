/**
 * AI 菜谱引擎
 * 生成 → 存本地 → 秒开。首次调 AI，之后读缓存。
 */

// AI API 配置
const AI_CONFIG = {
  url: 'https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic/v1/messages',
  key: 'feacb83e1105a0b4978566511bc9a39b:MDAzNDI5N2RlNTBlNzY1NGIwNmY5ZTMz',
  model: 'astron-code-latest'
}

// 本地存储 key
const STORAGE_KEY = 'eat_what_recipes'

// 分类对应的 Prompt 关键词
const CATEGORY_PROMPTS = {
  '全部': '不同类型的家常菜',
  '中餐': '中式家常菜',
  '西餐': '西式料理',
  '日料': '日本料理',
  '韩餐': '韩国料理',
  '减脂': '低卡减脂餐',
  '热门': '热门经典家常菜',
}

// 调用 AI API
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
      timeout: 30000,
      success: (res) => {
        if (res.statusCode !== 200) {
          reject(new Error('API 请求失败: ' + res.statusCode))
          return
        }
        const data = res.data
        if (data.error) {
          reject(new Error(data.error.message || 'API 错误'))
          return
        }
        if (data.content && data.content.length > 0) {
          resolve(data.content[0].text)
          return
        }
        reject(new Error('未知响应格式'))
      },
      fail: (err) => reject(new Error('网络请求失败: ' + err.errMsg))
    })
  })
}

// 解析 AI 返回的 JSON
function parseRecipes(content) {
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      const parsed = JSON.parse(content)
      return Array.isArray(parsed) ? parsed : (parsed.recipes || [])
    }
    return JSON.parse(jsonMatch[0])
  } catch (e) {
    console.error('解析 AI 返回失败:', content)
    return []
  }
}

// 给每道菜生成稳定 ID
function stableId(name) {
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = ((hash << 5) - hash) + name.charCodeAt(i)
    hash |= 0
  }
  return 'ai_' + Math.abs(hash).toString(36)
}

// 格式化菜谱数据
function formatRecipes(recipes) {
  return recipes.map(r => ({
    _id: stableId(r.name || '未知'),
    name: r.name || '未知菜名',
    category: r.category || '中餐',
    cookTime: r.cookTime || 15,
    calories: r.calories || 0,
    isDietFriendly: r.isDietFriendly || (r.calories && r.calories <= 300),
    tags: r.tags || [],
    ingredients: r.ingredients || [],
    steps: r.steps || [],
    nutritionInfo: r.nutritionInfo || { protein: 0, fat: 0, carbs: 0, fiber: 0 },
    difficulty: r.difficulty || 1,
    servings: r.servings || 2,
    likes: Math.floor(Math.random() * 200) + 50,
    isAI: true
  }))
}

// 读取本地存储的所有菜谱
function loadAll() {
  try {
    return wx.getStorageSync(STORAGE_KEY) || {}
  } catch (e) {
    return {}
  }
}

// 保存到本地存储
function saveAll(data) {
  wx.setStorageSync(STORAGE_KEY, data)
}

// 生成 Prompt（精简版，加快响应）
function buildPrompt(type, extra) {
  const cat = CATEGORY_PROMPTS[type] || '家常菜'
  const jsonFormat = `[{"name":"菜名","category":"分类","cookTime":15,"calories":300,"isDietFriendly":false,"tags":["标签"],"difficulty":1,"servings":2,"ingredients":[{"name":"食材","amount":"用量"}],"steps":["步骤1","步骤2","步骤3"],"nutritionInfo":{"protein":15,"fat":10,"carbs":20,"fiber":2}}]`

  if (type === 'search' && extra) {
    return `推荐4道与"${extra}"相关的菜。只返回JSON数组，格式：${jsonFormat}`
  }
  if (type === '热门') {
    return `推荐4道热门家常菜，要不同菜系。只返回JSON数组：${jsonFormat}`
  }
  return `推荐4道${cat}，不同烹饪方式。只返回JSON数组：${jsonFormat}`
}

// ========== 公开 API ==========

/**
 * 获取热门推荐菜谱
 * 首次调 AI，之后读缓存
 * @param {boolean} forceRefresh 强制刷新
 */
async function getHotRecipes(forceRefresh) {
  const all = loadAll()
  if (!forceRefresh && all._hot && all._hot.length > 0) {
    return all._hot
  }

  const content = await callAI(buildPrompt('热门'))
  const recipes = formatRecipes(parseRecipes(content))
  if (recipes.length === 0) throw new Error('AI 未返回菜谱')

  all._hot = recipes
  // 同时加入总索引
  recipes.forEach(r => { all[r._id] = r })
  saveAll(all)
  return recipes
}

/**
 * 按分类获取菜谱
 */
async function getRecipesByCategory(category, forceRefresh) {
  const key = '_cat_' + category
  const all = loadAll()
  if (!forceRefresh && all[key] && all[key].length > 0) {
    return all[key]
  }

  const content = await callAI(buildPrompt(category))
  const recipes = formatRecipes(parseRecipes(content))
  if (recipes.length === 0) throw new Error('AI 未返回菜谱')

  all[key] = recipes
  recipes.forEach(r => { all[r._id] = r })
  saveAll(all)
  return recipes
}

/**
 * 搜索菜谱（本地优先，无结果时调 AI）
 */
async function searchRecipes(keyword) {
  if (!keyword) return []

  // 先在本地搜索
  const all = loadAll()
  const localResults = []
  for (const key in all) {
    if (key.startsWith('_')) continue
    const r = all[key]
    if (r.name && r.name.includes(keyword)) {
      localResults.push(r)
    }
  }
  if (localResults.length >= 3) return localResults

  // 本地不够，调 AI
  const content = await callAI(buildPrompt('search', keyword))
  const recipes = formatRecipes(parseRecipes(content))

  // 合并去重
  const seen = new Set(localResults.map(r => r.name))
  const merged = [...localResults]
  recipes.forEach(r => {
    if (!seen.has(r.name)) {
      merged.push(r)
      all[r._id] = r
    }
  })

  const searchKey = '_search_' + keyword
  all[searchKey] = merged
  saveAll(all)
  return merged
}

/**
 * 获取菜谱详情（从本地读取，没有则调 AI）
 */
async function getRecipeDetail(idOrName) {
  const all = loadAll()

  // 按 ID 查
  if (all[idOrName]) return all[idOrName]

  // 按名称查
  for (const key in all) {
    if (key.startsWith('_')) continue
    if (all[key].name === idOrName) return all[key]
  }

  // 都没有，调 AI 生成单道菜详情
  const prompt = `你是一位专业厨师。请详细描述"${idOrName}"这道菜的做法。

返回 JSON 格式：
{
  "name": "${idOrName}",
  "category": "中餐",
  "cookTime": 15,
  "calories": 300,
  "isDietFriendly": false,
  "tags": ["家常"],
  "difficulty": 1,
  "servings": 2,
  "ingredients": [{"name":"食材","amount":"用量"}],
  "steps": ["详细步骤1","详细步骤2","详细步骤3","详细步骤4","详细步骤5"],
  "nutritionInfo": {"protein":15,"fat":10,"carbs":20,"fiber":2}
}`

  const content = await callAI(prompt)
  const recipes = formatRecipes(parseRecipes(content))
  if (recipes.length === 0) throw new Error('AI 未返回菜谱')

  const recipe = recipes[0]
  all[recipe._id] = recipe
  saveAll(all)
  return recipe
}

/**
 * 获取减脂菜谱
 */
async function getDietRecipes(forceRefresh) {
  return getRecipesByCategory('减脂', forceRefresh)
}

/**
 * 预加载热门菜谱（后台静默执行，不阻塞 UI）
 * 在 app.js onLaunch 中调用
 */
function preloadHotRecipes() {
  const all = loadAll()
  if (all._hot && all._hot.length > 0) return // 已有缓存，跳过
  getHotRecipes().catch(() => {}) // 静默失败
}

module.exports = {
  getHotRecipes,
  getRecipesByCategory,
  searchRecipes,
  getRecipeDetail,
  getDietRecipes,
  preloadHotRecipes
}
