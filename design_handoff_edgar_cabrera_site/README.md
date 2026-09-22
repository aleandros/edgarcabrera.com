# Handoff: Edgar Cabrera — one-page consulting site

## Overview
A single-page marketing site for Edgar Cabrera, an engineering executive launching a consulting
practice. Audience: founders, CEOs, and CTOs at seed-to-Series-B startups. The page has exactly one
conversion action — **Book a call** — repeated in the nav, hero, and contact section. Five stacked
sections: Hero, Selected outcomes, Engagements, How I work, Contact.

Two approved visual directions of the SAME layout are in the bundle:
- **1a — night**: dark charcoal ground, accent `#FF6B4A`.
- **1b — day**: warm off-white ground, accent `#C0341C`.
They are identical in structure, grid, type scale, and copy. Ship them as one implementation with a
theme (light/dark) swap of the token values below — do not build two pages.

## About the Design Files
The files in this bundle are **design references created in HTML** — prototypes showing intended look
and behavior, not production code to copy. The task is to **recreate these designs in the target
codebase's existing environment** (React/Next, Astro, Vue, etc.) using its established patterns,
component library, and styling approach. If no environment exists yet, pick the most appropriate
framework for a static marketing page (Next.js or Astro both fit) and implement there. The HTML
prototype uses inline styles purely so it streams in the design tool; production should use the
codebase's normal styling system with the tokens listed below.

## Fidelity
**High-fidelity.** Colors, type sizes, weights, letter-spacing, and spacing are final and should be
matched closely. Copy is final except where flagged under "Content to confirm".

## Content to confirm before launch
- The four outcome figures (12 → 45 engineers / 6% attrition, 4 days → 40 minutes / 30+ deploys a day,
  +28% throughput, $40M Series B diligence) were drafted from the positioning brief. Edgar must verify
  or replace each number.
- `edgar@edgarcabrera.com` and `linkedin.com/in/edgarcabrera` are placeholders.
- The **Book a call** buttons are `href="#"`. Point them at the real scheduling link (Cal.com /
  Savvycal / Google Calendar appointment page). All four CTAs go to the same destination.

## Design Tokens

### Typography
One family: **Geist** (Google Fonts, weights 300/400/500/600). No serif in the approved direction.
Fallback stack: `Geist, "Helvetica Neue", Helvetica, Arial, sans-serif`.

| Role | Size | Weight | Line-height | Letter-spacing |
|---|---|---|---|---|
| Hero H1 | 68px (desktop) / 38px (mobile) | 500 | 1.05 / 1.06 | -0.035em / -0.03em |
| Section H2 (contact) | 46px / 30px | 500 | 1.10 / 1.12 | -0.03em |
| Outcome stat | 46px / 34px | 500 | 1 | -0.03em |
| Principle line ("How I work") | 26px / 19px | 400 | 1.4 / 1.45 | -0.02em |
| Engagement title | 22px / 20px | 600 | 1.2 | -0.02em |
| Lede paragraph | 19px / 16px | 400 | 1.6 | 0 |
| Body paragraph | 16px / 15px | 400 | 1.6 | 0 |
| Outcome label | 17px / 16px | 600 | normal | 0 |
| Section label (eyebrow) | 13px / 12px | 600 | normal | 0.10em, uppercase |
| Nav / meta / links | 14–15px | 400–600 | 1.6 | 0 |

Body copy uses `text-wrap: pretty` on the H1.

### Color

| Token | Day (1b) | Night (1a) |
|---|---|---|
| `--bg` page ground | `#F6F3ED` | `#16171A` |
| `--bg-alt` ("How I work" band) | `#EFEBE2` | `#1D1F23` |
| `--ink` headings, nav, solid button bg | `#191814` | `#EDECE8` |
| `--ink-body` paragraphs | `#4A473F` | `#ADAEB0` |
| `--ink-muted` credential + meta text | `#6B675E` | `#8A8C90` |
| `--rule` 1px section dividers | `rgba(25,24,20,0.16)` | `rgba(237,236,232,0.14)` |
| `--accent` stats, nav link, button hover | `#C0341C` | `#FF6B4A` |
| button label (on `--ink` fill) | `#F6F3ED` | `#16171A` |

Accent is used **only** for: the big outcome numbers, the nav "Book a call →" text link, and the
primary button's hover fill. Nothing else.

### Spacing & geometry
- Content container: 1280px wide, horizontal padding **72px**.
- 12-column grid, `gap: 24px`. Section eyebrow occupies columns 1–3; content occupies columns 4–12.
- Section vertical padding: **88px** top/bottom (hero 120/104, contact 112/88). Mobile: 44px
  (hero 48/44, contact 52/44), horizontal 24px.
- Header bar padding: 26px 72px, bottom 1px `--rule`.
- Every section is separated by a **1px `--rule` top border** — no cards, no shadows, no rounded
  corners anywhere in the page itself. Buttons and containers have **radius 0**.
- Engagement cards: **2px solid `--ink`** top border, 20px padding-top (16px mobile).
- Outcomes: 2-column grid, `gap: 56px 48px`. Engagements: 3-column grid, `gap: 40px`.
- Primary button: `--ink` fill, 17px 30px padding (17px 24px full-width on mobile), radius 0.
- Mobile breakpoint: single column, all grids collapse to `flex-direction: column`; CTA becomes
  full-width; nav keeps name left + "Book a call →" right.

## Screens / Views

### 1. Header (sticky optional — prototype is static)
Name "Edgar Cabrera" (14px/600) at columns 1–4, tagline "Engineering leadership, on retainer"
(14px, `--ink-muted`) at 5–8, "Book a call →" (14px/500, `--accent`) right-aligned at 11–12.
Mobile: name left, accent link right.

### 2. Hero
Left column (1–3): credential stack, three lines, 14px `--ink-muted`, line-height 1.6 —
"Amazon" / "Y Combinator founder" / "Engineering director".
Right (4–12): H1 "I help founders ship faster and scale engineering teams empowered by AI."
Lede (max-width 560px): "Senior engineering leadership for seed to Series B — the judgment of a
VP of Engineering without the full-time hire."
Row 48px below: primary button "Book a call" + 14px muted note "30 minutes · no deck, no pitch".
Entrance: `fadeUp` — `opacity 0 → 1`, `translateY(14px) → 0`, 0.7s `cubic-bezier(0.2,0.7,0.2,1)`,
applied once on load. This is the only motion on the page.

### 3. Selected outcomes
Eyebrow "SELECTED OUTCOMES". Four items in a 2×2 grid; each is stat (accent) → label (600) → body.
1. **12 → 45** · Engineers in 18 months · "Built the hiring bar, the manager bench, and the org design behind it. Attrition fell to 6% through the whole ramp."
2. **4d → 40m** · Time to production · "Replaced a release committee with a pipeline. Weekly releases became 30+ deploys a day, with fewer rollbacks."
3. **+28%** · Throughput, no added headcount · "Rolled AI tooling across six teams with real review standards — measured in merged work, not license seats."
4. **$40M** · Series B diligence, 10 days · "Ten days inside the codebase and the team. Surfaced the two architecture risks that reset the post-close roadmap."

### 4. Engagements
Eyebrow "ENGAGEMENTS". Three columns, each with a 2px `--ink` rule on top:
- **Fractional VP of Engineering** — "I run your engineering org while you hire for it — roadmap, hiring bar, and the hard calls."
- **Technical due diligence** — "A clear read on a target's architecture, team, and real velocity — delivered in ten days."
- **Architecture & team audit** — "Two weeks in your codebase and your standups, ending in a plan your team already agrees with."

### 5. How I work
Eyebrow "HOW I WORK", section ground `--bg-alt`. Three 26px lines; the principle is `--ink`, the
sentence after it is `--ink-muted` in the same paragraph (one `<span>`), max-width 780px:
- "Ship first, systematize second." + "Process earns its place by making the next release faster. If it doesn't, it goes."
- "Hire for judgment." + "You can teach a framework. You can't teach taste, and taste is what survives the roadmap."
- "AI is leverage, not headcount." + "Strong engineers with the best tools beat a bigger team every quarter. I set up both."

### 6. Contact
Left (columns 1–7): H2 "Tell me what's slowing your team down.", then primary button "Book a call"
+ 14px muted "Two engagements open for Q4." Right (columns 9–12, bottom-aligned): email (15px/500)
and LinkedIn (15px, `--ink-muted`) stacked, 10px gap. Both links hover to `--accent`.

## Interactions & Behavior
- **Only** interaction: every "Book a call" (nav, hero, contact) opens the scheduling link. Nav link
  in the prototype anchors to `#contact-a`/`#contact-b`; in production point all of them at the
  booking URL, or keep the nav one as a smooth-scroll to `#contact`.
- Primary button hover: background `--ink` → `--accent`. Text links hover: color → `--accent`.
  No transform, no shadow. Add `transition: background-color 150ms ease` / `color 150ms ease`.
- Hero fade-up on load only. Respect `prefers-reduced-motion: reduce` by skipping it.
- No client state, no data fetching, no forms. A static page is correct.
- Accessibility: give each section an `<h2>`-level heading or `aria-label`, keep the eyebrow labels
  as real headings, and ensure the accent-on-dark and accent-on-light pairings above are kept as
  specified (they are the tested contrast-safe pairs).

## State Management
None. Optionally a theme toggle if both directions ship — persist `light|dark` in `localStorage`
and default to `prefers-color-scheme`.

## Assets
No images, icons, illustrations, or logos. Intentional — the design is typography-only. The single
external dependency is the Geist webfont from Google Fonts:
`https://fonts.googleapis.com/css2?family=Geist:wght@300;400;500;600&display=swap`
(self-host for production). SEO/meta and an OG image still need to be produced.

## Files
- `Edgar Cabrera Site.dc.html` — the design reference. Contains both directions side by side, each
  with a 1280px desktop frame and a 390px mobile frame. Open it in a browser to inspect. The
  `id="1a"` subtree is the night direction; `id="1b"` is the day direction. The frame wrappers,
  `1a`/`1b` badges, and "Mobile" captions are presentation scaffolding — not part of the site.
- `support.js` — runtime for the design-tool format. Not part of the deliverable.
