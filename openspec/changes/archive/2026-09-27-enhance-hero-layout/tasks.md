# Tasks

## 1. Hero HTML 结构调整

- [x] 1.1 重构 index.html Hero 区：把 h1+p+hero-actions 包进 `.hero-text`，新增 `.hero-visual > .hero-preview > img(01首页.png)` — 验证：DOM 为 `.hero-content > (.hero-text, .hero-visual)`

## 2. Hero CSS 样式重写

- [x] 2.1 修改 `.hero-content`：max-width 1200px、display flex、gap 64px、align-items center — 验证：computed display=flex
- [x] 2.2 添加 `.hero-text { flex: 1; text-align: left }` — 验证：文字左对齐
- [x] 2.3 添加 `.hero-visual { flex: 1.1 }` + `.hero-preview`（rotate -2deg + shadow + hover 回到 0deg）— 验证：截图有立体感
- [x] 2.4 修改 `.hero-actions { justify-content: flex-start }` — 验证：按钮左对齐

## 3. Hero 移动端适配

- [x] 3.1 @media(max-width:900px) 加 `.hero-content { flex-direction: column }` + 文字居中 + 按钮居中 — 验证：375px 下堆叠
- [x] 3.2 Hero padding 调整（140px→120px top in 600px query）— 验证：不突兀

## 4. 验证

- [x] 4.1 桌面端 1280px：双列平衡 — 验证：11/11 PASS
- [x] 4.2 移动端 375px：纵向堆叠 — 验证：media query 生效
- [x] 4.3 Console 无 error — 验证：browser_console_messages = none
