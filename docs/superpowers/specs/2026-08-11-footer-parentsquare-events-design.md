# Footer Affiliation, ParentSquare Push, Homepage Events — Design

**Date:** 2026-08-11
**Status:** Approved (design reviewed in-session by director)

## Purpose

Three small additions that borrow the good parts of the campus/district sites
without inheriting their maintenance surface:

1. The footer signals official affiliation (school logo, campus + district links).
2. ParentSquare — where weekly band news actually goes out — is discoverable
   from the footer and pushed on the homepage.
3. The homepage surfaces upcoming events the way the district homepage does
   (compact event list + "view full calendar" link), sourced live from Teamup
   so nothing is hand-maintained.

## Background / constraints

- Events live in the embedded Teamup calendar (`ksy2fym655un5pdh88`); it is
  the single source of truth (CLAUDE.md, D6 discipline). No event data may be
  copied into code.
- The site is fully static, zero env vars, zero server compute. That must not
  change.
- Logo provenance (director-clarified 2026-08-11): the header "K" SVG is the
  **band** logo and stays. The KMS stylized panther-with-text PNG is the
  **school** logo; its black panther and dark-navy text are illegible on the
  navy `#001689` footer, so on dark surfaces it sits on a white chip.
- Performance targets: FCP < 1.5s. Nothing new may load above the fold.

## Changes

### 1. Footer (`src/components/Footer.tsx`)

- **About column:** add the KMS school logo on a small white rounded chip
  (white background, slight padding, rendered ~80px) above the
  "KMS PANTHER BAND" heading. Below the existing C.E. King Middle School
  link, add a second line: **Sheldon ISD** → `https://www.sheldonisd.com`
  (external, `target="_blank" rel="noopener noreferrer"`, same link styling).
- **Quick Links column:** add **ParentSquare** →
  `https://www.sheldonisd.com/departments/communications/parent-square`
  (external, same treatment).
- **Tap targets:** give *all* footer links — existing and new — a uniform
  invisible vertical padding (e.g. `inline-block py-2.5`) so every footer
  link meets the 44px target consistently. Padding only the new links would
  make the columns visually inconsistent; padding all of them is invisible
  and fixes the whole footer in one pass.
- Everything else in the footer is unchanged.

### 2. Asset: `public/images/kms-school-logo.png`

- Source: district Finalsite CDN
  (`resources.finalsite.net/.../CEKingMiddleSchool.png`), 512×512 transparent
  PNG, ~31 KB. Committed locally — never hotlinked (external hosts can move
  files; we serve our own bytes).
- **Downscale to 160×160 before committing** (2× the ~80px render size, so
  Retina stays sharp). Note: `scripts/compress-images.mjs` only resizes
  images wider than 1600px, so it will pass a 512px PNG through nearly
  unchanged — the downscale is a one-off step (sharp via a node one-liner or
  ImageMagick), not something the D3 script does for us. Alt text:
  **"C.E. King Middle School logo"** — the logo is informative (it signals
  affiliation), not decorative.

### 3. Homepage upcoming-events section (`src/app/page.tsx`)

- New section **directly after Quick Links**, before the ParentSquare strip:
  - Heading: `UPCOMING EVENTS` (same heading style as sibling sections).
  - A second Teamup iframe embed of the **same calendar** in agenda/list
    view, minimal chrome (no sidepanel, no view header), height ≈ 420px,
    `loading="lazy"` (below the fold; zero cost at first paint).
    `title="Upcoming KMS Panther Band events"` — deliberately distinct from
    the `/calendar` iframe's title, since this is a different view serving a
    different purpose.
  - **Scrolling:** a fixed-height frame over an agenda list means nested
    scrolling. Accepted deliberately — capping to a date range would need
    periodic re-tuning (a D6-shaped maintenance leak). Keep
    `showDateControls=1` so users can page forward in time inside the frame.
  - Centered below the embed: **VIEW FULL CALENDAR →** linking to
    `/calendar`, using the existing link/button vocabulary.
- The exact Teamup view/chrome query params are verified during
  implementation against the params already used in
  `src/app/calendar/page.tsx` (same param family; only the view and chrome
  toggles differ). **Load the actual embed URL against the live calendar**
  and confirm users can still navigate beyond the initially loaded window
  with the reduced chrome; if stripping the view header also kills date
  navigation, re-enable whichever toggle restores it.
- The existing "UPCOMING EVENTS" quick-link card stays as-is — it remains
  the navigation path to the full calendar page.

### 4. Homepage ParentSquare strip (`src/app/page.tsx`)

- A slim **STAY CONNECTED** section between the events section and the
  Panther Pride gallery:
  - One sentence: "Weekly band news goes out on ParentSquare — the
    district's family communication app." (final copy may be tuned during
    implementation; meaning fixed).
  - Three links, styled with the existing button/link vocabulary (no
    Apple/Google badge artwork):
    - **About ParentSquare** →
      `https://www.sheldonisd.com/departments/communications/parent-square`
    - **App Store** → `https://apps.apple.com/us/app/parentsquare/id908126679`
    - **Google Play** →
      `https://play.google.com/store/apps/details?id=com.parentsquare.psapp`
  - All three external (`target="_blank" rel="noopener noreferrer"`).

## Explicitly out of scope / avoided

- No hand-maintained event data anywhere (the drift failure D6 exists to
  prevent).
- No new dependencies, no client JS beyond the iframe, no API keys, no env
  vars. All routes remain `○ (Static)`.
- No campus social-media links (they are the school's channels, not the
  band's) and no district legal/Finalsite footer boilerplate.
- No change to the header or the band "K" logo.

## Error handling

- If the Teamup embed fails to load (network, third-party outage), the
  section degrades to an empty iframe with the "VIEW FULL CALENDAR" link
  still present — the same failure mode `/calendar` already has. No custom
  fallback logic.

## Testing / acceptance

- Local gate: `npm run typecheck && npm run lint && npm run build:cf`; all
  routes still static; then `npm run preview:cf` and load `/`.
- Visual check at 375px and desktop: footer chip legible on navy; events
  embed usable at mobile width; strip links wrap cleanly.
- Confirm the events iframe carries `loading="lazy"` and sits below the fold.
- Tap-target sanity: strip links and **all** footer links ≥ 44px (via the
  uniform footer-link padding in §1).
- Confirm date navigation works inside the live events embed (see §3).
