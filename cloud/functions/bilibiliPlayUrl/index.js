// Bilibili 视频播放地址代理
// 避免小程序直接调 Bilibili API 的兼容性问题

const cloud = require('wx-server-sdk')
const https = require('https')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })

function httpGet(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://www.bilibili.com/'
      }
    }, res => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try { resolve(JSON.parse(data)) } catch(e) { reject(e) }
      })
    }).on('error', reject)
  })
}

exports.main = async (event) => {
  const { bvid } = event
  if (!bvid) return { success: false, error: '缺少 bvid' }

  try {
    // Step 1: 获取视频信息（cid）
    const viewRes = await httpGet(`https://api.bilibili.com/x/web-interface/view?bvid=${bvid}`)
    if (viewRes.code !== 0) {
      return { success: false, error: '获取视频信息失败: ' + (viewRes.message || '') }
    }
    const cid = viewRes.data.cid
    const title = viewRes.data.title
    const cover = viewRes.data.pic

    // Step 2: 获取播放地址
    const playRes = await httpGet(
      `https://api.bilibili.com/x/player/playurl?bvid=${bvid}&cid=${cid}&qn=32&fnval=0`
    )
    if (playRes.code !== 0 || !playRes.data?.durl?.length) {
      return { success: false, error: '获取播放地址失败: ' + (playRes.message || '') }
    }

    return {
      success: true,
      url: playRes.data.durl[0].url,
      title,
      cover
    }
  } catch (e) {
    return { success: false, error: e.message }
  }
}
