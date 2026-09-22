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
