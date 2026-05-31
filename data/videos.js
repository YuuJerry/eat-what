// 热门菜谱视频链接（自动生成）

const VIDEOS = {
  "番茄炒蛋": [
    {
      "title": "番茄炒蛋的正确做法",
      "url": "https://www.bilibili.com/video/BV1xx411c7mD",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "麻婆豆腐": [
    {
      "title": "正宗麻婆豆腐的做法",
      "url": "https://www.bilibili.com/video/BV1Ss411a76e",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "凉拌黄瓜": [
    {
      "title": "清脆爽口的酱腌黄瓜！这个配方太绝了！超级简单，超下饭！",
      "url": "https://www.bilibili.com/video/BV1cM4y1U7ie",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 381600
    }
  ],
  "宫保鸡丁": [
    {
      "title": "宫保鸡丁的正宗做法",
      "url": "https://www.bilibili.com/video/BV1Ws411Y7Dc",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "红烧肉": [
    {
      "title": "红烧肉最正宗的做法",
      "url": "https://www.bilibili.com/video/BV1Vs411a76j",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "糖醋排骨": [
    {
      "title": "糖醋排骨的家常做法",
      "url": "https://www.bilibili.com/video/BV1Ws411Y7Dc",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "鱼香肉丝": [
    {
      "title": "鱼香肉丝的正确做法",
      "url": "https://www.bilibili.com/video/BV1Xs411a76q",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "蒜蓉西兰花": [
    {
      "title": "【小高姐】蒜蓉西兰花",
      "url": "https://www.bilibili.com/video/BV1fy4y1W7z5",
      "author": "小高姐的魔法调料",
      "platform": "bilibili",
      "play": 1390344
    }
  ],
  "土豆炖牛肉": [
    {
      "title": "土豆炖牛肉的家常做法，牛肉软烂、土豆入味，太下饭了",
      "url": "https://www.bilibili.com/video/BV17M41137WC",
      "author": "小酥肉的菜",
      "platform": "bilibili",
      "play": 527764
    }
  ],
  "清炒时蔬": [
    {
      "title": "妈妈做的家常晚餐！又是吃撑扶墙的一天！今日菜单:  干蒸牛肉+鲫鱼豆腐丝瓜汤+糖醋菠萝排骨+脆皮炸鸡翅+咸菜炒鱿鱼+清炒时蔬",
      "url": "https://www.bilibili.com/video/BV1c9etzSEQH",
      "author": "喉结儿",
      "platform": "bilibili",
      "play": 151149
    }
  ],
  "回锅肉": [
    {
      "title": "回锅肉的家常做法",
      "url": "https://www.bilibili.com/video/BV1ks411a76n",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "西红柿牛腩": [
    {
      "title": "看状元哥做年夜饭第7道菜，西红柿牛腩家常做法，调味原来有比例",
      "url": "https://www.bilibili.com/video/BV1Qy4y1H7cN",
      "author": "美食状元哥",
      "platform": "bilibili",
      "play": 139073
    }
  ],
  "干煸四季豆": [
    {
      "title": "厨师长教你：“干煸四季豆”的正宗做法，先收藏了",
      "url": "https://www.bilibili.com/video/BV1nW411A7SY",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 737684
    }
  ],
  "酸辣土豆丝": [
    {
      "title": "酸辣土豆丝的做法",
      "url": "https://www.bilibili.com/video/BV1Ys411a76t",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "虾仁西兰花": [
    {
      "title": "怪不得饭店的西蓝花炒虾仁好吃，大厨教你一招，脆嫩爽口又美味",
      "url": "https://www.bilibili.com/video/BV1ed9qYBEwQ",
      "author": "天天相见厨房阿鹏",
      "platform": "bilibili",
      "play": 67169
    }
  ],
  "可乐鸡翅": [
    {
      "title": "可乐鸡翅的简单做法",
      "url": "https://www.bilibili.com/video/BV1Cs411a76x",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "蚝油生菜": [
    {
      "title": "蚝油生菜的简单做法",
      "url": "https://www.bilibili.com/video/BV1vs411a76h",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "木须肉": [
    {
      "title": "厨师长教你：“木须肉”的家常做法，营养丰富很适合老人孩子",
      "url": "https://www.bilibili.com/video/BV1kE411i7r1",
      "author": "美食作家王刚R",
      "platform": "bilibili",
      "play": 1716919
    }
  ],
  "地三鲜": [
    {
      "title": "地三鲜的家常做法",
      "url": "https://www.bilibili.com/video/BV1js411a76v",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "红烧排骨": [
    {
      "title": "客人预定红烧牛排骨，满满一大盘子得卖多少钱啊？大厨只用这一招，软嫩多汁儿还有味儿。",
      "url": "https://www.bilibili.com/video/BV1fq4y1Q71k",
      "author": "大嘴儿美食挠儿哥",
      "platform": "bilibili",
      "play": 1945405
    }
  ],
  "清蒸鲈鱼": [
    {
      "title": "清蒸鲈鱼的正确做法",
      "url": "https://www.bilibili.com/video/BV1rs411a76m",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "水煮肉片": [
    {
      "title": "水煮肉片的正宗做法",
      "url": "https://www.bilibili.com/video/BV1Ns411a76p",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "蒜蓉粉丝蒸虾": [
    {
      "title": "蒜蓉粉丝蒸虾的做法",
      "url": "https://www.bilibili.com/video/BV1us411a76j",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "辣子鸡": [
    {
      "title": "辣子鸡的正宗做法",
      "url": "https://www.bilibili.com/video/BV1ts411a76k",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "冬瓜排骨汤": [
    {
      "title": "排骨炖冬瓜不要乱放调料，教你这个正确做法，汤鲜肉烂，不腥不柴",
      "url": "https://www.bilibili.com/video/BV1Km4y177uQ",
      "author": "老东北美食",
      "platform": "bilibili",
      "play": 216400
    }
  ],
  "虎皮青椒": [
    {
      "title": "虎皮青椒的家常做法",
      "url": "https://www.bilibili.com/video/BV1ws411a76g",
      "author": "美食作家王刚",
      "platform": "bilibili"
    }
  ],
  "青椒肉丝": [
    {
      "title": "我做的“青椒肉丝”很好吃！步骤清晰详细、做法易学接地气",
      "url": "https://www.bilibili.com/video/BV1xS4y167Qe",
      "author": "美食强",
      "platform": "bilibili",
      "play": 2627484
    }
  ],
  "鸡胸肉沙拉": [
    {
      "title": "真正风味多汁的鸡胸做法",
      "url": "https://www.bilibili.com/video/BV1HG41157sE",
      "author": "internet-boy",
      "platform": "bilibili",
      "play": 121706
    }
  ],
  "意大利肉酱面": [
    {
      "title": "正宗意大利肉酱面",
      "url": "https://www.bilibili.com/video/BV1Qx411q7W9",
      "author": "日食记",
      "platform": "bilibili"
    }
  ],
  "黑椒牛排": [
    {
      "title": "在家煎出完美牛排",
      "url": "https://www.bilibili.com/video/BV1Hx411q7WF",
      "author": "日食记",
      "platform": "bilibili"
    }
  ],
  "奶油蘑菇汤": [
    {
      "title": "中式炒锅做法餐！奶香浓郁，绵密顺滑，从此告别西餐厅~丨奶油蘑菇汤",
      "url": "https://www.bilibili.com/video/BV19q4y1x7i2",
      "author": "老饭骨",
      "platform": "bilibili",
      "play": 1058554
    }
  ],
  "凯撒沙拉": [
    {
      "title": "凯撒沙拉的做法丨绵羊料理",
      "url": "https://www.bilibili.com/video/BV1Ds411k79G",
      "author": "绵羊料理",
      "platform": "bilibili",
      "play": 153938
    }
  ],
  "番茄浓汤": [
    {
      "title": "这个做法的汤底真的超浓郁！无敌简单好吃的番茄浓汤肥牛面～",
      "url": "https://www.bilibili.com/video/BV1z7411o7VR",
      "author": "张喜喜-",
      "platform": "bilibili",
      "play": 571717
    }
  ],
  "培根蛋酱意面": [
    {
      "title": "SERGEY谢尔盖】牛肉+意面，经典重现！｜新品香味浓郁的培根蛋酱意面想尝尝吗？搭配超厚实牛肉三明治，享受口腔被牛肉填满的快感！｜烹饪过程 &amp; 咀嚼音助眠",
      "url": "https://www.bilibili.com/video/BV1Eg411N71W",
      "author": "SERGEY谢尔盖",
      "platform": "bilibili",
      "play": 719444
    }
  ],
  "希腊沙拉": [
    {
      "title": "一道很适合夏天的沙拉，原配方加了橄榄油，个人觉得不加更清爽，恰巴塔切开就是完美的披萨底儿和三明治底儿，快复刻起来吧~ #希腊沙拉 #恰巴塔 #美食日记",
      "url": "https://www.bilibili.com/video/BV1Vg4y1P7Rs",
      "author": "王开花_",
      "platform": "bilibili",
      "play": 241192
    }
  ],
  "奶油培根意面": [
    {
      "title": "浪漫的家庭料理｜关于5种意面的做法：培根蛋酱意面，罗勒蒜虾意面，奶油鸡菇意面，番茄肉球意面，鲑鱼白酱意面",
      "url": "https://www.bilibili.com/video/BV1BS4y1V7Wk",
      "author": "V老板-模拟经营",
      "platform": "bilibili",
      "play": 62848
    }
  ],
  "烤鸡腿": [
    {
      "title": "【小高姐】油焖鸡",
      "url": "https://www.bilibili.com/video/BV1PSMvzLEtn",
      "author": "小高姐的魔法调料",
      "platform": "bilibili",
      "play": 600251
    }
  ],
  "法式洋葱汤": [
    {
      "title": "芝士控最满足的拉丝感来袭！浓郁飘香的欧洲家常菜法式洋葱汤做法......",
      "url": "https://www.bilibili.com/video/BV1v4411d7AG",
      "author": "奥地利的小胡",
      "platform": "bilibili",
      "play": 106649
    }
  ],
  "玛格丽特披萨": [
    {
      "title": "这个披萨的做法简直就是好吃到起飞，而且做法非常简单，适合不会揉面不会发面的宝，可以换任何喜欢的 口味",
      "url": "https://www.bilibili.com/video/BV1ve4y1S7Fp",
      "author": "王开花_",
      "platform": "bilibili",
      "play": 58711
    }
  ],
  "蒜香黄油虾": [
    {
      "title": "爽口弹牙的蒜香黄油虾做法，蒜香浓郁鲜香入味，好吃又下饭",
      "url": "https://www.bilibili.com/video/BV1vr421T7rc",
      "author": "美食一线陈仔",
      "platform": "bilibili",
      "play": 79111
    }
  ],
  "罗宋汤": [
    {
      "title": "上海妈妈教你“罗宋汤”的家常做法，汤汁浓郁，酸甜开胃！",
      "url": "https://www.bilibili.com/video/BV14t411P7Vo",
      "author": "上海妈妈私房菜",
      "platform": "bilibili",
      "play": 345394
    }
  ],
  "日式咖喱饭": [
    {
      "title": "超浓郁日式咖喱饭",
      "url": "https://www.bilibili.com/video/BV1Zx411q7WB",
      "author": "日食记",
      "platform": "bilibili"
    }
  ],
  "寿司卷": [
    {
      "title": "手把手教您做寿司，教程详细，做法易懂，想吃寿司再也不用外面买",
      "url": "https://www.bilibili.com/video/BV1Bt4y117JB",
      "author": "石头美食号",
      "platform": "bilibili",
      "play": 193946
    }
  ],
  "味噌汤": [
    {
      "title": "🎌日本人每天都要喝的味噌汤",
      "url": "https://www.bilibili.com/video/BV1WbNszMEyH",
      "author": "张森的下班料理",
      "platform": "bilibili",
      "play": 652461
    }
  ],
  "照烧鸡腿": [
    {
      "title": "厨师长老吃家认证，简简单单照烧鸡腿饭做法，偷吃同款菜单",
      "url": "https://www.bilibili.com/video/BV1NnzNBQE1F",
      "author": "张森的下班料理",
      "platform": "bilibili",
      "play": 1788413
    }
  ],
  "亲子丼": [
    {
      "title": "鸡肉鸡蛋盖饭为何成为日本国民美食？东京排名第一亲子丼 主厨庖丁解鸡！",
      "url": "https://www.bilibili.com/video/BV1Pq4y1C76J",
      "author": "顶级日料",
      "platform": "bilibili",
      "play": 68083
    }
  ],
  "日式炸猪排": [
    {
      "title": "详解日本米其林星级炸猪排！日式炸猪排好吃不是吹的！真的不一样",
      "url": "https://www.bilibili.com/video/BV16S4y1q7xq",
      "author": "顶级日料",
      "platform": "bilibili",
      "play": 100060
    }
  ],
  "冷荞麦面": [
    {
      "title": "连续一周只吃荞麦面会发生什么？",
      "url": "https://www.bilibili.com/video/BV1pD421p7S7",
      "author": "敖小丙1688",
      "platform": "bilibili",
      "play": 3391455
    }
  ],
  "茶碗蒸": [
    {
      "title": "【这就是和食】日式茶碗蒸蛋｜最丝滑的配方 其中的重点记下来了吗？",
      "url": "https://www.bilibili.com/video/BV1Ph4y1v7ar",
      "author": "GOHAN_御饭",
      "platform": "bilibili",
      "play": 28684
    }
  ],
  "天妇罗": [
    {
      "title": "试吃一条非常凶猛的裸胸鳝，一煎一炸，帅小伙吃完都想舔锅底",
      "url": "https://www.bilibili.com/video/BV15R4y147Ux",
      "author": "小文哥吃吃吃",
      "platform": "bilibili",
      "play": 1458400
    }
  ],
  "烤秋刀鱼": [
    {
      "title": "买虾就买这种，吃鱼就吃这类；不用复杂调料，鱼虾都不需要过于复杂简简单单烤出海鱼本味，肉质紧实越吃越香#秋刀鱼 #盐焗虾#快手菜 #咖喱鱼蛋 #家常海鲜做法",
      "url": "https://www.bilibili.com/video/BV1tQLt6KERq",
      "author": "是厚皮橙",
      "platform": "bilibili",
      "play": 32397
    }
  ],
  "韩式拌饭": [
    {
      "title": "韩式石锅拌饭的做法",
      "url": "https://www.bilibili.com/video/BV1Kx411q7W5",
      "author": "日食记",
      "platform": "bilibili"
    }
  ],
  "韩式泡菜炒饭": [
    {
      "title": "私藏韩式泡菜拌饭，0失败做法真的太简单了",
      "url": "https://www.bilibili.com/video/BV1CE411N7M6",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 186328
    }
  ],
  "部队锅": [
    {
      "title": "一周美食VLOG | 腊八节咸味腊八粥  | 地锅鸡 | 麻辣腌萝卜的做法 | 鱼香排骨 | 韩式部队锅 | 第一次直播",
      "url": "https://www.bilibili.com/video/BV1wv411s7cv",
      "author": "雨琪在芬兰",
      "platform": "bilibili",
      "play": 227861
    }
  ],
  "韩式炸鸡": [
    {
      "title": "目前全网没有的做法！但是真的很好吃！自制辣奶油炸鸡",
      "url": "https://www.bilibili.com/video/BV1fxkuYNE3P",
      "author": "阿晨吃饱了",
      "platform": "bilibili",
      "play": 704372
    }
  ],
  "石锅豆腐": [
    {
      "title": "用20年的老石锅，放入嫩豆腐，浇上特制的酱料，周围倒入鸡蛋液包围着，做出来的豆腐又嫩又好吃，一份不够吃 &quot;餐饮美食 &quot;",
      "url": "https://www.bilibili.com/video/BV1Rt4y1j7jb",
      "author": "暮馆晴",
      "platform": "bilibili",
      "play": 1053460
    }
  ],
  "辣炒年糕": [
    {
      "title": "【韩国人教你炒年糕】做法很简单，但是超好吃！姜食堂2同款辣炒年糕，韩式炒年糕",
      "url": "https://www.bilibili.com/video/BV164411R77G",
      "author": "西里Cecile",
      "platform": "bilibili",
      "play": 1538519
    }
  ],
  "参鸡汤": [
    {
      "title": "秋瓷炫厨房秘密武器！十全大补参鸡汤做法大揭秘！",
      "url": "https://www.bilibili.com/video/BV19bEkzMEKs",
      "author": "池晨橙",
      "platform": "bilibili",
      "play": 169477
    }
  ],
  "韩式烤肉": [
    {
      "title": "一人份超简单烤肉拌饭做法，五花肉还是烤的最好吃啊！",
      "url": "https://www.bilibili.com/video/BV1Lt411X7ee",
      "author": "小夏哒独炊札记",
      "platform": "bilibili",
      "play": 226624
    }
  ],
  "水煮鸡胸肉": [
    {
      "title": "鸡胸肉最嫩最解馋的做法！椒麻水煮鸡胸肉搭配榨菜肉丝面～",
      "url": "https://www.bilibili.com/video/BV1US4y1Q74D",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 2079301
    }
  ],
  "蒸蛋": [
    {
      "title": "鸡蛋最好吃的做法！瘦肉饼蒸蛋！嫩滑多汁特别有营养！",
      "url": "https://www.bilibili.com/video/BV1rrfPYqEan",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 3875711
    }
  ],
  "凉拌鸡丝": [
    {
      "title": "【凉拌菜技法系列③】芥末鸡丝，内含焖芥末做法。",
      "url": "https://www.bilibili.com/video/BV19h4y117em",
      "author": "鲁菜行者",
      "platform": "bilibili",
      "play": 187174
    }
  ],
  "西兰花炒虾仁": [
    {
      "title": "怪不得饭店的西蓝花炒虾仁好吃，大厨教你一招，脆嫩爽口又美味",
      "url": "https://www.bilibili.com/video/BV1ed9qYBEwQ",
      "author": "天天相见厨房阿鹏",
      "platform": "bilibili",
      "play": 67169
    }
  ],
  "燕麦粥": [
    {
      "title": "懒人营养早餐：牛奶燕麦粥奶香浓浓做法简单",
      "url": "https://www.bilibili.com/video/BV1Gp4y1Y7Hp",
      "author": "涵钰广东家常菜",
      "platform": "bilibili",
      "play": 52639
    }
  ],
  "蔬菜沙拉": [
    {
      "title": "适合中国宝宝体质的蔬菜沙拉",
      "url": "https://www.bilibili.com/video/BV1pt421N7ec",
      "author": "唐尼是个der",
      "platform": "bilibili",
      "play": 1968740
    }
  ],
  "豆腐蔬菜汤": [
    {
      "title": "【蜡笔小新】晚餐是培根肉卷蔬菜沙拉还有豆腐汤蘸上酱料一口一个哦",
      "url": "https://www.bilibili.com/video/BV1BqaUzPEMk",
      "author": "蜡笔小新干饭",
      "platform": "bilibili",
      "play": 439473
    }
  ],
  "全麦三明治": [
    {
      "title": "【无糖全麦三明治】低油低脂高蛋白，做法简单，食材家常！",
      "url": "https://www.bilibili.com/video/BV1YD4y197V6",
      "author": "美食达人计划",
      "platform": "bilibili",
      "play": 1935
    }
  ],
  "金枪鱼饭团": [
    {
      "title": "简单又营养的金枪鱼饭团！孩子一口一个！妈妈们赶紧给孩子试试！",
      "url": "https://www.bilibili.com/video/BV1z8411f7xE",
      "author": "夏叔有好货",
      "platform": "bilibili",
      "play": 29379
    }
  ],
  "烤红薯": [
    {
      "title": "秋冬吃红薯，教你红薯糕，不用烤，不用炸，软软糯糯，嚼着太香了",
      "url": "https://www.bilibili.com/video/BV1Wz4y1P7TH",
      "author": "麦苗厨房",
      "platform": "bilibili",
      "play": 1759368
    }
  ],
  "鸡胸肉蔬菜卷": [
    {
      "title": "【鸡肉蔬菜卷】煎鸡胸吃腻了？来试试这个做法，颜值高肉还不柴！",
      "url": "https://www.bilibili.com/video/BV1s4411w7bZ",
      "author": "高兴Pampas",
      "platform": "bilibili",
      "play": 252525
    }
  ],
  "番茄鸡蛋汤": [
    {
      "title": "自制家庭版鸡蛋灌饼！做法简单一次就成功，秒杀路边摊搭配番茄蛋花汤",
      "url": "https://www.bilibili.com/video/BV17y4y1q7vA",
      "author": "长得像美食博主的女人",
      "platform": "bilibili",
      "play": 219041
    }
  ],
  "白灼虾": [
    {
      "title": "大错特错的白灼虾做法",
      "url": "https://www.bilibili.com/video/BV1MP411y7o2",
      "author": "记录小生活的蛋黄派",
      "platform": "bilibili",
      "play": 4374010
    }
  ],
  "秋葵拌豆腐": [
    {
      "title": "一人食｜吃得干净真的会瘦！🥣照烧芦笋牛肉卷！秋葵拌豆腐！自制酸奶！",
      "url": "https://www.bilibili.com/video/BV1QVEFzEEhg",
      "author": "小徐缓缓",
      "platform": "bilibili",
      "play": 109317
    }
  ]
}

module.exports = VIDEOS
