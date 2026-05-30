// 数据库初始化脚本
// 在微信开发者工具的云开发控制台中运行此脚本来初始化数据库

const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

async function initDatabase() {
  console.log('开始初始化数据库...')

  // 创建集合
  const collections = [
    'recipes',          // 菜谱
    'ingredients',      // 食材库
    'voting_rooms',     // 投票房间
    'user_profiles',    // 用户偏好
    'video_tutorials'   // 视频教程
  ]

  for (const name of collections) {
    try {
      await db.createCollection(name)
      console.log(`✅ 集合 ${name} 创建成功`)
    } catch (e) {
      console.log(`ℹ️ 集合 ${name} 已存在`)
    }
  }

  // 导入预设菜谱数据
  const recipes = require('./database/recipes.json')
  for (const recipe of recipes) {
    try {
      await db.collection('recipes').add({
        data: {
          ...recipe,
          createdAt: new Date()
        }
      })
      console.log(`✅ 菜谱 "${recipe.name}" 导入成功`)
    } catch (e) {
      console.error(`❌ 菜谱 "${recipe.name}" 导入失败:`, e.message)
    }
  }

  // 导入食材数据
  const ingredients = require('./database/ingredients.json')
  for (const ingredient of ingredients) {
    try {
      await db.collection('ingredients').add({ data: ingredient })
      console.log(`✅ 食材 "${ingredient.name}" 导入成功`)
    } catch (e) {
      console.error(`❌ 食材 "${ingredient.name}" 导入失败:`, e.message)
    }
  }

  console.log('🎉 数据库初始化完成！')
}

// 导出供云函数调用
exports.main = initDatabase

// 直接运行
if (require.main === module) {
  initDatabase().catch(console.error)
}
