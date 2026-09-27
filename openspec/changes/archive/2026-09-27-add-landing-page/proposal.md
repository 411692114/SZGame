# Proposal

## Why

SZGame 作为一款本地游戏/程序管理工具，目前没有独立的产品介绍页面。项目已通过 CNAME 绑定了 `szgame.sinszm.com` 域名并部署到 GitHub Pages，但根目录只有 README 和安装包，访问域名时缺乏专业的品牌呈现。需要一个简约、大气、现代的单页落地页来建立产品形象、展示核心功能、提供下载入口。

## What Changes

- 新增纯静态单页落地页（HTML + CSS + JS，零构建、零外部依赖），直接部署在 GitHub Pages 根目录
- 落地页包含：固定导航栏、Hero 区（Slogan + 下载 CTA）、功能特性网格、产品截图展示区（带 Lightbox）、技术栈标签、下载区、Footer
- 设计风格：舒适现代风，品牌色 #1677FF（从 favicon 提取），留白驱动，克制层级，系统字体栈
- 动效：IntersectionObserver 实现滚动渐入 + 悬停微交互
- SEO：完整 TDK、Open Graph、Twitter Card、canonical URL、JSON-LD（SoftwareApplication schema）
- 下载链接动态指向 `SZGame Setup 1.0.5.exe`，显示版本号和文件大小
- 导航栏和 Footer 中的仓库链接指向 Gitee（`https://gitee.com/sinszer/SZGame.git`）

## Capabilities

### New Capabilities
- `landing-page`: 单页产品介绍网站，展示 SZGame 功能、截图、技术栈、下载入口，支持 GitHub Pages 纯静态部署

### Modified Capabilities

（无已有能力需要修改）

## Impact

- **新增文件**：`index.html`、`css/style.css`、`js/main.js`
- **已有文件复用**：`favicon.ico`、`01首页.png`~`04设置.png`、`SZGame Setup 1.0.5.exe`、`CNAME`（均保持原位不移动）
- **外部依赖**：无（不引入 CDN、Google Fonts、npm 包等任何外部资源）
- **构建**：无构建步骤，push 即部署
