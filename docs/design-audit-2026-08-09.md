# Design & Technical Audit — 2026-08-09

Run via `/impeccable audit`. Scope: all 16 static routes, `src/` (4,322 lines),
verified against a running build at 1440×900 and 375×812. No files were changed
by the audit itself.

**Score: 10/20 — Acceptable (significant work needed).**

Every finding below was measured in a live browser, not inferred from reading.
Where a number appears (contrast ratios, byte counts, pixel sizes), it came from
`getComputedStyle`, `getBoundingClientRect`, or `PerformanceResourceTiming` on
the running app. Re-run `/impeccable audit` after fixes to re-score.

## Status Legend

- `[ ]` open
- `[x]` fixed and re-verified
- `[~]` intentionally declined — record why inline

---

## Score by Dimension

| # | Dimension | Score | Key Finding |
|---|-----------|-------|-------------|
| 1 | Accessibility | 1/4 | 8 routes have zero keyboard path — desktop submenus open on hover only |
| 2 | Performance | 2/4 | Carousel eagerly fetches 2.87 MB; Inter downloaded twice |
| 3 | Responsive Design | 3/4 | Solid at 375px; touch targets miss the project's own 44px bar |
| 4 | Theming | 2/4 | Rich token set, but only 7 tokens bridged into `@theme` |
| 5 | Implementation Integrity | 2/4 | 5 identical "Coming Soon" pages in nav; 1,634 lines of dead CSS |
| **Total** | | **10/20** | **Acceptable** |

Bands: 18-20 Excellent · 14-17 Good · 10-13 Acceptable · 6-9 Poor · 0-5 Critical

## Implementation Integrity Verdict

**Pass, with drift.** The visual system is genuinely product-specific — `#001689`,
Oswald uppercase headings, square-cornered cards, "Excellence From Within" — and
is not interchangeable with a generic template. The comment blocks in
`globals.css` documenting *why* each cascade fix exists are unusually good.

The drift is in accumulated layers, not the identity: four unimported
`src/styles/*.module.css` files, hand-written duplicates of Tailwind utilities
inside `@layer base`, and nine surviving `text-white !text-white` stutters that
`globals.css:206` itself identifies as vestigial.

Detector run: 2 findings, both verified.
`Button.module.css:176` (`transition: width, height`) is real but **ships to no
one** — it is inside the dead module. The Inter "overused font" warning is
accurate but the brief here is a school district identity, not a
distinctiveness play; not counted against the score.

---

## P0 — Blocking

### [x] P0-1 · Submenu items are keyboard-unreachable

**Fixed 2026-08-09 via `/impeccable harden`.** Triggers now toggle on
click/Enter/Space with `aria-expanded`, Escape closes and returns focus to the
trigger, and the group closes when focus tabs out. Hover behavior and the
`pt-2` bridge are untouched. Re-verified on the worker preview: keyboard-only
navigation reached `/ensembles/beginner` from `/calendar`.

- **Location**: `src/components/Header.tsx:128-133`
- **Category**: Accessibility
- **Standard**: WCAG 2.1.1 Keyboard (Level A)

The wrapper `<div>` opens the dropdown with `onMouseEnter`. The `<button>`
triggers have **no `onClick`, no `onFocus`, no `onKeyDown`**. Measured:
focusing "ABOUT" and activating it left the header link count at 6, unchanged.

Routes with no keyboard path from the homepage:

```
/about  /schedule  /resources/forms
/ensembles/{beginner,cadet,concert,symphonic,honor}
```

`/handbook`, `/join`, `/calendar`, `/future-members` survive only because the
footer and Quick Links cards happen to link them. Screen-reader users are in
the same position.

- **Impact**: A third of the site is unreachable without a mouse.
- **Fix**: Open on `focus`/`click` as well as hover; close on `Escape` and on
  focus leaving the group. Keep the `pt-2` hover-bridge noted at
  `Header.tsx:156-166` — it exists to fix a real bug.
- **Command**: `/impeccable harden`

---

## P1 — Major

### [x] P1-1 · Focus indicator invisible on navy

**Fixed 2026-08-09.** Two-tone ring: white 2px outline + navy 4px box-shadow
band. Measured settled values `rgb(255,255,255) 2px` / `rgb(0,22,137) 0 0 0 4px`
on both navy and white grounds.

- **Location**: `src/app/globals.css:305-308`
- **Standard**: WCAG 2.4.7 / 2.4.11

`outline: 2px solid var(--primary)` renders `rgb(0,22,137)` on a scrolled header
whose background is `rgb(0,22,137)` — measured identical, **1:1 contrast**. Same
failure in the footer and on every `bg-primary` CTA panel.

- **Fix**: White or two-tone ring (white outline + dark offset shadow) so it
  survives both grounds.
- **Command**: `/impeccable harden`

### [x] P1-2 · Mobile menu is focusable while closed

**Fixed 2026-08-09.** `inert` + `aria-hidden` while closed; slide animation
preserved. Re-measured at 375px: **0/8** items focusable while closed. Escape
now also closes the open menu and returns focus to the toggle.

- **Location**: `src/components/Header.tsx:217-221`
- **Standard**: WCAG 2.4.3 Focus Order

The panel uses `translate-x-full` — it stays `display:block; visibility:visible`.
Measured: **8 focusable items** sitting at `left: 389px` on a 375px viewport,
with no `aria-hidden` and no `inert`. Tabbing on mobile walks into an invisible
off-screen menu.

- **Fix**: `inert` + `aria-hidden` when closed (or `visibility:hidden` on the
  transition end).
- **Command**: `/impeccable harden`

### [x] P1-3 · Hamburger exposes no state

**Fixed 2026-08-09.** `aria-expanded` + `aria-controls="mobile-menu"`, and the
sr-only label now toggles Open menu / Close menu.

- **Location**: `src/components/Header.tsx:188-193`

No `aria-expanded`, no `aria-controls`, and the `sr-only` label is permanently
**"Open menu"** even while the menu is open.

- **Command**: `/impeccable harden`

### [x] P1-4 · Dropdown triggers expose no state

**Fixed 2026-08-09** with P0-1: `aria-expanded` + `aria-controls` on all three
triggers and the mobile accordions. `aria-haspopup` deliberately omitted — the
dropdowns follow the disclosure pattern, not menu-widget arrow-key semantics.

- **Location**: `src/components/Header.tsx:144-153`

No `aria-expanded`, `aria-haspopup`, or `aria-controls` on any of the three
(`ABOUT`, `ENSEMBLES`, `RESOURCES`). Pairs with P0-1 — fix together.

- **Command**: `/impeccable harden`

### [x] P1-5 · Carousel autoplays with no pause control

**Fixed 2026-08-09 by `/impeccable animate`.** 44px pause/play control in the
frame; rotation pauses on hover/focus and offscreen (IntersectionObserver),
stops for good on manual navigation, and never starts under
`prefers-reduced-motion` (matchMedia, verified via Playwright emulation).
`aria-live` is `off` while rotating, `polite` once the visitor drives; each
slide carries `role="group"` + "n of 9". All nine photos now have descriptive
alt text written from the actual images.

- **Location**: `src/components/ImageCarousel.tsx:14-20`
- **Standard**: WCAG 2.2.2 Pause, Stop, Hide (Level A)

5-second `setInterval`, no pause/stop, no `prefers-reduced-motion` check, no
`aria-live` region. All nine slides labeled `"Band photo 1..9"`.

- **Fix**: Pause control, pause on hover/focus, honour reduced motion, real alt
  text per photo.
- **Command**: `/impeccable animate`

### [x] P1-6 · Carousel downloads 2.87 MB

**Fixed 2026-08-09 by `/impeccable optimize`.** `ImageCarousel` now mounts only
the current slide ± 1 (circular), and the misplaced `priority` on below-fold
slide 1 is gone. Measured on the preview worker: initial load fetches 3 slides
(~1.15 MB) instead of 9 (2.87 MB); the rest arrive one per autoplay tick.

- **Location**: `src/app/page.tsx:67-79`
- **Category**: Performance

All 9 slides render into the DOM at once; `opacity-0` does not stop the fetch
because they intersect the viewport. Measured via `PerformanceResourceTiming`:
**9 images, 2,873,805 bytes**, on a 375px viewport. Per **D3** there is no
resize-on-request to hide behind. Slide 1 alone is 394 KB.

- **Fix**: Render only current ± 1 slide. Consider dropping to 5-6 photos.
- **Command**: `/impeccable optimize`

### [x] P1-7 · Inter loaded twice + render-blocking third party

**Fixed 2026-08-09 by `/impeccable optimize`.** Both faces now self-host via
`next/font/google` as single variable woff2 files (Inter 48 KB + Oswald 28 KB,
latin); the `fonts.googleapis.com` `@import` is deleted and `--font-body` /
`--font-display` resolve against the `next/font` variables. Measured: exactly
2 same-origin font requests, zero third-party.

- **Location**: `src/app/layout.tsx:2,7` and `src/app/globals.css:1`
- **Category**: Performance

`next/font/google` self-hosts Inter (14 `woff2` in `.next/static/media`), while
the CSS `@import` also fetches Inter (8 weights) **and** Oswald (4) from
`fonts.googleapis.com`. Both `@font-face` sets are live: `.hero-subtitle`,
`.nav-link`, and `.btn` resolve `--font-body: 'Inter'` against the CDN copy
while `<body>` uses the self-hosted one. Confirmed two extra third-party
requests (`googleapis` + `gstatic`) before first paint.

- **Fix**: Drop Inter from the `@import` and keep Oswald, or move Oswald to
  `next/font` too and delete the `@import` entirely. Oswald is the only face the
  import genuinely provides.
- **Command**: `/impeccable optimize`

### [x] P1-8 · Every route has the same `<title>`

**Fixed 2026-08-09.** Root layout: `metadataBase`, `title.template`
(`%s | KMS Panther Band`), and `openGraph` (hero image, 1600×900). All 13
interior routes export their own `title` + `description`; descriptions stick
to director-confirmed facts (PRODUCT.md Positioning). A styled `not-found.tsx`
was also added — stale legacy-site links previously hit Next's bare 404.

- **Location**: `src/app/layout.tsx:9-12`
- **Standard**: WCAG 2.4.2 Page Titled

No page exports `metadata`. Verified across 11 routes — all return
`<title>KMS Panther Band</title>`. Also means no `openGraph`: a link shared to a
class Facebook group renders untitled and imageless.

- **Fix**: Per-route `export const metadata`, plus `openGraph` in the root layout.
- **Command**: `/impeccable harden`

---

## P2 — Minor

### [x] P2-1 · `/about` hero subtitle fails contrast

**Fixed 2026-08-09 by `/impeccable colorize`.** The gradient now runs
`from-primary to-primary-active` (#001689 → #001260) — navy into deeper navy,
never into white — so white text is ≥14.9:1 at every point. A comment in the
markup records why `to-white` must not return.

`src/app/about/page.tsx:8,13` — white text on `bg-gradient-to-b from-primary
to-white`. At 61% down the gradient the background computes to
`rgb(155,163,209)` → **2.46:1**, under even the 3:1 large-text floor. The `<h1>`
sits at 39% and scrapes by at 4.65:1. → `/impeccable colorize`

### [x] P2-2 · Touch targets under 44px

**Fixed 2026-08-09 by `/impeccable animate` + `/impeccable adapt`.** Carousel
arrows, dots, and pause button hit 44×44 in the animate pass; adapt finished
the job: hamburger `p-2` → `p-2.5` (44×44 measured), and the dot row gained
`flex-wrap` + `shrink-0` — nine 44px buttons need 396px, so on a phone the
non-wrapping row had silently squeezed each dot to ~37px. Measured ≥44px at
375px and 320px (two rows).

CLAUDE.md sets ≥44px. Measured:

| Element | Location | Size |
|---|---|---|
| Carousel dots | `ImageCarousel.tsx:80` | **8×8** |
| Carousel arrows | `ImageCarousel.tsx:56,66` | 40×40 |
| Hamburger | `Header.tsx:190` | 40×40 |

Dots also fail WCAG 2.5.8's 24px floor. → `/impeccable adapt`

### [x] P2-3 · No `prefers-reduced-motion` anywhere

**Fixed 2026-08-09 by `/impeccable animate`.** Smooth scroll gated behind
`no-preference`; the hero entrance falls back to fade-only; card lift and the
mobile-menu slide / hamburger morph drop their spatial movement
(`motion-reduce:` variants); carousel autoplay never starts. Opacity and color
feedback deliberately survives — reduced, not frozen.

**0 matching rules** in the shipped stylesheet. Smooth scroll, 500ms crossfade,
card lift, and hamburger morph all ignore the OS setting. → `/impeccable animate`

### [x] P2-4 · `transition: all` globally

**Fixed 2026-08-09 by `/impeccable animate`.** Every `transition: all`
(global element rule, `.nav-link`, `.btn`, `.card`, `.form-control`, the
header, QuickLinkCard) is now scoped to the properties its states actually
change.

`globals.css:317` applies it to every `button, a, input, textarea, select`.
Confirmed `transition-property: all` on links — animates layout properties by
default. → `/impeccable animate`

### [x] P2-5 · Off-token colors throughout

**Fixed 2026-08-09 by `/impeccable colorize`.** Zero Tailwind default colors
remain in `src/` (verified by grep). The 19 `bg-gray-100` panels and 3
`bg-gray-50` grounds moved onto two new opaque navy-wash tokens
(`--primary-tint` #E8EAF4, `--primary-canvas` #F5F6FA — District Navy mixed
over white, District Ink Rule intact); `text-green-600` checkmarks became
`text-primary`; `text-gray-600` became the bridged `text-gray-dark`. The
bridge also gained `--color-primary-active`. Tokens documented in DESIGN.md.

`bg-gray-50`, `bg-gray-100`, `bg-gray-300`, `text-gray-600`, `text-green-600`
across 8 pages are Tailwind defaults, not design tokens. Root cause: `@theme
inline` (`globals.css:137-145`) bridges only **7** of ~130 `:root` tokens, so the
rest of the scale is unreachable as a utility. → `/impeccable colorize`

### [x] P2-6 · Oversized bio images

**Fixed 2026-08-09 by `/impeccable optimize`.** All three bios resized to
800px longest side (cards render ~370px; 2× retina); `boone-bio.png` converted
to `boone-bio.jpg`. 781 KB → 197 KB (−75%).

### [x] P2-7 · Alt text inconsistent

**Fixed 2026-08-09.** Ms. Ruiz's photo now reads
`alt="Ms. Catherine Ruiz - Assistant Band Director"`, matching the format of
the other two directors.

`about/page.tsx:90` — `alt="Assistant Band Director"` does not name Ms. Ruiz,
unlike the other two directors. → `/impeccable clarify`

### [x] P2-8 · Fixed-height iframes

**Fixed 2026-08-09 by `/impeccable adapt`.** Both embeds now use fluid-height
utilities in `globals.css` (`.iframe-fluid` = clamp(480px, 70svh, 900px);
`.iframe-fluid-tall` = clamp(560px, 80svh, 1100px), plain-`vh` fallback for
older browsers). Measured: calendar 568px at 375×812, 630px at 1440×900,
480px floor at 320px and landscape; handbook 650/720px. Inline styles,
deprecated `frameBorder`, and raw width/height attributes removed; handbook
embed also gained `loading="lazy"`.

`calendar/page.tsx:25` is 600px — **74%** of a 375×812 viewport.
`handbook/page.tsx:43` is 800px. Both use inline styles / raw attributes rather
than the token system, and `calendar` still carries deprecated `frameBorder`.
→ `/impeccable adapt`

### [x] P2-9 · Dead CSS modules

**Fixed 2026-08-09 by `3226660` (distill).** `src/styles/` is deleted.

`src/styles/{Button,Card,Form,Navigation}.module.css` — 1,634 lines, **zero
imports**. Not bundled, so no user-facing cost, but a second competing design
vocabulary that will drift. Also the only home of the detector's
`layout-transition` finding. → `/impeccable distill`

---

## P3 — Polish

- **[x] P3-1 · Five identical "Coming Soon" pages** — `/ensembles/*` all render
  the same placeholder. The nav promises five ensembles and delivers five
  identical dead ends. Content decision, not a code fix.
  **Fixed 2026-08-09 by `2488b9e`** — real content on all four ensemble pages
  (Cadet Band removed for 2026-27 in `b39ebf5`).
- **[x] P3-2 · `text-white !text-white` ×9** — vestigial; `globals.css:199-213`
  documents the fix that made the override unnecessary.
  **Fixed 2026-08-09 by `3226660`** — zero occurrences left in code; only the
  historical comment in `globals.css` mentions the pattern.
- **[x] P3-3 · Inline styles beside Tailwind** — `page.tsx:109`
  `style={{ padding: '32px' }}` where `p-8` exists. Leftover from the
  spacing-inert bug, now fixed.
  **Fixed 2026-08-09 by `3226660`.**
- **[ ] P3-4 · `.section-full-width` bleeds 10px** — measured 1440px wide inside
  a 1430px layout viewport, saved only by `overflow-x: clip`. Content stays
  centered so nothing visibly breaks; recorded as a latent dependency, not a
  defect.
- **[ ] P3-5 · Copyright year frozen at build** — `Footer.tsx:70`
  `new Date().getFullYear()` prerenders once and shows 2026 until the next deploy.

---

## Patterns & Systemic Issues

1. **Interaction is mouse-shaped.** Hover-only dropdowns, no-op keyboard
   triggers, missing ARIA state, and an invisible focus ring are not four bugs —
   they are one assumption. Highest-leverage fix on the list.
2. **Motion was added, never gated.** Six animation surfaces, zero
   `prefers-reduced-motion`, zero pause affordance.
3. **The token layer stops at the boundary.** A 130-line `:root` scale that
   Tailwind can only see 7 entries of, so real pages reach past it.
4. **Old layers were left behind, not removed.** Dead modules, duplicated
   utilities, `!text-white`, inline padding — each a fossil of a solved problem.

## Positive Findings — Maintain These

- **Every route is `○ (Static)`.** No env vars, no API routes. `typecheck` and
  `lint` both clean; `next build` green.
- **The cascade comments are exemplary.** `globals.css:147-155`, `168-180`,
  `199-213`, `321-334` and `HeaderSlot.tsx:16-32` each record the symptom, the
  measurement, and the "do not unwrap." That is why the layering is correct now.
  **Preserve this convention in every fix below.**
- **D5 worked.** `HeaderSlot` genuinely makes the missing-nav bug unrepeatable.
- **D6 holds.** `/handbook` Quick Reference matches the 50/50 grading and blue
  polo; `/resources/forms` is a real single source of truth.
- **Mobile fundamentals are sound** — no horizontal overflow at 375px, nothing
  under 14px, `lang="en"`, one `<h1>` per page, both iframes titled.
- **The 708 KB Stagewise chunk is genuinely gone (D4).** Largest client chunk
  223 KB, CSS 35.9 KB.

---

## Recommended Order

1. ~~**[P0/P1] `/impeccable harden`** — keyboard dropdowns, ARIA state on both
   nav layers, `inert` on the closed mobile panel, visible focus ring,
   per-route `metadata`. *(P0-1, P1-1..4, P1-8)*~~ Done 2026-08-09.
2. ~~**[P1] `/impeccable optimize`** — lazy the carousel, de-duplicate Inter,
   recompress bio images. *(P1-6, P1-7, P2-6)*~~ Done 2026-08-09.
3. ~~**[P1] `/impeccable animate`** — carousel pause, reduced-motion branch,
   scoped transitions. *(P1-5, P2-3, P2-4)*~~ Done 2026-08-09.
4. ~~**[P2] `/impeccable adapt`** — 44px touch targets, fluid iframe heights.
   *(P2-2, P2-8)*~~ Done 2026-08-09.
5. ~~**[P2] `/impeccable colorize`** — `/about` gradient contrast, widen
   `@theme inline`. *(P2-1, P2-5)*~~ Done 2026-08-09.
6. ~~**[P3] `/impeccable distill`** — delete dead modules, `!text-white`, inline
   padding. *(P2-9, P3-2, P3-3)*~~ Done 2026-08-09 by `3226660`; P2-7 alt text
   ticked in the same cleanup.
7. **`/impeccable polish`** — final pass. Not run as a formal pass; every
   scored finding is closed except P3-4 (recorded latent dependency, no
   action) and P3-5 (copyright year frozen at build — accepted while the site
   deploys weekly).

## Reproducing This Audit

```bash
npm run dev                         # then drive localhost:3000
node <impeccable-skill>/scripts/detect.mjs --json src
npm run typecheck && npm run lint && npm run build
```

Note: `next dev` (16.3) appends a `nextjs-agent-rules` block to `CLAUDE.md` on
every run and re-adds it if reverted.

No `PRODUCT.md` exists, so this audit was run against the incumbent
implementation and the targets stated in `CLAUDE.md`. Running
`/impeccable init` then `/impeccable document` would capture design intent
before the fix passes begin.
