// 引入图标映射
const { getIngredientIcon, getCategoryIcon, getDishIcon } = require('../../utils/icons.js')

// AI API 配置
const AI_CONFIG = {
  url: 'https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic/v1/messages',
  key: 'feacb83e1105a0b4978566511bc9a39b:MDAzNDI5N2RlNTBlNzY1NGIwNmY5ZTMz',
  model: 'astron-code-latest'
}

// 调用 AI API（直接 wx.request，不走云函数）
function callAI(ingredients) {
  return new Promise((resolve, reject) => {
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
        max_tokens: 2000,
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
        // Anthropic 格式
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

// 解析 AI 返回
function parseRecipes(content) {
  try {
    const jsonMatch = content.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      const parsed = JSON.parse(content)
      const recipes = Array.isArray(parsed) ? parsed : (parsed.recipes || [])
      return formatRecipes(recipes)
    }
    return formatRecipes(JSON.parse(jsonMatch[0]))
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

// 食材分类列表
const INGREDIENT_CATEGORIES = ['蔬菜', '肉类', '海鲜', '蛋奶', '主食', '调料']

// 预设食材数据
const DEFAULT_INGREDIENTS = {
  '蔬菜': ['番茄', '黄瓜', '土豆', '胡萝卜', '洋葱', '西兰花', '菠菜', '生菜', '青椒', '大白菜', '芹菜', '小番茄', '黄豆芽'],
  '肉类': ['猪肉', '猪肉末', '鸡胸肉', '鸡腿肉', '牛肉', '羊肉', '排骨'],
  '海鲜': ['虾仁', '鱼', '三文鱼', '鱿鱼'],
  '蛋奶': ['鸡蛋', '牛奶', '豆腐', '嫩豆腐'],
  '主食': ['米饭', '面条', '面粉', '馒头', '面包'],
  '调料': ['盐', '糖', '醋', '生抽', '老抽', '料酒', '豆瓣酱', '蒜', '葱', '姜', '淀粉', '花椒', '干辣椒', '辣椒油', '香油', '橄榄油', '黑胡椒', '花生米', '韩式辣酱', '咖喱块']
}

// 本地存储 key
const STORAGE_KEY = 'eat_what_fridge_selected'

// 防抖定时器
let searchTimer = null

Page({
  data: {
    categories: INGREDIENT_CATEGORIES,
    activeCategory: '蔬菜',
    ingredients: DEFAULT_INGREDIENTS['蔬菜'].map(name => ({ name, icon: getIngredientIcon(name) })),
    selectedIngredients: [],
    results: [],
    isSearching: false,
    hasSearched: false,
    keyword: '',
    // 购物清单弹窗
    showShoppingList: false,
    shoppingList: '',
    // 展开的菜谱步骤索引
    expandedSteps: -1
  },

  onLoad() {
    this.loadSavedSelection()
  },

  onShow() {
    this.loadSavedSelection()
  },

  // 从本地存储加载已保存的选中食材
  loadSavedSelection() {
    try {
      const saved = wx.getStorageSync(STORAGE_KEY)
      if (saved && saved.length > 0) {
        this.setData({ selectedIngredients: saved })
      }
    } catch (e) {
      // ignore
    }
  },

  // 保存选中食材到本地存储
  saveSelection() {
    wx.setStorageSync(STORAGE_KEY, this.data.selectedIngredients)
  },

  // 切换食材分类
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({
      activeCategory: cat,
      ingredients: DEFAULT_INGREDIENTS[cat].map(name => ({ name, icon: getIngredientIcon(name) })),
      keyword: ''
    })
  },

  // 切换食材选中状态
  onToggleIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients
    const idx = selected.indexOf(name)
    if (idx > -1) {
      this.setData({ selectedIngredients: selected.filter(n => n !== name) })
    } else {
      this.setData({ selectedIngredients: [...selected, name] })
    }
    this.saveSelection()
  },

  // 移除已选中的某个食材
  onRemoveIngredient(e) {
    const name = e.currentTarget.dataset.name
    const selected = this.data.selectedIngredients.filter(n => n !== name)
    this.setData({ selectedIngredients: selected })
    this.saveSelection()
  },

  // 清空所有已选食材和搜索结果
  onClearAll() {
    this.setData({ selectedIngredients: [], results: [], hasSearched: false, expandedSteps: -1 })
    wx.removeStorageSync(STORAGE_KEY)
  },

  // 搜索框输入事件
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  // 按关键词搜索食材
  onSearchIngredient() {
    const { keyword } = this.data
    if (!keyword) return
    const allNames = Object.values(DEFAULT_INGREDIENTS).flat()
    const filtered = allNames.filter(n => n.includes(keyword))
    if (filtered.length > 0) {
      this.setData({
        ingredients: filtered.map(name => ({ name, icon: getIngredientIcon(name) })),
        activeCategory: ''
      })
    }
  },

  // AI 推荐菜谱（直接调用 AI API，不走云函数）
  async onSearchRecipes() {
    if (this.data.selectedIngredients.length === 0) {
      wx.showToast({ title: '请先选择食材', icon: 'none' })
      return
    }
    if (this.data.isSearching) return

    this.setData({ isSearching: true, expandedSteps: -1 })
    try {
      const content = await callAI(this.data.selectedIngredients)
      const recipes = parseRecipes(content)
      if (recipes.length > 0) {
        const results = recipes.map(r => ({
          ...r,
          coverIcon: getDishIcon(r.name, r.category),
          stepsExpanded: false
        }))
        this.setData({ results, hasSearched: true })
      } else {
        wx.showToast({ title: 'AI 未返回结果，请重试', icon: 'none' })
      }
    } catch (e) {
      console.error('AI 推荐失败', e)
      wx.showToast({ title: '推荐失败: ' + e.message, icon: 'none' })
    }
    this.setData({ isSearching: false })
  },

  // 展开/收起菜谱步骤
  onToggleSteps(e) {
    const idx = e.currentTarget.dataset.index
    if (this.data.expandedSteps === idx) {
      this.setData({ expandedSteps: -1 })
    } else {
      this.setData({ expandedSteps: idx })
    }
  },

  // 显示购物清单弹窗
  onShowShoppingList() {
    const { results } = this.data
    const withMissing = results.filter(r => r.missing && r.missing.length > 0)
    if (withMissing.length === 0) {
      wx.showToast({ title: '所有食材都有，不用买啦', icon: 'success' })
      return
    }

    let listText = '📝 购物清单\n\n'
    withMissing.forEach(r => {
      listText += `🍽 ${r.name}\n`
      listText += `· 还差：${r.missing.join('、')}\n\n`
    })

    this.setData({ showShoppingList: true, shoppingList: listText })
  },

  // 复制购物清单
  onCopyShoppingList() {
    wx.setClipboardData({
      data: this.data.shoppingList,
      success: () => {
        wx.showToast({ title: '已复制到剪贴板', icon: 'success' })
        this.setData({ showShoppingList: false })
      }
    })
  },

  // 关闭购物清单弹窗
  onHideShoppingList() {
    this.setData({ showShoppingList: false })
  }
})
