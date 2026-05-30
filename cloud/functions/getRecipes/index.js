/**
 * 获取菜谱列表（支持多条件筛选、关键词搜索、排序和分页）
 * 参数:
 *   category  - 菜谱分类（如"川菜"、"粤菜"等，"全部"不过滤）
 *   tags      - 标签数组（如["辣","快手菜"]），匹配其中任意一个
 *   isDiet    - 是否只返回减脂友好菜谱
 *   keyword   - 模糊搜索菜名（不区分大小写）
 *   sort      - 排序方式: newest(最新) | quickest(最快手) | lowest-cal(最低卡) | 默认按点赞数
 *   page      - 页码（默认第1页）
 *   pageSize  - 每页数量（默认20条）
 * 返回: { success, data, total, page, pageSize, hasMore }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event) => {
  // 解构请求参数，page 和 pageSize 设有默认值
  const { category, tags, isDiet, keyword, sort, page = 1, pageSize = 20 } = event

  // 动态构建数据库查询条件
  let query = {}

  // 分类筛选：指定了具体分类且不是"全部"时，按分类过滤
  if (category && category !== '全部') {
    query.category = category
  }

  // 标签筛选：使用 _.in 匹配包含任意指定标签的菜谱
  if (tags && tags.length > 0) {
    query.tags = _.in(tags)
  }

  // 减脂筛选：只返回标记为减脂友好的菜谱
  if (isDiet) {
    query.isDietFriendly = true
  }

  // 关键词搜索：使用正则表达式对菜名进行不区分大小写的模糊匹配
  if (keyword) {
    query.name = db.RegExp({ regexp: keyword, options: 'i' })
  }

  // 根据 sort 参数决定排序字段，默认按点赞数降序
  let orderBy = 'likes'
  let order = 'desc'
  switch (sort) {
    case 'newest': orderBy = 'createdAt'; break    // 按创建时间排序
    case 'quickest': orderBy = 'cookTime'; break   // 按烹饪时间排序（快手菜优先）
    case 'lowest-cal': orderBy = 'calories'; break // 按热量排序（低卡优先）
    default: orderBy = 'likes'                     // 默认按点赞数降序
  }

  try {
    // 分页查询菜谱列表
    const { data } = await db.collection('recipes')
      .where(query)
      .orderBy(orderBy, order)
      .skip((page - 1) * pageSize)  // 跳过前面页的数据
      .limit(pageSize)              // 限制返回数量
      .get()

    // 查询符合条件的总数，用于前端分页
    const { total } = await db.collection('recipes').where(query).count()

    return {
      success: true,
      data,
      total,
      page,
      pageSize,
      hasMore: page * pageSize < total  // 判断是否还有更多数据
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
