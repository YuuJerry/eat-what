/**
 * 创建投票房间
 * 生成一个6位随机房间码，其他用户可通过房间码加入投票
 * 参数:
 *   title      - 投票标题（如"今晚吃什么？"）
 *   options    - 投票选项数组（至少2个，如 ["火锅","烧烤","日料"]）
 *   maxVoters  - 最大投票人数上限（默认20人）
 * 返回: { success, roomId, roomCode }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

/**
 * 生成6位随机房间码
 * 字符集排除了容易混淆的字符（I、0、1、O、L），避免用户输入错误
 */
function generateRoomCode() {
  // 去除易混淆字符的字母数字组合
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
  let code = ''
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

exports.main = async (event, context) => {
  // 获取创建者的 openid
  const { OPENID } = cloud.getWXContext()
  // 解构投票参数
  const { title, options, maxVoters = 20 } = event

  // 参数校验：标题不能为空，选项至少需要2个
  if (!title || !options || options.length < 2) {
    return { success: false, error: '标题和至少2个选项不能为空' }
  }

  try {
    // 生成唯一房间码
    const roomCode = generateRoomCode()
    const now = new Date()

    // 在 voting_rooms 集合中创建投票房间记录
    const { _id } = await db.collection('voting_rooms').add({
      data: {
        roomCode,                                                   // 6位房间码，用于用户加入
        title,                                                      // 投票标题
        creatorId: OPENID,                                          // 创建者 openid
        options,                                                    // 投票选项列表
        voters: {},                                                 // 投票记录对象 { openid: option }
        status: 'active',                                           // 房间状态：active(进行中) / closed(已结束)
        maxVoters,                                                  // 最大投票人数
        createdAt: now,                                             // 创建时间
        expiresAt: new Date(now.getTime() + 24 * 60 * 60 * 1000)   // 过期时间：创建后24小时
      }
    })

    return { success: true, roomId: _id, roomCode }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
