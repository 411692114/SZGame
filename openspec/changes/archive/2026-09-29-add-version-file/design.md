# Design

## Context

当前 `js/main.js` 的 `initDownloadInfo()` 函数硬编码了 `FILENAME = 'SZGame Setup 1.0.6.exe'` 和 `FALLBACK_SIZE = '~84.0 MB'`。每次发布新版本需手动修改 JS 和 HTML 多处。项目根目录已有多版本 exe 文件（1.0.6/1.0.7/1.0.8），但网站始终显示 v1.0.6。浏览器安全模型禁止 JS 枚举服务器目录，因此无法直接探测"哪个 exe 是最新的"。

现有 spec 中"下载区与版本信息" requirement 已声明版本号应动态解析，但实现方式（从项目目录解析）在浏览器端不可行。本次变更引入 VERSION 纯文本文件作为版本发现桥梁。

## Goals / Non-Goals

**Goals:**
- 将版本号的单一可信来源收敛到根目录 `VERSION` 文件
- JS 启动时自动读取 VERSION → 拼文件名 → HEAD 拿 size → 全链路动态更新
- 保持零外部 API 依赖、零构建步骤
- 失败时有明确的 fallback 降级

**Non-Goals:**
- 不实现自动扫描目录或 HEAD 猜测版本号
- 不实现 Gitee Releases API 集成（CORS 不支持）
- 不实现 CI 自动生成 VERSION 文件
- 不改变 exe 文件的命名约定（保持 `SZGame Setup X.Y.Z.exe`）

## Decisions

### 1. VERSION 文件格式：纯文本，单行版本号

**选择：** 纯文本单行，内容如 `1.0.8`

**替代方案：**
- JSON（`{"version":"1.0.8"}`）：可扩展但手动编辑容易写错语法（引号、括号）
- 带换行/注释的多行格式：增加解析复杂度，对单行版本号无意义

**理由：** 用户手动 `notepad VERSION` 改一个数字最直观。将来需要扩展（如 changelog 链接）时再升级为 JSON 也很容易。

### 2. 文件名拼接规则

**选择：** `SZGame Setup ${version}.exe`

**理由：** 遵循现有 exe 命名约定，硬编码在 JS 中作为模板。将来如果 exe 命名变化（如去掉"Setup"），只需改这一个模板字符串。

### 3. 数据流与 fallback 策略

```
fetch('VERSION')
  │
  ├─ 成功 → trim() → 得到版本号
  │     │
  │     ├─ HEAD exe 文件
  │     │     ├─ 200 + Content-Length → 格式化为 MB → 更新 UI ✅
  │     │     ├─ 200 无 Content-Length → 显示 FALLBACK_SIZE ⚠️
  │     │     └─ 失败 (404/网络) → 显示 FALLBACK_SIZE，保留 VERSION 声明的版本号 ⚠️
  │     │
  │     └─ 版本号格式非法 → 回退硬编码 DEFAULT_FILENAME 流程（重试 HEAD 默认 exe）❌
  │
  └─ 失败 (404/网络) → 回退硬编码 DEFAULT_FILENAME 流程（重试 HEAD 默认 exe）❌
```

**硬编码默认值（保留）：**
- `DEFAULT_VERSION = '1.0.8'`
- `DEFAULT_FILENAME = 'SZGame Setup 1.0.8.exe'`
- `FALLBACK_SIZE = '~89.6 MB'`（当前 HEAD 1.0.8.exe 实测值）

**理由：** VERSION 文件是版本号的单一可信来源——一旦它成功且格式合法，版本号就不再变动。HEAD 失败只意味着大小拿不到，用 FALLBACK_SIZE 填充即可。VERSION 失败或格式非法时，才回退到 DEFAULT_FILENAME 并重新 HEAD，因为此时 VERSION 本身已不可信。

> **有意设计（2026-09-29 verify 阶段确认）：** 早期 draft 中 HEAD 失败分支写的是"回退硬编码 FILENAME 流程"，即重试默认 HEAD。但这会导致 VERSION 声明 v1.0.9、HEAD 失败后却显示 v1.0.8，版本号和 VERSION 文件不一致。当前实现更合理——版本号跟随 VERSION 文件（已经被证明可访问且格式合法），只有大小降级。

### 4. 改造现有 initDownloadInfo() 函数

**选择：** 在现有函数基础上改造，而非重写

**现有逻辑（main.js:46-84）：**
```
硬编码 FILENAME → 解析版本号 → fetch FILENAME HEAD → 更新按钮 / JSON-LD
```

**改造后：**
```
fetch('VERSION') → trim → 验证版本号格式 → 拼文件名
  → HEAD 拼出的文件名 → 更新按钮 / JSON-LD
  → 任何环节失败 → 回退到硬编码 FILENAME + HEAD 流程
```

**理由：** 现有 HEAD + 更新 UI 的逻辑完整可用，只需替换"文件名来源"环节。

### 5. HTML 初始值处理

**选择：** 保留 HTML 中的硬编码初始值，JS 加载后覆盖

`index.html` 中下载区（230-233 行）和 JSON-LD（48-49 行）的硬编码值作为：
- JS 加载前的临时占位（避免空内容）
- JS 完全加载失败时的降级显示

更新为当前已知最新版本号 1.0.8。

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|---------|
| 用户忘记更新 VERSION 文件 → 网站显示旧版本下载链接 | 发布流程 checklist：扔 exe 必须同时改 VERSION。将来可考虑 git pre-commit hook 校验 VERSION 中的版本号是否匹配仓库中最大的 exe 文件名 |
| VERSION 文件被浏览器缓存 | 在 fetch 时加 cache-busting：`fetch('VERSION?t=' + Date.now())` 或使用 `{ cache: 'no-cache' }` |
| HEAD 请求某些 CDN 不支持 | 已有 fallback 机制：HEAD 失败回退到 FALLBACK_SIZE |
