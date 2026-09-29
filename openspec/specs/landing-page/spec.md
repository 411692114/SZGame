# landing-page Specification

## Purpose

为 SZGame 产品提供一个单页静态落地网站，建立品牌形象，展示核心功能与产品截图，提供清晰的下载入口和代码仓库链接，支持 GitHub Pages 直接部署且零构建依赖。

## Requirements

### Requirement: 页面结构与导航
落地页 SHALL 为单页长滚动布局，包含以下区块顺序：固定导航栏 → Hero 区 → 功能特性 → 产品截图 → 技术栈 → 下载区 → Footer。导航栏 SHALL 在滚动超过 20px 后显示底部边线。导航栏 SHALL 包含产品 Logo/名称、代码仓库链接（Gitee）、下载按钮三个元素。产品 Logo SHALL 使用项目根目录下的 `logo.png` 图片文件，不使用内联 SVG。导航栏的代码仓库链接和 Footer 的代码仓库链接均 SHALL 指向 `https://gitee.com/sinszer/SZGame.git`。

#### Scenario: 导航栏固定与滚动阴影
- **WHEN** 页面加载后用户向下滚动超过 20px
- **THEN** 导航栏保持顶部固定（position: fixed）并出现底部分割线阴影

#### Scenario: 导航栏元素完整
- **WHEN** 页面加载完成
- **THEN** 导航栏从左到右依次展示产品标识、Gitee 链接、下载按钮

#### Scenario: Logo 使用 PNG 图片
- **WHEN** 页面加载完成
- **THEN** 导航栏品牌区域展示的是 `<img src="logo.png">` 而非内联 SVG

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

### Requirement: 功能特性展示
功能特性区 SHALL 以卡片网格展示 SZGame README 中列出的 8 项核心功能：游戏卡片网格、分组管理、全局搜索、封面管理、快速启动、拖拽排序、系统托盘、自动更新。每张功能卡片 SHALL 包含一个图标（Emoji 或 SVG）和功能名称，悬停时 SHALL 有轻微上移效果（translateY -4px）和品牌色阴影。

#### Scenario: 功能卡片网格布局
- **WHEN** 视口宽度 >= 900px
- **THEN** 功能卡片以三列网格排列

#### Scenario: 功能卡片移动端自适应
- **WHEN** 视口宽度 <= 600px
- **THEN** 功能卡片自动折叠为单列排列

#### Scenario: 功能卡片悬停交互
- **WHEN** 鼠标悬停在功能卡片上
- **THEN** 卡片在 200ms 内上移 4px 并显示 rgba(22,119,255,0.08) 柔和阴影

### Requirement: 产品截图展示
截图区 SHALL 以轮播形式展示 4 张产品截图（首页、详情抽屉、收藏夹、设置），每次只展示 1 张大图。轮播容器的宽高比 SHALL 与截图实际宽高比一致（1800:1170 ≈ 16:10.4），每张截图 SHALL 完整可见，无任何方向的裁剪（使用 contain 而非 cover），超出图片宽高比的容器区域 SHALL 以页面底色填充。轮播 SHALL 提供左右箭头按钮手动切换和底部指示点（当前激活高亮）。轮播 SHALL 支持自动播放（4 秒间隔），用户手动点击箭头或指示点后 SHALL 重置自动播放计时器。所有截图 SHALL 支持 Lightbox：点击当前展示的大图后弹出全屏遮罩层展示原图，遮罩层 SHALL 支持 ESC 键关闭和点击空白区域关闭。

#### Scenario: 轮播初始状态
- **WHEN** 页面加载完成且用户首次滚动到截图区
- **THEN** 展示 4 张截图中的第 1 张（首页），左侧和右侧箭头可见，底部有 4 个指示点且第 1 个高亮

#### Scenario: 轮播截图完整可见无裁剪
- **WHEN** 轮播展示任意一张产品截图
- **THEN** 整张截图的所有像素都在容器内可见，没有顶部或底部的裁剪；容器宽高比与图片实际宽高比一致，图片不会为适配容器而被裁剪

#### Scenario: 点击箭头切换
- **WHEN** 用户点击右箭头
- **THEN** 轮播平滑过渡到下一张截图，当前指示点高亮更新，自动播放计时器重置

#### Scenario: 点击指示点切换
- **WHEN** 用户点击第 3 个指示点
- **THEN** 轮播直接切换到第 3 张截图，指示点高亮更新，自动播放计时器重置

#### Scenario: 自动轮播
- **WHEN** 用户未手动操作轮播超过 4 秒
- **THEN** 轮播自动切换到下一张，循环播放（最后一张之后回到第一张）

#### Scenario: 点击当前截图打开 Lightbox
- **WHEN** 用户点击当前展示的轮播大图
- **THEN** 页面上方显示全屏半透明黑色遮罩层，居中展示原图，无页面滚动条

#### Scenario: Lightbox 关闭方式
- **WHEN** Lightbox 处于打开状态，用户按下 ESC 键或点击遮罩层非图片区域
- **THEN** Lightbox 关闭，页面恢复正常滚动

### Requirement: 下载区与版本信息
下载区 SHALL 展示一个主导下载按钮，文案格式为"下载 SZGame v{版本号} · {文件大小}"。版本号 SHALL 从项目根目录 `VERSION` 纯文本文件读取（内容为版本号字符串，如 `1.0.8`），并拼接为 `SZGame Setup {版本号}.exe` 格式的文件名。文件大小 SHALL 通过对该 exe 文件发起 HEAD 请求读取 `Content-Length` 响应头并格式化为 MB 单位（保留一位小数）。下载按钮 SHALL 触发浏览器下载该 exe 文件。当 VERSION 文件不存在、网络请求失败或 HEAD 请求无 Content-Length 时，SHALL 使用硬编码默认值作为降级方案。

#### Scenario: 下载按钮版本号正确
- **WHEN** 页面加载完成且 VERSION 文件内容为 `1.0.8`
- **THEN** 下载按钮显示的版本号为 v1.0.8，且按钮 href 指向 `SZGame Setup 1.0.8.exe`

#### Scenario: 点击下载按钮
- **WHEN** 用户点击下载按钮
- **THEN** 浏览器开始下载 VERSION 文件指定的版本的 exe 安装包文件

#### Scenario: 版本文件格式合法
- **WHEN** VERSION 文件内容为合法的三段版本号（如 `1.0.8`）
- **THEN** JS 正确解析该版本号并拼接为 `SZGame Setup {版本号}.exe` 文件名

#### Scenario: 文件大小通过 HEAD 请求获取
- **WHEN** VERSION 文件读取成功且拼接的 exe 文件可访问
- **THEN** 页面通过 HEAD 请求获取该文件的 Content-Length，并显示为 `XX.X MB` 格式

#### Scenario: VERSION 文件加载失败降级
- **WHEN** VERSION 文件不存在或网络请求失败
- **THEN** 下载按钮显示硬编码默认版本号，文件大小通过对默认 exe 文件 HEAD 请求获取，若 HEAD 也失败则显示硬编码默认值

#### Scenario: JSON-LD 结构化数据同步
- **WHEN** VERSION 文件读取成功
- **THEN** 页面 `<head>` 中的 JSON-LD SoftwareApplication 结构化数据的 `version` 和 `downloadUrl` 字段与 VERSION 文件内容保持一致

### Requirement: 视觉风格与品牌色
整个落地页 SHALL 采用"舒适现代"视觉风格，留白驱动，克制层级。品牌主色 SHALL 为 `#1677FF`（从 favicon.ico 主色调提取）。页面底色 SHALL 为 `#FFFFFF`，交替区块底色 SHALL 为 `#FAFAFA`。主文字色 SHALL 为 `#1F2937`（近黑非纯黑，减少视觉压迫）。字体 SHALL 完全使用系统字体栈，不引入任何外部字体资源。圆角 SHALL 统一为 6px（小元素）、10px（卡片）、16px（大区块）。导航栏内的下载按钮（`.btn-primary`）文字 SHALL 为白色且 font-weight 700（加粗），不被 `.navbar-links a` 的灰色文字覆盖。

#### Scenario: 品牌色一致性
- **WHEN** 页面任意位置使用品牌相关色彩（按钮、链接、图标高亮）
- **THEN** 所有品牌色值都从 CSS 变量派生，主色为 #1677FF，悬停态为 #4096FF，点击态为 #0958D9

#### Scenario: 零外部资源依赖
- **WHEN** 页面在完全离线环境（无网络连接）中打开
- **THEN** 所有样式、脚本、图片均正常加载，页面功能完整可用

#### Scenario: 导航栏按钮白色加粗文字
- **WHEN** 查看导航栏内的蓝色下载按钮
- **THEN** 按钮文字为白色（#FFFFFF）且 font-weight 为 700，不被外层 `a` 标签的灰色继承

### Requirement: 滚动渐入动效
页面区块 SHALL 在滚动进入视口时触发渐入动画：opacity 从 0 渐变到 1，同时 translateY 从 16px 变为 0，过渡时长 500ms，缓动函数 `cubic-bezier(0.22, 1, 0.36, 1)`。已触发过渐入的区块 SHALL 保持最终状态，不重复动画。

#### Scenario: 滚动触发渐入
- **WHEN** 用户向下滚动使某个尚未显示的功能区块进入视口（IntersectionObserver threshold 0.15）
- **THEN** 该区块在 500ms 内完成从透明到可见、从下方 16px 到最终位置的过渡

#### Scenario: 导航栏滚动阴影
- **WHEN** 用户向下滚动 >= 20px
- **THEN** 导航栏底部出现高度 1px 的 `#E5E7EB` 分割线

### Requirement: SEO 元数据
`<head>` 内 SHALL 包含完整 SEO 基础设施：
- `<title>` 格式为 "SZGame — 本地游戏与程序管理盒子"
- `<meta name="description">` 描述产品核心价值
- `<meta name="viewport">` 移动端适配
- Open Graph 标签（og:title, og:description, og:image, og:url, og:type）
- Twitter Card 标签（summary_large_image）
- canonical URL 指向 `https://szgame.sinszm.com/`
- JSON-LD 结构化数据，类型为 SoftwareApplication，包含 name、operatingSystem（Windows）、applicationCategory（Game）、downloadUrl、version（动态）、license（MIT）、author 信息

#### Scenario: 搜索引擎可索引
- **WHEN** 搜索引擎爬虫访问页面并解析 `<head>`
- **THEN** 可提取到完整的 TDK、Open Graph、Twitter Card 和 SoftwareApplication 结构化数据

### Requirement: 移动端适配
页面 SHALL 支持桌面端（>= 900px）和移动端（<= 600px）两种主要布局。内容容器最大宽度 SHALL 为 1200px 并居中显示。功能卡片、导航栏元素 SHALL 在窄屏自动换行或折叠。截图轮播 SHALL 在移动端保持单张大图展示（轮播本质就是单张，无需额外调整）。

#### Scenario: 桌面端布局
- **WHEN** 视口宽度 >= 900px
- **THEN** 功能卡片 3 列、导航栏元素水平排列、截图轮播展示单张大图

#### Scenario: 移动端布局
- **WHEN** 视口宽度 <= 600px
- **THEN** 功能卡片单列、导航栏 Gitee 链接隐藏仅保留下载按钮、截图轮播展示单张大图、轮播箭头和指示点尺寸适配
