# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

「今天吃什么」微信小程序 — 通过智能推荐、转盘随机、食材匹配、减脂餐、多人投票帮助用户决定吃什么。

技术栈：微信小程序原生 + 微信云开发（云函数 + 云数据库）。

## 开发命令

```bash
# 用微信开发者工具导入 eat-what/ 目录即可开发
# 无 npm 构建步骤，云函数需单独上传部署

# 初始化数据库（在云开发控制台运行 cloud/db-init.js）
# 或将 cloud/functions/ 下的函数逐个上传到云开发环境
```

## 部署前必须替换

- `app.js` 中的 `envId: 'eat-what-xxx'` → 你的云开发环境 ID
- `cloud/cloudbaserc.json` 中的 `envId` → 同上
- `project.config.json` 中的 `appid: 'touristappid'` → 你的小程序 AppID

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

### 数据流

```
页面事件 → utils/cloud.js API → wx.cloud.callFunction → cloud/functions/* → 云数据库
```

页面从不直接调用 `wx.cloud.callFunction`，一律通过 `utils/cloud.js` 的 API 封装。

### 云函数响应契约

所有云函数统一返回 `{ success: boolean, data?, error? }`。
`utils/cloud.js` 中所有 API 调用失败时返回 `null`（不抛异常）。

### 核心云函数

| 函数 | 关键逻辑 |
|------|---------|
| `smartRecommend` | 7 维加权评分（口味匹配+20、饮食目标+30、低卡+15、快手菜+15、忌口-50、过敏-100、历史-25）|
| `searchByIngredients` | 食材覆盖率匹配，≥50% 才返回，按匹配度排序 |
| `createRoom` | 生成 6 位房间码（排除易混淆字符 I/0/1/O/L），24 小时过期 |

### 客户端 vs 云端

- `pages/index/index`（转盘随机）是纯客户端页面，使用 `utils/foods.js` 本地数据 + `wx.getStorageSync` 持久化
- 其余所有页面通过云函数读写数据

### 样式约定

- 主色 `#FF6B6B`，辅色 `#4ECDC4`，背景 `#FFF5F5`
- 全局类：`.card`（白底圆角卡片）、`.btn-primary`/`.btn-secondary`（渐变胶囊按钮）、`.tag`/`.tag-active`、`.hand-drawn-placeholder`（虚线占位图）
- 所有尺寸使用 `rpx`

### 导航规则

- tabBar 页面间跳转用 `wx.switchTab`
- 非 tabBar 页面用 `wx.navigateTo`
- 菜谱详情传参 `?id=`，投票房间传参 `?code=` 或 `?id=`

### 云函数通用模板

```js
const cloud = require('wx-server-sdk')
cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV })
const db = cloud.database()
const _ = db.command

exports.main = async (event, context) => {
  try {
    // 逻辑
    return { success: true, data: result }
  } catch (err) {
    return { success: false, error: err.message }
  }
}
```
