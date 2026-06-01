# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

「今天吃什么」微信小程序 — 通过规则推荐、转盘随机、食材匹配、减脂餐、多人投票帮助用户决定吃什么。

技术栈：微信小程序原生 + 静态 JSON 菜谱数据 + 规则推荐引擎。零云函数依赖，纯客户端运行。

## 开发命令

```bash
# 用微信开发者工具导入 eat-what/ 目录即可开发
# 无 npm 构建步骤，无云函数部署

# 上传小程序（CLI）
# 私钥从 .cc-connect/attachments/ 复制，用完即删
# 上传脚本临时创建，用完即删
NODE_PATH="C:/Users/JerryYuu/AppData/Roaming/npm/node_modules" \
  node --dns-result-order=ipv4first upload.js
```

## ⚠️ 远程开发注意事项

用户通过 cc-connect 远程操作，**无法直接操作电脑 GUI**（微信开发者工具安装、UAC 弹窗等均不可用）。

- **上传小程序**：用 `miniprogram-ci` CLI，需 IPv4 DNS + 私钥文件
- **私钥文件**：`private.wx59d58721596c93b1.key` 每次上传时从 `.cc-connect/attachments/` 复制，用完即删
- **上传脚本**：临时创建 `C:/Users/JerryYuu/Desktop/wx-test/upload.js`，完成后删除
- **miniprogram-ci 全局路径**：`C:\Users\JerryYuu\AppData\Roaming\npm\node_modules\miniprogram-ci`
- **ignores 配置**：`['node_modules/**', 'upload.js', 'private.key', '.cc-connect/**', 'scripts/**']`

## 架构

### 页面结构（9 个页面，4 个 tabBar）

```
首页(home)  菜谱(recipe/list)  投票(vote/lobby)  我的(profile)  ← tabBar
  │              │                  │                │
  ├→ 冰箱推荐    ├→ 菜谱详情        ├→ 投票房间       └→ 偏好设置
  ├→ 减脂餐     (recipe/detail)    (vote/room)
  ├→ 转盘随机
  (index)
```

### 数据层

```
data/recipes.js          ← 74 道预置菜谱（require 即用，零延迟）
data/videos.js           ← Bilibili 视频链接（73/74 道菜有视频）
utils/recipe-engine.js   ← 规则推荐引擎，启动时合并 recipes + videos
utils/cloud.js           ← 投票功能（本地存储 + 投票码编码）
utils/foods.js           ← 转盘预设食物数据
utils/icons.js           ← 手绘图标路径映射
config/api.js            ← AI API 配置（.gitignore 排除，不提交）
```

### 推荐引擎

```
getHotRecipes()          ← 首页热门（从 isHot 标记的 15 道菜中随机取 4 道）
getRecipesByCategory()   ← 按分类筛选 + 打分排序
searchRecipes()          ← 关键词匹配（名称/标签/食材）
getRecipeDetail()        ← 精确名称查找，找不到返回 null
getDietRecipes()         ← isDietFriendly 筛选
matchByIngredients()     ← 冰箱食材匹配率计算
aiRecommendByIngredients() ← AI fallback（讯飞星火，仅冰箱推荐）
```

### 打分规则

```
分类匹配       +30
减脂标记匹配   +20
名称关键词匹配  +25
标签匹配       +15
食材匹配       每个 +15
难度适中(≤2)   +5
随机因子       0-20（保证每次刷新不同）
```

### 投票系统

纯本地存储方案，不需要云数据库或云函数：

```
创建投票 → 生成 6 位房间码 → 数据存 wx.getStorageSync
复制投票码 → 粘贴发给好友
好友输入投票码 → 从投票码解码数据 → 创建本地投票 → 投票
投票码格式: 投票码:XXXXXX|encoded_data（包含标题+选项）
```

`utils/cloud.js` 尽管名称是 cloud，实际是纯本地存储（`wx.getStorageSync('vote_rooms')`）。

### 客户端数据存储

| Key | 用途 |
|-----|------|
| `eat_what_favorites` | 收藏的菜谱 |
| `eat_what_fridge_selected` | 冰箱已选食材 |
| `vote_rooms` | 投票房间数据 |
| `vote_history` | 投票历史列表 |
| `user_profile` | 用户偏好设置 |
| `eat_what_recipe_cache` | 菜谱推荐缓存 |

### 菜谱详情页数据传递

菜谱详情页通过 `eventChannel` 接收完整数据（不依赖 URL 参数重建）：
1. 调用页 `wx.navigateTo` 成功后 `res.eventChannel.emit('recipeData', recipe)`
2. 详情页 `getOpenerEventChannel().on('recipeData', callback)`
3. 300ms 超时后 fallback 到 `recipeEngine.getRecipeDetail(name)` 查本地数据

### 视频教程

- 数据来源：`data/videos.js`（Bilibili API 批量抓取）
- 合并时机：`recipe-engine.js` 启动时 merge 到 ALL_RECIPES
- 点击行为：`wx.navigateToMiniProgram` 跳转 Bilibili 小程序，失败则复制链接

### 样式约定

- 主色 `#FF6B6B`，辅色 `#4ECDC4`，背景 `#FFF5F5`
- 全局类：`.card`、`.btn-primary`/`.btn-secondary`、`.tag`/`.tag-active`、`.hand-drawn-placeholder`
- 所有尺寸使用 `rpx`

### 导航规则

- tabBar 页面间跳转用 `wx.switchTab`
- 非 tabBar 页面用 `wx.navigateTo`
- 菜谱详情通过 `eventChannel` 传递完整数据
- 投票房间传参 `?code=` 或 `?code=&data=`

### AI API 配置（仅冰箱推荐 fallback）

- 接口：`https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic/v1/messages`
- 格式：Anthropic 兼容（`x-api-key` + `anthropic-version` headers）
- 配置文件：`config/api.js`（.gitignore 排除，模板在 `config/api.example.js`）
- 调用位置：`utils/recipe-engine.js` 的 `callAI()` 和 `aiRecommendByIngredients()`
