# Design

## Context

当前下载区为单个 `.download-card`（max-width 480px）居中，内含一个动态版本号/文件大小的主按钮（JS 通过 VERSION + HEAD 请求探测）。项目为纯静态站点（HTML + CSS + 原生 JS，零构建依赖），所有资源本地托管，无外部字体/脚本依赖。品牌色 `#1677FF`，浅色主题。

## Goals / Non-Goals

**Goals:**
- 下载区双渠道并列展示（EXE + 微软商店）
- 保持纯静态架构，无新增 JS 依赖
- 响应式：桌面双列、移动单列
- EXE 动态版本号探测逻辑保持不变

**Non-Goals:**
- 不引入 Web Component 版 Badge（会增加外部 JS）
- 不改 Hero 区和导航栏的下载入口
- 不改 JSON-LD 结构化数据
- 不新增 VERSION 文件或改文件命名

## Decisions

### D1: Grid 布局承载双卡片

**选择**: CSS Grid，`.download-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; max-width: 960px; margin: 0 auto; }`

**替代方案**: Flexbox + flex-wrap。Grid 对两列等宽布局更直接，且 gap 属性语义明确。

### D2: 微软商店 Badge 类型 — Static 图片

**选择**: 微软官方 Static Badge（`<img>` + `<a>`），语言 zh-CN，主题 Dark。

**替代方案**: Web Component Badge（`<ms-store-badge>` + 外部 JS 脚本）。放弃原因：项目当前零外部 JS 依赖，引入后增加维护面和网络请求；Static Badge 已满足品牌展示需求，微软托管自动同步未来品牌更新。

Badge 图片 URL 确认：`https://get.microsoft.com/images/zh-cn%20dark.svg`（161×44 SVG，Dark 主题，简中语言，2026-10-11 验证 200 OK）。这是微软官方通用 Static Badge，被 Jan（开源 AI 项目）等上架微软商店的成熟项目广泛使用。超链接目标：`https://apps.microsoft.com/detail/9P69FQ3P1WLT`。

### D3: 响应式断点复用 900px

**选择**: 在现有 `@media (max-width: 900px)` 断点内新增 `.download-grid { grid-template-columns: 1fr; }`，不引入新断点。

**替代方案**: 在 600px 断点折叠。放弃原因：双列 480px + 间距后超出 900px 窗口会拥挤，与 features-grid（3→2→1）的断点节奏保持一致。

### D4: 卡片宽度与容器

**选择**: 两列 grid 容器 max-width 960px（原单卡 480px × 2 + 32px gap）。卡片内部结构复用现有 `.download-card` 样式（padding 48px、`--brand-soft` 背景、大圆角），去掉 max-width 限制让卡片撑满 grid cell。

### D5: JS 逻辑零改动

**选择**: `js/main.js` 中的 `initDownloadInfo()` 保持不变，继续探测 EXE 版本号和文件大小并更新 `#download-btn`、`#version-info`、JSON-LD。微软商店为纯静态链接，不涉及动态更新。

## Risks / Trade-offs

**[微软 Badge 图片 URL 失效]** → 微软托管的图片 URL 格式可能变化。实现阶段通过浏览器访问 Badge Generator 确认准确 URL，并在 HTML 中添加 `alt` 文案降级。

**[Badge 品牌变更]** → 微软未来可能重新设计 Store 品牌。Static Badge 图片是微软托管的，官方会同步更新，风险较低。若改用内联图片则品牌变更后需手动替换。

**[移动端卡片高度差]** → 商店 Badge 图片和 EXE 按钮视觉高度可能有差异。通过给两个卡片设置统一的 min-height 或用 `align-items: stretch` 让 grid cell 自动拉伸平衡。
