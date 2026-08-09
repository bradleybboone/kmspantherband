# 2026-27 Season Refresh — Design

**Date:** 2026-08-09
**Status:** Approved for planning

## Problem

The site went live 2026-08-09 carrying 2025-26 content. Three classes of defect:

1. **Factual drift.** Hand-copied handbook summaries contradict the actual
   2026-27 handbook — wrong grading split, wrong concert attire, invented
   practice minimums. A parent following the site buys the wrong clothes.
2. **Broken structure.** The nav links to `/future-members`, which does not
   exist (404). `/join` and `/schedule` render no `<Header />`, so they have no
   navigation. The contact form fakes a successful send.
3. **Missing recruiting content.** The incoming-6th-grade material that lives on
   the legacy Google Site and in the elementary packet has no home here.

## Sources and Authority

Authority order, highest first. Where they disagree, the higher source wins.

| Source | Date | Notes |
|---|---|---|
| **2026-27 Band Handbook** (Google Doc `1una3PX…`) | updated 2026-08-05 | Authoritative. Already embedded at `/handbook`. |
| **Elementary Packet — 6th Graders** (PDF) | 2026-05-04 | Authoritative for beginner/vendor/fee detail. |
| Director-supplied corrections (this session) | 2026-08-09 | Overrides both where explicitly given. |
| Legacy Google Site (`sites.google.com/apps.sheldonisd.com/kmsband`) | stale | Structure only. Content verified before reuse. |

### Resolved contradictions

- **Alto Saxophone is school-owned starting 2026-27.** Handbook and packet
  agree; the Google Site (which lists sax as parent-purchase) is wrong.
- **Instrument drive: Friday, August 21, 2026, 5:00–8:00 PM, Null Middle School
  cafeteria.** The Google Site's "Tuesday, August 29" is a 2023 date. Verified:
  Aug 21 2026 is a Friday. Venue is **Null**, not King — must be explicit.
- **Vendors: Brook Mays/H&H Music, Music & Arts, Veritas Instrument Rental.**
  Brook Mays is H&H's parent company, so the existing `rental.brookmays.com`
  link stays valid under a combined label.
- **Recruitment statistics cut.** The Google Site's "90 points higher on the
  SAT" and "96% vs 60% college graduation" are unsourced and not verifiable.
  Replaced with concrete local specifics.
- **Ruiz remains "5th year."** Confirmed current for 26-27.
- **Cooper → Chavez.** Jenny Cooper is replaced by Mrs. Amanda Chavez. The
  May 2026 packet still lists Cooper; it predates the change.

### Flagged for the director — not resolved in code

These are inconsistencies in the source documents. The site will use the noted
fallback; correcting the source is a separate, off-repo action.

1. **Activity fee has two due dates in the handbook** — "due August 21, 2026" in
   the fees section, and "Activity fees and shirt orders due" on September 4,
   2026 in the calendar. *Site will say Sept 4 for fees, Aug 21 for forms.*
2. **Grading rubric skips C** — 100 A / 85 B / 70 D / 50 F. Looks like a typo.
   *Site will not reproduce the letter rubric; it states the 50/50 split only.*
3. **Handbook directs families to `tinyurl.com/kingmsband`**, not
   kmspantherband.org. If that tinyurl points at the legacy Google Site, every
   family reading the new handbook lands off-site. *Repoint the tinyurl.*
4. **Enrollment and athletics figures are last year's** ("over 250 members",
   "8 in 10 of our 7th & 8th graders"). *Site will phrase these without
   numbers until current figures are supplied.*
5. **Activity fee inclusions vary by source** — handbook says T-shirt + method
   book; packet says T-shirt, 1" binder, pencil pouch, case tag, and textbook.
   *Site uses the packet's fuller list, which supersets the handbook's.*

## Scope

### A. Year rollover

- `/calendar`: "2025-2026" → "2026-2027".
- `/about`: Boone "fourth year" → "fifth year". Ruiz unchanged.
- Ruiz bio: drop "so excited to join the team" — she is returning, not new.

### B. Staff change

- Remove Jenny Cooper from `/about` and `/contact`; delete `cooper-bio.jpg`.
- Add Mrs. Amanda Chavez with the director-supplied bio and headshot.
- Headshot is a 4032×3024 / 4.6 MB iPhone original carrying **GPS EXIF**. It
  must go through `npm run images:compress`, which resizes to 1600px, bakes in
  orientation, and strips metadata (sharp drops EXIF unless `withMetadata()` is
  called). Never commit the original.
- Contact page gains the school phone, 281-727-3500.

### C. Handbook accuracy (`/handbook` Quick Reference)

Correct in place, per the approved option:

- Grading → **50% Major / 50% Daily**.
- Concert attire → **blue performance polo + black dress pants**; beginners wear
  the **blue band T-shirt, tucked**, with black pants, belt, socks, shoes.
  Not permitted: jeans, sneakers, Converse, Crocs.
- **Remove** the invented practice minimums (20/25/30 by grade) and the
  "3 unexcused absences" rule — neither appears in the handbook.
- **Add** fees: $25 activity (all students), $100/yr school-owned instrument,
  $100/yr percussion from Year 2. Payment: Ludus, check to campus, or cash;
  partial payments accepted for cash and check.
- **Add** key dates: Aug 14 sectional acknowledgement · Aug 17 sectionals begin ·
  Aug 21 handbook/medical/drug-test forms · Sept 4 activity fees & shirt orders ·
  Sept 28 District Honor Band · Oct 31 Region 33 auditions · March 2027 UIL.

### D. `/schedule` rewrite

Current content is fabricated (invented class periods, a jazz band that does not
appear in any source). Replace with the one schedule fact the handbook actually
states: **sectionals Monday–Thursday, 4:00–5:00 PM, beginning August 17, 2026.**
Point to `/calendar` for everything else rather than inventing detail.

### E. `/resources/forms` — replace "Coming Soon"

List the real forms and deadlines from the handbook: handbook acknowledgement,
medical release, random drug test consent (all Aug 21), sectional
acknowledgement (Aug 14), activity fee and shirt order (Sept 4). Link the
handbook for the forms themselves.

### F. New `/future-members` page

Fixes the live 404 in the nav. Sections:

1. **Hero** — "Future Panthers", one-line pitch.
2. **Why band** — local specifics; no borrowed statistics.
3. **Band and athletics** — you can do both. The most common parent objection.
4. **Instrument Drive** — Friday, August 21, 2026, 5:00–8:00 PM, **Null Middle
   School cafeteria**. All three vendors present.
5. **Choosing an instrument** — the school-owned vs parent-provided split above.
6. **Costs** — $25 activity fee and what it includes; $100/yr usage fees;
   $30–$50/month rental; payment methods.
7. **FAQ** — no experience needed; time commitment; sectionals; performances.
8. **CTA** — director emails and phone.

### G. Broken things

- Footer `tel:` dials `2812817900` but displays (281) 727-3500. **Fix the href.**
- Footer Facebook/Instagram/Twitter are `href="#"`. Remove until real URLs exist;
  dead links on a live site are worse than no links.
- Header renders a placeholder "K" box while `public/images/logo.svg` exists.
  Use the real logo.
- Replace the fake contact form with director emails, phone, and address.
  No backend, consistent with the static-site architecture.
- `/instrument-rental`: "Approved Music Stores" → "**Recommended** Music Stores"
  (both occurrences); vendor list corrected per above.

### H. Structural consistency

Move `<Header />` and the `h-20 lg:h-24` spacer into `src/app/layout.tsx`.

This is the fix for `/join` and `/schedule` having no navigation — patching two
files leaves the next new page free to repeat the bug. `Header.tsx` already
derives transparency from `usePathname()` against `transparentNavPages`, so `/`
and `/about` keep their transparent hero with no per-page prop. The spacer must
be suppressed on transparent pages, where the hero intentionally sits under the
header.

Also standardize the three competing container patterns (`container mx-auto
px-4`, `max-w-7xl mx-auto px-8 lg:px-16`, bare `container`) and the two heading
styles. Targets, chosen because they are already the plurality on the site:

- **Page container:** `container mx-auto px-4 py-12`
- **Page `<h1>`:** `text-4xl md:text-5xl font-bold text-primary text-center mb-8`
- **Section `<h2>`:** `text-2xl font-semibold mb-6 text-primary`

`/calendar` is the outlier on both counts (`text-4xl lg:text-5xl`, uppercase, no
`font-bold`) and `/contact` on the container; both conform.

Remove the dead `/students` entry from `transparentNavPages` — no such route.

### Nav changes

- `/future-members` — now resolves instead of 404ing.
- Add `/join` and `/schedule` to the nav. Both exist but are unreachable;
  `/schedule` is linked from nowhere at all.

## Out of scope

- Announcements-in-`.tsx` editing friction (CLAUDE.md "Known Gaps"). Real, but
  a separate project.
- The per-instrument supply list from packet pages 7–8. Deferred; the packet
  QR code already serves it.
- Any change requiring a backend, auth, or `NEXT_PUBLIC_*` vars (D2, Caveat 4).

## Verification

Per CLAUDE.md, the local gate is authoritative:

```
npm run typecheck && npm run lint && npm run build:cf
npm run preview:cf   # then load /future-members, /join, /schedule, /about
```

All routes must remain `○ (Static)`. Route count goes 17 → 18 with
`/future-members`. Confirm the compressed Chavez headshot carries no EXIF.
