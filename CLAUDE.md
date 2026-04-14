# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

The DeChellis Capital public website — a static HTML/CSS/JS rebuild replacing the old DoorLoop-hosted site. Deployed via GitHub Pages at https://ravescovi.github.io/dcc_web/.

The live domain `dechelliscapital.com` was broken (TLS handshake failure) when this project started; the DoorLoop preview at `sites.doorloop.com/site/6509f0c1/...` was the only source of truth for the original content. That content was captured into `content/*.md` and the scraped HTML has since been deleted (it contained Mapbox tokens that tripped GitHub secret scanning).

## Stack

Plain static files, no build step.

- `index.html`, `about.html`, `listings.html`, `contact.html` — one page each
- `styles.css` — all styling + self-hosted `@font-face` declarations for Montserrat
- `script.js` — footer year + mobile nav toggle
- `motion.js` — scroll-reveal + hero entrance via [Motion](https://motion.dev) loaded as an ES module from `https://esm.sh`
- `favicon.ico`, `robots.txt`, `sitemap.xml` — at repo root for discoverability

## Directory layout

```
assets/
  fonts/      Self-hosted Montserrat woff2 (weights 300/400/500/600/700, latin subset)
  images/     Real site photos (hero, headshots, property photos). Filenames preserved
              from the scrape — some have spaces/parens and must be URL-encoded if
              referenced from CSS, but HTML src="" tolerates them.
  logo/       Vector logo system. Derived from logo_vector.svg (the authoritative path).
              - dechellis-capital-mark.svg         Mark only (favicon source, header icon)
              - dechellis-capital.svg              Stacked lockup (light)  — press/reference
              - dechellis-capital-dark.svg         Stacked lockup (dark)   — press/reference
              - dechellis-capital-horizontal.svg   Horizontal lockup       — press/reference
              - dechellis-capital-horizontal-dark  Horizontal lockup dark  — press/reference
              - favicon-{32,180,192}.png           Raster favicons rendered from the mark
              - logo_vector.svg                    Source of truth for the mark path
content/      Markdown sources of truth for page copy + design tokens
```

## Fonts

- **Montserrat** (self-hosted, `assets/fonts/Montserrat-{300,400,500,600,700}.woff2`) — primary brand font, used for body, nav, wordmark, buttons. Declared via `@font-face` at the top of `styles.css`.
- **Playfair Display** (loaded from Google Fonts CDN) — editorial display serif, used for headings via `--font-display`. Can be removed entirely if you want a single-font system; nothing else depends on it.

The SVG logos in `assets/logo/` reference Montserrat via `font-family` in embedded `<text>`. When these SVGs are loaded via `<img src>` the browser sandboxes them and does not inherit page fonts, so on the live site the header/footer lockups are rendered as **HTML text** (using the self-hosted Montserrat) paired with the `mark.svg` icon, not as the horizontal SVG. The horizontal/stacked SVG lockups are kept only for press and export use.

## Logo mark geometry

The castle mark comes from `assets/logo/logo_vector.svg`. Each half is a leaning pennant:
- Vertical flat inner edge (facing the center gap)
- Short vertical outer edge at the top
- Stepped top with two merlons of unequal height (outer taller than inner)
- Long diagonal bottom from outer-midpoint to inner-bottom

If this shape needs to change, update `logo_vector.svg` first, then sync the path into the five derived SVGs.

## Listings

The listings page keeps the DoorLoop listings SDK embed (`company-id 662aaeb2ad2215bec0ac4f38`). The container is sized with `min-height: 420px; max-height: calc(100vh - 180px); overflow: auto` to avoid the widget blowing up to full-viewport when few listings exist. If listing data ever moves off DoorLoop, swap the embed in `listings.html` for the new source.

## Contact page

Two-column layout with info + Google Maps iframe on the left and the send-us-a-message form on the right, tuned to fit above the fold on typical desktop heights. The form posts via `mailto:contact@dechelliscapital.com` — wire to a real form backend (Formspree / Netlify Forms / etc.) when deployment moves beyond GitHub Pages.

## Dev

```bash
python3 -m http.server 8765    # then open http://localhost:8765/
```

## Deploy

Push to `main`. GitHub Pages serves from the repo root. First build takes ~30-60s; subsequent builds are faster. The URL `/` will serve `index.html` automatically.

## Gotchas

- **No root-absolute links** (`href="/"`) — the site is served under `/dcc_web/` on Pages, so internal links must be relative (`href="index.html"`).
- **Scraped content had secrets** — if you ever re-scrape anything from the DoorLoop preview into this repo, strip Mapbox/Maps tokens before committing or GitHub's push protection will reject the push.
- **Motion loaded from CDN** — if you need offline-reliable animations, switch `motion.js` to import from a local bundle (would require `npm install motion` + a bundler step; current trade-off prioritizes zero build step).
