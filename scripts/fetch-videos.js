// 批量获取菜谱视频链接 + 封面图
// 用法: node scripts/fetch-videos.js
// 从 Bilibili API 获取每个菜谱的最热门视频（含封面、BV号、播放量）

const https = require('https')
const fs = require('fs')
const path = require('path')

const RECIPES = require('../data/recipes.js')

function searchBilibili(keyword) {
  return new Promise((resolve, reject) => {
    const url = `https://api.bilibili.com/x/web-interface/search/type?search_type=video&keyword=${encodeURIComponent(keyword + ' 做法')}&order=click&page=1`
    const options = {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Referer': 'https://www.bilibili.com/',
        'Cookie': 'buvid3=placeholder'
      }
    }
    https.get(url, options, (res) => {
      let data = ''
      res.on('data', chunk => data += chunk)
      res.on('end', () => {
        try {
          const json = JSON.parse(data)
          if (json.code === 0 && json.data && json.data.result && json.data.result.length > 0) {
            const v = json.data.result[0]
            // pic 是 https: 开头的，需要补全
            let cover = v.pic || ''
            if (cover && !cover.startsWith('http')) {
              cover = 'https:' + cover
            }
            resolve({
              title: v.title.replace(/<[^>]*>/g, ''),
              url: `https://www.bilibili.com/video/${v.bvid}`,
              bvid: v.bvid,
              author: v.author,
              platform: 'bilibili',
              play: v.play,
              cover: cover,
              duration: v.duration || ''
            })
          } else {
            resolve(null)
          }
        } catch (e) {
          resolve(null)
        }
      })
    }).on('error', () => resolve(null))
  })
}

// 串行搜索，避免触发频率限制
async function main() {
  const videoMap = {}
  let found = 0

  for (let i = 0; i < RECIPES.length; i++) {
    const r = RECIPES[i]
    process.stdout.write(`[${i+1}/${RECIPES.length}] ${r.name}...`)

    const video = await searchBilibili(r.name)
    if (video) {
      videoMap[r.name] = [video]
      found++
      console.log(` ✅ ${video.play}播放 ${video.duration} 封面:${video.cover ? '有' : '无'}`)
    } else {
      console.log(` ❌ 未找到`)
    }

    // 延迟 600ms 避免频率限制
    await new Promise(r => setTimeout(r, 600))
  }

  // 输出结果
  const outFile = path.join(__dirname, '..', 'data', 'videos.js')
  const content = '// 热门菜谱视频链接（自动生成，含封面图）\n\nconst VIDEOS = ' +
    JSON.stringify(videoMap, null, 2) +
    '\n\nmodule.exports = VIDEOS\n'
  fs.writeFileSync(outFile, content)
  console.log(`\n完成! ${found}/${RECIPES.length} 道菜有视频`)
  console.log(`已写入: ${outFile}`)
}

main()
