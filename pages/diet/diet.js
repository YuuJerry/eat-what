// 菜谱推荐引擎（静态数据 + 规则推荐）
const recipeEngine = require('../../utils/recipe-engine.js')
// 图标映射
const { getDishIcon } = require('../../utils/icons.js')

const BLOGGERS = [
  { name: '美食作家王刚', platform: 'bilibili', desc: '专业厨师，硬核教学', avatar: '👨‍🍳' },
  { name: '日食记', platform: 'bilibili', desc: '治愈系美食，画面精美', avatar: '🎬' },
  { name: '小高姐的魔法调料', platform: 'bilibili', desc: '科学做饭，详细讲解', avatar: '👩‍🍳' },
  { name: '减脂餐小课堂', platform: 'douyin', desc: '专注减脂餐，简单实用', avatar: '💪' }
]

Page({
  data: {
    recipes: [],
    bloggers: BLOGGERS,
    isLoading: false
  },

  onLoad() {
    this.loadDietRecipes()
  },

  onPullDownRefresh() {
    this.loadDietRecipes(true).then(() => wx.stopPullDownRefresh())
  },

  async loadDietRecipes(forceRefresh) {
    this.setData({ isLoading: true })
    try {
      const recipes = await recipeEngine.getDietRecipes(forceRefresh)
      const list = recipes.map(r => ({
        ...r,
        coverIcon: getDishIcon(r.name, r.category)
      }))
      this.setData({ recipes: list })
    } catch (e) {
      console.error('加载减脂餐失败', e)
      wx.showToast({ title: '加载失败，请下拉刷新', icon: 'none' })
    }
    this.setData({ isLoading: false })
  },

  onRecipeTap(e) {
    const idx = e.currentTarget.dataset.index
    const recipe = this.data.recipes[idx]
    if (recipe) {
      wx.navigateTo({
        url: `/pages/recipe/detail?id=${encodeURIComponent(recipe.name)}`,
        success: (res) => {
          res.eventChannel.emit('recipeData', recipe)
        }
      })
    }
  },

  onBloggerTap(e) {
    const blogger = e.currentTarget.dataset.blogger
    wx.showToast({ title: `关注${blogger.name}`, icon: 'none' })
  }
})
