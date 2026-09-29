# Spec Delta

## MODIFIED Requirements

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
