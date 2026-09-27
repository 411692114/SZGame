# Tasks

## 1. 轮播宽高比调整

- [x] 1.1 将 `.carousel::before` 的 `padding-top` 从 `56.25%` 改为 `65%` — 验证：computed padding-top 为 65%，容器比例匹配图片实际比例 1800:1170

## 2. 图片填充方式调整

- [x] 2.1 将 `.carousel-slide img` 的 `object-fit` 从 `cover` 改为 `contain` — 验证：切换到任意轮播图时，图片顶部和底部不再被裁剪，整张图完整可见

## 3. 验证

- [x] 3.1 浏览器验证 4 张轮播图均完整展示（无裁剪），轮播箭头/指示点/自动播放/Lightbox 功能正常 — 验证：Console 无 error，ESC 和点击遮罩能关闭 Lightbox
- [x] 3.2 移动端（375px）轮播展示正常，图片同样完整无裁剪 — 验证：无需额外媒体查询，单张天然适配
