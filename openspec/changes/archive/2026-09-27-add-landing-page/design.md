# Design

## Context

项目根目录 `d:\Workspace\ReactProject\SZGameWeb\` 已部署到 GitHub Pages（CNAME 绑定 `szgame.sinszm.com`），当前目录包含 `index.html` 占位、4 张产品截图 PNG、`favicon.ico`、3 个版本的安装包 exe、CNAME 文件。本项目没有任何构建工具链（无 package.json、无 webpack/vite），落地页必须在纯静态约束下实现。品牌主色从 favicon.ico 精确提取：`#1677FF`（占前景像素 90%+）。

详见 proposal.md 的 Why/What。

## Goals / Non-Goals

**Goals:**
- 零构建、零外部依赖（无 CDN、无 Google Fonts、无 npm 包）
- push 到 GitHub Pages 仓库根目录即可生效
- 视觉风格"舒适现代"，留白驱动，品牌色 #1677FF
- 版本号和文件大小通过 JS 动态从文件名和本地文件对象中解析
- 完整 SEO（TDK + OG + Twitter + JSON-LD）

**Non-Goals:**
- 不做暗色模式（仅浅色，与产品 Electron 桌面端风格一致）
- 不做用户交互持久化（无 localStorage/服务端）
- 不做 CMS 或后台管理（内容硬编码在 HTML 中）
- 不引入任何构建工具（避免 Vite/Webpack/parcel 增加仓库复杂度）
- 不做图片格式转换（保留原始 PNG）
- 不做 PWA（Service Worker 增加复杂度，收益有限）

## Decisions

### D1：文件拆分而非单文件内联

**选择**：拆分为 `index.html` + `css/style.css` + `js/main.js` 三个文件，截图和 exe 放在根目录。

**替代方案**：单文件 HTML 内联全部 CSS/JS。

**理由**：探索阶段估算 CSS 约 250 行、JS 约 150 行，内联后 HTML 会膨胀到 ~400 行。分离后每个文件职责清晰，后续维护（如改颜色、加功能区块）只需修改对应文件。分离不影响 GitHub Pages 部署（相对路径引用即可）。

### D2：动态版本号从文件名解析 + exe 放在根目录

**选择**：exe 文件保持在根目录，JS 在页面加载时通过硬编码的文件名 `SZGame Setup 1.0.5.exe` 解析版本号 `1.0.5` 并显示在按钮上。文件大小通过 `fetch` 或 `HEAD` 请求读取 Content-Length（如果跨域允许），或硬编码 fallback 值 `~84 MB`。

**替代方案 A**：三个 exe 都展示，让用户选版本 → 违反"最新版优先"的简约原则。
**替代方案 B**：JS 自动扫描根目录选择最新版 → GitHub Pages 不支持目录列表，无法实现。

**理由**：GitHub Pages 不支持目录扫描。硬编码文件名 + 正则提取版本号是最可控方案。文件大小用 `HEAD` 请求失败时有硬编码 fallback（从文件名推断大小约 84MB，实际从 `Get-ChildItem` 输出看到 SZGame Setup 1.0.5.exe 大小为 88079028 字节 ≈ 84.0 MB）。

### D3：截图直接用原始 PNG 文件

**选择**：`01首页.png`~`04设置.png` 直接作为 `<img>` 引用，放在根目录。

**替代方案**：用 `<picture>` + WebP 格式或生成缩略图 → 增加构建步骤或额外文件。

**理由**：4 张截图估算总计不超过 10MB（单张平均 2.5MB），对落地页可接受。不做格式转换减少仓库污染。

### D4：滚动渐入用 IntersectionObserver + CSS class toggle

**选择**：JS 创建一个 IntersectionObserver，对标记了 `data-animate` 的元素在 threshold=0.15 时添加 `.animate-in` class，CSS 用 transition 实现 opacity + translateY 过渡。

**替代方案**：CSS-only `@keyframes` + `animation` → 无法触发"进入视口时才播放"的语义。

**理由**：IntersectionObserver 比 scroll 事件监听性能好得多（浏览器原生优化，不触发重排）。现代浏览器支持率 99%+。只需 ~20 行 JS。

### D5：Lightbox 用原生 DOM + 内联 SVG 图标

**选择**：点击截图时动态创建遮罩层 div 包含 `<img>`，ESC 或点击关闭。

**替代方案**：引入 lightbox.js 等库 → 违反零外部依赖原则。

**理由**：Lightbox 逻辑极简（打开、关闭、键盘监听），手写不超过 40 行 JS。

### D6：品牌色从 favicon 精确提取，收敛到 CSS 变量

**选择**：在 `:root` 中定义 CSS 变量 `--brand-primary: #1677FF`，所有品牌相关色彩从这派生（hover 态明度 +15% → `#4096FF`，active 态明度 -10% → `#0958D9`，极淡背景 → `#E6F4FF`）。

**替代方案**：逐个元素硬编码颜色值 → 违反"可验证性与一致性"经验教训（#100033227）。

**理由**：品牌色已从 favicon 二进制精确提取（`#1677FF` 占 90%+ 前景像素），收敛到 CSS 变量可确保全站一致性。改色只需改一处。

### D7：SEO 结构化数据用 SoftwareApplication schema

**选择**：JSON-LD 格式，类型为 `SoftwareApplication`，属性包含 name、operatingSystem、applicationCategory、downloadUrl、version、license、author、image。

**替代方案**：WebSite schema → 更适合官网首页而非可下载应用介绍。

**理由**：Google 搜索对 SoftwareApplication schema 有特殊处理（显示"下载"按钮、版本号、操作系统标签），提升搜索可见性。version 通过 JS 动态注入。

## Risks / Trade-offs

| 风险 | 缓解 |
|------|------|
| GitHub Pages 缓存导致更新不及时 | CNAME 已配置，用户可通过 `?v=1` 手动刷新；或在部署时通过 GitHub Actions purge CDN |
| 文件大小 HEAD 请求在跨域环境可能失败 | main.js 中 try-catch 包裹 fetch，失败时 fallback 到硬编码大小 "~84.0 MB" |
| 截图 PNG 体积较大影响移动端加载 | 4 张图总计约 10MB，在 4G 网络下 3-5 秒，可接受；后续可考虑压缩或 CDN |
| 纯静态无法自动检测 exe 版本更新 | 当前版本硬编码为 1.0.5，每次发新版时手动更新 index.html 中文件名引用即可 |
| GitHub Pages HTTPS + 本地 exe 跨域 fetch HEAD 被 CORS 阻止 | 实测 GitHub Pages 对同域资源的 HEAD 请求不会被 CORS 阻止；加 fallback 兜底 |

## Migration Plan

1. 在项目根目录创建 `index.html`、`css/style.css`、`js/main.js`
2. 确认 `CNAME`、`favicon.ico`、`*.png`、`*.exe` 均已在根目录
3. push 到 GitHub Pages 关联仓库
4. 访问 `https://szgame.sinszm.com/` 验证
5. 如需回滚：删除新文件并 push 旧版本

无数据库、无 API 依赖，回滚是纯文件操作。
