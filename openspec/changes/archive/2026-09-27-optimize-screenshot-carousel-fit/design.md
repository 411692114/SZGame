# Design

## Context

截图轮播当前使用 `padding-top: 56.25%`（16:9）撑开容器，图片通过 `object-fit: cover` 填充。但实际截图为 1800×1170（宽高比 1.538:1），比 16:9 更"高"——cover 会导致图片上下被裁剪。

## Goals / Non-Goals

**Goals:**
- 让每张截图完整无裁剪地展示
- 容器宽高比与图片实际比例匹配，消除背景留白
- 保持轮播的箭头、指示点、Lightbox 等交互不变

**Non-Goals:**
- 不改变图片资源本身（如重新裁剪、压缩）
- 不改变 HTML 结构或 JS 逻辑
- 不调整轮播切换速度或指示器样式

## Decisions

### D1: 轮播宽高比改用 65%

- **选择**: `.carousel::before { padding-top: 65%; }`
- **替代**: (a) 保持 56.25% 改 object-fit 为 contain → 会产生左右大段留白（因为图片比容器更窄），视觉上浪费空间；(b) 用 aspect-ratio CSS 属性替代 padding-top hack → 浏览器支持良好但 padding-top hack 更稳妥
- **理由**: 65% = 1170/1800 精确匹配图片比例，容器不再裁剪也不会有多余留白

### D2: object-fit 从 cover 改为 contain

- **选择**: `.carousel-slide img { object-fit: contain; }`（实际容器比例已匹配图片，contain 与 fill 等效，但 contain 语义更安全）
- **理由**: 容器比例匹配后 contain 不会产生裁剪；若未来容器被局部改动，contain 保证图片始终完整可见

## Risks / Trade-offs

- [65% 与图片实际比例 1170/1800=0.65 完全一致] → 无风险
- [图片更换导致比例变化] → 更换图片时同步更新 padding-top 值；当前 4 张图均为同一比例，统一修改即可
