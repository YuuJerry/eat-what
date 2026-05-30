/**
 * 通过房间码加入投票房间
 * 用户输入6位房间码后，查询对应的活跃投票房间并返回房间信息
 * 参数:
 *   roomCode - 6位房间码（不区分大小写）
 * 返回: { success, data } data 为投票房间完整信息
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  const { roomCode } = event

  // 参数校验：房间码不能为空
  if (!roomCode) {
    return { success: false, error: '请输入房间码' }
  }

  try {
    // 查询房间：房间码转大写匹配，且状态为 active（进行中）
    const { data } = await db.collection('voting_rooms')
      .where({ roomCode: roomCode.toUpperCase(), status: 'active' })
      .get()

    // 未找到对应活跃房间
    if (data.length === 0) {
      return { success: false, error: '房间不存在或已结束' }
    }

    const room = data[0]

    // 检查房间是否已过期（超过创建后24小时）
    if (new Date() > new Date(room.expiresAt)) {
      // 过期则自动关闭房间状态
      await db.collection('voting_rooms').doc(room._id).update({
        data: { status: 'closed' }
      })
      return { success: false, error: '投票已过期' }
    }

    // 返回房间信息，供前端展示投票界面
    return { success: true, data: room }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
