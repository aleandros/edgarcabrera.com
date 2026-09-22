(() => {
  const scene = document.querySelector('[data-parallax]');
  const hero = document.querySelector('.hero');
  if (!scene || !hero) return;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  let frame = 0;
  let x = 0;
  let y = 0;
  let visible = true;
  function paint() {
    frame = 0;
    if (reduced.matches || !visible) return;
    const scroll = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), 750);
    scene.style.setProperty('--px', `${x * 12}px`);
    scene.style.setProperty('--py', `${y * 9 + scroll * .075}px`);
    scene.style.setProperty('--pr', `${x * 1.2}deg`);
  }
  function schedule() {
    if (!frame && !reduced.matches && visible) frame = requestAnimationFrame(paint);
  }
  hero.addEventListener('pointermove', (event) => {
    if (!pointer.matches || reduced.matches) return;
    const bounds = hero.getBoundingClientRect();
    x = (event.clientX - bounds.left) / bounds.width - .5;
    y = (event.clientY - bounds.top) / bounds.height - .5;
    schedule();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { x = 0; y = 0; schedule(); });
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', schedule, { passive: true });
  reduced.addEventListener('change', () => {
    if (reduced.matches) {
      cancelAnimationFrame(frame);
      frame = 0;
      scene.style.removeProperty('--px');
      scene.style.removeProperty('--py');
      scene.style.removeProperty('--pr');
    } else schedule();
  });
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    }).observe(hero);
  }
  schedule();
})();

// Assemble the team, infrastructure and product as their chapters enter view.
(() => {
  const story = document.querySelector('[data-stack-story]');
  if (!story) return;
  const chapters = [...story.querySelectorAll('[data-layer-chapter]')];
  const links = [...story.querySelectorAll('[data-layer-link]')];
  const visual = story.querySelector('.layers__visual');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const short = matchMedia('(max-height: 560px)');
  const mobile = matchMedia('(max-width: 760px)');
  const layers = chapters.map(chapter => story.querySelector(`[data-stack-layer="${chapter.dataset.layerChapter}"]`));
  let frame = 0;
  const clamp = value => Math.max(0, Math.min(1, value));
  function paint() {
    frame = 0;
    const animate = !reduced.matches && !short.matches;
    story.classList.toggle('is-animated', animate);
    // Measure before writing styles. On phones the reading line sits below the pinned SVG.
    const visualBounds = visual.getBoundingClientRect();
    const anchor = mobile.matches && animate
      ? Math.min(innerHeight * .84, visualBounds.bottom + (innerHeight - visualBounds.bottom) * .45)
      : innerHeight * .6;
    const bounds = chapters.map(chapter => chapter.getBoundingClientRect());
    const progress = bounds.map(rect => clamp((anchor - rect.top) / Math.min(rect.height * .55, innerHeight * .3)));
    let active = 0;
    progress.forEach((value, index) => { if (value >= .5) active = index; });
    layers.forEach((layer, index) => {
      if (!animate) { layer.style.removeProperty('transform'); layer.style.removeProperty('opacity'); return; }
      const t = progress[index];
      const eased = 1 - Math.pow(1 - t, 3);
      layer.style.transform = `translateY(${(1 - eased) * -(60 + index * 30)}px)`;
      layer.style.opacity = String(.12 + .88 * eased);
    });
    story.style.setProperty('--stack-progress', String(animate ? progress.reduce((sum, p) => sum + p, 0) / 3 : 1));
    story.dataset.activeLayer = chapters[active].dataset.layerChapter;
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule, { passive: true });
  addEventListener('pageshow', schedule);
  [reduced, short, mobile].forEach(media => media.addEventListener('change', schedule));
  if ('ResizeObserver' in window) new ResizeObserver(schedule).observe(visual);
  schedule();
})();
