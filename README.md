# edgarcabrera.com

One-page consulting site built with [Hugo](https://gohugo.io), using a navy and amber
palette, light/dark themes, and an SVG architectural illustration. The original
design handoff is retained in `design_handoff_edgar_cabrera_site/` for reference.

## Develop

```sh
hugo server        # http://localhost:1313
hugo --gc --minify # production build into public/
```

## Where things live

| What | Where |
|---|---|
| **All page copy** (hero, experience, layers/services, about, process, testimonial, contact) | `content/_index.md` front matter |
| Identity + availability + booking link + toggles | `hugo.toml` `[params]` |
| Social preview image + editable source | `static/img/og.png` + `assets/social/og.html` |
| Design tokens and all styling | `assets/css/main.css` |
| Self-hosted Geist webfont | `assets/css/fonts.css` + `static/fonts/` |
| Page structure | `layouts/home.html`, `layouts/baseof.html`, `layouts/_partials/` |

Editing copy never requires touching a template. Add or remove an entry under
`experience.items` or `process.items` and the layout follows. The three service
chapters live in `layers.items` and correspond to the animated illustration.

## Before launch

- Share `https://edgarcabrera.com/calendar` for bookings. The `/calendar/` page
  redirects to `params.bookingURL` in `hugo.toml`, and all booking CTAs use the
  internal URL. Change that setting to switch calendar providers. If it is empty
  or `#`, CTAs and the calendar page offer email instead.
- The calendar has its own sharing title, description, and image configured in
  `content/calendar.md`. Its 1200×630 preview is `static/img/calendar-og.png`,
  with editable source in `assets/social/calendar-og.html`. Capture the source
  at 1200×630 and 1× scale after the fonts load to regenerate the PNG.
  The calendar redirects with JavaScript so preview crawlers can read its
  metadata; visitors without JavaScript can use the visible booking button.
- Experience copy uses Edgar’s first-hand account. Keep approximate figures
  approximate; the AcerosVS tenure spans consulting and employment.
- Contact email, LinkedIn, and availability are configured in `hugo.toml`.
  Update availability when the open engagement is filled.
- The 1200×630 social preview is configured for Open Graph and Twitter cards.
  To edit it, update `assets/social/og.html`, open it in a browser, wait for the
  local fonts and logos to load, and capture a 1200×630 viewport at 1× scale to
  `static/img/og.png`. The PNG is committed; Hugo does not need a browser to build.
- `baseURL` is set to `https://edgarcabrera.com/`.

## Notes

- Career logo assets and their sources are in `static/img/brands/`.

- **Theme selector** offers System, Dark, and Light. System is the default and
  follows OS changes live. Explicit choices persist and apply before first paint.
  Set `params.themeToggle = false` to hide the selector.
- The Geist webfont is self-hosted (latin + latin-ext, weights 300/400/500/600). There
  is no request to Google Fonts.
- CSS is concatenated, minified and fingerprinted with an SRI hash in production.

## GitHub Pages

`.github/workflows/pages.yaml` builds with Hugo 0.165.0 and deploys on pushes to
`main`. In repository Settings → Pages, select **GitHub Actions** as the source.
The workflow uses the URL reported by GitHub Pages, so repository subpaths and
custom domains both work.

To serve `edgarcabrera.com`, configure it under Settings → Pages → Custom domain
and configure the domain's DNS for GitHub Pages. Enable HTTPS once the certificate
is ready. Until then, use the GitHub Pages URL shown by the deployment.
