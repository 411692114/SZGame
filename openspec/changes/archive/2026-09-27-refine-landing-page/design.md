# Design

## Context

初版落地页已部署到 GitHub Pages（CNAME: szgame.sinszm.com），包含三个实现文件：`index.html`、`css/style.css`（~545 行）、`js/main.js`（~115 行）。项目已归档了完整 spec（landing-page）。本次 refine 是对已有页面视觉/交互的三个针对性修复，不引入新的 external dependency，不改变整体架构。

## Goals / Non-Goals

**Goals:**
- 将导航栏 logo 从内联 SVG 替换为 `logo.png`（8.3 KB）
- 修复导航栏内 `.btn-primary` 文字被 `.navbar-links a { color: var(--text-secondary) }` 覆盖为灰色的 CSS 优先级 bug，确保白字加粗
- 将 4 张截图的静态网格布局改为轮播（单张大图 + 左右箭头 + 底部指示点 + 自动播放 4s 间隔）
- 保持所有已有功能完整（Lightbox、滚动渐入、下载区动态版本号、移动端适配）

**Non-Goals:**
- 不引入轮播库（如 Swiper）—— 手写，保持零外部依赖
- 不做缩略图预览、不做触摸手势（上 swiper-level 功能）
- 不改变其他区块的样式（Hero、功能卡片、下载区等）
- 不增加暗色模式

## Decisions

### D1：CSS 优先级修复——用更强的 selector 覆盖

**选择**：添加 `.navbar-links .btn-primary { color: #FFFFFF !important; font-weight: 700 !important }` 或用嵌套提升优先级 `a.btn-primary`

**替代方案**：给 `.navbar-links a` 加例外 `:not(.btn-primary)` — 更优雅但影响现有结构

**理由**：两个方案都有效。`:not(.btn-primary)` 更干净但需要理解 `:not` 在 older browser 的支持。直接用 `.navbar-links .btn-primary` 嵌套比 `.navbar-links a` 优先级更高（class > tag），不需要 `!important`。font-weight 700 直接加在 `.btn-primary` 上也可以，因为 `.navbar-links a` 只设了 500，700 会自然覆盖。

### D2：Logo 替换——直接改 HTML + CSS 调整尺寸

**选择**：`<img src="logo.png" class="logo-icon" alt="SZGame">` 替换现有内联 `<svg>`。`.logo-icon` 现有样式 `width: 28px; height: 28px` 对 PNG 也适用。

**替代方案**：保持 SVG 但导入 logo.png 到 SVG `<image>` — 增加复杂度，收益为零。

**理由**：logo.png 是用户提供的现成资源，直接引用即可。只需确保 CSS 中 `.logo-icon` 对 img 和 svg 都生效（当前是通配选择器）。

### D3：轮播实现——纯手写 JS + CSS，4 个步骤

**选择**：轮播采用 `data-carousel` 标记容器，内部 4 个 `.carousel-slide`（绝对定位叠加），通过 `.active` class 控制 z-index + opacity 切换。左右箭头按钮和底部 `.carousel-dots` 指示点。JS 管理 currentIndex + setInterval 自动播放。

**替代方案 A**：引入 Swiper.js — 违反零外部依赖原则。
**替代方案 B**：CSS-only `:checked` + radio input — 无自动播放、无箭头点击回绕、JS 控制不了，体验受限。

**理由**：手写轮播 ~60 行 JS，功能包括自动播放、箭头切换、指示点点击、计时器重置、循环播放。比 radio 方案功能完整得多，又不重。

### D4：Lightbox 在轮播中的行为

**选择**：Lightbox 仍然作用在"当前展示的轮播大图"上，点击该 `<img>` 即可打开。轮播切换后 `<img>` 的 src 更新，Lightbox 自动跟随。

**替代方案**：Lightbox 独立于轮播，支持左右翻页浏览所有 4 张 — 增加复杂度，用户没要求。

**理由**：用户的核心需求是"占用太大 → 改为滚动切换"，Lightbox 功能保持原有的放大查看当前图即可。

### D5：轮播自动播放——4 秒间隔，用户操作后重置计时器

**选择**：`setInterval` 4000ms 自动 next。每次手动 next/prev/goTo（箭头或指示点）时 `clearInterval` + `setInterval` 重置。鼠标 hover 时暂停（可选，但体验好）。

**替代方案**：CSS `@keyframes` + animation-delay — 无法响应用户操作重置。

**理由**：4 秒间隔让用户足够看清截图又不拖沓。手动操作后重置避免"刚点过去又自动切走"的突兀感。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| logo.png 不存在或路径错误 | 已确认文件存在于根目录（8.3 KB）；alt + onerror 兜底 |
| CSS 优先级修复意外影响其他按钮 | 仅在 `.navbar-links` 嵌套作用域内覆盖，不影响 `.btn-secondary` 或其他区域的按钮 |
| 轮播 JS 与现有 main.js 耦合 | 轮播逻辑独立为 `initCarousel()` 函数，DOMContentLoaded 中调用，与 initScrollAnimate/initLightbox 互不依赖 |
| 轮播自动播放在移动端耗电 | hover 时暂停、离开时恢复；移动端可考虑 `prefers-reduced-motion` |

## Open Questions

无。用户三个需求都很明确。
