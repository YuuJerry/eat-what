// 引入云函数 API 模块
const { recipeApi } = require('../../utils/cloud.js')

// 菜谱分类列表
const CATEGORIES = ['全部', '中餐', '西餐', '日料', '韩餐', '减脂']
// 排序方式列表
const SORTS = [
  { key: 'popular', label: '最热门' },
  { key: 'quickest', label: '最快手' },
  { key: 'lowest-cal', label: '最低卡' },
  { key: 'newest', label: '最新' }
]

Page({
  data: {
    categories: CATEGORIES,        // 分类列表
    activeCategory: '全部',        // 当前选中的分类
    sorts: SORTS,                  // 排序方式列表
    activeSort: 'popular',         // 当前选中的排序方式
    keyword: '',                   // 搜索关键词
    recipes: [],                   // 菜谱列表数据
    isLoading: false,              // 是否正在加载
    hasMore: true,                 // 是否还有更多数据可加载
    page: 1                        // 当前页码（分页用）
  },

  // 页面加载时请求菜谱列表
  onLoad() {
    this.loadRecipes()
  },

  // 下拉刷新：重置页码并重新加载
  onPullDownRefresh() {
    this.setData({ page: 1 })
    this.loadRecipes().then(() => wx.stopPullDownRefresh())
  },

  // 触底加载更多：有更多数据且不在加载中时触发
  onReachBottom() {
    if (this.data.hasMore && !this.data.isLoading) {
      this.loadMore()
    }
  },

  // 加载菜谱列表（核心请求方法）
  async loadRecipes() {
    this.setData({ isLoading: true })
    try {
      const { activeCategory, activeSort, keyword, page } = this.data
      const res = await recipeApi.getList({
        category: activeCategory === '全部' ? '' : activeCategory,  // "全部"时不传分类参数
        isDiet: activeCategory === '减脂',                            // 选中"减脂"时标记为减脂餐
        sort: activeSort,
        keyword,
        page
      })
      if (res.success) {
        this.setData({
          // 第一页直接替换，后续页追加到已有列表
          recipes: page === 1 ? res.data : [...this.data.recipes, ...res.data],
          hasMore: res.hasMore
        })
      }
    } catch (e) {
      console.error('加载菜谱失败', e)
    }
    this.setData({ isLoading: false })
  },

  // 加载更多：页码加一后重新请求
  async loadMore() {
    await this.setData({ page: this.data.page + 1 })
    this.loadRecipes()
  },

  // 切换分类：重置列表和页码，重新加载
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ activeCategory: cat, page: 1, recipes: [] })
    this.loadRecipes()
  },

  // 切换排序方式：重置列表和页码，重新加载
  onSortChange(e) {
    const sort = e.currentTarget.dataset.sort
    this.setData({ activeSort: sort, page: 1, recipes: [] })
    this.loadRecipes()
  },

  // 搜索框输入事件：实时更新关键词
  onSearchInput(e) {
    this.setData({ keyword: e.detail.value })
  },

  // 执行搜索：重置列表并加载
  onSearch() {
    this.setData({ page: 1, recipes: [] })
    this.loadRecipes()
  },

  // 点击菜谱卡片：跳转到菜谱详情页
  onRecipeTap(e) {
    const id = e.currentTarget.dataset.id
    wx.navigateTo({ url: `/pages/recipe/detail?id=${id}` })
  }
})
