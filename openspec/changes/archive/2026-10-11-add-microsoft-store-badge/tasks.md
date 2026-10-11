# Tasks

## 1. 资源确认

- [x] 1.1 通过浏览器访问 `https://apps.microsoft.com/badge/9P69FQ3P1WLT`，选择 Static Badge + zh-CN + Dark，确认生成的图片 URL 格式，记录到设计文档中（当前 design.md D2 留有占位）

## 2. HTML 重构（index.html）

- [x] 2.1 重构下载区 HTML：将原单 `<div class="download-card">` 改为 `<div class="download-grid">` 包含两个卡片 div，EXE 卡片带 `id="download-card"` 保留原有 JS 钩子，微软商店卡片嵌入 Static Badge 的 `<a><img></a>` 结构，跨渠道辅助文案放在 grid 下方
- [x] 2.2 EXE 卡片内新增渠道标题（"直接下载"）和渠道说明（"便携版 · 无需安装"）；微软商店卡片新增渠道标题（"微软商店"）、副信息（"在线安装 · 自动更新"）和渠道说明（"商店版 · 自动更新"）

## 3. CSS 样式（css/style.css）

- [x] 3.1 新增 `.download-grid` 样式：`display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 960px; margin: 0 auto;`；调整 `.download-card` 去掉 `max-width` 限制，保持内边距和背景
- [x] 3.2 新增渠道标题样式（如 `.download-channel-title`）、渠道副信息样式、微软商店卡片内 `.store-badge` 样式（max-width 控制图片尺寸、hover 过渡）
- [x] 3.3 在 `@media (max-width: 900px)` 断点内新增 `.download-grid { grid-template-columns: 1fr; }`；在 `@media (max-width: 600px)` 内调整卡片内边距（复用现有 `.download-card` padding 调整规则）

## 4. 验证

- [x] 4.1 桌面端（≥ 900px）浏览器打开页面：双卡片并列、EXE 版本号/文件大小 JS 动态填充正常、微软商店 Badge 图片显示正常、点击 Badge 在新标签打开 `https://apps.microsoft.com/detail/9P69FQ3P1WLT`
- [x] 4.2 移动端（< 900px）浏览器打开页面：双卡片单列堆叠（EXE 在上、商店在下）、各卡片内元素居中对齐、跨渠道辅助文案正常
- [x] 4.3 导航栏下载按钮（`#download` 锚点）、Hero 区下载按钮（`#download` 锚点）均正常跳转至下载区
