// 热门菜谱视频链接（自动生成，含封面图）

const VIDEOS = {
  "番茄炒蛋": [
    {
      "title": "生活化减脂餐 云朵番茄炒蛋超详细做法来啦",
      "url": "https://www.bilibili.com/video/BV178AMz1EaN",
      "bvid": "BV178AMz1EaN",
      "author": "火焰魔法师gogo",
      "platform": "bilibili",
      "play": 6769351,
      "cover": "https://i2.hdslb.com/bfs/archive/e9628f989486d15e08fa3b88c97dbccab663d886.jpg",
      "duration": "1:54"
    }
  ],
  "麻婆豆腐": [
    {
      "title": "厨师长教你：“麻婆豆腐”的正宗做法，吃的停不下来",
      "url": "https://www.bilibili.com/video/BV1Rs411V7i9",
      "bvid": "BV1Rs411V7i9",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 3559429,
      "cover": "https://i1.hdslb.com/bfs/archive/1812511d8bdb3204182263ef617af5d9a8a40b59.jpg",
      "duration": "4:46"
    }
  ],
  "凉拌黄瓜": [
    {
      "title": "清脆爽口的酱腌黄瓜！这个配方太绝了！超级简单，超下饭！",
      "url": "https://www.bilibili.com/video/BV1cM4y1U7ie",
      "bvid": "BV1cM4y1U7ie",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 381604,
      "cover": "https://i2.hdslb.com/bfs/archive/b4fdd24364eeacec5657afeae1dd185832b9d978.jpg",
      "duration": "1:15"
    }
  ],
  "宫保鸡丁": [
    {
      "title": "厨师长教你：“宫保鸡丁”的川味正宗做法，一看就有食欲，收藏了",
      "url": "https://www.bilibili.com/video/BV1Xt411Z7z8",
      "bvid": "BV1Xt411Z7z8",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 2190996,
      "cover": "https://i1.hdslb.com/bfs/archive/f73fa9230498822c7a6cebe7f09ac63ae3322006.jpg",
      "duration": "3:42"
    }
  ],
  "红烧肉": [
    {
      "title": "厨师长教你：“红烧肉”的家常做法，肉香四溢肥而不腻",
      "url": "https://www.bilibili.com/video/BV1Us411H7Nw",
      "bvid": "BV1Us411H7Nw",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 6002560,
      "cover": "https://i1.hdslb.com/bfs/archive/d592288a8bc3d60821684f21b9b04e3b4023f160.jpg",
      "duration": "4:8"
    }
  ],
  "糖醋排骨": [
    {
      "title": "厨师长教你：“糖醋排骨”的传统做法，简单易学赶紧收藏",
      "url": "https://www.bilibili.com/video/BV1Ws41157vT",
      "bvid": "BV1Ws41157vT",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 2971425,
      "cover": "https://i0.hdslb.com/bfs/archive/af86d77b898a190b3de0ca9684e9b8417bd20078.jpg",
      "duration": "3:58"
    }
  ],
  "鱼香肉丝": [
    {
      "title": "厨师长教你：“鱼香肉丝”的老式做法，味道很赞，先收藏了",
      "url": "https://www.bilibili.com/video/BV1Gs411A7Vo",
      "bvid": "BV1Gs411A7Vo",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 2410323,
      "cover": "https://i2.hdslb.com/bfs/archive/8ea1c733f45e4405729e47bed80c1d26f5d50f15.jpg",
      "duration": "4:22"
    }
  ],
  "蒜蓉西兰花": [
    {
      "title": "【小高姐】蒜蓉西兰花",
      "url": "https://www.bilibili.com/video/BV1fy4y1W7z5",
      "bvid": "BV1fy4y1W7z5",
      "author": "小高姐的魔法调料",
      "platform": "bilibili",
      "play": 1390362,
      "cover": "https://i1.hdslb.com/bfs/archive/25c44dfaad65067bda6ab779ffa2a7fd9c5cf438.jpg",
      "duration": "3:22"
    }
  ],
  "土豆炖牛肉": [
    {
      "title": "土豆炖牛肉的家常做法，牛肉软烂、土豆入味，太下饭了",
      "url": "https://www.bilibili.com/video/BV17M41137WC",
      "bvid": "BV17M41137WC",
      "author": "小酥肉的菜",
      "platform": "bilibili",
      "play": 527778,
      "cover": "https://i2.hdslb.com/bfs/archive/d628b5f6ee6a9628eed239519611cecacf88e865.jpg",
      "duration": "1:12"
    }
  ],
  "清炒时蔬": [
    {
      "title": "妈妈做的家常晚餐！又是吃撑扶墙的一天！今日菜单:  干蒸牛肉+鲫鱼豆腐丝瓜汤+糖醋菠萝排骨+脆皮炸鸡翅+咸菜炒鱿鱼+清炒时蔬",
      "url": "https://www.bilibili.com/video/BV1c9etzSEQH",
      "bvid": "BV1c9etzSEQH",
      "author": "喉结儿",
      "platform": "bilibili",
      "play": 151149,
      "cover": "https://i1.hdslb.com/bfs/archive/0c652c137cf85432b5d90a6a83de0d828c76bcd2.jpg",
      "duration": "2:4"
    }
  ],
  "回锅肉": [
    {
      "title": "厨师长教你：“回锅肉”的正宗做法，赶快收藏了",
      "url": "https://www.bilibili.com/video/BV1HW411c7Q2",
      "bvid": "BV1HW411c7Q2",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 4385097,
      "cover": "https://i0.hdslb.com/bfs/archive/531948071a0d476a886aff6fc6e6345859ee91a7.jpg",
      "duration": "4:11"
    }
  ],
  "西红柿牛腩": [
    {
      "title": "看状元哥做年夜饭第7道菜，西红柿牛腩家常做法，调味原来有比例",
      "url": "https://www.bilibili.com/video/BV1Qy4y1H7cN",
      "bvid": "BV1Qy4y1H7cN",
      "author": "美食状元哥",
      "platform": "bilibili",
      "play": 139073,
      "cover": "https://i0.hdslb.com/bfs/archive/71a63bf6c955daf318a8bd6cae8cfb7a4981f282.jpg",
      "duration": "5:27"
    }
  ],
  "干煸四季豆": [
    {
      "title": "厨师长教你：“干煸四季豆”的正宗做法，先收藏了",
      "url": "https://www.bilibili.com/video/BV1nW411A7SY",
      "bvid": "BV1nW411A7SY",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 737684,
      "cover": "https://i1.hdslb.com/bfs/archive/3e16042005f0329f8b37e08e5e13ae342a3a24e1.jpg",
      "duration": "2:48"
    }
  ],
  "酸辣土豆丝": [
    {
      "title": "夏天饭桌上最抢手的土豆做法：炝拌土豆丝，清脆爽口，简单又好吃",
      "url": "https://www.bilibili.com/video/BV1bQ4y197E4",
      "bvid": "BV1bQ4y197E4",
      "author": "随手做美食",
      "platform": "bilibili",
      "play": 890591,
      "cover": "https://i0.hdslb.com/bfs/archive/0716666c5460d17113d46efa9f2a44c8b03a0573.jpg",
      "duration": "1:18"
    }
  ],
  "虾仁西兰花": [
    {
      "title": "怪不得饭店的西蓝花炒虾仁好吃，大厨教你一招，脆嫩爽口又美味",
      "url": "https://www.bilibili.com/video/BV1ed9qYBEwQ",
      "bvid": "BV1ed9qYBEwQ",
      "author": "天天相见厨房阿鹏",
      "platform": "bilibili",
      "play": 67185,
      "cover": "https://i2.hdslb.com/bfs/archive/1887e6a1ebb708beaf5ed3074538e7280c5b6275.jpg",
      "duration": "8:7"
    }
  ],
  "可乐鸡翅": [
    {
      "title": "可乐鸡翅！！好吃到都要啃骨头了，看一遍就能学会，超简单做法",
      "url": "https://www.bilibili.com/video/BV1pJ411v7S9",
      "bvid": "BV1pJ411v7S9",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 7172685,
      "cover": "https://i2.hdslb.com/bfs/archive/70b8144b13882e621a605d3efeff6e7a91504f1a.jpg",
      "duration": "2:15"
    }
  ],
  "蚝油生菜": [
    {
      "title": "厨师长教你：“蚝油生菜”的家常做法，爽脆鲜嫩，简单易做",
      "url": "https://www.bilibili.com/video/BV1bS4y1r7jR",
      "bvid": "BV1bS4y1r7jR",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 2748342,
      "cover": "https://i2.hdslb.com/bfs/archive/4399a69c640afd3a0948e7cfd518c7cb49575b20.jpg",
      "duration": "2:27"
    }
  ],
  "木须肉": [
    {
      "title": "厨师长教你：“木须肉”的家常做法，营养丰富很适合老人孩子",
      "url": "https://www.bilibili.com/video/BV1kE411i7r1",
      "bvid": "BV1kE411i7r1",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 1716922,
      "cover": "https://i2.hdslb.com/bfs/archive/7c8d57af88c37b5e131f95014d344faaec007945.jpg",
      "duration": "5:1"
    }
  ],
  "地三鲜": [
    {
      "title": "地三鲜｜有谁不爱东北菜嘛？炒鸡下饭的简单家庭版做法！",
      "url": "https://www.bilibili.com/video/BV1CR4y1p7QR",
      "bvid": "BV1CR4y1p7QR",
      "author": "面包片少女吖-",
      "platform": "bilibili",
      "play": 985041,
      "cover": "https://i2.hdslb.com/bfs/archive/0b54208311c18f83f5053c6166be3587005d821c.jpg",
      "duration": "0:30"
    }
  ],
  "红烧排骨": [
    {
      "title": "客人预定红烧牛排骨，满满一大盘子得卖多少钱啊？大厨只用这一招，软嫩多汁儿还有味儿。",
      "url": "https://www.bilibili.com/video/BV1fq4y1Q71k",
      "bvid": "BV1fq4y1Q71k",
      "author": "大嘴儿美食挠儿哥",
      "platform": "bilibili",
      "play": 1945406,
      "cover": "https://i2.hdslb.com/bfs/archive/03a704d19c055a564852a9a3fc0df78d4073f95a.jpg",
      "duration": "2:42"
    }
  ],
  "清蒸鲈鱼": [
    {
      "title": "清蒸鲈鱼很多人不知道是先浇油还是先淋汁，以后您试试我这个做法，肉质鲜嫩美味，全家人都爱吃！",
      "url": "https://www.bilibili.com/video/BV1iu4y1N7kv",
      "bvid": "BV1iu4y1N7kv",
      "author": "路先生美食集",
      "platform": "bilibili",
      "play": 3769510,
      "cover": "https://i0.hdslb.com/bfs/archive/74ce70490d9a13a508e691ae72467e9b990e1a06.jpg",
      "duration": "0:49"
    }
  ],
  "水煮肉片": [
    {
      "title": "厨师长教你：“水煮肉片”的正宗做法，这味道真的很四川，先收藏了",
      "url": "https://www.bilibili.com/video/BV1ys411u7Z4",
      "bvid": "BV1ys411u7Z4",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 4772513,
      "cover": "https://i1.hdslb.com/bfs/archive/b5f19555582257030527841eeffcb982dd926af8.jpg",
      "duration": "5:21"
    }
  ],
  "蒜蓉粉丝蒸虾": [
    {
      "title": "请饼叔吃海鲜大咖的天花板，鲜到极致，一口入魂",
      "url": "https://www.bilibili.com/video/BV17L411j7jQ",
      "bvid": "BV17L411j7jQ",
      "author": "小文哥吃吃吃",
      "platform": "bilibili",
      "play": 1688032,
      "cover": "https://i1.hdslb.com/bfs/archive/8f817aaed7c24e4e8556e0d0b5861b91b63523e2.jpg",
      "duration": "13:14"
    }
  ],
  "辣子鸡": [
    {
      "title": "厨师长教你：鲁菜“枣庄辣子鸡”的家常做法，汁香味浓，鲜辣过瘾",
      "url": "https://www.bilibili.com/video/BV1rv411L7KJ",
      "bvid": "BV1rv411L7KJ",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 2414321,
      "cover": "https://i2.hdslb.com/bfs/archive/8a468ccba7b0865db68594f81d776ae12c9ec655.jpg",
      "duration": "5:53"
    }
  ],
  "冬瓜排骨汤": [
    {
      "title": "排骨炖冬瓜不要乱放调料，教你这个正确做法，汤鲜肉烂，不腥不柴",
      "url": "https://www.bilibili.com/video/BV1Km4y177uQ",
      "bvid": "BV1Km4y177uQ",
      "author": "老东北美食",
      "platform": "bilibili",
      "play": 216411,
      "cover": "https://i1.hdslb.com/bfs/archive/0fadb1de8d074a772405505590905ccad56e8be5.jpg",
      "duration": "8:29"
    }
  ],
  "虎皮青椒": [
    {
      "title": "厨师长教你：“虎皮青椒”的家常做法，不放油柴火慢煎，很开胃",
      "url": "https://www.bilibili.com/video/BV1x441127Hk",
      "bvid": "BV1x441127Hk",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 1395907,
      "cover": "https://i0.hdslb.com/bfs/archive/063b97358454e88c151f30619f529f41585ac31e.jpg",
      "duration": "3:35"
    }
  ],
  "青椒肉丝": [
    {
      "title": "我做的“青椒肉丝”很好吃！步骤清晰详细、做法易学接地气",
      "url": "https://www.bilibili.com/video/BV1xS4y167Qe",
      "bvid": "BV1xS4y167Qe",
      "author": "美食强",
      "platform": "bilibili",
      "play": 2627501,
      "cover": "https://i1.hdslb.com/bfs/archive/25048ce03005b80b42bfafb51afd959065b7387d.jpg",
      "duration": "2:24"
    }
  ],
  "鸡胸肉沙拉": [
    {
      "title": "真正风味多汁的鸡胸做法",
      "url": "https://www.bilibili.com/video/BV1HG41157sE",
      "bvid": "BV1HG41157sE",
      "author": "internet-boy",
      "platform": "bilibili",
      "play": 121706,
      "cover": "https://i0.hdslb.com/bfs/archive/72e5c00bfdbfc3274d03d388fbfe4a60ced9d987.jpg",
      "duration": "0:53"
    }
  ],
  "意大利肉酱面": [
    {
      "title": "【小高姐】番茄肉酱意面 肉酱包裹住的每一根面条都在呼唤你",
      "url": "https://www.bilibili.com/video/BV1rb411K7fx",
      "bvid": "BV1rb411K7fx",
      "author": "小高姐的魔法调料",
      "platform": "bilibili",
      "play": 2491845,
      "cover": "https://i0.hdslb.com/bfs/archive/fe151422bddf2b1bc20569fb4ec25d75759ba350.jpg",
      "duration": "3:31"
    }
  ],
  "黑椒牛排": [
    {
      "title": "【黑椒牛仔骨】家常做法又不失餐厅味道",
      "url": "https://www.bilibili.com/video/BV18o4y1k76V",
      "bvid": "BV18o4y1k76V",
      "author": "冯小厨的菜谱",
      "platform": "bilibili",
      "play": 188161,
      "cover": "https://i0.hdslb.com/bfs/archive/ca8b3ef9c0fbe6793be34f1daf7547f0427f3a4b.jpg",
      "duration": "6:52"
    }
  ],
  "奶油蘑菇汤": [
    {
      "title": "中式炒锅做法餐！奶香浓郁，绵密顺滑，从此告别西餐厅~丨奶油蘑菇汤",
      "url": "https://www.bilibili.com/video/BV19q4y1x7i2",
      "bvid": "BV19q4y1x7i2",
      "author": "老饭骨",
      "platform": "bilibili",
      "play": 1058568,
      "cover": "https://i0.hdslb.com/bfs/archive/e461c4f0188c68bfbbeb29ed4ce3602c4e0b4789.jpg",
      "duration": "7:56"
    }
  ],
  "凯撒沙拉": [
    {
      "title": "凯撒沙拉的做法丨绵羊料理",
      "url": "https://www.bilibili.com/video/BV1Ds411k79G",
      "bvid": "BV1Ds411k79G",
      "author": "绵羊料理",
      "platform": "bilibili",
      "play": 153938,
      "cover": "https://i1.hdslb.com/bfs/archive/62bfc1fb28f486fdec31ca00a4def6c4bbed6354.jpg",
      "duration": "3:14"
    }
  ],
  "番茄浓汤": [
    {
      "title": "这个做法的汤底真的超浓郁！无敌简单好吃的番茄浓汤肥牛面～",
      "url": "https://www.bilibili.com/video/BV1z7411o7VR",
      "bvid": "BV1z7411o7VR",
      "author": "张喜喜-",
      "platform": "bilibili",
      "play": 571717,
      "cover": "https://i2.hdslb.com/bfs/archive/03a3c590e6c91fad8bbc9f68447b72fb9515c477.jpg",
      "duration": "12:21"
    }
  ],
  "培根蛋酱意面": [
    {
      "title": "SERGEY谢尔盖】牛肉+意面，经典重现！｜新品香味浓郁的培根蛋酱意面想尝尝吗？搭配超厚实牛肉三明治，享受口腔被牛肉填满的快感！｜烹饪过程 &amp; 咀嚼音助眠",
      "url": "https://www.bilibili.com/video/BV1Eg411N71W",
      "bvid": "BV1Eg411N71W",
      "author": "SERGEY谢尔盖",
      "platform": "bilibili",
      "play": 719445,
      "cover": "https://i2.hdslb.com/bfs/archive/7945e4507eea24bb63fd23e1ffc9c3cad4176d9d.jpg",
      "duration": "13:16"
    }
  ],
  "希腊沙拉": [
    {
      "title": "一道很适合夏天的沙拉，原配方加了橄榄油，个人觉得不加更清爽，恰巴塔切开就是完美的披萨底儿和三明治底儿，快复刻起来吧~ #希腊沙拉 #恰巴塔 #美食日记",
      "url": "https://www.bilibili.com/video/BV1Vg4y1P7Rs",
      "bvid": "BV1Vg4y1P7Rs",
      "author": "王开花_",
      "platform": "bilibili",
      "play": 241192,
      "cover": "https://i1.hdslb.com/bfs/archive/d68ffd969a59e9f038ee0db9e26a8fc580785a6b.jpg",
      "duration": "1:13"
    }
  ],
  "奶油培根意面": [
    {
      "title": "浪漫的家庭料理｜关于5种意面的做法：培根蛋酱意面，罗勒蒜虾意面，奶油鸡菇意面，番茄肉球意面，鲑鱼白酱意面",
      "url": "https://www.bilibili.com/video/BV1BS4y1V7Wk",
      "bvid": "BV1BS4y1V7Wk",
      "author": "V老板-模拟经营",
      "platform": "bilibili",
      "play": 62848,
      "cover": "https://i0.hdslb.com/bfs/archive/82ccd976767e5ecbec6c1269c2d5a36830228c8e.jpg",
      "duration": "14:43"
    }
  ],
  "烤鸡腿": [
    {
      "title": "【小高姐】油焖鸡",
      "url": "https://www.bilibili.com/video/BV1PSMvzLEtn",
      "bvid": "BV1PSMvzLEtn",
      "author": "小高姐的魔法调料",
      "platform": "bilibili",
      "play": 600265,
      "cover": "https://i0.hdslb.com/bfs/archive/f81f98a65d8d771eaabb6c5ef276867bb8d089d0.jpg",
      "duration": "5:6"
    }
  ],
  "法式洋葱汤": [
    {
      "title": "芝士控最满足的拉丝感来袭！浓郁飘香的欧洲家常菜法式洋葱汤做法......",
      "url": "https://www.bilibili.com/video/BV1v4411d7AG",
      "bvid": "BV1v4411d7AG",
      "author": "奥地利的小胡",
      "platform": "bilibili",
      "play": 106649,
      "cover": "https://i2.hdslb.com/bfs/archive/71ba63fb015a91165bcef0f3825ac5449a7b3aa4.jpg",
      "duration": "6:19"
    }
  ],
  "玛格丽特披萨": [
    {
      "title": "这个披萨的做法简直就是好吃到起飞，而且做法非常简单，适合不会揉面不会发面的宝，可以换任何喜欢的 口味",
      "url": "https://www.bilibili.com/video/BV1ve4y1S7Fp",
      "bvid": "BV1ve4y1S7Fp",
      "author": "王开花_",
      "platform": "bilibili",
      "play": 58711,
      "cover": "https://i2.hdslb.com/bfs/archive/23873740793a386b1748f6f7eddd55d25e7abb12.jpg",
      "duration": "0:24"
    }
  ],
  "蒜香黄油虾": [
    {
      "title": "爽口弹牙的蒜香黄油虾做法，蒜香浓郁鲜香入味，好吃又下饭",
      "url": "https://www.bilibili.com/video/BV1vr421T7rc",
      "bvid": "BV1vr421T7rc",
      "author": "美食一线陈仔",
      "platform": "bilibili",
      "play": 79112,
      "cover": "https://i2.hdslb.com/bfs/archive/2f8081f5c24bc1679af281fd936a66619dcc5705.jpg",
      "duration": "2:49"
    }
  ],
  "罗宋汤": [
    {
      "title": "上海妈妈教你“罗宋汤”的家常做法，汤汁浓郁，酸甜开胃！",
      "url": "https://www.bilibili.com/video/BV14t411P7Vo",
      "bvid": "BV14t411P7Vo",
      "author": "上海妈妈私房菜",
      "platform": "bilibili",
      "play": 345400,
      "cover": "https://i2.hdslb.com/bfs/archive/ddaa93a6cf6a1157cac987196450c4dccd17a6dc.jpg",
      "duration": "2:14"
    }
  ],
  "日式咖喱饭": [
    {
      "title": "咖喱鸡肉饭，做法简单，看着非常诱人，妈妈再也不用担心我饿着了",
      "url": "https://www.bilibili.com/video/BV1mt411Q71y",
      "bvid": "BV1mt411Q71y",
      "author": "小浩美食记",
      "platform": "bilibili",
      "play": 125857,
      "cover": "https://i1.hdslb.com/bfs/archive/e5d241a46e083c891825fffc91967680a0b6e262.jpg",
      "duration": "3:41"
    }
  ],
  "寿司卷": [
    {
      "title": "手把手教您做寿司，教程详细，做法易懂，想吃寿司再也不用外面买",
      "url": "https://www.bilibili.com/video/BV1Bt4y117JB",
      "bvid": "BV1Bt4y117JB",
      "author": "石头美食号",
      "platform": "bilibili",
      "play": 193948,
      "cover": "https://i0.hdslb.com/bfs/archive/0ab9eeb4d7f872df340dc120344f425035fb4435.jpg",
      "duration": "2:28"
    }
  ],
  "味噌汤": [
    {
      "title": "🎌日本人每天都要喝的味噌汤",
      "url": "https://www.bilibili.com/video/BV1WbNszMEyH",
      "bvid": "BV1WbNszMEyH",
      "author": "张森的下班料理",
      "platform": "bilibili",
      "play": 652513,
      "cover": "https://i2.hdslb.com/bfs/archive/f8812682c30e179f4931e2f0cc979c19440e9551.jpg",
      "duration": "3:28"
    }
  ],
  "照烧鸡腿": [
    {
      "title": "厨师长老吃家认证，简简单单照烧鸡腿饭做法，偷吃同款菜单",
      "url": "https://www.bilibili.com/video/BV1NnzNBQE1F",
      "bvid": "BV1NnzNBQE1F",
      "author": "张森的下班料理",
      "platform": "bilibili",
      "play": 1788892,
      "cover": "https://i1.hdslb.com/bfs/archive/de9bdce13346f9834c8fe7d28c5d291ce6c6e592.jpg",
      "duration": "13:4"
    }
  ],
  "亲子丼": [
    {
      "title": "鸡肉鸡蛋盖饭为何成为日本国民美食？东京排名第一亲子丼 主厨庖丁解鸡！",
      "url": "https://www.bilibili.com/video/BV1Pq4y1C76J",
      "bvid": "BV1Pq4y1C76J",
      "author": "顶级日料",
      "platform": "bilibili",
      "play": 68083,
      "cover": "https://i0.hdslb.com/bfs/archive/5b4399e3b9bbb9e31271b3ab4b07bcbdff6a83cc.jpg",
      "duration": "6:46"
    }
  ],
  "日式炸猪排": [
    {
      "title": "详解日本米其林星级炸猪排！日式炸猪排好吃不是吹的！真的不一样",
      "url": "https://www.bilibili.com/video/BV16S4y1q7xq",
      "bvid": "BV16S4y1q7xq",
      "author": "顶级日料",
      "platform": "bilibili",
      "play": 100060,
      "cover": "https://i1.hdslb.com/bfs/archive/29f504510b3c93e2ce46e8db2dacf81934acd294.jpg",
      "duration": "7:26"
    }
  ],
  "冷荞麦面": [
    {
      "title": "连续一周只吃荞麦面会发生什么？",
      "url": "https://www.bilibili.com/video/BV1pD421p7S7",
      "bvid": "BV1pD421p7S7",
      "author": "敖小丙1688",
      "platform": "bilibili",
      "play": 3391459,
      "cover": "https://i1.hdslb.com/bfs/archive/4d558c1ccea33294732e42be54463d93b48303c4.jpg",
      "duration": "1:40"
    }
  ],
  "茶碗蒸": [
    {
      "title": "【这就是和食】日式茶碗蒸蛋｜最丝滑的配方 其中的重点记下来了吗？",
      "url": "https://www.bilibili.com/video/BV1Ph4y1v7ar",
      "bvid": "BV1Ph4y1v7ar",
      "author": "GOHAN_御饭",
      "platform": "bilibili",
      "play": 28684,
      "cover": "https://i0.hdslb.com/bfs/archive/cb884a20e96012e4be7ea35c7d688a3cafbc1c48.jpg",
      "duration": "1:14"
    }
  ],
  "天妇罗": [
    {
      "title": "试吃一条非常凶猛的裸胸鳝，一煎一炸，帅小伙吃完都想舔锅底",
      "url": "https://www.bilibili.com/video/BV15R4y147Ux",
      "bvid": "BV15R4y147Ux",
      "author": "小文哥吃吃吃",
      "platform": "bilibili",
      "play": 1458404,
      "cover": "https://i2.hdslb.com/bfs/archive/e1039da3c2e9de1aaf38d8316a5bc3190a8c4846.jpg",
      "duration": "10:41"
    }
  ],
  "烤秋刀鱼": [
    {
      "title": "买虾就买这种，吃鱼就吃这类；不用复杂调料，鱼虾都不需要过于复杂简简单单烤出海鱼本味，肉质紧实越吃越香#秋刀鱼 #盐焗虾#快手菜 #咖喱鱼蛋 #家常海鲜做法",
      "url": "https://www.bilibili.com/video/BV1tQLt6KERq",
      "bvid": "BV1tQLt6KERq",
      "author": "是厚皮橙",
      "platform": "bilibili",
      "play": 32478,
      "cover": "https://i2.hdslb.com/bfs/archive/5c2be2d85145e46cbd273688796e77d0c8f5d58d.jpg",
      "duration": "2:34"
    }
  ],
  "韩式拌饭": [
    {
      "title": "【一人食vlog15】零失败的韩式拌饭，做法真的太简单了",
      "url": "https://www.bilibili.com/video/BV1f741157KA",
      "bvid": "BV1f741157KA",
      "author": "豆豆子chic",
      "platform": "bilibili",
      "play": 1073451,
      "cover": "https://i2.hdslb.com/bfs/archive/4e124c1346cb5d0e6e4e1ef38f915fef42b9267d.jpg",
      "duration": "3:13"
    }
  ],
  "韩式泡菜炒饭": [
    {
      "title": "私藏韩式泡菜拌饭，0失败做法真的太简单了",
      "url": "https://www.bilibili.com/video/BV1CE411N7M6",
      "bvid": "BV1CE411N7M6",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 186332,
      "cover": "https://i1.hdslb.com/bfs/archive/e5800aaa73818b79933bb2ec53a1ca93da25dc3a.jpg",
      "duration": "2:55"
    }
  ],
  "部队锅": [
    {
      "title": "一周美食VLOG | 腊八节咸味腊八粥  | 地锅鸡 | 麻辣腌萝卜的做法 | 鱼香排骨 | 韩式部队锅 | 第一次直播",
      "url": "https://www.bilibili.com/video/BV1wv411s7cv",
      "bvid": "BV1wv411s7cv",
      "author": "雨琪在芬兰",
      "platform": "bilibili",
      "play": 227861,
      "cover": "https://i2.hdslb.com/bfs/archive/83ef164e97a40837f4f76bb34f0778436c1d25fb.jpg",
      "duration": "24:50"
    }
  ],
  "韩式炸鸡": [
    {
      "title": "目前全网没有的做法！但是真的很好吃！自制辣奶油炸鸡",
      "url": "https://www.bilibili.com/video/BV1fxkuYNE3P",
      "bvid": "BV1fxkuYNE3P",
      "author": "阿晨吃饱了",
      "platform": "bilibili",
      "play": 704376,
      "cover": "https://i2.hdslb.com/bfs/archive/659ab835b9914f832e4ca8e0ddbc6fd8a2ae816a.jpg",
      "duration": "1:1"
    }
  ],
  "石锅豆腐": [
    {
      "title": "用20年的老石锅，放入嫩豆腐，浇上特制的酱料，周围倒入鸡蛋液包围着，做出来的豆腐又嫩又好吃，一份不够吃 &quot;餐饮美食 &quot;",
      "url": "https://www.bilibili.com/video/BV1Rt4y1j7jb",
      "bvid": "BV1Rt4y1j7jb",
      "author": "暮馆晴",
      "platform": "bilibili",
      "play": 1053460,
      "cover": "https://i2.hdslb.com/bfs/archive/e757f7c129ac002fa2215d39eee0ab5ffc1834f5.jpg",
      "duration": "0:15"
    }
  ],
  "辣炒年糕": [
    {
      "title": "【韩国人教你炒年糕】做法很简单，但是超好吃！姜食堂2同款辣炒年糕，韩式炒年糕",
      "url": "https://www.bilibili.com/video/BV164411R77G",
      "bvid": "BV164411R77G",
      "author": "西里Cecile",
      "platform": "bilibili",
      "play": 1538541,
      "cover": "https://i0.hdslb.com/bfs/archive/7ebcdefc296061e5c2ccfb83b43006a694a124bc.jpg",
      "duration": "2:41"
    }
  ],
  "参鸡汤": [
    {
      "title": "秋瓷炫厨房秘密武器！十全大补参鸡汤做法大揭秘！",
      "url": "https://www.bilibili.com/video/BV19bEkzMEKs",
      "bvid": "BV19bEkzMEKs",
      "author": "池晨橙",
      "platform": "bilibili",
      "play": 169477,
      "cover": "https://i0.hdslb.com/bfs/archive/3331d45c8f20389206e32d42bd2883229d21d1ea.jpg",
      "duration": "2:35"
    }
  ],
  "韩式烤肉": [
    {
      "title": "一人份超简单烤肉拌饭做法，五花肉还是烤的最好吃啊！",
      "url": "https://www.bilibili.com/video/BV1Lt411X7ee",
      "bvid": "BV1Lt411X7ee",
      "author": "小夏哒独炊札记",
      "platform": "bilibili",
      "play": 226624,
      "cover": "https://i2.hdslb.com/bfs/archive/721b07f1be72e0db1cf2f1e30b07386b3f58cf9c.png",
      "duration": "4:12"
    }
  ],
  "水煮鸡胸肉": [
    {
      "title": "鸡胸肉最嫩最解馋的做法！椒麻水煮鸡胸肉搭配榨菜肉丝面～",
      "url": "https://www.bilibili.com/video/BV1US4y1Q74D",
      "bvid": "BV1US4y1Q74D",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 2079311,
      "cover": "https://i0.hdslb.com/bfs/archive/46ca9c2547b4942d2af26b87c96230682fa0bd24.jpg",
      "duration": "4:22"
    }
  ],
  "蒸蛋": [
    {
      "title": "鸡蛋最好吃的做法！瘦肉饼蒸蛋！嫩滑多汁特别有营养！",
      "url": "https://www.bilibili.com/video/BV1rrfPYqEan",
      "bvid": "BV1rrfPYqEan",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 3875719,
      "cover": "https://i2.hdslb.com/bfs/archive/e849425e992a30958c15cfef38dc5fc6f52c98cc.jpg",
      "duration": "1:37"
    }
  ],
  "凉拌鸡丝": [
    {
      "title": "【凉拌菜技法系列③】芥末鸡丝，内含焖芥末做法。",
      "url": "https://www.bilibili.com/video/BV19h4y117em",
      "bvid": "BV19h4y117em",
      "author": "鲁菜行者",
      "platform": "bilibili",
      "play": 187176,
      "cover": "https://i0.hdslb.com/bfs/archive/311d157fe9a1de4375c6e485c082491ce3abf84a.jpg",
      "duration": "6:49"
    }
  ],
  "西兰花炒虾仁": [
    {
      "title": "怪不得饭店的西蓝花炒虾仁好吃，大厨教你一招，脆嫩爽口又美味",
      "url": "https://www.bilibili.com/video/BV1ed9qYBEwQ",
      "bvid": "BV1ed9qYBEwQ",
      "author": "天天相见厨房阿鹏",
      "platform": "bilibili",
      "play": 67185,
      "cover": "https://i2.hdslb.com/bfs/archive/1887e6a1ebb708beaf5ed3074538e7280c5b6275.jpg",
      "duration": "8:7"
    }
  ],
  "燕麦粥": [
    {
      "title": "懒人营养早餐：牛奶燕麦粥奶香浓浓做法简单",
      "url": "https://www.bilibili.com/video/BV1Gp4y1Y7Hp",
      "bvid": "BV1Gp4y1Y7Hp",
      "author": "涵钰广东家常菜",
      "platform": "bilibili",
      "play": 52641,
      "cover": "https://i0.hdslb.com/bfs/archive/dfb9baab9ab82c9b4d233f07c93841b8835710cc.jpg",
      "duration": "0:30"
    }
  ],
  "蔬菜沙拉": [
    {
      "title": "适合中国宝宝体质的蔬菜沙拉",
      "url": "https://www.bilibili.com/video/BV1pt421N7ec",
      "bvid": "BV1pt421N7ec",
      "author": "唐尼是个der",
      "platform": "bilibili",
      "play": 1968813,
      "cover": "https://i1.hdslb.com/bfs/archive/f9fc328c51ad9b3cf002dd5c4ad524bf87cf3d98.jpg",
      "duration": "0:56"
    }
  ],
  "豆腐蔬菜汤": [
    {
      "title": "【蜡笔小新】晚餐是培根肉卷蔬菜沙拉还有豆腐汤蘸上酱料一口一个哦",
      "url": "https://www.bilibili.com/video/BV1BqaUzPEMk",
      "bvid": "BV1BqaUzPEMk",
      "author": "蜡笔小新干饭",
      "platform": "bilibili",
      "play": 439474,
      "cover": "https://i1.hdslb.com/bfs/archive/9c7e884604b7d5040b852954ab528cc731c55913.jpg",
      "duration": "26:0"
    }
  ],
  "全麦三明治": [
    {
      "title": "【无糖全麦三明治】低油低脂高蛋白，做法简单，食材家常！",
      "url": "https://www.bilibili.com/video/BV1YD4y197V6",
      "bvid": "BV1YD4y197V6",
      "author": "美食达人计划",
      "platform": "bilibili",
      "play": 1935,
      "cover": "https://i0.hdslb.com/bfs/archive/680520a3c34b38ec8135f7546c3fe56ea8e09e60.jpg",
      "duration": "4:27"
    }
  ],
  "金枪鱼饭团": [
    {
      "title": "简单又营养的金枪鱼饭团！孩子一口一个！妈妈们赶紧给孩子试试！",
      "url": "https://www.bilibili.com/video/BV1z8411f7xE",
      "bvid": "BV1z8411f7xE",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 29379,
      "cover": "https://i2.hdslb.com/bfs/archive/1a5b8904065890a0cd8c49152da8817b573696d4.jpg",
      "duration": "0:36"
    }
  ],
  "烤红薯": [
    {
      "title": "秋冬吃红薯，教你红薯糕，不用烤，不用炸，软软糯糯，嚼着太香了",
      "url": "https://www.bilibili.com/video/BV1Wz4y1P7TH",
      "bvid": "BV1Wz4y1P7TH",
      "author": "麦苗厨房",
      "platform": "bilibili",
      "play": 1759368,
      "cover": "https://i2.hdslb.com/bfs/archive/4b814f025ad7fa10935e88ffee6def2d90db8b1c.jpg",
      "duration": "3:30"
    }
  ],
  "鸡胸肉蔬菜卷": [
    {
      "title": "【鸡肉蔬菜卷】煎鸡胸吃腻了？来试试这个做法，颜值高肉还不柴！",
      "url": "https://www.bilibili.com/video/BV1s4411w7bZ",
      "bvid": "BV1s4411w7bZ",
      "author": "高兴Pampas",
      "platform": "bilibili",
      "play": 252525,
      "cover": "https://i2.hdslb.com/bfs/archive/0bff8e29afbf8433c9a14135e582817a939086d0.jpg",
      "duration": "2:24"
    }
  ],
  "番茄鸡蛋汤": [
    {
      "title": "自制家庭版鸡蛋灌饼！做法简单一次就成功，秒杀路边摊搭配番茄蛋花汤",
      "url": "https://www.bilibili.com/video/BV17y4y1q7vA",
      "bvid": "BV17y4y1q7vA",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 219041,
      "cover": "https://i2.hdslb.com/bfs/archive/a54f4042968aef855ebecddf18088c65c941ceb5.jpg",
      "duration": "3:39"
    }
  ],
  "白灼虾": [
    {
      "title": "大错特错的白灼虾做法",
      "url": "https://www.bilibili.com/video/BV1MP411y7o2",
      "bvid": "BV1MP411y7o2",
      "author": "记录小生活的蛋黄派",
      "platform": "bilibili",
      "play": 4374014,
      "cover": "https://i1.hdslb.com/bfs/archive/3d9668ba6e8bb403991adeba1fa206a97356de0b.jpg",
      "duration": "1:24"
    }
  ],
  "秋葵拌豆腐": [
    {
      "title": "一人食｜吃得干净真的会瘦！🥣照烧芦笋牛肉卷！秋葵拌豆腐！自制酸奶！",
      "url": "https://www.bilibili.com/video/BV1QVEFzEEhg",
      "bvid": "BV1QVEFzEEhg",
      "author": "小徐缓缓",
      "platform": "bilibili",
      "play": 109317,
      "cover": "https://i1.hdslb.com/bfs/archive/1d23906bb03642e1dc61b1ef51842a5cd9e79ae9.jpg",
      "duration": "1:41"
    }
  ]
}

module.exports = VIDEOS
