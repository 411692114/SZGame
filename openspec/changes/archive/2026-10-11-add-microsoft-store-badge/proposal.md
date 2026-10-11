# Proposal

## Why

SZGame 已上架微软商店（Product ID: 9P69FQ3P1WLT），但落地页仅提供 exe 单一下载渠道。用户在商店内发现应用的概率高于独立网站，而双渠道并列展示能让已有商店偏好的用户直接选择商店版（享受自动更新），同时保留 exe 直装渠道给需要便携版的用户。

## What Changes

- 下载区从单卡片重构为双卡片并列布局（grid 2 列），分别承载 EXE 直装和微软商店两个渠道
- EXE 卡片保留动态版本号/文件大小探测逻辑，增加渠道标题（"直接下载"）和渠道说明（"便携版 · 无需安装"）
- 新增微软商店卡片，嵌入微软官方 Static Badge 图片（零 JS 依赖），链接指向 `https://apps.microsoft.com/detail/9P69FQ3P1WLT`
- 跨渠道辅助文案从"支持 Windows · MIT License · 单文件便携"改为"支持 Windows · MIT License · 两种安装渠道"
- 响应式：桌面端（≥ 900px）双列并列，移动端（< 900px）单列堆叠（EXE 在上，商店在下）

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `landing-page`: "下载区与版本信息" Requirement 扩展为双渠道并列布局，下载区的卡片结构、辅助文案和响应式行为均发生变化

## Impact

- **HTML**: `index.html` 下载区从单 `<div class="download-card">` 重构为 grid 容器包含两个卡片
- **CSS**: `css/style.css` 新增 `.download-grid` 布局、`.store-badge` 样式、移动端响应式规则；调整 `.download-card` 宽度限制
- **JS**: `js/main.js` 无改动（EXE 动态探测逻辑保持不变，微软商店为纯静态链接）
- **外部资源**: 新增一张微软托管的 Static Badge 图片（通过 `<img src>` 嵌入，无新 JS 依赖）
- **无破坏性变更**: 现有导航栏下载按钮、Hero 区下载按钮、exe 文件下载逻辑均不受影响
