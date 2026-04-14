# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this project is

Rebuild of the **DeChellis Capital** website. The existing site lives inside a DoorLoop website-builder (`https://sites.doorloop.com/site/6509f0c1/`) and the live domain `dechelliscapital.com` is currently broken (TLS handshake failure). The owner wants to replace the DoorLoop-hosted version with a site they control.

Current phase: **asset extraction complete, scaffold not yet built**. No framework has been chosen — the user's stated preference is to keep the tech stack as simple as possible initially and expand from there. Treat "start with the exact same version" literally: the first iteration should reproduce the DoorLoop site's layout and copy, not redesign it.

## Repository layout

```
dc_capital/
├── source/          # Raw scraped HTML from the DoorLoop preview + widget CSS
│   ├── page_home.html, page_about.html, page_contact.html, page_listings.html
│   ├── page_properties.html, page_services.html  (both 404 — empty placeholders, ignore)
│   ├── preview.html     # Original empty skeleton, kept for reference only
│   └── widget_*.css     # Per-page DoorLoop stylesheets (large; mostly builder chrome)
├── content/         # Clean human-readable content extracted from source/
│   ├── home.md, about.md, contact.md, listings.md
│   └── _design-tokens.md   # Colors, fonts, header/footer structure — read this first
└── assets/
    ├── images/      # Real site images (headshots, building photo, hero, favicon)
    └── fonts/       # (empty — fonts should load from Google Fonts CDN, not self-hosted)
```

When building pages, **read `content/*.md` for copy and `content/_design-tokens.md` for styling**. Do not re-scrape — the source HTML is heavy DoorLoop builder scaffolding and parsing it again wastes effort.

## Site structure

Four real pages: **Home**, **About**, **Listings**, **Contact**. The `listings` page on the original is a dynamic DoorLoop widget (no hardcoded content) — for the rebuild it needs a data source decision (static JSON, CMS, or keep pointing at DoorLoop's embed). Listings page is currently blocked pending that decision.

## Design tokens (summary — full details in `content/_design-tokens.md`)

- **Primary brand color**: `#2f3e83` (navy). Dark variant `#182c4c`, accent orange `#F86F4C`.
- **Fonts**: Syne (display/headings), Raleway (UI/subheads), Montserrat (body). All Google Fonts — load via CDN `<link>`, do not self-host.
- **Header**: utility strip (phone + email + Portal Login) above main nav (logo left, Home/About/Listings/Contact right).
- **Footer**: 3-column (logo+tagline / nav / contact block). **Remove** the "powered by DoorLoop" attribution and the default `facebook.com/doorloopapp` link from the rebuild.

## Content gotchas

- Two email addresses appear on the original: `alex@dechelliscapital.com` (headers, hero CTA, contact form) and `info@dechelliscapital.com` (footer). Preserve both unless the client says otherwise.
- The form on the Contact page uses DoorLoop-specific hidden fields (`dmformsendto`, `dmformsubject`, `label-dmform-*`, etc.). **Drop these** in the rebuild — they only work with DoorLoop's form handler. Re-wire to a simple mailto: or a form service the client controls.
- Internal links in the scraped HTML have `?preview=true&insitepreview=true&dm_device=desktop` query strings. Strip these when porting.
- Logo file: `assets/images/uh8l3hkg3ffca04a-99ac-4c0d-822e-eea782a3415f.png` (the earlier `logo.png` that was downloaded first was DoorLoop's placeholder — it's been removed).

## Common commands

None yet — no build tooling is present. Once a framework is picked, add the commands here (dev server, build, lint).

To re-download a source page:
```
curl -sL -A "Mozilla/5.0" "https://sites.doorloop.com/site/6509f0c1/<page>?preview=true&insitepreview=true&dm_device=desktop" -o source/page_<page>.html
```

## Working notes

- `dechelliscapital.com` is unreachable (TLS error) and has no Wayback snapshots — the DoorLoop preview is the only source of truth for existing content.
- The DoorLoop `preview/6509f0c1` URL (without `/site/`) returns an empty template and is useless — always use the `/site/6509f0c1/<page>` form.
- Pages `services` and `properties` return 404 on DoorLoop — they don't exist on the original site.
