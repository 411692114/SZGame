# Spec Delta

## MODIFIED Requirements

### Requirement: 下载区与版本信息
下载区 SHALL 展示两个并列的下载渠道卡片（EXE 直装和微软商店），桌面端（视口宽度 >= 900px）以 grid 两列排列，移动端（视口宽度 < 900px）改为单列堆叠（EXE 在上、商店在下）。

EXE 卡片 SHALL 展示渠道标题"直接下载"、副信息"Windows · {文件大小}"、主按钮和渠道说明"便携版 · 无需安装"。主按钮文案格式为"下载 SZGame v{版本号} · {文件大小}"，版本号 SHALL 从项目根目录 `VERSION` 纯文本文件读取（内容为版本号字符串，如 `1.0.8`），并拼接为 `SZGame Setup {版本号}.exe` 格式的文件名。文件大小 SHALL 通过对该 exe 文件发起 HEAD 请求读取 `Content-Length` 响应头并格式化为 MB 单位（保留一位小数）。当 VERSION 文件不存在、网络请求失败或 HEAD 请求无 Content-Length 时，SHALL 使用硬编码默认值作为降级方案。

微软商店卡片 SHALL 展示渠道标题"微软商店"、副信息"在线安装 · 自动更新"、官方 Static Badge 图片和渠道说明"商店版 · 自动更新"。Static Badge 图片 SHALL 嵌入微软托管的官方徽章（语言 zh-CN，主题 Dark），超链接 SHALL 指向 `https://apps.microsoft.com/detail/9P69FQ3P1WLT`，`target="_blank"`，`rel="noopener"`。

下载区底部 SHALL 展示跨渠道辅助文案"支持 Windows · MIT License · 两种安装渠道"，位于卡片 grid 下方居中。

#### Scenario: 桌面端双卡片并列
- **WHEN** 视口宽度 >= 900px
- **THEN** 两个下载渠道卡片以 grid 两列并列排列，间距 32px，整体居中

#### Scenario: 移动端卡片堆叠顺序
- **WHEN** 视口宽度 < 900px
- **THEN** 两个卡片改为单列纵向堆叠，EXE 卡片在上、微软商店卡片在下

#### Scenario: 下载按钮版本号正确
- **WHEN** 页面加载完成且 VERSION 文件内容为 `1.0.8`
- **THEN** EXE 卡片主按钮显示的版本号为 v1.0.8，且按钮 href 指向 `SZGame Setup 1.0.8.exe`

#### Scenario: 点击下载按钮
- **WHEN** 用户点击 EXE 卡片主下载按钮
- **THEN** 浏览器开始下载 VERSION 文件指定的版本的 exe 安装包文件

#### Scenario: 版本文件格式合法
- **WHEN** VERSION 文件内容为合法的三段版本号（如 `1.0.8`）
- **THEN** JS 正确解析该版本号并拼接为 `SZGame Setup {版本号}.exe` 文件名

#### Scenario: 文件大小通过 HEAD 请求获取
- **WHEN** VERSION 文件读取成功且拼接的 exe 文件可访问
- **THEN** 页面通过 HEAD 请求获取该文件的 Content-Length，并显示为 `XX.X MB` 格式

#### Scenario: VERSION 文件加载失败降级
- **WHEN** VERSION 文件不存在或网络请求失败
- **THEN** EXE 卡片显示硬编码默认版本号，文件大小通过对默认 exe 文件 HEAD 请求获取，若 HEAD 也失败则显示硬编码默认值

#### Scenario: JSON-LD 结构化数据同步
- **WHEN** VERSION 文件读取成功
- **THEN** 页面 `<head>` 中的 JSON-LD SoftwareApplication 结构化数据的 `version` 和 `downloadUrl` 字段与 VERSION 文件内容保持一致

#### Scenario: 微软商店 Badge 链接正确
- **WHEN** 用户点击微软商店卡片的 Badge 图片
- **THEN** 浏览器在新标签页打开 `https://apps.microsoft.com/detail/9P69FQ3P1WLT`

#### Scenario: 微软商店 Badge 为 Static 图片
- **WHEN** 页面加载完成
- **THEN** 微软商店 Badge 区域为一个 `<img>` 标签，无额外 `<script>` 标签或 Web Component，页面零新增 JS 依赖

#### Scenario: 跨渠道辅助文案
- **WHEN** 页面下载区完整渲染
- **THEN** 卡片 grid 下方居中展示"支持 Windows · MIT License · 两种安装渠道"
