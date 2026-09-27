# Tasks

## 1. Logo 替换

- [x] 1.1 将 index.html 导航栏内联 `<svg class="logo-icon">` 替换为 `<img src="logo.png" class="logo-icon" alt="SZGame 首页">` — 验证：浏览器确认 img 存在 src=logo.png，SVG 已移除

## 2. 导航栏下载按钮文字修复

- [x] 2.1 在 css/style.css 中添加 `.navbar-links .btn-primary { color: #FFFFFF; font-weight: 700 }` — 验证：computed style color=rgb(255,255,255), font-weight=700
- [x] 2.2 验证不影响其他区域的按钮 — 验证：Hero/下载区 `.btn-primary` 仍白字（选择器嵌套作用域限制）

## 3. 截图区改为轮播

- [x] 3.1 重写截图区 HTML 为 carousel 结构（4 slide + prev/next + 4 dot）— 验证：DOM 包含 4 carousel-slide、prev/next、4 dot
- [x] 3.2 添加轮播 CSS（容器 16:9、slide 绝对定位叠加、opacity 过渡、箭头、指示点、hover 激活）— 验证：只有一张图可见、箭头和指示点排列正确
- [x] 3.3 添加 initCarousel() JS（currentIndex + 4s auto + prev/next/goTo + hover pause + active 同步）— 验证：5 秒后 slide 从 index 0 变 3，自动轮播生效
- [x] 3.4 移除旧截图 grid 样式 + 重写 Lightbox 绑定轮播图 — 验证：旧类不存在、点击当前图开 Lightbox、ESC/点击空白关闭

## 4. 集成验证

- [x] 4.1 浏览器完整走查全部交互 — 验证：3 项修复全部 PASS，Console 无 error
- [x] 4.2 移动端媒体查询（900px 两列、600px 单列）— 验证：CSS 媒体查询正确，轮播单张天然适配
- [x] 4.3 JS 语法有效、CSS 无未定义变量 — 验证：node 语法检查通过、CSS 变量引用正确
