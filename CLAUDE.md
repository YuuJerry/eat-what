
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
- **ignores 配置**：`['node_modules/**', 'upload.js', 'private.key', '.cc-connect/**', 'scripts/**', '页面样式素材/**', '项目功能说明.md', 'preview-qr.png']`

## 📦 上传小程序标准流程（每次上传必读）

### 方式一：上传到开发版本（推荐）

使用 `ci.upload()` 上传到微信公众平台的"开发版本"，在后台可看到并设置体验版。

```javascript
const result = await ci.upload({
  project,
  version: '1.0.0',  // 版本号
  desc: '版本描述',
  setting: { es6: true, minify: true },
});
```

### 方式二：生成预览二维码

使用 `ci.preview()` 生成二维码，扫码即可在手机上预览，但**不会**出现在开发版本列表中。

```javascript
const result = await ci.preview({
  project,
  desc: '版本描述',
  setting: { es6: true, minify: true },
  qrcodeFormat: 'image',
  qrcodeOutputDest: path.resolve(__dirname, 'eat-what/preview-qr.png'),
});
```

### 完整脚本模板

在 `C:/Users/JerryYuu/Desktop/wx-test/upload.js` 创建：

```javascript
const ci = require('miniprogram-ci');
const path = require('path');

(async () => {
  const project = new ci.Project({
    appid: 'wx59d58721596c93b1',
    type: 'miniProgram',
    projectPath: path.resolve(__dirname, 'eat-what'),
    privateKeyPath: path.resolve(__dirname, '.cc-connect/attachments/private.wx59d58721596c93b1.key'),
    ignores: ['node_modules/**', 'upload.js', 'private.key', '.cc-connect/**', 'scripts/**', '页面样式素材/**', '项目功能说明.md', 'preview-qr.png'],
  });

  try {
    // 上传到开发版本（在微信公众平台后台可见）
    const result = await ci.upload({
      project,
      version: '1.0.0',
      desc: '版本描述',
      setting: { es6: true, minify: true },
    });
    console.log('上传成功:', JSON.stringify(result, null, 2));
  } catch (err) {
    console.error('上传失败:', err);
    process.exit(1);
  }
})();
```

### 步骤 2：执行上传

```bash
cd /c/Users/JerryYuu/Desktop/wx-test && \
NODE_PATH="C:/Users/JerryYuu/AppData/Roaming/npm/node_modules" \
node --dns-result-order=ipv4first upload.js
```

### 步骤 3：清理临时文件

```bash
rm /c/Users/JerryYuu/Desktop/wx-test/upload.js
```

### 步骤 4：展示预览二维码

上传成功后，用 Read 工具展示 `eat-what/preview-qr.png` 给用户扫码预览。

### 注意事项

- **ignores 必须包含**：`页面样式素材/**`（设计稿图片，约13MB，会超2MB限制）、`项目功能说明.md`、`preview-qr.png`
- **私钥路径**：`.cc-connect/attachments/private.wx59d58721596c93b1.key`
- **DNS 参数**：必须加 `--dns-result-order=ipv4first`，否则可能因IP问题失败
- **上传后必须删除** `upload.js`，不要留在项目中

## 架构
