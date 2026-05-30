/**
 * 提交投票
 * 支持两种模式：
 *   1. 首次投票：检查人数上限后新增投票记录
 *   2. 重新投票：已投过票的用户可以更改自己的选择
 * 参数:
 *   roomId - 投票房间的文档 ID
 *   option - 用户选择的投票选项（必须是房间 options 中的一项）
 * 返回: { success, message }
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  // 获取当前投票用户的 openid
  const { OPENID } = cloud.getWXContext()
  const { roomId, option } = event

  // 参数校验：房间 ID 和投票选项不能为空
  if (!roomId || !option) {
    return { success: false, error: '参数不完整' }
  }

  try {
    // 获取投票房间信息
    const room = (await db.collection('voting_rooms').doc(roomId).get()).data

    // 校验房间状态：必须为 active（进行中）
    if (room.status !== 'active') {
      return { success: false, error: '投票已结束' }
    }

    // 校验选项有效性：投票选项必须在预设选项列表中
    if (!room.options.includes(option)) {
      return { success: false, error: '无效的选项' }
    }

    // 判断用户是否已投过票
    if (room.voters[OPENID]) {
      // 已投票：允许用户更改投票选择（更新操作）
      await db.collection('voting_rooms').doc(roomId).update({
        data: { [`voters.${OPENID}`]: option }
      })
      return { success: true, message: '已更新投票' }
    }

    // 首次投票：检查当前投票人数是否已达上限
    const voterCount = Object.keys(room.voters).length
    if (voterCount >= room.maxVoters) {
      return { success: false, error: '投票人数已满' }
    }

    // 提交新投票：以用户的 openid 为 key 记录其选择
    await db.collection('voting_rooms').doc(roomId).update({
      data: { [`voters.${OPENID}`]: option }
    })

    return { success: true, message: '投票成功' }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
