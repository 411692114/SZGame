# Tasks

## 1. 文件结构搭建

- [x] 1.1 创建 `css/` 和 `js/` 目录，确认根目录已存在 `favicon.ico`、4 张 PNG 截图、`SZGame Setup 1.0.5.exe`、`CNAME` — 验证：`Get-ChildItem -Recurse` 能看到新目录和已有素材

## 2. index.html — 结构与 SEO

- [x] 2.1 创建 `index.html`，写入 HTML5 doctype + 语言 `zh-CN` + `<head>` 包含完整 SEO：TDK（title="SZGame — 本地游戏与程序管理盒子"、description、viewport）、canonical URL（`https://szgame.sinszm.com/`）、Open Graph、Twitter Card、JSON-LD（SoftwareApplication schema）、`link rel="icon" href="favicon.ico"`、`<style>` 引入 `css/style.css`、`<script defer>` 引入 `js/main.js` — 验证：浏览器打开 `<head>` 所有标签完整且 JSON-LD 是合法 JSON
- [x] 2.2 写入 `<body>` 结构：固定 `<nav>`（产品标识 + Gitee 链接 + 下载按钮）、`<header>` Hero 区（主 slogan + 副 slogan + 两个 CTA）、`<section>` 功能特性区（8 张卡片网格，使用 `data-animate` 属性）、`<section>` 截图区（首页大图 + 3 张缩略图，使用 `<a>` 包裹并指向原图以支持 Lightbox）、`<section>` 技术栈（标签列表）、`<section id="download">` 下载区（主下载按钮，使用 `id="download-btn"` 和 `id="version-info"` 供 JS 注入）、`<footer>`（版权 + Gitee 链接 + CNAME）、全部锚点跳转用 `scroll-behavior: smooth` 兼容 — 验证：所有区块可见且顺序正确，导航栏锚点点击能平滑滚动到对应区域

## 3. css/style.css — 样式与动效

- [x] 3.1 定义 `:root` CSS 变量体系：品牌色（`--brand-primary: #1677FF`、hover #4096FF、active #0958D9、soft #E6F4FF）、中性色（bg #FFFFFF、bg-alt #FAFAFA、text-primary #1F2937、text-secondary #6B7280、text-tertiary #9CA3AF、border #E5E7EB、divider #F3F4F6）、圆角（sm 6px、md 10px、lg 16px）、阴影、字体栈（system-ui + -apple-system + Segoe UI + 等无衬线 fallback）— 验证：DevTools 能看到所有变量且值正确
- [x] 3.2 实现基础布局：`* { box-sizing: border-box }`、`html { scroll-behavior: smooth }`、`body { 系统字体栈、#1F2937 文字色、#FFFFFF 背景、margin 0、line-height 1.6 }`、`.container { max-width: 1200px、margin: 0 auto、padding: 0 24px }`、区块间距 `padding: 80px 0` — 验证：页面有一致的容器宽度和区块间距
- [x] 3.3 实现固定导航栏样式：`.navbar { position: fixed、top 0、left 0、right 0、z-index 100、background: rgba(255,255,255,0.95)、backdrop-filter blur }`、滚动时通过 `.navbar.scrolled` 添加 `border-bottom: 1px solid var(--border)` — 验证：滚动超过 20px 后导航栏出现底部边线
- [x] 3.4 实现功能卡片网格：`.features-grid { display: grid、grid-template-columns: repeat(3, 1fr)、gap: 24px }`、`.feature-card { border: 1px solid var(--border)、border-radius: var(--radius-md)、padding: 32px、background: var(--surface)、transition: transform 200ms + box-shadow 200ms }`、`.feature-card:hover { transform: translateY(-4px)、box-shadow: 0 4px 16px rgba(22,119,255,0.08) }` — 验证：悬停时卡片上移且有柔和阴影
- [x] 3.5 实现滚动渐入动效：`[data-animate] { opacity: 0、transform: translateY(16px)、transition: opacity 500ms cubic-bezier(0.22,1,0.36,1), transform 500ms cubic-bezier(0.22,1,0.36,1) }`、`[data-animate].animate-in { opacity: 1、transform: translateY(0) }` — 验证：区块进入视口时渐入，已动画过的不重复
- [x] 3.6 实现 Lightbox 遮罩层：`.lightbox { position: fixed、inset 0、background: rgba(0,0,0,0.85)、z-index: 200、display: flex、align-items: center、justify-content: center }`、`.lightbox img { max-width: 90vw、max-height: 90vh、border-radius: var(--radius-lg) }` — 验证：点击截图弹出全屏遮罩，ESC/点击空白关闭
- [x] 3.7 实现 CTA 按钮和下载按钮：`.btn-primary { background: var(--brand-primary)、color: #fff、border-radius: var(--radius-sm)、padding: 12px 28px、border: none、cursor: pointer、font-size: 16px、font-weight: 500、transition: background 200ms + box-shadow 200ms }`、`.btn-primary:hover { background: var(--brand-hover)、box-shadow: 0 4px 16px rgba(22,119,255,0.3) }` — 验证：主按钮品牌色正确、悬停发光
- [x] 3.8 实现响应式断点：`@media (max-width: 600px)` 功能卡片单列、截图单列、导航间距压缩、Hero 字号减小 — 验证：浏览器 DevTools 模拟 375px 宽度时布局正确折叠

## 4. js/main.js — 交互逻辑

- [x] 4.1 实现滚动渐入 IntersectionObserver：选择所有 `[data-animate]` 元素，创建 observer 配置 `threshold: 0.15`，回调中给可见元素添加 `.animate-in` 后 `unobserve` 防止重复 — 验证：滚动到功能/截图区块时触发渐入，已渐入的区块滚走再回来不重复动画
- [x] 4.2 实现导航栏滚动阴影：`window.addEventListener('scroll')` 中检查 `window.scrollY > 20` 切换 `.scrolled` class — 验证：滚动导航栏出现/消失底部边线
- [x] 4.3 实现动态版本号和文件大小解析：硬编码文件名 `SZGame Setup 1.0.5.exe`，用正则 `(\d+\.\d+\.\d+)` 提取版本号，从 `<a href>` 的 download 属性设置链接，通过 `fetch('SZGame Setup 1.0.5.exe', { method: 'HEAD' })` 读取 Content-Length 计算 MB 大小，失败时 fallback `~84.0 MB` — 验证：下载按钮显示 "下载 SZGame v1.0.5 · 84.0 MB"
- [x] 4.4 实现 Lightbox：给所有截图 `<a>` 添加点击事件，阻止默认后动态创建遮罩层（带 `<img src="原图">` 和关闭按钮可选），添加 keydown 监听 ESC 关闭，点击遮罩层（非图片区域）关闭 — 验证：点击截图弹出 Lightbox，ESC/点击空白关闭，无页面滚动

## 5. 集成验证

- [x] 5.1 在浏览器中完整走查所有区块：导航栏固定 + 滚动阴影、Hero 区元素完整、功能卡片悬停上移 + 阴影、截图 Lightbox 打开/关闭、下载按钮版本号和大小正确显示、Gitee 链接指向正确 URL（`https://gitee.com/sinszer/SZGame.git`）、Footer 信息完整 — 验证：全部交互符合 spec 场景
- [x] 5.2 验证移动端布局：DevTools 模拟 375px 宽度，检查功能卡片、截图、导航是否单列/折叠 — 验证：无横向滚动条、元素不溢出
- [x] 5.3 验证零外部依赖：Chrome DevTools Network 面板过滤 "all"，确认无任何 CDN/Google Fonts/第三方请求（只有本地文件）— 验证：Network 列表全是 `localhost/` 或 `szgame.sinszm.com/` 下的资源
- [x] 5.4 验证 SEO：查看 `<head>` 中 JSON-LD 是否合法、Open Graph 标签完整、canonical URL 正确 — 验证：复制 JSON-LD 到 https://validator.schema.org/ 无错误
