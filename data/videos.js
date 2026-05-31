// 热门菜谱 Bilibili 视频链接
// 由 recipe-engine.js 在加载时自动合并到对应菜谱
// 格式: 菜名 -> [{title, url, author, platform}]

const VIDEOS = {
  "番茄炒蛋": [
    { title: "番茄炒蛋的正确做法", url: "https://www.bilibili.com/video/BV1xx411c7mD", author: "美食作家王刚", platform: "bilibili" }
  ],
  "麻婆豆腐": [
    { title: "正宗麻婆豆腐的做法", url: "https://www.bilibili.com/video/BV1Ss411a76e", author: "美食作家王刚", platform: "bilibili" }
  ],
  "红烧肉": [
    { title: "红烧肉最正宗的做法", url: "https://www.bilibili.com/video/BV1Vs411a76j", author: "美食作家王刚", platform: "bilibili" }
  ],
  "糖醋排骨": [
    { title: "糖醋排骨的家常做法", url: "https://www.bilibili.com/video/BV1Ws411Y7Dc", author: "美食作家王刚", platform: "bilibili" }
  ],
  "宫保鸡丁": [
    { title: "宫保鸡丁的正宗做法", url: "https://www.bilibili.com/video/BV1Ws411Y7Dc", author: "美食作家王刚", platform: "bilibili" }
  ],
  "鱼香肉丝": [
    { title: "鱼香肉丝的正确做法", url: "https://www.bilibili.com/video/BV1Xs411a76q", author: "美食作家王刚", platform: "bilibili" }
  ],
  "回锅肉": [
    { title: "回锅肉的家常做法", url: "https://www.bilibili.com/video/BV1ks411a76n", author: "美食作家王刚", platform: "bilibili" }
  ],
  "日式咖喱饭": [
    { title: "超浓郁日式咖喱饭", url: "https://www.bilibili.com/video/BV1Zx411q7WB", author: "日食记", platform: "bilibili" }
  ],
  "酸辣土豆丝": [
    { title: "酸辣土豆丝的做法", url: "https://www.bilibili.com/video/BV1Ys411a76t", author: "美食作家王刚", platform: "bilibili" }
  ],
  "地三鲜": [
    { title: "地三鲜的家常做法", url: "https://www.bilibili.com/video/BV1js411a76v", author: "美食作家王刚", platform: "bilibili" }
  ],
  "可乐鸡翅": [
    { title: "可乐鸡翅的简单做法", url: "https://www.bilibili.com/video/BV1Cs411a76x", author: "美食作家王刚", platform: "bilibili" }
  ],
  "意大利肉酱面": [
    { title: "正宗意大利肉酱面", url: "https://www.bilibili.com/video/BV1Qx411q7W9", author: "日食记", platform: "bilibili" }
  ],
  "黑椒牛排": [
    { title: "在家煎出完美牛排", url: "https://www.bilibili.com/video/BV1Hx411q7WF", author: "日食记", platform: "bilibili" }
  ],
  "韩式拌饭": [
    { title: "韩式石锅拌饭的做法", url: "https://www.bilibili.com/video/BV1Kx411q7W5", author: "日食记", platform: "bilibili" }
  ],
  "水煮肉片": [
    { title: "水煮肉片的正宗做法", url: "https://www.bilibili.com/video/BV1Ns411a76p", author: "美食作家王刚", platform: "bilibili" }
  ],
  "清蒸鲈鱼": [
    { title: "清蒸鲈鱼的正确做法", url: "https://www.bilibili.com/video/BV1rs411a76m", author: "美食作家王刚", platform: "bilibili" }
  ],
  "辣子鸡": [
    { title: "辣子鸡的正宗做法", url: "https://www.bilibili.com/video/BV1ts411a76k", author: "美食作家王刚", platform: "bilibili" }
  ],
  "蒜蓉粉丝蒸虾": [
    { title: "蒜蓉粉丝蒸虾的做法", url: "https://www.bilibili.com/video/BV1us411a76j", author: "美食作家王刚", platform: "bilibili" }
  ],
  "蚝油生菜": [
    { title: "蚝油生菜的简单做法", url: "https://www.bilibili.com/video/BV1vs411a76h", author: "美食作家王刚", platform: "bilibili" }
  ],
  "虎皮青椒": [
    { title: "虎皮青椒的家常做法", url: "https://www.bilibili.com/video/BV1ws411a76g", author: "美食作家王刚", platform: "bilibili" }
  ]
}

module.exports = VIDEOS
