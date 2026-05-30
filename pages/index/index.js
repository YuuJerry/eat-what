// 引入预设食物数据和分类配置
const { DEFAULT_FOODS, CATEGORIES } = require('../../utils/foods.js')

// 自定义食物本地存储 key
const STORAGE_KEY = 'eat_what_custom_foods'

// 转盘扇区颜色数组（循环使用）
const WHEEL_COLORS = [
  '#FF6B6B', '#4ECDC4', '#FFE66D', '#95E1D3',
  '#F38181', '#AA96DA', '#FCBAD3', '#A8D8EA',
  '#FFB347', '#87CEEB', '#DDA0DD', '#98FB98'
]

// 转盘随机选餐页逻辑
Page({
  // 页面数据
  data: {
    // 抽选结果名称
    resultName: '',
    // 抽选结果 emoji 图标
    resultEmoji: '🍽️',
    // 抽选结果所属分类
    resultCategory: '',
    // 是否正在旋转/抽选中
    isSpinning: false,
    // 分类列表（从 foods.js 导入）
    categories: CATEGORIES,
    // 当前选中的分类
    activeCategory: '全部',
    // 当前分类下的食物列表（筛选后）
    filteredFoods: [],
    // 所有食物列表（预设 + 自定义）
    allFoods: [],
    // 用户自定义食物列表
    customFoods: [],
    // 是否显示添加食物弹窗
    showAdd: false,
    // 新食物输入框内容
    newFoodName: ''
  },

  // Canvas 实例引用
  canvas: null,
  // Canvas 2D 上下文
  ctx: null,
  // 转盘当前旋转角度（弧度）
  currentRotation: 0,
  // 转盘是否正在旋转（防重复点击）
  isWheelSpinning: false,

  // 页面加载时：读取自定义食物、合并食物列表、筛选当前分类
  onLoad() {
    this.loadCustomFoods()
    this.mergeFoods()
    this.filterFoods('全部')
  },

  // 页面初次渲染完成后：初始化 Canvas
  onReady() {
    this.initCanvas()
  },

  // 初始化 Canvas 2D 上下文，设置高分屏缩放
  initCanvas() {
    const query = wx.createSelectorQuery()
    query.select('#wheelCanvas').fields({ node: true, size: true }).exec((res) => {
      // Canvas 节点未就绪时，延迟重试
      if (!res || !res[0] || !res[0].node) {
        console.warn('Canvas not ready, will retry')
        setTimeout(() => this.initCanvas(), 200)
        return
      }
      const canvas = res[0].node
      const ctx = canvas.getContext('2d')
      // 根据设备像素比设置 Canvas 尺寸，保证高清显示
      const dpr = wx.getSystemInfoSync().pixelRatio
      canvas.width = 250 * dpr
      canvas.height = 250 * dpr
      ctx.scale(dpr, dpr)
      this.canvas = canvas
      this.ctx = ctx
      // 初始绘制转盘（无旋转）
      this.drawWheel(0)
    })
  },

  // 绘制转盘：根据当前食物列表和旋转角度绘制所有扇区及文字
  drawWheel(rotation) {
    const ctx = this.ctx
    if (!ctx) return

    const foods = this.getWheelFoods()
    const count = foods.length
    if (count === 0) return

    // 转盘中心坐标和半径
    const cx = 125, cy = 125, r = 120
    // 每个扇区的角度
    const sliceAngle = (2 * Math.PI) / count

    // 清空画布并应用旋转
    ctx.clearRect(0, 0, 250, 250)
    ctx.save()
    ctx.translate(cx, cy)
    ctx.rotate(rotation)

    // 绘制每个扇区和对应的食物名称
    for (let i = 0; i < count; i++) {
      const start = i * sliceAngle
      const end = start + sliceAngle

      // 绘制扇形区域
      ctx.beginPath()
      ctx.moveTo(0, 0)
      ctx.arc(0, 0, r, start, end)
      ctx.closePath()
      ctx.fillStyle = WHEEL_COLORS[i % WHEEL_COLORS.length]
      ctx.fill()
      ctx.strokeStyle = '#fff'
      ctx.lineWidth = 2
      ctx.stroke()

      // 在扇区中心绘制食物名称文字
      ctx.save()
      ctx.rotate(start + sliceAngle / 2)
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillStyle = '#fff'
      // 食物超过 12 个时缩小字号
      ctx.font = count > 12 ? 'bold 9px sans-serif' : 'bold 11px sans-serif'
      const text = foods[i].name
      // 名称超过 4 字时截断显示
      ctx.fillText(text.length > 4 ? text.slice(0, 4) + '..' : text, r * 0.65, 0)
      ctx.restore()
    }

    // 绘制中心装饰圆
    ctx.beginPath()
    ctx.arc(0, 0, 18, 0, 2 * Math.PI)
    ctx.fillStyle = '#fff'
    ctx.fill()
    ctx.strokeStyle = '#FF6B6B'
    ctx.lineWidth = 3
    ctx.stroke()

    ctx.restore()
  },

  // 获取当前分类下可用于转盘的食物列表
  getWheelFoods() {
    const { activeCategory, allFoods } = this.data
    if (activeCategory === '全部') return allFoods
    if (activeCategory === '自定义') return this.data.customFoods
    return allFoods.filter(f => f.category === activeCategory)
  },

  // 从本地存储加载用户自定义食物
  loadCustomFoods() {
    try {
      const custom = wx.getStorageSync(STORAGE_KEY)
      this.setData({ customFoods: custom || [] })
    } catch (e) {
      this.setData({ customFoods: [] })
    }
  },

  // 将当前自定义食物列表保存到本地存储
  saveCustomFoods() {
    wx.setStorageSync(STORAGE_KEY, this.data.customFoods)
  },

  // 合并预设食物与自定义食物，生成完整食物列表
  mergeFoods() {
    const custom = this.data.customFoods.map(f => ({ ...f, isCustom: true }))
    const all = [...DEFAULT_FOODS, ...custom]
    this.setData({ allFoods: all })
  },

  // 根据分类筛选食物列表
  filterFoods(category) {
    let filtered
    if (category === '全部') {
      filtered = this.data.allFoods
    } else if (category === '自定义') {
      filtered = this.data.customFoods.map(f => ({ ...f, isCustom: true }))
    } else {
      filtered = this.data.allFoods.filter(f => f.category === category)
    }
    this.setData({ filteredFoods: filtered })
  },

  // 分类标签点击事件：切换分类并重绘转盘
  onCategoryChange(e) {
    const cat = e.currentTarget.dataset.cat
    this.setData({ activeCategory: cat })
    this.filterFoods(cat)
    // 切换分类后重置转盘角度并重绘
    if (this.ctx) this.drawWheel(0)
  },

  // 随机推荐（老虎机轮播效果）：快速轮播食物名称后逐渐减速停在结果上
  onRandom() {
    if (this.data.isSpinning) return

    const foods = this.getWheelFoods()
    if (foods.length === 0) {
      wx.showToast({ title: '没有食物可选', icon: 'none' })
      return
    }

    this.setData({ isSpinning: true })

    // 随机轮播总步数（25-34 步）
    const totalSteps = 25 + Math.floor(Math.random() * 10)
    let step = 0
    // 随机决定最终结果索引
    const finalIndex = Math.floor(Math.random() * foods.length)

    // 每一步轮播动画
    const tick = () => {
      if (step >= totalSteps) {
        // 到达最终步数，显示结果并震动反馈
        const food = foods[finalIndex]
        this.setData({
          resultName: food.name,
          resultEmoji: food.emoji,
          resultCategory: food.category,
          isSpinning: false
        })
        wx.vibrateShort({ type: 'medium' })
        return
      }

      // 计算当前轮播显示的食物索引
      const idx = (finalIndex - totalSteps + step + foods.length * 100) % foods.length
      this.setData({
        resultName: foods[idx].name,
        resultEmoji: foods[idx].emoji,
        resultCategory: foods[idx].category
      })

      step++
      // 延迟时间随步数递增，实现减速效果
      const delay = 50 + Math.floor(step * step * 0.8)
      setTimeout(tick, Math.min(delay, 400))
    }

    tick()
  },

  // 转盘旋转动画：点击后转盘旋转多圈后停在随机扇区
  onSpinWheel() {
    if (this.isWheelSpinning || !this.ctx) return

    const foods = this.getWheelFoods()
    if (foods.length === 0) {
      wx.showToast({ title: '没有食物可选', icon: 'none' })
      return
    }

    this.isWheelSpinning = true
    this.setData({ isSpinning: true })

    const count = foods.length
    const sliceAngle = (2 * Math.PI) / count

    // 随机决定最终停在哪个扇区
    const targetIndex = Math.floor(Math.random() * count)
    // 计算目标扇区中心角度，使其停在指针（顶部）位置
    const targetAngle = targetIndex * sliceAngle + sliceAngle / 2
    const topAngle = 3 * Math.PI / 2
    // 额外旋转 5-7 圈增加视觉效果
    const extraRounds = 5 + Math.floor(Math.random() * 3)
    // 计算当前角度在 [0, 2π) 内的归一化值
    const currentMod = ((this.currentRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
    // 计算最终旋转角度
    const finalRotation = this.currentRotation + extraRounds * 2 * Math.PI + (topAngle - targetAngle) - currentMod

    const startRotation = this.currentRotation
    const totalRotation = finalRotation - startRotation
    // 动画总时长 4-5 秒
    const duration = 4000 + Math.random() * 1000
    const startTime = Date.now()

    // 动画帧回调：使用缓动函数实现先快后慢的效果
    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      // 三次方缓动：ease-out 效果
      const eased = 1 - Math.pow(1 - progress, 3)
      const currentRot = startRotation + totalRotation * eased

      this.drawWheel(currentRot)

      if (progress < 1) {
        // 动画未结束，请求下一帧
        this.canvas.requestAnimationFrame(animate)
      } else {
        // 动画结束，计算指针指向的扇区并显示结果
        this.currentRotation = finalRotation
        this.isWheelSpinning = false

        // 归一化旋转角度
        const normalizedRot = ((finalRotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI)
        // 计算指针在转盘坐标系中的角度
        const pointerAngle = ((3 * Math.PI / 2 - normalizedRot) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI)
        const resultIndex = Math.floor(pointerAngle / sliceAngle) % count

        const food = foods[resultIndex]
        this.setData({
          resultName: food.name,
          resultEmoji: food.emoji,
          resultCategory: food.category,
          isSpinning: false
        })
        // 重度震动反馈
        wx.vibrateShort({ type: 'heavy' })
      }
    }

    animate()
  },

  // 显示添加食物弹窗
  onShowAdd() {
    this.setData({ showAdd: true, newFoodName: '' })
  },

  // 隐藏添加食物弹窗
  onHideAdd() {
    this.setData({ showAdd: false, newFoodName: '' })
  },

  // 监听食物名称输入框变化
  onInputFood(e) {
    this.setData({ newFoodName: e.detail.value })
  },

  // 添加自定义食物：校验名称后添加到列表并持久化
  onAddFood() {
    const name = this.data.newFoodName.trim()
    if (!name) {
      wx.showToast({ title: '请输入食物名称', icon: 'none' })
      return
    }

    // 检查食物是否已存在（预设或自定义）
    const exists = this.data.allFoods.some(f => f.name === name)
    if (exists) {
      wx.showToast({ title: '这个食物已经存在了', icon: 'none' })
      return
    }

    // 创建新食物对象并追加到自定义列表
    const newFood = { name, category: '自定义', emoji: '🍽️' }
    const customFoods = [...this.data.customFoods, newFood]
    this.setData({ customFoods, showAdd: false, newFoodName: '' })
    this.saveCustomFoods()
    this.mergeFoods()
    this.filterFoods(this.data.activeCategory)

    wx.showToast({ title: '添加成功', icon: 'success' })
  },

  // 删除自定义食物：弹出确认框后删除
  onDeleteFood(e) {
    const name = e.currentTarget.dataset.name
    wx.showModal({
      title: '确认删除',
      content: `确定删除「${name}」吗？`,
      success: (res) => {
        if (res.confirm) {
          // 从自定义列表中移除该食物
          const customFoods = this.data.customFoods.filter(f => f.name !== name)
          this.setData({ customFoods })
          this.saveCustomFoods()
          this.mergeFoods()
          this.filterFoods(this.data.activeCategory)
          wx.showToast({ title: '已删除', icon: 'success' })
        }
      }
    })
  }
})
