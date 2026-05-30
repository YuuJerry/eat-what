/**
 * 获取投票结果
 * 统计各选项得票数，计算获胜选项，并检测是否出现平票
 * 参数:
 *   roomId - 投票房间的文档 ID
 * 返回: { success, data }
 *   data 包含:
 *     room        - 房间完整信息
 *     tally       - 各选项得票数统计 { 选项: 票数 }
 *     winner      - 得票最高的选项名称
 *     winnerVotes - 获胜选项的票数
 *     isTie       - 是否平票（前两名票数相同）
 *     totalVotes  - 总投票人数
 */
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()

exports.main = async (event) => {
  const { roomId } = event

  try {
    // 获取投票房间完整数据
    const room = (await db.collection('voting_rooms').doc(roomId).get()).data

    // 初始化计票器：每个选项初始票数为0
    const tally = {}
    room.options.forEach(o => { tally[o] = 0 })

    // 遍历所有投票记录，累加各选项票数
    Object.values(room.voters).forEach(v => {
      if (tally[v] !== undefined) tally[v]++
    })

    // 按票数降序排列，得出排名
    const sorted = Object.entries(tally).sort((a, b) => b[1] - a[1])
    // 排名第一的选项即为获胜者
    const winner = sorted[0]
    // 平票检测：前两名票数相同则标记为平票
    const isTie = sorted.length > 1 && sorted[0][1] === sorted[1][1]

    return {
      success: true,
      data: {
        room,
        tally,
        winner: winner[0],                                  // 获胜选项名称
        winnerVotes: winner[1],                              // 获胜选项票数
        isTie,                                               // 是否平票
        totalVotes: Object.keys(room.voters).length          // 总投票人数
      }
    }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
