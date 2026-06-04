
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

- **上传小程序**：用 `miniprogram-ci` CLI，需 IPv4 DNS + 私钥文件
- **私钥文件**：`private.wx59d58721596c93b1.key` 每次上传时从 `.cc-connect/attachments/` 复制，用完即删
- **上传脚本**：临时创建 `C:/Users/JerryYuu/Desktop/wx-test/upload.js`，完成后删除
- **miniprogram-ci 全局路径**：`C:\Users\JerryYuu\AppData\Roaming\npm\node_modules\miniprogram-ci`
- **ignores 配置**：`['node_modules/**', 'upload.js', 'private.key', '.cc-connect/**', 'scripts/**']`

## 架构
