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
| **All page copy** (hero, experience, services, about, process, contact) | `content/_index.md` front matter |
| Identity + booking link + toggles | `hugo.toml` `[params]` |
| Design tokens and all styling | `assets/css/main.css` |
| Self-hosted Geist webfont | `assets/css/fonts.css` + `static/fonts/` |
| Page structure | `layouts/home.html`, `layouts/baseof.html`, `layouts/_partials/` |

Editing copy never requires touching a template. Add or remove an entry under
`experience.items`, `services.items`, or `process.items` and the grid follows.

## Before launch

- [ ] Optionally set `params.bookingURL` in `hugo.toml`. Primary CTAs use email
      when this is empty or `#`.
- Experience copy uses Edgar’s first-hand account. Keep approximate figures
  approximate; the AcerosVS tenure spans consulting and employment.
- Contact email and LinkedIn are configured in `hugo.toml`.
- [ ] Produce a 1200×630 OG image, drop it at `static/img/og.png`, and uncomment
      `params.ogImage`.
- [ ] Set the real `baseURL`.

## Notes

- Career logo assets and their sources are in `static/img/brands/`.

- **Theme toggle** switches between dark and light. Dark is the default; a saved
  preference is applied before first paint. Set `params.themeToggle = false` to
  hide the toggle.
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
