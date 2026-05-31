/**
 * AI 推荐菜谱云函数
 * 根据用户选择的食材，调用 DeepSeek API 动态生成菜谱推荐
 *
 * 参数:
 *   ingredients - 用户拥有的食材名称数组（如 ["鸡蛋","番茄"]）
 * 返回: { success, recipes } 每道菜包含 name, ingredients, steps, cookTime, calories, missing
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// DeepSeek API 配置
const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions'

// 从环境变量获取 API Key（在云开发控制台设置）
function getApiKey() {
  const key = process.env.DEEPSEEK_API_KEY
  if (!key) {
    throw new Error('未配置 DEEEPSEEK_API_KEY，请在云开发控制台设置环境变量')
  }
  return key
}

// 调用 DeepSeek API
async function callDeepSeek(ingredients) {
  const https = require('https')

  const prompt = `你是一位中餐厨师。用户冰箱里有以下食材：${ingredients.join('、')}

请根据这些食材推荐 3 道菜。规则：
1. 优先推荐能用现有食材直接做的菜
2. 也可以推荐只差 1-2 种常见调料/食材就能做的菜
3. 每道菜给出详细用料和步骤

请严格按以下 JSON 数组格式返回，不要输出任何其他内容：
[
  {
    "name": "菜名",
    "ingredients": [{"name":"食材名","amount":"用量"}],
    "steps": ["步骤1", "步骤2", "步骤3"],
    "cookTime": 10,
    "calories": 280,
    "category": "中餐",
    "missing": ["缺少的食材名"]
  }
]`

  const body = JSON.stringify({
    model: 'deepseek-chat',
    messages: [
      { role: 'system', content: '你是一位专业厨师，擅长根据冰箱食材推荐菜谱。只返回 JSON，不要多余文字。' },
      { role: 'user', content: prompt }
    ],
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: 'json_object' }
  })

  return new Promise((resolve, reject) => {
    const url = new URL(DEEPSEEK_API_URL)
    const options = {
      hostname: url.hostname,
      path: url.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getApiKey()}`,
        'Content-Length': Buffer.byteLength(body)
      },
      timeout: 30000
    }

    const req = https.request(options, (res) => {
      let data = ''
      res.on('data', chunk => { data += chunk })
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.error) {
            reject(new Error(json.error.message || 'API 调用失败'))
            return
          }
          const content = json.choices[0].message.content
          resolve(content)
        } catch (e) {
          reject(new Error('解析 API 响应失败: ' + e.message))
        }
      })
    })

    req.on('error', (e) => reject(new Error('网络请求失败: ' + e.message)))
    req.on('timeout', () => { req.destroy(); reject(new Error('请求超时')) })
    req.write(body)
    req.end()
  })
}

// 解析 AI 返回的 JSON，提取菜谱数组
function parseRecipes(content, userIngredients) {
  try {
    const parsed = JSON.parse(content)
    // 兼容两种格式：直接数组 或 { recipes: [...] }
    const recipes = Array.isArray(parsed) ? parsed : (parsed.recipes || parsed.data || [])
    return recipes.map(r => ({
      name: r.name || '未知菜名',
      ingredients: r.ingredients || [],
      steps: r.steps || [],
      cookTime: r.cookTime || 0,
      calories: r.calories || 0,
      category: r.category || '中餐',
      missing: r.missing || [],
      matchRate: Math.round(
        ((r.ingredients || []).length - (r.missing || []).length) /
        Math.max((r.ingredients || []).length, 1) * 100
      ),
      ownedCount: (r.ingredients || []).length - (r.missing || []).length,
      totalCount: (r.ingredients || []).length
    }))
  } catch (e) {
    console.error('解析 AI 返回失败:', content)
    return []
  }
}

exports.main = async (event) => {
  const { ingredients } = event

  if (!ingredients || ingredients.length === 0) {
    return { success: false, error: '请至少选择一种食材' }
  }

  try {
    const content = await callDeepSeek(ingredients)
    const recipes = parseRecipes(content, ingredients)

    if (recipes.length === 0) {
      return { success: false, error: 'AI 未返回有效菜谱，请重试' }
    }

    return { success: true, recipes, isAI: true }
  } catch (err) {
    console.error('AI 推荐失败:', err)
    return { success: false, error: err.message }
  }
}
