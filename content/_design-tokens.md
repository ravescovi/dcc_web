# Design Tokens

Pulled from inline styles and linked stylesheets in the DoorLoop-preview HTML. Treat as a starting reference, not a strict spec — the site used a lot of template-default CSS that can be discarded in the rebuild.

## Brand colors

| Token | Hex | Usage |
|---|---|---|
| Primary navy (deep) | `#182c4c` | Body copy headings, H1/H2 on light backgrounds |
| Primary navy | `#202b5b` | Secondary headings / accents |
| Primary navy (bright) | `#2f3e83` | Dominant brand color — buttons, links, heading accents (most-used on-page color) |
| White | `#ffffff` | Hero text, footer text on navy |
| Off-white surface | `#f7f7f7` | Section backgrounds |
| Accent orange | `#F86F4C` / `#F56D41` | CTA highlights (used sparingly) |
| Neutral grey | `#8c8c8c`, `#272B35` | Supporting text |

Recommendation: treat `#2f3e83` as `--color-primary`, `#182c4c` as `--color-primary-dark`, `#F86F4C` as `--color-accent`.

## Typography

All fonts are Google Fonts (DoorLoop preloads a large catalog, but only a few are actually applied via inline styles):

- **Headings**: `Syne` (display, primary heading font) — also appears as `Syne-Regular`
- **Subheadings / UI**: `Raleway`
- **Body**: `Montserrat` (primary body), with `Roboto` as a secondary body fallback
- **Serif accent**: `Georgia` (occasional pull-quotes / numbers)

Safe stack: `"Syne", "Raleway", system-ui, sans-serif` for display; `"Montserrat", "Roboto", system-ui, sans-serif` for body.

## Header

- Top utility strip on the right: **Portal Login** CTA (`https://app.doorloop.com`).
- Secondary left strip: "Get in touch" with phone + email.
- Main nav row: Logo (left) + Home / About / Listings / Contact (right).
- Logo: `uh8l3hkg3ffca04a-99ac-4c0d-822e-eea782a3415f.png`.
- On mobile this collapses to hamburger + the same nav items.

## Footer

Three-column layout:

1. Logo + tagline ("As professional landlords and property managers, we're committed to bringing you the best rental experience possible.")
2. Nav column (Home / About / Listings / Contact) with a small `Screenshot 2023-07-10 at 12.23.58 PM.png` mark.
3. Office contact block — address, phone, "Email us" (`info@dechelliscapital.com`).

Bottom bar: "All Rights Reserved | DeChellis Capital powered by DoorLoop" + Facebook social icon (DoorLoop default — should be removed or replaced in the rebuild).

## Reusable patterns

- **Hero**: full-bleed image background with centered white stacked H1 and a single pill CTA. On home: image `09c1af04-...-1920w.jpg`, three-line headline ("Intelligence, Integrity, Longevity."), "Contact Us" button.
- **Stat trio**: large display number (`#2f3e83`) above a short Raleway label. Used on About.
- **Value cards**: 2×2 grid of heading + paragraph (Intelligence / Integrity / Quality / Longevity).
- **Team grid**: 4-up cards — circular headshot, name (H3), optional button (currently empty placeholders).
- **Section CTA**: primary navy button with white text, uppercase label, ~8px radius.

## Notes / cleanup for rebuild

- Strip all `?preview=true&insitepreview=true&dm_device=desktop` query params from internal links.
- Replace the DoorLoop-branded Facebook social link (`facebook.com/doorloopapp`) with the client's own socials or remove.
- Drop DoorLoop-injected hidden form fields (`label-dmform-*`, `dmformsendto`, `dmformsubject`, `dmformfrom`, `dmformsubmitparams`, `page_uuid`, `action`) — those are specific to DoorLoop's form handler.
- "powered by DoorLoop" footer attribution should be removed on the new site.
