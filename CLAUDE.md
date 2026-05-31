# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

「今天吃什么」微信小程序 — 通过规则推荐、转盘随机、食材匹配、减脂餐、多人投票帮助用户决定吃什么。

技术栈：微信小程序原生 + 静态 JSON 菜谱数据 + 规则推荐引擎。

## 开发命令

```bash
# 用微信开发者工具导入 eat-what/ 目录即可开发
# 无 npm 构建步骤，无云函数部署

# 上传小程序（CLI）
node --dns-result-order=ipv4first upload.js
```

## ⚠️ 远程开发注意事项

用户通过 cc-connect 远程操作，**无法直接操作电脑 GUI**（微信开发者工具安装、UAC 弹窗等均不可用）。

- **上传小程序**：用 `miniprogram-ci` CLI，需 IPv4 DNS + 私钥文件（在 `.cc-connect/attachments/` 下）
- **私钥文件**：`private.wx59d58721596c93b1.key` 每次上传时从 `.cc-connect/attachments/` 复制，用完即删
- **上传脚本**：临时创建 `C:/Users/JerryYuu/Desktop/wx-test/upload.js`，用 `NODE_PATH=全局npm路径 node --dns-result-order=ipv4first upload.js` 执行，完成后删除
- **miniprogram-ci 全局路径**：`C:\Users\JerryYuu\AppData\Roaming\npm\node_modules\miniprogram-ci`

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

### 推荐引擎架构（核心）

```
data/recipes.js          ← 47 道预置菜谱（require 即用，零延迟）
utils/recipe-engine.js   ← 规则推荐引擎
  ├─ getHotRecipes()     ← 首页热门（打分排序，每次随机）
  ├─ getRecipesByCategory() ← 按分类筛选 + 打分
  ├─ searchRecipes()     ← 关键词匹配（名称/标签/食材）
  ├─ getRecipeDetail()   ← 按名称查找详情
  ├─ getDietRecipes()    ← 减脂餐筛选
  ├─ matchByIngredients() ← 冰箱食材匹配（计算匹配率）
  └─ aiRecommendByIngredients() ← AI fallback（讯飞星火）
```

### 打分规则

```
分类匹配       +30
减脂标记匹配   +20
名称关键词匹配  +25
标签匹配       +15
食材匹配       每个 +15
难度适中(≤2)   +5
热度(likes)    归一化 0-10
随机因子       0-20（保证每次刷新不同）
```

### 冰箱推荐流程

```
用户选食材 → matchByIngredients() → 静态匹配
  ├─ 匹配率 ≥ 30% 且结果 ≥ 2 个 → 直接返回（秒开）
  └─ 匹配不足 → aiRecommendByIngredients() → AI 生成补充
```

### 客户端数据

- `pages/index/index`（转盘随机）：使用 `utils/foods.js` 本地数据 + `wx.getStorageSync` 持久化
- 所有菜谱页面：使用 `data/recipes.js` + `utils/recipe-engine.js`
- 收藏：`wx.getStorageSync('eat_what_favorites')` 本地存储
- 冰箱选中食材：`wx.getStorageSync('eat_what_fridge_selected')` 本地存储

### 样式约定

- 主色 `#FF6B6B`，辅色 `#4ECDC4`，背景 `#FFF5F5`
- 全局类：`.card`（白底圆角卡片）、`.btn-primary`/`.btn-secondary`（渐变胶囊按钮）、`.tag`/`.tag-active`、`.hand-drawn-placeholder`（虚线占位图）
- 所有尺寸使用 `rpx`

### 导航规则

- tabBar 页面间跳转用 `wx.switchTab`
- 非 tabBar 页面用 `wx.navigateTo`
- 菜谱详情通过 `eventChannel` 传递完整数据（不依赖 URL 参数重建）
- 投票房间传参 `?code=` 或 `?id=`

### AI API 配置（仅冰箱推荐 fallback）

- 接口：`https://maas-coding-api.cn-huabei-1.xf-yun.com/anthropic/v1/messages`
- 格式：Anthropic 兼容（`x-api-key` + `anthropic-version` headers）
- 调用位置：`utils/recipe-engine.js` 的 `callAI()` 和 `aiRecommendByIngredients()`
