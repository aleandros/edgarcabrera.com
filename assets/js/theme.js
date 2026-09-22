(() => {
  const root = document.documentElement;
  const media = window.matchMedia('(prefers-color-scheme: dark)');
  const valid = value => ['system', 'dark', 'light'].includes(value);
  let preference = 'system';
  try {
    const saved = localStorage.getItem('theme');
    if (valid(saved)) preference = saved;
  } catch (_) { /* Private browsing may restrict storage; the control still works. */ }
  function apply() {
    root.dataset.theme = preference === 'system' ? (media.matches ? 'dark' : 'light') : preference;
    const select = document.querySelector('[data-theme-select]');
    if (select) select.value = preference;
  }
  apply();
  if (media.addEventListener) media.addEventListener('change', apply);
  else media.addListener(apply);
  document.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('[data-theme-select]');
    if (!select) return;
    select.value = preference;
    select.addEventListener('change', () => {
      preference = valid(select.value) ? select.value : 'system';
      apply();
      try { localStorage.setItem('theme', preference); } catch (_) {}
    });
  });
  window.addEventListener('storage', event => {
    if (event.key === 'theme' || event.key === null) {
      preference = valid(event.newValue) ? event.newValue : 'system';
      apply();
    }
  });
})();
