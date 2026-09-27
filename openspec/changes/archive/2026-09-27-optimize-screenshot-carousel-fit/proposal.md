# Proposal

## Why

当前截图轮播容器使用 16:9 宽高比（padding-top: 56.25%），但 4 张产品截图实际尺寸为 1800×1170（宽高比 ≈ 1.538:1，比 16:9 更"高"）。CSS 使用 `object-fit: cover` 导致每张截图的顶部和底部被裁剪，用户无法看到完整界面。

## What Changes

- 轮播容器宽高比从 16:9（56.25%）调整为与图片实际比例匹配（1170/1800 = 65%）
- `object-fit` 从 `cover` 改为 `contain`，确保整张截图可见，无裁剪
- 调整轮播容器在桌面端和移动端的展示宽度，保持良好视觉平衡

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `landing-page`：修改"产品截图展示" requirement 的轮播展示方式，图片 SHALL 完整可见无裁剪

## Impact

- `css/style.css` — `.carousel::before` 的 padding-top 值，`.carousel-slide img` 的 object-fit
- `openspec/specs/landing-page/spec.md` — "产品截图展示" requirement 的 delta spec（archive 时同步）
- 不涉及 HTML 结构、JS 逻辑、API 或依赖
