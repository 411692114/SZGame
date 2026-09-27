# Proposal

## Why

落地页初版已部署到 GitHub Pages，但经过实际查看发现三处可快速改进的问题：导航栏左上角使用内联 SVG 作为品牌 logo 不够精美（已有现成的 `logo.png`）、导航栏下载按钮因 CSS 优先级 bug 文字显示为深灰色而非白色（蓝色背景配白字才符合品牌风格）、4 张产品截图以静态网格形式占位过大（桌面端 1 张大图 + 3 张缩略图占据过多纵向空间）。这三项都是视觉/体验层面的 refine，不引入新功能模块。

## What Changes

- **Logo 替换**：导航栏左上角的内联 `<svg class="logo-icon">` 替换为 `<img src="logo.png" class="logo-icon">`
- **导航栏下载按钮文字**：修复 `.navbar-links a { color: var(--text-secondary) }` 优先级覆盖 `.btn-primary { color: #FFFFFF }` 的 CSS bug，确保导航栏内的下载按钮文字为白色且加粗（font-weight 700）
- **截图区改为轮播**：移除首页大图 + 3 张缩略图的静态网格布局，改为单张大图 + 左右箭头切换 + 底部指示点，每次只展示 1 张截图，4 张图循环切换，支持手动点击箭头/指示点和自动轮播

## Capabilities

### New Capabilities

（无新 capability，以下为对已有 capability 的修改）

### Modified Capabilities
- `landing-page`: 修改页面结构与导航（logo 源）、视觉风格与品牌色（导航栏按钮文字）、产品截图展示（从静态网格改为轮播）

## Impact

- **修改文件**：`index.html`、`css/style.css`、`js/main.js`
- **新增资源**：`logo.png`（已存在于根目录）
- **外部依赖**：仍然零外部依赖（轮播 JS 手写，约 60 行）
- **构建**：无构建步骤
- **已归档的 landing-page main spec**（`openspec/specs/landing-page/spec.md`）将在 archive 时同步更新
