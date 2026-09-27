# Spec Delta

## MODIFIED Requirements

### Requirement: Hero 区展示
Hero 区 SHALL 以左右双列布局展示（视口宽度 >= 900px）：左侧为文字列，右侧为图片列。文字列 SHALL 包含主 Slogan（"把散落的游戏和程序，收进一个盒子里。"）、副 Slogan（"本地 · 轻量 · 自由"）以及两个 CTA 按钮（主按钮"立即下载"、次按钮"查看功能"），文字 SHALL 左对齐。图片列 SHALL 展示首页截图（`01首页.png`）的预览缩影，带 16px 圆角和柔和投影（阴影或偏移副本），营造立体感。主下载按钮 SHALL 跳转到下载区（页内锚点），次按钮 SHALL 跳转到功能特性区（页内锚点）。

#### Scenario: 桌面端 Hero 双列布局
- **WHEN** 视口宽度 >= 900px
- **THEN** Hero 内容以 flex 左右排列：左列文字占约 50%（左对齐）、右列截图预览占约 50%，整体容器最大宽度 1200px 居中

#### Scenario: 移动端 Hero 单列堆叠
- **WHEN** 视口宽度 <= 600px
- **THEN** Hero 内容改为纵向单列：文字在上、截图在下，按钮改为全宽，整体仍居中

#### Scenario: Hero 区元素完整
- **WHEN** 用户首次访问页面（未滚动）
- **THEN** 首屏可见主 Slogan、副 Slogan、两个 CTA 按钮和一张产品截图预览

#### Scenario: Hero 截图预览立体感
- **WHEN** 展示 Hero 区截图预览
- **THEN** 图片有 16px 圆角、柔和阴影（参考 var(--shadow-card) 或更深的层级），可选配一个偏移模糊的背景副本增强立体感
