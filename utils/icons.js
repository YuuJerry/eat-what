// 图标映射模块
// 提供食材、菜品、分类的手绘 SVG 图标路径

// 食材 → SVG 图标映射
const INGREDIENT_ICONS = {
  '番茄': '/images/icons/ingredient/tomato.png',
  '小番茄': '/images/icons/ingredient/tomato.png',
  '鸡蛋': '/images/icons/ingredient/egg.png',
  '黄瓜': '/images/icons/ingredient/cucumber.png',
  '土豆': '/images/icons/ingredient/potato.png',
  '胡萝卜': '/images/icons/ingredient/carrot.png',
  '洋葱': '/images/icons/ingredient/onion.png',
  '西兰花': '/images/icons/ingredient/broccoli.png',
  '菠菜': '/images/icons/ingredient/spinach.png',
  '生菜': '/images/icons/ingredient/spinach.png',
  '青椒': '/images/icons/ingredient/pepper.png',
  '猪肉': '/images/icons/ingredient/pork.png',
  '猪肉末': '/images/icons/ingredient/pork.png',
  '鸡胸肉': '/images/icons/ingredient/chicken.png',
  '鸡腿肉': '/images/icons/ingredient/chicken.png',
  '牛肉': '/images/icons/ingredient/beef.png',
  '羊肉': '/images/icons/ingredient/beef.png',
  '排骨': '/images/icons/ingredient/ribs.png',
  '虾仁': '/images/icons/ingredient/shrimp.png',
  '鱼': '/images/icons/ingredient/fish.png',
  '三文鱼': '/images/icons/ingredient/fish.png',
  '鱿鱼': '/images/icons/ingredient/shrimp.png',
  '豆腐': '/images/icons/ingredient/tofu.png',
  '嫩豆腐': '/images/icons/ingredient/tofu.png',
  '米饭': '/images/icons/ingredient/rice.png',
  '面条': '/images/icons/ingredient/noodles.png',
  '面粉': '/images/icons/ingredient/rice.png',
  '馒头': '/images/icons/ingredient/rice.png',
  '面包': '/images/icons/ingredient/rice.png',
  '蒜': '/images/icons/ingredient/garlic.png',
  '葱': '/images/icons/ingredient/greenonion.png',
  '姜': '/images/icons/ingredient/carrot.png',
  '大白菜': '/images/icons/ingredient/spinach.png',
  '芹菜': '/images/icons/ingredient/spinach.png',
  '黄豆芽': '/images/icons/ingredient/spinach.png',
}

// 分类 → 默认 SVG 图标
const CATEGORY_ICONS = {
  '蔬菜': '/images/icons/category/vegetable.png',
  '肉类': '/images/icons/category/meat.png',
  '海鲜': '/images/icons/category/seafood.png',
  '蛋奶': '/images/icons/category/egg-dairy.png',
  '主食': '/images/icons/category/staple.png',
  '调料': '/images/icons/category/seasoning.png',
}

// 分类关键词匹配（fallback 用）
const CATEGORY_KEYWORDS = {
  '蔬菜': ['菜', '椒', '葱', '蒜', '姜', '萝卜', '豆芽', '番茄', '黄瓜', '土豆', '洋葱', '菠菜', '生菜', '白菜', '芹菜', '西兰花', '胡萝卜'],
  '肉类': ['肉', '鸡', '牛', '猪', '羊', '排骨', '腿'],
  '海鲜': ['虾', '鱼', '鱿', '蟹', '贝', '海鲜'],
  '蛋奶': ['蛋', '奶', '豆腐', '牛奶'],
  '主食': ['饭', '面', '米', '粉', '馒头', '饼', '面包', '饺子'],
  '调料': ['盐', '糖', '醋', '酱', '酒', '油', '淀粉', '花椒', '辣椒', '胡椒'],
}

// 菜品 → SVG 图标映射
const DISH_ICONS = {
  '番茄炒蛋': '/images/icons/dish/tomato-egg.png',
  '番茄炒鸡蛋': '/images/icons/dish/tomato-egg.png',
  '麻婆豆腐': '/images/icons/dish/mapo-tofu.png',
  '凉拌黄瓜': '/images/icons/dish/cucumber-salad.png',
  '宫保鸡丁': '/images/icons/dish/kung-pao-chicken.png',
  '鸡胸肉沙拉': '/images/icons/dish/chicken-salad.png',
  '日式咖喱饭': '/images/icons/dish/curry-rice.png',
  '韩式拌饭': '/images/icons/dish/bibimbap.png',
  '虾仁西兰花': '/images/icons/dish/shrimp-broccoli.png',
}

// 菜品分类 → 默认图标
const DISH_CATEGORY_ICONS = {
  '中餐': '/images/icons/dish/tomato-egg.png',
  '西餐': '/images/icons/dish/chicken-salad.png',
  '日料': '/images/icons/dish/curry-rice.png',
  '韩餐': '/images/icons/dish/bibimbap.png',
}

/**
 * 获取食材图标路径
 * 优先精确匹配，其次模糊匹配分类关键词，兜底返回通用分类图标
 */
function getIngredientIcon(name) {
  if (INGREDIENT_ICONS[name]) return INGREDIENT_ICONS[name]
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(kw => name.includes(kw))) {
      return CATEGORY_ICONS[category]
    }
  }
  return '/images/icons/category/vegetable.png'
}

/**
 * 获取菜品图标路径
 */
function getDishIcon(name, category) {
  if (DISH_ICONS[name]) return DISH_ICONS[name]
  return DISH_CATEGORY_ICONS[category] || '/images/icons/dish/tomato-egg.png'
}

/**
 * 获取分类图标路径
 */
function getCategoryIcon(category) {
  return CATEGORY_ICONS[category] || '/images/icons/category/vegetable.png'
}

module.exports = {
  INGREDIENT_ICONS,
  CATEGORY_ICONS,
  DISH_ICONS,
  getIngredientIcon,
  getDishIcon,
  getCategoryIcon,
}
