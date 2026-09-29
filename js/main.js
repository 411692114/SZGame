/* ============================================================
   SZGame Landing Page — main.js
   交互逻辑：滚动渐入 · 导航栏阴影 · 动态版本号 · 轮播 · Lightbox
   零外部依赖
   ============================================================ */

(function () {
  'use strict';

  /* ----------------------------------------------------------
     滚动渐入 — IntersectionObserver
     ---------------------------------------------------------- */
  function initScrollAnimate() {
    const elements = document.querySelectorAll('[data-animate]');
    if (!elements.length || !('IntersectionObserver' in window)) {
      elements.forEach(el => el.classList.add('animate-in'));
      return;
    }
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ----------------------------------------------------------
     导航栏滚动阴影
     ---------------------------------------------------------- */
  function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;
    function update() {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    }
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  /* ----------------------------------------------------------
     动态版本号与文件大小 — 从 VERSION 文件读取
     ---------------------------------------------------------- */
  function initDownloadInfo() {
    const DEFAULT_VERSION = '1.0.8';
    const DEFAULT_FILENAME = 'SZGame Setup 1.0.8.exe';
    const FALLBACK_SIZE = '~89.6 MB';
    const VERSION_RE = /^\d+\.\d+\.\d+$/;

    const downloadBtn = document.getElementById('download-btn');
    const versionInfo = document.getElementById('version-info');

    function makeFilename(ver) { return 'SZGame Setup ' + ver + '.exe'; }

    function updateUI(ver, filename, size) {
      const url = encodeURI(filename);
      const label = '下载 SZGame v' + ver + ' \u00b7 ' + size;
      if (downloadBtn) {
        downloadBtn.setAttribute('href', url);
        downloadBtn.setAttribute('download', filename);
        downloadBtn.textContent = label;
      }
      if (versionInfo) versionInfo.textContent = 'Windows · ' + size;
      // 同步 JSON-LD
      const ldEl = document.querySelector('script[type="application/ld+json"]');
      if (ldEl) {
        try {
          const ld = JSON.parse(ldEl.textContent);
          ld.version = ver;
          ld.downloadUrl = url;
          ldEl.textContent = JSON.stringify(ld);
        } catch (e) { /* 忽略 */ }
      }
    }

    function probeAndUpdate(ver, filename) {
      fetch(filename, { method: 'HEAD' })
        .then(function (res) {
          const length = res.headers.get('Content-Length');
          if (length) {
            const mb = (parseInt(length, 10) / 1024 / 1024).toFixed(1);
            updateUI(ver, filename, mb + ' MB');
          } else {
            updateUI(ver, filename, FALLBACK_SIZE);
          }
        })
        .catch(function () {
          updateUI(ver, filename, FALLBACK_SIZE);
        });
    }

    function useDefault() {
      probeAndUpdate(DEFAULT_VERSION, DEFAULT_FILENAME);
    }

    fetch('VERSION', { cache: 'no-cache' })
      .then(function (res) {
        if (!res.ok) throw new Error('VERSION HTTP ' + res.status);
        return res.text();
      })
      .then(function (text) {
        const ver = text.trim();
        if (!VERSION_RE.test(ver)) throw new Error('VERSION format invalid: ' + ver);
        probeAndUpdate(ver, makeFilename(ver));
      })
      .catch(function () { useDefault(); });
  }

  /* ----------------------------------------------------------
     轮播 — 单张大图 + 箭头 + 指示点 + 自动播放
     ---------------------------------------------------------- */
  function initCarousel() {
    const carousel = document.querySelector('[data-carousel]');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.carousel-prev');
    const nextBtn = carousel.querySelector('.carousel-next');
    if (!slides.length) return;

    let current = 0;
    const total = slides.length;
    let timer = null;
    const INTERVAL = 4000;

    function goTo(index) {
      current = (index + total) % total;
      slides.forEach((s, i) => s.classList.toggle('active', i === current));
      dots.forEach((d, i) => d.classList.toggle('active', i === current));
    }

    function next() { goTo(current + 1); }
    function prev() { goTo(current - 1); }

    function startAuto() { stopAuto(); timer = setInterval(next, INTERVAL); }
    function stopAuto() { if (timer) { clearInterval(timer); timer = null; } }

    // 箭头
    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); startAuto(); });

    // 指示点
    dots.forEach(function (dot) {
      dot.addEventListener('click', function () {
        const idx = parseInt(dot.getAttribute('data-index'), 10);
        goTo(idx); startAuto();
      });
    });

    // hover 暂停
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // 点击当前图 → Lightbox（openLightbox 由 initLightbox 注入到全局）
    carousel.addEventListener('click', function (e) {
      const img = e.target.closest('.carousel-slide.active')?.querySelector('img');
      if (img && window._openLightbox) {
        e.preventDefault();
        window._openLightbox(img.src);
      }
    });

    startAuto();
  }

  /* ----------------------------------------------------------
     Lightbox — 点击当前轮播图全屏查看
     ---------------------------------------------------------- */
  function initLightbox() {
    let lightbox = null;

    function openLightbox(src) {
      lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.setAttribute('role', 'dialog');
      lightbox.setAttribute('aria-modal', 'true');
      lightbox.setAttribute('aria-label', '图片预览');

      const img = document.createElement('img');
      img.src = src;
      img.alt = 'SZGame 产品截图';
      img.draggable = false;

      lightbox.appendChild(img);
      document.body.appendChild(lightbox);
      document.body.style.overflow = 'hidden';

      document.addEventListener('keydown', onKey);
      lightbox.addEventListener('click', onMaskClick);
    }

    function closeLightbox() {
      if (!lightbox) return;
      document.removeEventListener('keydown', onKey);
      lightbox.removeEventListener('click', onMaskClick);
      document.body.style.overflow = '';
      lightbox.remove();
      lightbox = null;
    }

    function onKey(e) { if (e.key === 'Escape') closeLightbox(); }
    function onMaskClick(e) { if (e.target === lightbox) closeLightbox(); }

    // 暴露给 carousel 的全局打开接口
    window._openLightbox = openLightbox;
  }

  /* ----------------------------------------------------------
     启动
     ---------------------------------------------------------- */
  document.addEventListener('DOMContentLoaded', function () {
    initScrollAnimate();
    initNavbarScroll();
    initDownloadInfo();
    initLightbox();     // 先注册 window._openLightbox
    initCarousel();     // 再绑定点击事件
  });

})();
