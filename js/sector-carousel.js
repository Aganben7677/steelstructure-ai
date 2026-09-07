(() => {
  const root = document.querySelector('.sector-hero');
  if (!root || !window.STEEL_SECTORS) return;
  const sectors = window.STEEL_SECTORS;
  const stage = root.querySelector('.sector-stage');
  const images = root.querySelector('.sector-images');
  const caption = root.querySelector('.sector-caption');
  const errorMessage = root.querySelector('#sector-error');
  const pauseButton = root.querySelector('[data-sector-action="pause"]');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const cache = new Map([[0, images.firstElementChild]]);
  const pending = new Map();
  let current = 0;
  let requested = 0;
  let revision = 0;
  let paused = reduced.matches;
  let hovered = false;
  let focused = false;
  let inView = true;
  let timer;
  let loadFailed = false;
  const isZh = () => document.documentElement.lang.startsWith('zh');
  const words = (en, zh) => isZh() ? zh : en;

  function schedule() {
    clearTimeout(timer);
    root.dataset.playing = String(!paused && !hovered && !focused && inView && !document.hidden);
    if (root.dataset.playing === 'true') timer = setTimeout(() => show(current + 1, false), 7000);
  }

  function render() {
    const sector = sectors[current];
    root.dataset.sector = sector.id;
    root.setAttribute('aria-label', words('Steel structure sectors', '钢结构项目领域'));
    root.querySelector('.sector-kicker').textContent = `${String(current + 1).padStart(2, '0')} / 07`;
    root.querySelector('#sector-title').textContent = isZh() ? sector.zh : sector.en;
    cache.forEach((picture, i) => {
      picture.alt = isZh() ? sectors[i].altZh : sectors[i].alt;
    });
    errorMessage.hidden = !loadFailed;
    errorMessage.textContent = loadFailed ? words('Image unavailable. Try the next image.', '图片暂时无法加载，请切换下一张。') : '';
    for (const [action, label] of [['previous', words('Previous image', '上一张')], ['next', words('Next image', '下一张')], ['pause', paused ? words('Play slideshow', '播放轮播') : words('Pause slideshow', '暂停轮播')]]) {
      const button = root.querySelector(`[data-sector-action="${action}"]`);
      button.title = label;
      button.setAttribute('aria-label', label);
    }
    pauseButton.querySelector('.pause-symbol').toggleAttribute('hidden', paused);
    pauseButton.querySelector('.play-symbol').toggleAttribute('hidden', !paused);
    root.dataset.paused = String(paused);
  }

  function prepare(index) {
    if (cache.has(index)) return Promise.resolve(cache.get(index));
    if (pending.has(index)) return pending.get(index);
    const picture = new Image();
    const sector = sectors[index];
    picture.className = 'sector-image';
    picture.alt = sector.alt;
    picture.style.objectPosition = sector.position;
    picture.decoding = 'async';
    picture.sizes = '100vw';
    picture.srcset = `assets/images/sector-ai-v2/${sector.id}-mobile.webp 960w, assets/images/sector-ai-v2/${sector.id}.webp 1672w`;
    const promise = new Promise((resolve, reject) => {
      picture.onload = async () => {
        try { await picture.decode(); } catch (_) { /* Loaded images can still render if decode is interrupted. */ }
        cache.set(index, picture);
        pending.delete(index);
        resolve(picture);
      };
      picture.onerror = () => { pending.delete(index); reject(new Error('Sector image unavailable')); };
    });
    pending.set(index, promise);
    picture.src = `assets/images/sector-ai-v2/${sector.id}.webp`;
    return promise;
  }

  async function show(index, manual) {
    index = (index + sectors.length) % sectors.length;
    requested = index;
    const token = ++revision;
    clearTimeout(timer);
    if (manual) { paused = true; render(); }
    caption.setAttribute('aria-live', manual ? 'polite' : 'off');
    try {
      const next = await prepare(index);
      if (token !== revision) return;
      if (!next.isConnected) images.append(next);
      // Commit the decoded frame before fading, so the previous photo never disappears during loading.
      void next.offsetWidth;
      images.querySelectorAll('img').forEach(img => {
        img.classList.toggle('is-visible', img === next);
        img.setAttribute('aria-hidden', String(img !== next));
      });
      current = index;
      loadFailed = false;
      render();
      prepare((current + 1) % sectors.length).catch(() => {});
    } catch (_) {
      if (token !== revision) return;
      paused = true;
      loadFailed = true;
      render();
    }
    schedule();
  }

  root.querySelector('.sector-controls').hidden = false;
  root.querySelector('[data-sector-action="previous"]').addEventListener('click', () => show(requested - 1, true));
  root.querySelector('[data-sector-action="next"]').addEventListener('click', () => show(requested + 1, true));
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    // An explicit Play command overrides the current hover/focus hold until the next interaction.
    if (!paused) { hovered = false; focused = false; }
    render();
    schedule();
  });
  root.addEventListener('pointerenter', event => { if (event.pointerType === 'mouse') { hovered = true; schedule(); } });
  root.addEventListener('pointerleave', () => { hovered = false; schedule(); });
  root.addEventListener('focusin', () => { focused = true; schedule(); });
  root.addEventListener('focusout', event => { if (!root.contains(event.relatedTarget)) { focused = false; schedule(); } });
  root.addEventListener('keydown', event => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    show(requested + (event.key === 'ArrowLeft' ? -1 : 1), true);
  });
  let touch;
  stage.addEventListener('touchstart', event => { if (event.touches.length === 1) touch = { x: event.touches[0].clientX, y: event.touches[0].clientY }; }, { passive: true });
  stage.addEventListener('touchcancel', () => { touch = null; });
  stage.addEventListener('touchend', event => {
    if (!touch) return;
    const dx = event.changedTouches[0].clientX - touch.x;
    const dy = event.changedTouches[0].clientY - touch.y;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) show(requested + (dx < 0 ? 1 : -1), true);
    touch = null;
  }, { passive: true });
  document.addEventListener('visibilitychange', schedule);
  new IntersectionObserver(entries => { inView = entries[0].isIntersecting; schedule(); }, { threshold: 0 }).observe(stage);
  reduced.addEventListener('change', () => { paused = reduced.matches; render(); schedule(); });
  window.addEventListener('site-language-change', render);
  document.addEventListener('DOMContentLoaded', render);
  render();
  schedule();
  prepare(1).catch(() => {});
})();
