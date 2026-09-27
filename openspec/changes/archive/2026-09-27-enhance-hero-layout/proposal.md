# Proposal

## Why

当前 Hero 区采用居中单列布局（文字 + 两个按钮居中堆叠在一个 max-width 720px 容器里），视觉上比较单薄——首屏没有产品截图露出，用户第一眼只能看到文字。项目已有 4 张高质量产品截图（`01首页.png` 是产品主界面），完全可以利用起来，把 Hero 做成一个更有层次的"左右双列"banner：左边 Slogan + CTA，右边放首页截图的预览缩影。

## What Changes

- Hero 区从**居中单列**改为**左右双列**（desktop）：左侧文字列（Slogan + 副标题 + CTA 按钮），右侧图片列（首页截图 `01首页.png` 的预览缩影，带圆角、柔和阴影、轻微倾斜/装饰元素让它不呆板）
- Hero 内容容器 `max-width` 从 720px 放宽到 1200px（或保持 container 全宽），去掉 `text-align: center`
- Hero 内部用 flex 分两列：文字列 flex: 1、图片列 flex: 1（或图片列略宽），左对齐文字
- 移动端保持单列堆叠（文字在上、截图在下），图片缩小显示
- 截图带 16px 圆角、8px 柔和阴影，可选配底部"投影"装饰（把一个副本放在后面模糊偏移，增加立体感）

## Capabilities

- Modified: `landing-page` — 修改 Hero 区展示（section 元素的内部布局）

## Impact

- 修改文件：`index.html`（Hero 区加 `<div class="hero-visual">`）、`css/style.css`（Hero 布局重写 + 新的 `.hero-visual` / `.hero-preview` 样式 + media query 更新）
- 不改：main.js（Hero 无 JS 逻辑）、其他区块
- 无新资源（用已有 `01首页.png`）
- 零外部依赖
