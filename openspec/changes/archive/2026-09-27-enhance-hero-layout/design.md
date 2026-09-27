# Design

## Context

当前 Hero 区为居中单列：`.hero-content { max-width: 720px; margin: 0 auto; text-align: center }`。Slogan、副标题、按钮全部居中堆叠在一个窄容器里。移动端（<=600px）只是缩小字号和按钮宽度。

## Goals / Non-Goals

**Goals:**
- Hero 桌面端改为左右双列（文字左对齐 + 右侧截图预览），提升品牌第一印象
- 保持移动端友好（纵向单列堆叠）
- 不引入新图片资源（复用 `01首页.png`）
- 不改变其他区块的布局

**Non-Goals:**
- 不做 3D 倾斜、视差滚动等花哨效果
- 不在 Hero 区做复杂动效（hover 截图轻微放大就够了）
- 不改变 Slogan 文字内容或按钮文案

## Decisions

### D1：HTML 结构 — 最小改动，语义分组

**选择**：把现有 `.hero-content` 分成两个子 div：

```html
<div class="container hero-content">
  <div class="hero-text">
    <h1 class="hero-slogan">...</h1>
    <p class="hero-subtitle">...</p>
    <div class="hero-actions">...</div>
  </div>
  <div class="hero-visual">
    <div class="hero-preview">
      <img src="01首页.png" alt="SZGame 首页预览">
    </div>
  </div>
</div>
```

**替代方案**：把两个 div 设为 flex 子项 — 更简单，不需要 wrapper。

**理由**：`.hero-content` 作为 flex 容器，直接包含 `.hero-text` 和 `.hero-visual` 两个 flex 子项，清晰且不嵌套过深。

### D2：图片装饰 — 偏移副本做背景阴影

**选择**：`.hero-preview` 内放两层——外层一个模糊偏移的"投影副本"，内层主图。或更简单：只用一个大 box-shadow + 轻微 rotate(-2deg) 让图不那么呆板。

**理由**：rotate + shadow 的组合效果好且实现简单（两行 CSS），不需要额外 DOM 元素。

### D3：响应式断点 — 复用现有 900px / 600px

**桌面（>=900px）**：`.hero-content { display: flex; gap: 48px }`，`.hero-text { flex: 1 }`，`.hero-visual { flex: 1 }` 或 `flex: 1.1`（图片略宽更有视觉分量）。

**移动（<=600px）**：`.hero-content { flex-direction: column }`，文字在上图片在下，`.hero-visual img { width: 100% }`。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| 首屏高度变大导致需要滚动 | 合理设置 hero padding（目前 160px top 120px bottom，可能要调），图片 max-height 限制 |
| 双列后文字区域变窄，长 Slogan 换行不好看 | flex: 1 平分（各 50%）在 1200px 容器里每列约 550px，48px gap，足够容纳中文 Slogan |

## Open Questions

无。
