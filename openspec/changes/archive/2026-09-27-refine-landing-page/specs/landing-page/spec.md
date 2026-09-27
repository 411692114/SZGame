# Spec Delta

## MODIFIED Requirements

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

### Requirement: 产品截图展示
截图区 SHALL 以轮播形式展示 4 张产品截图（首页、详情抽屉、收藏夹、设置），每次只展示 1 张大图。轮播 SHALL 提供左右箭头按钮手动切换和底部指示点（当前激活高亮）。轮播 SHALL 支持自动播放（4 秒间隔），用户手动点击箭头或指示点后 SHALL 重置自动播放计时器。所有截图 SHALL 支持 Lightbox：点击当前展示的大图后弹出全屏遮罩层展示原图，遮罩层 SHALL 支持 ESC 键关闭和点击空白区域关闭。

#### Scenario: 轮播初始状态
- **WHEN** 页面加载完成且用户首次滚动到截图区
- **THEN** 展示 4 张截图中的第 1 张（首页），左侧和右侧箭头可见，底部有 4 个指示点且第 1 个高亮

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

### Requirement: 移动端适配
页面 SHALL 支持桌面端（>= 900px）和移动端（<= 600px）两种主要布局。内容容器最大宽度 SHALL 为 1200px 并居中显示。功能卡片、导航栏元素 SHALL 在窄屏自动换行或折叠。截图轮播 SHALL 在移动端保持单张大图展示（轮播本质就是单张，无需额外调整）。

#### Scenario: 桌面端布局
- **WHEN** 视口宽度 >= 900px
- **THEN** 功能卡片 3 列、导航栏元素水平排列、截图轮播展示单张大图

#### Scenario: 移动端布局
- **WHEN** 视口宽度 <= 600px
- **THEN** 功能卡片单列、导航栏 Gitee 链接隐藏仅保留下载按钮、截图轮播展示单张大图、轮播箭头和指示点尺寸适配
