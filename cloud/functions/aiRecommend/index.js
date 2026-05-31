/**
 * AI 推荐菜谱云函数
 * 调用 Anthropic 兼容 API 动态生成菜谱推荐
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

// API 配置
const API_URL = 'https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic/v1/messages'
const API_KEY = 'feacb83e1105a0b4978566511bc9a39b:MDAzNDI5N2RlNTBlNzY1NGIwNmY5ZTMz'
const MODEL_ID = 'astron-code-latest'

// 调用 AI API
async function callAI(ingredients) {
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
    model: MODEL_ID,
    max_tokens: 2000,
    messages: [
      { role: 'user', content: prompt }
    ]
  })

  return new Promise((resolve, reject) => {
    const url = new URL(API_URL)
    const options = {
      hostname: url.hostname,
      path: url.pathname + url.search,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY,
        'anthropic-version': '2023-06-01',
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
            reject(new Error(json.error.message || JSON.stringify(json.error)))
            return
          }
          // Anthropic 格式: { content: [{ type: "text", text: "..." }] }
          if (json.content && json.content.length > 0) {
            resolve(json.content[0].text)
            return
          }
          // OpenAI 兼容格式 fallback
          if (json.choices && json.choices[0]) {
            resolve(json.choices[0].message.content)
            return
          }
          reject(new Error('未知的 API 响应格式: ' + JSON.stringify(json).slice(0, 200)))
        } catch (e) {
          reject(new Error('解析 API 响应失败: ' + e.message + ' | raw: ' + data.slice(0, 200)))
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
function parseRecipes(content) {
  try {
    // 尝试从内容中提取 JSON 数组
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      const parsed = JSON.parse(content)
      const recipes = Array.isArray(parsed) ? parsed : (parsed.recipes || parsed.data || [])
      return formatRecipes(recipes)
    }
    const recipes = JSON.parse(jsonMatch[0])
    return formatRecipes(recipes)
  } catch (e) {
    console.error('解析 AI 返回失败:', content)
    return []
  }
}

function formatRecipes(recipes) {
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
}

exports.main = async (event) => {
  const { ingredients } = event

  if (!ingredients || ingredients.length === 0) {
    return { success: false, error: '请至少选择一种食材' }
  }

  try {
    const content = await callAI(ingredients)
    const recipes = parseRecipes(content)

    if (recipes.length === 0) {
      return { success: false, error: 'AI 未返回有效菜谱，请重试' }
    }

    return { success: true, recipes, isAI: true }
  } catch (err) {
    console.error('AI 推荐失败:', err)
    return { success: false, error: err.message }
  }
}
