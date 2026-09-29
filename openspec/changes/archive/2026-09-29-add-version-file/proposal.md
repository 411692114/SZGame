# Proposal

## Why

当前下载区的版本号、文件名、文件大小全部硬编码在 `js/main.js`（`FILENAME = 'SZGame Setup 1.0.6.exe'`）和 `index.html` 中。项目根目录已有 `SZGame Setup 1.0.8.exe` 但网站仍显示 v1.0.6，每次发布新版本都需要手动修改 JS 和 HTML 多处。spec 中虽已声明"版本号 SHALL 从项目目录中版本号最高的 exe 文件名解析"，但实现未跟上。需要一个简单可靠的自动发现机制，让发布流程只需两步：扔 exe + 更新 VERSION 文件。

## What Changes

- 新增根目录 `VERSION` 纯文本文件，存放当前发布版本号（如 `1.0.8`），作为 JS 侧版本发现的唯一入口
- 改造 `js/main.js` 中 `initDownloadInfo()` 函数：从硬编码改为 `fetch('VERSION')` 读取版本号，拼接 exe 文件名，HEAD 请求获取文件大小，动态更新下载按钮、版本信息区和 JSON-LD 结构化数据
- 保留现有 fallback 机制：VERSION 文件或 HEAD 请求失败时，回退到硬编码默认值

## Capabilities

### New Capabilities

（无）

### Modified Capabilities

- `landing-page`: 下载区与版本信息 requirement 的实现方式变更 —— 版本号来源从硬编码改为 VERSION 文件读取，文件名和大小随之动态解析

## Impact

- **新增文件**：`VERSION`（根目录，纯文本，内容为版本号）
- **修改文件**：`js/main.js`（`initDownloadInfo()` 函数改造）、`index.html`（下载区初始硬编码值保留为占位，JS 加载后覆盖）
- **spec 同步**：`openspec/specs/landing-page/spec.md` 的下载区 requirement 需补充 VERSION 文件来源描述（由 archive 流程自动同步）
- **无外部依赖**：保持零外部 API 调用、零构建步骤
- **发布流程变更**：从"改 JS + 改 HTML + push"变为"扔 exe + 改 VERSION + push"
