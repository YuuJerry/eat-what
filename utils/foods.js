// 预设食物数据
// 每条数据包含名称(name)、分类(category)、表情图标(emoji)
// 用于"今天吃什么"随机推荐功能的食物池
const DEFAULT_FOODS = [
  // ---------- 中餐（20 道）----------
  { name: '黄焖鸡米饭', category: '中餐', emoji: '🍗' },
  { name: '兰州拉面', category: '中餐', emoji: '🍜' },
  { name: '麻辣烫', category: '中餐', emoji: '🌶️' },
  { name: '沙县小吃', category: '中餐', emoji: '🥟' },
  { name: '重庆小面', category: '中餐', emoji: '🍜' },
  { name: '炒饭', category: '中餐', emoji: '🍚' },
  { name: '盖浇饭', category: '中餐', emoji: '🍱' },
  { name: '水饺', category: '中餐', emoji: '🥟' },
  { name: '火锅', category: '中餐', emoji: '🫕' },
  { name: '烧烤', category: '中餐', emoji: '🍢' },
  { name: '宫保鸡丁', category: '中餐', emoji: '🍗' },
  { name: '鱼香肉丝', category: '中餐', emoji: '🥩' },
  { name: '麻婆豆腐', category: '中餐', emoji: '🫕' },
  { name: '红烧肉', category: '中餐', emoji: '🥩' },
  { name: '糖醋排骨', category: '中餐', emoji: '🍖' },
  { name: '蛋炒饭', category: '中餐', emoji: '🍚' },
  { name: '煎饼果子', category: '中餐', emoji: '🥞' },
  { name: '螺蛳粉', category: '中餐', emoji: '🍜' },
  { name: '过桥米线', category: '中餐', emoji: '🍜' },
  { name: '酸菜鱼', category: '中餐', emoji: '🐟' },

  // ---------- 西餐（8 道）----------
  { name: '汉堡', category: '西餐', emoji: '🍔' },
  { name: '披萨', category: '西餐', emoji: '🍕' },
  { name: '意面', category: '西餐', emoji: '🍝' },
  { name: '牛排', category: '西餐', emoji: '🥩' },
  { name: '三明治', category: '西餐', emoji: '🥪' },
  { name: '沙拉', category: '西餐', emoji: '🥗' },
  { name: '炸鸡', category: '西餐', emoji: '🍗' },
  { name: '薯条', category: '西餐', emoji: '🍟' },

  // ---------- 日料（7 道）----------
  { name: '寿司', category: '日料', emoji: '🍣' },
  { name: '拉面', category: '日料', emoji: '🍜' },
  { name: '咖喱饭', category: '日料', emoji: '🍛' },
  { name: '天妇罗', category: '日料', emoji: '🍤' },
  { name: '鳗鱼饭', category: '日料', emoji: '🍱' },
  { name: '乌冬面', category: '日料', emoji: '🍜' },
  { name: '饭团', category: '日料', emoji: '🍙' },

  // ---------- 韩餐（6 道）----------
  { name: '韩式拌饭', category: '韩餐', emoji: '🍚' },
  { name: '烤肉', category: '韩餐', emoji: '🥩' },
  { name: '部队锅', category: '韩餐', emoji: '🫕' },
  { name: '炸鸡啤酒', category: '韩餐', emoji: '🍗' },
  { name: '冷面', category: '韩餐', emoji: '🍜' },
  { name: '泡菜汤', category: '韩餐', emoji: '🥘' },

  // ---------- 东南亚（5 道）----------
  { name: '冬阴功', category: '东南亚', emoji: '🍜' },
  { name: '菠萝炒饭', category: '东南亚', emoji: '🍍' },
  { name: '越南米粉', category: '东南亚', emoji: '🍜' },
  { name: '咖喱鸡', category: '东南亚', emoji: '🍛' },
  { name: '春卷', category: '东南亚', emoji: '🥟' },

  // ---------- 快餐（8 道）----------
  { name: '麻辣香锅', category: '快餐', emoji: '🫕' },
  { name: '烤肉饭', category: '快餐', emoji: '🍱' },
  { name: '鸡公煲', category: '快餐', emoji: '🍗' },
  { name: '酸辣粉', category: '快餐', emoji: '🍜' },
  { name: '肉夹馍', category: '快餐', emoji: '🥙' },
  { name: '凉皮', category: '快餐', emoji: '🥗' },
  { name: '炒面', category: '快餐', emoji: '🍜' },
  { name: '煲仔饭', category: '快餐', emoji: '🍲' }
]

// 可用的分类列表，用于页面筛选和分类展示
// "全部" 用于显示所有食物，"自定义" 用于用户自行添加的食物
const CATEGORIES = ['全部', '中餐', '西餐', '日料', '韩餐', '东南亚', '快餐', '自定义']

module.exports = {
  DEFAULT_FOODS, // 预设食物列表
  CATEGORIES     // 分类列表
}
