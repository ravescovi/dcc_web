# DeChellis Capital

Public website for DeChellis Capital — a family-run commercial real estate and private investment firm based in Vero Beach, Florida.

**Live:** https://ravescovi.github.io/dcc_web/

## Stack

Static HTML + CSS + vanilla JS. No build step.

- Four pages: `index.html` (home), `about.html`, `listings.html`, `contact.html`
- `styles.css` — all styles
- `script.js` — footer year + mobile nav toggle
- `motion.js` — scroll-reveal + hero entrance via [Motion](https://motion.dev) loaded from esm.sh
- `assets/logo/` — vector logos (light / dark / horizontal / mark)
- `assets/images/` — site photos
- `content/` — markdown source of truth for copy and design tokens
- `source/` — raw scraped HTML from the original DoorLoop-hosted site (reference only)

## Listings

The listings page embeds the existing DoorLoop listings SDK pointed at company id `662aaeb2ad2215bec0ac4f38`. If listing data moves off DoorLoop, swap the embed in `listings.html` for the new data source.

## Local development

```bash
python3 -m http.server 8765
# open http://localhost:8765/
```

## Deploy

Push to `main`. GitHub Pages serves from the repo root.

## Contact

- Office: 916 Turtle Cove Lane, Vero Beach, FL 32963
- Phone: (772) 410-8382
- Email: contact@dechelliscapital.com
