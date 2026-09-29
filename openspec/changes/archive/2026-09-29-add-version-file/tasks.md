# Tasks

## 1. 基础搭建

- [x] 1.1 新增根目录 `VERSION` 纯文本文件，内容为 `1.0.8`（项目当前最新 exe 版本号）。验证：文件存在且内容为单行 `1.0.8`。
- [x] 1.2 更新 `index.html` 中下载区的硬编码初始值为当前已知版本：`#download-btn` 的 href/download attr 和 textContent、`#version-info` 的 textContent、JSON-LD 的 downloadUrl 和 version 字段。验证：HTML 中不再引用过时的 1.0.6。

## 2. JS 核心逻辑改造

- [x] 2.1 重写 `js/main.js` 的 `initDownloadInfo()` 函数：以 `fetch('VERSION', { cache: 'no-cache' })` 为入口，拿到版本号后验证格式（三段 `X.Y.Z`）、拼接 exe 文件名 `SZGame Setup ${version}.exe`、HEAD 请求拿 Content-Length、格式化 MB、更新下载按钮 href/download/textContent、更新 `#version-info`、更新 JSON-LD。验证：浏览器控制台无报错，fetch VERSION 成功后各 DOM 节点值正确。
- [x] 2.2 实现完整的 fallback 降级链路：VERSION 加载失败 → 版本号格式非法 → HEAD 失败或无 Content-Length 三层降级，最终回退到硬编码默认值。验证：DevTools Network 面板中禁用 VERSION 文件后按钮仍显示硬编码默认值；HEAD 被拦截后显示 FALLBACK_SIZE。
- [x] 2.3 更新硬编码默认常量为 `DEFAULT_VERSION = '1.0.8'`、`DEFAULT_FILENAME = 'SZGame Setup 1.0.8.exe'`、`FALLBACK_SIZE = '~89.6 MB'`。验证：所有默认值不再是过时的 1.0.6。

## 3. 集成验证

- [x] 3.1 在本地启动静态服务器（如 `python -m http.server`），打开首页验证：下载按钮显示 v1.0.8 和正确大小、点击能触发 `SZGame Setup 1.0.8.exe` 下载、JSON-LD 结构化数据包含正确 version 和 downloadUrl。验证：DevTools Console 无错误、Elements 面板中各目标节点值正确、Network 面板可见 VERSION 文件 GET 和 exe 文件 HEAD 请求。
- [x] 3.2 验证 VERSION 文件与 exe 文件不同版本号场景：临时改 VERSION 内容为 `1.0.7`，刷新后按钮显示 v1.0.7，HEAD 请求目标改为 `SZGame Setup 1.0.7.exe`。验证：DOM 中版本号和文件名同步变化。
