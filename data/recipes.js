// 预置菜谱数据库
// 完整数据由 utils/recipe-engine.js 引用

const RECIPES = [
  // ===== 中餐 =====
  {
    name: "番茄炒蛋", category: "中餐", tags: ["家常","快手","减脂"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 280, isDietFriendly: true,
    ingredients: [{name:"番茄",amount:"2个"},{name:"鸡蛋",amount:"3个"},{name:"盐",amount:"适量"},{name:"糖",amount:"少许"},{name:"葱花",amount:"适量"}],
    steps: ["番茄顶部划十字，开水烫30秒去皮切块","鸡蛋打散加少许盐和料酒搅匀","锅中多放油，大火炒蛋至凝固盛出","锅留底油炒番茄出汁","加盐糖调味，倒入鸡蛋翻炒","撒葱花出锅"],
    nutritionInfo: {protein:15,fat:12,carbs:20,fiber:2}
  },
  {
    name: "麻婆豆腐", category: "中餐", tags: ["家常","辣","下饭"], difficulty: 2,
    cookTime: 20, servings: 3, calories: 350, isDietFriendly: false,
    ingredients: [{name:"嫩豆腐",amount:"1块"},{name:"猪肉末",amount:"100g"},{name:"豆瓣酱",amount:"2勺"},{name:"花椒粉",amount:"适量"},{name:"葱姜蒜",amount:"适量"},{name:"淀粉",amount:"1勺"}],
    steps: ["豆腐切2cm方块焯水备用","锅中热油炒香肉末至变色","加豆瓣酱葱姜蒜炒出红油","加水放入豆腐小火煮5分钟","水淀粉勾芡撒花椒粉出锅"],
    nutritionInfo: {protein:18,fat:20,carbs:15,fiber:3}
  },
  {
    name: "凉拌黄瓜", category: "中餐", tags: ["凉菜","快手","减脂"], difficulty: 1,
    cookTime: 5, servings: 2, calories: 80, isDietFriendly: true,
    ingredients: [{name:"黄瓜",amount:"2根"},{name:"蒜",amount:"3瓣"},{name:"醋",amount:"2勺"},{name:"生抽",amount:"1勺"},{name:"辣椒油",amount:"1勺"},{name:"香油",amount:"少许"}],
    steps: ["黄瓜拍碎切段","蒜切末备用","将所有调料混合拌匀","浇在黄瓜上拌匀即可"],
    nutritionInfo: {protein:2,fat:3,carbs:8,fiber:2}
  },
  {
    name: "宫保鸡丁", category: "中餐", tags: ["家常","辣","下饭"], difficulty: 2,
    cookTime: 25, servings: 3, calories: 420, isDietFriendly: false,
    ingredients: [{name:"鸡胸肉",amount:"300g"},{name:"花生米",amount:"50g"},{name:"干辣椒",amount:"8个"},{name:"花椒",amount:"1小撮"},{name:"黄瓜",amount:"半根"},{name:"胡萝卜",amount:"半根"},{name:"淀粉",amount:"1勺"}],
    steps: ["鸡胸肉切丁加盐料酒淀粉腌15分钟","调宫保汁：醋2勺生抽1勺糖1勺淀粉1勺","花生米小火炸至金黄备用","爆香干辣椒和花椒","放入鸡丁炒变色加配菜翻炒","倒入宫保汁翻炒加花生米出锅"],
    nutritionInfo: {protein:35,fat:18,carbs:25,fiber:3}
  },
  {
    name: "红烧肉", category: "中餐", tags: ["家常","硬菜","下饭"], difficulty: 3,
    cookTime: 60, servings: 4, calories: 650, isDietFriendly: false,
    ingredients: [{name:"五花肉",amount:"500g"},{name:"冰糖",amount:"30g"},{name:"生抽",amount:"3勺"},{name:"老抽",amount:"1勺"},{name:"料酒",amount:"2勺"},{name:"八角",amount:"2个"},{name:"桂皮",amount:"1块"},{name:"姜",amount:"4片"}],
    steps: ["五花肉切3cm方块冷水焯水去血沫","锅中少油放冰糖小火炒糖色","放入肉块翻炒上色","加生抽老抽料酒八角桂皮姜","加热水没过肉大火烧开","转小火炖40分钟至软烂","大火收汁出锅"],
    nutritionInfo: {protein:25,fat:45,carbs:15,fiber:0}
  },
  {
    name: "糖醋排骨", category: "中餐", tags: ["家常","酸甜","硬菜"], difficulty: 2,
    cookTime: 35, servings: 3, calories: 480, isDietFriendly: false,
    ingredients: [{name:"排骨",amount:"500g"},{name:"醋",amount:"3勺"},{name:"糖",amount:"2勺"},{name:"生抽",amount:"2勺"},{name:"料酒",amount:"1勺"},{name:"姜",amount:"3片"},{name:"葱",amount:"适量"}],
    steps: ["排骨冷水下锅焯水去血沫沥干","调糖醋汁：醋3勺糖2勺生抽2勺料酒1勺","锅中热油将排骨煎至两面金黄","加姜片翻炒出香味","倒入糖醋汁和适量热水","大火烧开转中小火炖25分钟","大火收汁撒葱花出锅"],
    nutritionInfo: {protein:30,fat:25,carbs:30,fiber:0}
  },
  {
    name: "鱼香肉丝", category: "中餐", tags: ["家常","下饭","经典"], difficulty: 2,
    cookTime: 20, servings: 3, calories: 380, isDietFriendly: false,
    ingredients: [{name:"猪里脊",amount:"250g"},{name:"木耳",amount:"适量"},{name:"胡萝卜",amount:"半根"},{name:"青椒",amount:"1个"},{name:"泡椒",amount:"3个"},{name:"醋",amount:"2勺"},{name:"糖",amount:"1勺"},{name:"淀粉",amount:"适量"}],
    steps: ["里脊肉切丝加盐料酒淀粉腌10分钟","木耳泡发切丝，胡萝卜青椒切丝","调鱼香汁：醋2勺糖1勺生抽1勺淀粉1勺","锅中热油滑炒肉丝至变色盛出","爆香泡椒姜蒜，加入配菜翻炒","倒回肉丝加鱼香汁翻炒均匀出锅"],
    nutritionInfo: {protein:28,fat:15,carbs:20,fiber:3}
  },
  {
    name: "蒜蓉西兰花", category: "中餐", tags: ["快手","清淡","减脂"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 120, isDietFriendly: true,
    ingredients: [{name:"西兰花",amount:"1朵"},{name:"蒜",amount:"5瓣"},{name:"盐",amount:"适量"},{name:"蚝油",amount:"1勺"}],
    steps: ["西兰花切小朵焯水1分钟捞出","锅中热油爆香蒜末","放入西兰花翻炒","加蚝油和盐调味出锅"],
    nutritionInfo: {protein:6,fat:5,carbs:12,fiber:5}
  },
  {
    name: "土豆炖牛肉", category: "中餐", tags: ["家常","硬菜","暖胃"], difficulty: 2,
    cookTime: 50, servings: 4, calories: 580, isDietFriendly: false,
    ingredients: [{name:"牛肉",amount:"400g"},{name:"土豆",amount:"2个"},{name:"胡萝卜",amount:"1根"},{name:"洋葱",amount:"1个"},{name:"番茄",amount:"1个"},{name:"八角",amount:"2个"},{name:"生抽",amount:"3勺"}],
    steps: ["牛肉切块冷水焯水去血沫","土豆胡萝卜切滚刀块，洋葱切块","锅中热油炒香洋葱","放入牛肉翻炒加生抽上色","加热水没过牛肉放八角大火烧开","转小火炖30分钟加土豆胡萝卜","继续炖15分钟至土豆软烂"],
    nutritionInfo: {protein:35,fat:20,carbs:40,fiber:4}
  },
  {
    name: "清炒时蔬", category: "中餐", tags: ["快手","清淡","减脂"], difficulty: 1,
    cookTime: 8, servings: 2, calories: 90, isDietFriendly: true,
    ingredients: [{name:"青菜",amount:"300g"},{name:"蒜",amount:"3瓣"},{name:"盐",amount:"适量"},{name:"油",amount:"1勺"}],
    steps: ["青菜洗净沥干","锅中热油爆香蒜末","大火翻炒青菜至断生","加盐调味出锅"],
    nutritionInfo: {protein:3,fat:4,carbs:8,fiber:3}
  },
  {
    name: "回锅肉", category: "中餐", tags: ["家常","辣","下饭"], difficulty: 2,
    cookTime: 25, servings: 3, calories: 450, isDietFriendly: false,
    ingredients: [{name:"五花肉",amount:"300g"},{name:"青椒",amount:"2个"},{name:"豆瓣酱",amount:"1勺"},{name:"蒜苗",amount:"2根"},{name:"姜",amount:"3片"},{name:"豆豉",amount:"1勺"}],
    steps: ["五花肉冷水下锅加姜片煮20分钟捞出切薄片","青椒切块蒜苗切段","锅中少油放入肉片煸出油脂","加豆瓣酱豆豉炒出红油","放入青椒蒜苗大火翻炒","加少许糖调味出锅"],
    nutritionInfo: {protein:20,fat:35,carbs:8,fiber:2}
  },
  {
    name: "西红柿牛腩", category: "中餐", tags: ["家常","暖胃","汤"], difficulty: 2,
    cookTime: 45, servings: 3, calories: 420, isDietFriendly: false,
    ingredients: [{name:"牛腩",amount:"400g"},{name:"番茄",amount:"3个"},{name:"土豆",amount:"1个"},{name:"洋葱",amount:"半个"},{name:"姜",amount:"3片"},{name:"番茄酱",amount:"2勺"}],
    steps: ["牛腩切块焯水去血沫","番茄顶部划十字烫去皮切块","锅中热油炒香洋葱和姜","放入牛腩翻炒加番茄酱","加番茄块和热水大火烧开","转小火炖30分钟加土豆块","继续炖15分钟调味出锅"],
    nutritionInfo: {protein:30,fat:15,carbs:30,fiber:4}
  },
  {
    name: "干煸四季豆", category: "中餐", tags: ["家常","辣","下饭"], difficulty: 2,
    cookTime: 15, servings: 2, calories: 200, isDietFriendly: false,
    ingredients: [{name:"四季豆",amount:"300g"},{name:"猪肉末",amount:"100g"},{name:"干辣椒",amount:"5个"},{name:"花椒",amount:"少许"},{name:"蒜",amount:"3瓣"},{name:"芽菜",amount:"2勺"}],
    steps: ["四季豆摘段洗净沥干水分","宽油炸至表皮起皱捞出","锅留底油炒香肉末","加干辣椒花椒蒜末爆香","放入四季豆和芽菜翻炒","加盐和少许糖调味出锅"],
    nutritionInfo: {protein:12,fat:12,carbs:15,fiber:5}
  },
  {
    name: "酸辣土豆丝", category: "中餐", tags: ["快手","酸辣","下饭"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 180, isDietFriendly: true,
    ingredients: [{name:"土豆",amount:"2个"},{name:"干辣椒",amount:"4个"},{name:"醋",amount:"2勺"},{name:"花椒",amount:"少许"},{name:"葱",amount:"适量"},{name:"蒜",amount:"2瓣"}],
    steps: ["土豆去皮切细丝泡水洗去淀粉","锅中热油爆香花椒干辣椒蒜末","大火翻炒土豆丝1-2分钟","沿锅边烹入醋翻炒","加盐调味撒葱花出锅"],
    nutritionInfo: {protein:4,fat:5,carbs:30,fiber:3}
  },
  {
    name: "虾仁西兰花", category: "中餐", tags: ["减脂","快手","清淡"], difficulty: 1,
    cookTime: 15, servings: 2, calories: 200, isDietFriendly: true,
    ingredients: [{name:"虾仁",amount:"200g"},{name:"西兰花",amount:"1朵"},{name:"蒜",amount:"3瓣"},{name:"盐",amount:"适量"},{name:"料酒",amount:"1勺"}],
    steps: ["虾仁去虾线加料酒腌10分钟","西兰花切小朵焯水备用","锅中热油爆香蒜末","放入虾仁炒至变色","加入西兰花翻炒加盐出锅"],
    nutritionInfo: {protein:30,fat:5,carbs:10,fiber:4}
  },
  {
    name: "可乐鸡翅", category: "中餐", tags: ["家常","甜","简单"], difficulty: 1,
    cookTime: 25, servings: 2, calories: 400, isDietFriendly: false,
    ingredients: [{name:"鸡翅",amount:"8个"},{name:"可乐",amount:"1罐"},{name:"生抽",amount:"2勺"},{name:"老抽",amount:"1勺"},{name:"姜",amount:"3片"},{name:"料酒",amount:"1勺"}],
    steps: ["鸡翅两面划刀加料酒姜片焯水","锅中少油煎鸡翅至两面金黄","加生抽老抽翻炒上色","倒入可乐没过鸡翅","大火烧开转中火炖15分钟","大火收汁至浓稠出锅"],
    nutritionInfo: {protein:25,fat:18,carbs:30,fiber:0}
  },
  {
    name: "蚝油生菜", category: "中餐", tags: ["快手","清淡","减脂"], difficulty: 1,
    cookTime: 5, servings: 2, calories: 60, isDietFriendly: true,
    ingredients: [{name:"生菜",amount:"1棵"},{name:"蚝油",amount:"2勺"},{name:"蒜",amount:"3瓣"},{name:"油",amount:"1勺"}],
    steps: ["生菜洗净掰开","烧开水焯生菜10秒捞出摆盘","锅中热油爆香蒜末","加蚝油和少许水调汁","浇在生菜上即可"],
    nutritionInfo: {protein:2,fat:3,carbs:6,fiber:2}
  },
  {
    name: "木须肉", category: "中餐", tags: ["家常","营养均衡"], difficulty: 2,
    cookTime: 20, servings: 3, calories: 350, isDietFriendly: false,
    ingredients: [{name:"猪瘦肉",amount:"200g"},{name:"鸡蛋",amount:"3个"},{name:"木耳",amount:"适量"},{name:"黄瓜",amount:"1根"},{name:"胡萝卜",amount:"半根"},{name:"生抽",amount:"2勺"}],
    steps: ["瘦肉切片加盐淀粉腌10分钟","木耳泡发撕小朵，黄瓜胡萝卜切片","鸡蛋炒散盛出备用","锅中热油滑炒肉片至变色","加木耳胡萝卜翻炒","放入黄瓜和鸡蛋加生抽调味出锅"],
    nutritionInfo: {protein:25,fat:15,carbs:12,fiber:3}
  },
  {
    name: "地三鲜", category: "中餐", tags: ["家常","下饭","东北"], difficulty: 2,
    cookTime: 20, servings: 3, calories: 380, isDietFriendly: false,
    ingredients: [{name:"茄子",amount:"2个"},{name:"土豆",amount:"1个"},{name:"青椒",amount:"2个"},{name:"蒜",amount:"4瓣"},{name:"生抽",amount:"2勺"},{name:"糖",amount:"1勺"},{name:"淀粉",amount:"1勺"}],
    steps: ["茄子土豆切滚刀块青椒切片","宽油分别炸软捞出沥油","调汁：生抽糖淀粉加水搅匀","锅留底油爆香蒜末","倒入炸好的蔬菜翻炒","淋入调好的汁翻匀出锅"],
    nutritionInfo: {protein:6,fat:20,carbs:35,fiber:5}
  },
  // ===== 西餐 =====
  {
    name: "鸡胸肉沙拉", category: "西餐", tags: ["减脂","轻食","快手"], difficulty: 1,
    cookTime: 15, servings: 1, calories: 250, isDietFriendly: true,
    ingredients: [{name:"鸡胸肉",amount:"150g"},{name:"生菜",amount:"适量"},{name:"小番茄",amount:"5个"},{name:"黄瓜",amount:"半根"},{name:"橄榄油",amount:"1勺"},{name:"柠檬汁",amount:"适量"}],
    steps: ["鸡胸肉加盐和黑胡椒煎熟切片","生菜洗净撕碎铺底","小番茄对半切黄瓜切片","所有食材摆盘淋橄榄油和柠檬汁"],
    nutritionInfo: {protein:35,fat:8,carbs:12,fiber:4}
  },
  {
    name: "意大利肉酱面", category: "西餐", tags: ["经典","下饭","西式"], difficulty: 2,
    cookTime: 30, servings: 2, calories: 550, isDietFriendly: false,
    ingredients: [{name:"意面",amount:"200g"},{name:"牛肉末",amount:"200g"},{name:"番茄",amount:"3个"},{name:"洋葱",amount:"半个"},{name:"蒜",amount:"3瓣"},{name:"番茄酱",amount:"3勺"},{name:"橄榄油",amount:"适量"},{name:"罗勒",amount:"少许"}],
    steps: ["番茄去皮切丁洋葱切末蒜切末","锅中热橄榄油炒香洋葱和蒜","放入牛肉末炒散炒至变色","加番茄丁和番茄酱翻炒","加少许水小火炖15分钟成肉酱","煮意面至al dente捞出","浇上肉酱撒罗勒叶即可"],
    nutritionInfo: {protein:25,fat:18,carbs:65,fiber:4}
  },
  {
    name: "黑椒牛排", category: "西餐", tags: ["硬菜","西式","简单"], difficulty: 1,
    cookTime: 15, servings: 1, calories: 450, isDietFriendly: false,
    ingredients: [{name:"牛排",amount:"1块(200g)"},{name:"黑胡椒",amount:"适量"},{name:"黄油",amount:"20g"},{name:"蒜",amount:"3瓣"},{name:"迷迭香",amount:"1枝"},{name:"盐",amount:"适量"}],
    steps: ["牛排提前回温30分钟撒盐和黑胡椒","锅大火烧热加少许油","放入牛排煎2-3分钟翻面","加黄油蒜和迷迭香","用勺子浇融化的黄油在牛排上","煎至喜欢的熟度静置3分钟切片"],
    nutritionInfo: {protein:40,fat:30,carbs:2,fiber:0}
  },
  {
    name: "奶油蘑菇汤", category: "西餐", tags: ["汤","西式","暖胃"], difficulty: 2,
    cookTime: 25, servings: 2, calories: 280, isDietFriendly: false,
    ingredients: [{name:"蘑菇",amount:"200g"},{name:"洋葱",amount:"半个"},{name:"黄油",amount:"20g"},{name:"面粉",amount:"2勺"},{name:"牛奶",amount:"300ml"},{name:"盐",amount:"适量"},{name:"黑胡椒",amount:"适量"}],
    steps: ["蘑菇切片洋葱切末","锅中融化黄油炒香洋葱","放入蘑菇炒软出水","撒入面粉翻炒均匀","慢慢倒入牛奶不停搅拌","小火煮5分钟至浓稠","加盐和黑胡椒调味用料理棒打碎"],
    nutritionInfo: {protein:8,fat:15,carbs:20,fiber:2}
  },
  {
    name: "凯撒沙拉", category: "西餐", tags: ["轻食","快手","减脂"], difficulty: 1,
    cookTime: 10, servings: 1, calories: 220, isDietFriendly: true,
    ingredients: [{name:"生菜",amount:"半棵"},{name:"面包丁",amount:"适量"},{name:"帕尔马干酪",amount:"20g"},{name:"凯撒酱",amount:"2勺"},{name:"培根",amount:"2片"}],
    steps: ["生菜洗净掰碎沥干水分","培根煎脆切碎","面包丁烤至金黄","生菜铺底淋凯撒酱","撒培根碎面包丁和干酪片拌匀"],
    nutritionInfo: {protein:12,fat:14,carbs:10,fiber:2}
  },
  {
    name: "番茄浓汤", category: "西餐", tags: ["汤","简单","暖胃"], difficulty: 1,
    cookTime: 20, servings: 2, calories: 150, isDietFriendly: true,
    ingredients: [{name:"番茄",amount:"4个"},{name:"洋葱",amount:"半个"},{name:"蒜",amount:"2瓣"},{name:"黄油",amount:"15g"},{name:"番茄酱",amount:"2勺"},{name:"盐",amount:"适量"}],
    steps: ["番茄去皮切块洋葱切末","锅中融化黄油炒香洋葱和蒜","放入番茄块炒软出汁","加番茄酱和适量水煮10分钟","用料理棒打成浓汤","加盐和黑胡椒调味"],
    nutritionInfo: {protein:4,fat:6,carbs:18,fiber:4}
  },
  {
    name: "培根蛋酱意面", category: "西餐", tags: ["经典","快手","西式"], difficulty: 1,
    cookTime: 20, servings: 2, calories: 520, isDietFriendly: false,
    ingredients: [{name:"意面",amount:"200g"},{name:"培根",amount:"100g"},{name:"鸡蛋",amount:"2个"},{name:"帕尔马干酪",amount:"30g"},{name:"黑胡椒",amount:"适量"},{name:"蒜",amount:"2瓣"}],
    steps: ["煮意面保留一杯面水","培根切条煎出油脂","鸡蛋打散加干酪和黑胡椒拌匀","意面捞入培根锅关火","快速倒入蛋液拌匀利用余温凝固","太干加面水调节撒黑胡椒"],
    nutritionInfo: {protein:22,fat:25,carbs:55,fiber:2}
  },
  // ===== 日料 =====
  {
    name: "日式咖喱饭", category: "日料", tags: ["家常","下饭","暖胃"], difficulty: 2,
    cookTime: 40, servings: 3, calories: 550, isDietFriendly: false,
    ingredients: [{name:"鸡腿肉",amount:"300g"},{name:"土豆",amount:"2个"},{name:"胡萝卜",amount:"1根"},{name:"洋葱",amount:"1个"},{name:"咖喱块",amount:"1盒"},{name:"米饭",amount:"适量"}],
    steps: ["鸡腿肉切块土豆胡萝卜切滚刀块","洋葱切丝锅中热油炒至透明","加入鸡块炒至变色","加入土豆和胡萝卜翻炒","加水没过食材大火烧开转小火20分钟","关火放入咖喱块搅拌融化再煮5分钟","配白饭食用"],
    nutritionInfo: {protein:25,fat:15,carbs:70,fiber:5}
  },
  {
    name: "寿司卷", category: "日料", tags: ["日式","简单","减脂"], difficulty: 2,
    cookTime: 30, servings: 2, calories: 350, isDietFriendly: true,
    ingredients: [{name:"寿司米",amount:"2杯"},{name:"海苔",amount:"4片"},{name:"黄瓜",amount:"1根"},{name:"牛油果",amount:"1个"},{name:"蟹棒",amount:"4条"},{name:"寿司醋",amount:"2勺"}],
    steps: ["寿司米煮熟拌入寿司醋放凉","黄瓜牛油果切条","海苔铺竹帘上铺一层薄米饭","中间放黄瓜牛油果蟹棒","借助竹帘卷紧","刀沾水切段蘸酱油芥末食用"],
    nutritionInfo: {protein:12,fat:8,carbs:55,fiber:3}
  },
  {
    name: "味噌汤", category: "日料", tags: ["汤","简单","日式"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 80, isDietFriendly: true,
    ingredients: [{name:"味噌",amount:"2勺"},{name:"豆腐",amount:"半块"},{name:"海带",amount:"适量"},{name:"葱花",amount:"适量"}],
    steps: ["水烧开放入海带煮2分钟","豆腐切小丁放入","取少量热水化开味噌","味噌倒入锅中搅匀关火","撒葱花即可"],
    nutritionInfo: {protein:6,fat:3,carbs:6,fiber:1}
  },
  {
    name: "照烧鸡腿", category: "日料", tags: ["日式","甜","简单"], difficulty: 1,
    cookTime: 20, servings: 2, calories: 380, isDietFriendly: false,
    ingredients: [{name:"鸡腿",amount:"2个"},{name:"酱油",amount:"3勺"},{name:"味醂",amount:"2勺"},{name:"糖",amount:"1勺"},{name:"料酒",amount:"1勺"},{name:"姜",amount:"2片"}],
    steps: ["鸡腿去骨用刀背拍松","调照烧汁：酱油味醂糖料酒","锅中少油煎鸡腿皮朝下至金黄","翻面煎至两面上色","倒入照烧汁和姜片收汁","切片配饭食用"],
    nutritionInfo: {protein:30,fat:15,carbs:18,fiber:0}
  },
  {
    name: "亲子丼", category: "日料", tags: ["日式","下饭","快手"], difficulty: 1,
    cookTime: 15, servings: 1, calories: 450, isDietFriendly: false,
    ingredients: [{name:"鸡腿肉",amount:"150g"},{name:"鸡蛋",amount:"2个"},{name:"洋葱",amount:"半个"},{name:"酱油",amount:"2勺"},{name:"味醂",amount:"1勺"},{name:"米饭",amount:"1碗"}],
    steps: ["鸡腿肉切块洋葱切丝","锅中加酱油味醂和少许水烧开","放入洋葱和鸡肉煮5分钟","鸡蛋打散淋入锅中半凝固关火","盖在热米饭上撒葱花"],
    nutritionInfo: {protein:28,fat:18,carbs:50,fiber:2}
  },
  {
    name: "日式炸猪排", category: "日料", tags: ["日式","硬菜","炸"], difficulty: 2,
    cookTime: 25, servings: 2, calories: 500, isDietFriendly: false,
    ingredients: [{name:"猪里脊",amount:"2块"},{name:"鸡蛋",amount:"1个"},{name:"面粉",amount:"适量"},{name:"面包糠",amount:"适量"},{name:"卷心菜",amount:"适量"},{name:"猪排酱",amount:"适量"}],
    steps: ["猪排用刀背拍松撒盐和胡椒","依次裹面粉、蛋液、面包糠","油温170度炸至金黄约4分钟","翻面再炸3分钟","捞出切条配卷心菜丝和猪排酱"],
    nutritionInfo: {protein:30,fat:22,carbs:35,fiber:2}
  },
  // ===== 韩餐 =====
  {
    name: "韩式拌饭", category: "韩餐", tags: ["下饭","丰富","DIY"], difficulty: 2,
    cookTime: 30, servings: 1, calories: 480, isDietFriendly: false,
    ingredients: [{name:"米饭",amount:"1碗"},{name:"牛肉",amount:"100g"},{name:"菠菜",amount:"适量"},{name:"胡萝卜",amount:"半根"},{name:"黄豆芽",amount:"适量"},{name:"鸡蛋",amount:"1个"},{name:"韩式辣酱",amount:"2勺"}],
    steps: ["各种蔬菜分别焯水调味备用","牛肉切丝炒熟调味","石锅刷油放入米饭","将蔬菜和牛肉摆放在饭上","中间放煎蛋配辣酱食用"],
    nutritionInfo: {protein:22,fat:14,carbs:55,fiber:4}
  },
  {
    name: "韩式泡菜炒饭", category: "韩餐", tags: ["快手","辣","下饭"], difficulty: 1,
    cookTime: 10, servings: 1, calories: 400, isDietFriendly: false,
    ingredients: [{name:"米饭",amount:"1碗"},{name:"泡菜",amount:"100g"},{name:"鸡蛋",amount:"1个"},{name:"培根",amount:"2片"},{name:"葱花",amount:"适量"},{name:"香油",amount:"少许"}],
    steps: ["培根切小片煎脆","泡菜切碎连汁备用","锅中放入培根和泡菜翻炒","加入米饭大火翻炒均匀","煎一个溏心蛋盖在饭上","撒葱花淋香油拌匀食用"],
    nutritionInfo: {protein:15,fat:18,carbs:45,fiber:2}
  },
  {
    name: "部队锅", category: "韩餐", tags: ["辣","丰富","暖胃"], difficulty: 1,
    cookTime: 20, servings: 2, calories: 500, isDietFriendly: false,
    ingredients: [{name:"泡面",amount:"1包"},{name:"午餐肉",amount:"半罐"},{name:"香肠",amount:"2根"},{name:"豆腐",amount:"半块"},{name:"泡菜",amount:"适量"},{name:"芝士",amount:"2片"},{name:"韩式辣酱",amount:"2勺"},{name:"年糕",amount:"适量"}],
    steps: ["所有食材切片摆入锅中","中间放泡面饼和芝士","加水至食材八分满","放入辣酱大火烧开","煮至面熟食材热透","拌匀食用"],
    nutritionInfo: {protein:20,fat:25,carbs:50,fiber:2}
  },
  {
    name: "韩式炸鸡", category: "韩餐", tags: ["硬菜","甜辣","炸"], difficulty: 2,
    cookTime: 35, servings: 3, calories: 550, isDietFriendly: false,
    ingredients: [{name:"鸡翅",amount:"12个"},{name:"淀粉",amount:"适量"},{name:"韩式辣酱",amount:"3勺"},{name:"番茄酱",amount:"2勺"},{name:"蜂蜜",amount:"2勺"},{name:"蒜",amount:"5瓣"},{name:"芝麻",amount:"适量"}],
    steps: ["鸡翅洗净沥干裹淀粉","油温170度炸8分钟至金黄","捞出升高油温复炸2分钟更脆","调酱：辣酱番茄酱蜂蜜蒜末","锅中少许油炒香酱料","放入炸鸡翻裹均匀撒芝麻"],
    nutritionInfo: {protein:30,fat:25,carbs:35,fiber:1}
  },
  {
    name: "石锅豆腐", category: "韩餐", tags: ["简单","辣","下饭"], difficulty: 1,
    cookTime: 15, servings: 2, calories: 250, isDietFriendly: true,
    ingredients: [{name:"老豆腐",amount:"1块"},{name:"韩式辣酱",amount:"2勺"},{name:"洋葱",amount:"半个"},{name:"葱",amount:"适量"},{name:"蒜",amount:"2瓣"},{name:"芝麻油",amount:"少许"}],
    steps: ["豆腐切厚片洋葱切丝","石锅刷芝麻油铺洋葱","摆上豆腐片","调酱：辣酱蒜末少许水搅匀","浇在豆腐上开火煮5分钟","撒葱花即可"],
    nutritionInfo: {protein:15,fat:10,carbs:12,fiber:2}
  },
  // ===== 减脂 =====
  {
    name: "水煮鸡胸肉", category: "减脂", tags: ["减脂","简单","高蛋白"], difficulty: 1,
    cookTime: 15, servings: 1, calories: 180, isDietFriendly: true,
    ingredients: [{name:"鸡胸肉",amount:"200g"},{name:"姜",amount:"3片"},{name:"料酒",amount:"1勺"},{name:"盐",amount:"适量"},{name:"黑胡椒",amount:"适量"}],
    steps: ["鸡胸肉冷水下锅加姜片料酒","大火烧开撇去浮沫","转小火煮12分钟","捞出放凉切片","撒盐和黑胡椒调味"],
    nutritionInfo: {protein:40,fat:3,carbs:2,fiber:0}
  },
  {
    name: "蒸蛋", category: "减脂", tags: ["减脂","简单","快手"], difficulty: 1,
    cookTime: 12, servings: 1, calories: 120, isDietFriendly: true,
    ingredients: [{name:"鸡蛋",amount:"2个"},{name:"温水",amount:"适量"},{name:"盐",amount:"少许"},{name:"生抽",amount:"少许"},{name:"香油",amount:"少许"}],
    steps: ["鸡蛋打散加1.5倍温水","加少许盐搅匀撇去浮沫","盖保鲜膜扎几个小孔","大火烧开水放入蒸8分钟","关火焖2分钟淋生抽和香油"],
    nutritionInfo: {protein:12,fat:8,carbs:2,fiber:0}
  },
  {
    name: "凉拌鸡丝", category: "减脂", tags: ["减脂","快手","高蛋白"], difficulty: 1,
    cookTime: 15, servings: 2, calories: 200, isDietFriendly: true,
    ingredients: [{name:"鸡胸肉",amount:"200g"},{name:"黄瓜",amount:"1根"},{name:"蒜",amount:"3瓣"},{name:"醋",amount:"2勺"},{name:"生抽",amount:"1勺"},{name:"辣椒油",amount:"1勺"},{name:"花椒油",amount:"少许"}],
    steps: ["鸡胸肉冷水下锅煮熟捞出放凉","手撕成细丝备用","黄瓜切丝铺底","调汁：醋生抽蒜末辣椒油花椒油","鸡丝放在黄瓜丝上浇汁拌匀"],
    nutritionInfo: {protein:35,fat:5,carbs:8,fiber:2}
  },
  {
    name: "西兰花炒虾仁", category: "减脂", tags: ["减脂","快手","高蛋白"], difficulty: 1,
    cookTime: 12, servings: 1, calories: 180, isDietFriendly: true,
    ingredients: [{name:"虾仁",amount:"150g"},{name:"西兰花",amount:"半朵"},{name:"蒜",amount:"2瓣"},{name:"料酒",amount:"1勺"},{name:"盐",amount:"适量"}],
    steps: ["虾仁去虾线加料酒腌5分钟","西兰花切小朵焯水30秒捞出","锅中热油爆香蒜末","放入虾仁炒至变色卷曲","加入西兰花翻炒加盐出锅"],
    nutritionInfo: {protein:28,fat:3,carbs:8,fiber:4}
  },
  {
    name: "燕麦粥", category: "减脂", tags: ["减脂","早餐","简单"], difficulty: 1,
    cookTime: 10, servings: 1, calories: 200, isDietFriendly: true,
    ingredients: [{name:"燕麦",amount:"50g"},{name:"牛奶",amount:"200ml"},{name:"香蕉",amount:"半根"},{name:"蓝莓",amount:"适量"},{name:"蜂蜜",amount:"少许"}],
    steps: ["牛奶倒入锅中加热","放入燕麦搅拌煮3分钟","倒入碗中","放上香蕉片和蓝莓","淋少许蜂蜜即可"],
    nutritionInfo: {protein:8,fat:5,carbs:35,fiber:4}
  },
  {
    name: "清蒸鲈鱼", category: "减脂", tags: ["减脂","清淡","高蛋白"], difficulty: 2,
    cookTime: 15, servings: 2, calories: 220, isDietFriendly: true,
    ingredients: [{name:"鲈鱼",amount:"1条"},{name:"姜",amount:"4片"},{name:"葱",amount:"2根"},{name:"蒸鱼豉油",amount:"2勺"},{name:"料酒",amount:"1勺"}],
    steps: ["鲈鱼处理干净两面划刀抹盐和料酒","鱼身铺姜片腌10分钟","水烧开放入大火蒸8分钟","取出倒掉蒸出的水铺葱丝姜丝","淋蒸鱼豉油","浇热油激香出锅"],
    nutritionInfo: {protein:35,fat:8,carbs:2,fiber:0}
  },
  {
    name: "蔬菜沙拉", category: "减脂", tags: ["减脂","轻食","快手"], difficulty: 1,
    cookTime: 5, servings: 1, calories: 100, isDietFriendly: true,
    ingredients: [{name:"生菜",amount:"适量"},{name:"小番茄",amount:"5个"},{name:"黄瓜",amount:"半根"},{name:"紫甘蓝",amount:"适量"},{name:"橄榄油",amount:"1勺"},{name:"醋",amount:"1勺"},{name:"盐",amount:"少许"}],
    steps: ["所有蔬菜洗净沥干","生菜撕碎小番茄对半切","黄瓜切片紫甘蓝切丝","所有蔬菜放入大碗","调油醋汁：橄榄油醋盐搅匀","浇在蔬菜上拌匀即可"],
    nutritionInfo: {protein:3,fat:5,carbs:10,fiber:3}
  },
  {
    name: "豆腐蔬菜汤", category: "减脂", tags: ["减脂","汤","清淡"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 120, isDietFriendly: true,
    ingredients: [{name:"豆腐",amount:"半块"},{name:"番茄",amount:"1个"},{name:"青菜",amount:"适量"},{name:"香菇",amount:"3朵"},{name:"盐",amount:"适量"},{name:"香油",amount:"少许"}],
    steps: ["豆腐切丁番茄切块香菇切片","锅中加水烧开放入番茄","放入豆腐和香菇煮3分钟","加青菜煮1分钟","加盐调味淋香油出锅"],
    nutritionInfo: {protein:8,fat:3,carbs:10,fiber:3}
  },
  {
    name: "全麦三明治", category: "减脂", tags: ["减脂","早餐","快手"], difficulty: 1,
    cookTime: 5, servings: 1, calories: 280, isDietFriendly: true,
    ingredients: [{name:"全麦面包",amount:"2片"},{name:"鸡蛋",amount:"1个"},{name:"生菜",amount:"2片"},{name:"番茄",amount:"3片"},{name:"鸡胸肉",amount:"50g"}],
    steps: ["鸡蛋煎成荷包蛋","全麦面包烤至微脆","面包上依次铺生菜番茄片","放上荷包蛋和鸡胸肉片","盖上另一片面包对角切开"],
    nutritionInfo: {protein:22,fat:8,carbs:30,fiber:4}
  },
  {
    name: "金枪鱼饭团", category: "减脂", tags: ["减脂","日式","快手"], difficulty: 1,
    cookTime: 10, servings: 2, calories: 250, isDietFriendly: true,
    ingredients: [{name:"米饭",amount:"1碗"},{name:"金枪鱼罐头",amount:"半罐"},{name:"海苔",amount:"2片"},{name:"盐",amount:"少许"},{name:"芝麻",amount:"适量"}],
    steps: ["米饭趁热拌入少许盐","金枪鱼沥干油备用","保鲜膜上铺米饭中间放金枪鱼","捏成三角形饭团","贴上海苔片撒芝麻"],
    nutritionInfo: {protein:18,fat:5,carbs:40,fiber:1}
  }
]

module.exports = RECIPES
