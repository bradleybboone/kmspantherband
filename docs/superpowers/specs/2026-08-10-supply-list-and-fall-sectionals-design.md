# Supply List Page & Fall Sectionals Grid — Design

**Date**: 2026-08-10
**Status**: Approved (placement, detail level, and full design confirmed by Bradley)

## Goal

Fill two content omissions:

1. The beginner instrument supply list (source: the shared Google Doc
   "Sheldon ISD Beginner Band — Preferred Instrument Models & Required
   Supplies", ID `1ndtFkoyXGrlWbfTt37ef3JVKoJRArXVae2hSkAVWNJM`).
2. The fall sectional schedule (source: the Teamup calendar
   `ksy2fym655un5pdh88`; the handbook p. 31 lists sectionals only
   generically, so the calendar is the specific source here).

Both stay fully static — no new dependencies, no client JS, no env vars.

## 1. New page: `/supply-list`

`src/app/supply-list/page.tsx`, title "Instrument Supply List".

**Structure**: a typed data array at the top of the file (instrument name,
`schoolOwned` flag, preferred models, preferred options, supplies list,
optional extra sections), rendered as one card per instrument in the
existing page idiom (`bg-primary-tint` / white cards, standard heading
scale). Future edits are edit-a-list, not edit-JSX.

**Instruments and content** (re-paired from the doc's two-column table):

- **Flute** — Models: Yamaha 262Y, DiZhao DZ300, Pearl Quantz 505,
  Gemeinhardt 3; prefer open hole with offset G. Supplies: silk cleaning
  cloth, polish cloth.
- **Clarinet** — Models: Buffet E11, Yamaha YCL-255, LeBlanc Serenade;
  prefer wood or composite. Supplies: 5RV Lyre mouthpiece, Rovner 1R
  ligature, 1 box Vandoren 2.5 clarinet reeds, silk drop swab, reed guard
  (holds 4+), mouthpiece brush, cork grease.
- **Alto Saxophone** — school-owned ($100/yr). Models (if purchasing):
  Yamaha YAS200AD, Selmer AS400. Supplies: Vandoren Optimum AL3
  mouthpiece, padded neck strap, Rovner 1RL ligature, silk drop swab,
  reed guard (holds 4+), 1 box Vandoren 2.5 saxophone reeds, cork grease.
- **Oboe** — school-owned ($100/yr). Supplies: 4 medium oboe reeds, reed
  case (holds 4+), soaker cup with stand clip, silk drop swab.
- **Bassoon** — school-owned ($100/yr). Supplies: 4 medium bassoon reeds,
  reed case (holds 4+), soaker cup with stand clip, silk drop swab.
- **Trumpet** — Models: Bach TR300, Yamaha YTR2330. Supplies: Bach 5C
  mouthpiece, Hetman Synthetic Piston Valve Oil, SpaceFiller Slide Oil
  (green writing), mouthpiece brush.
- **French Horn** — school-owned ($100/yr). Supplies: Hetman Synthetic
  Light rotor lubricant, SpaceFiller Slide Oil (green writing), Farkas
  MDC mouthpiece, mouthpiece brush.
- **Trombone** — Models: Bach TB301, Yamaha YSL-354, Yamaha YSL-448G.
  Supplies: Bach 6½AL mouthpiece, Slide-O All-in-One Rapid Comfort slide
  lubricant, SpaceFiller Slide Oil (green writing), small spray water
  bottle, mouthpiece brush.
- **Euphonium** — school-owned ($100/yr). Supplies: Schilke 51D
  mouthpiece (small shank), Hetman Synthetic Piston Valve Oil,
  SpaceFiller Slide Oil (green writing), mouthpiece brush.
- **Tuba** — school-owned ($100/yr). Supplies: Bach 18 mouthpiece, Hetman
  Synthetic Piston Valve Oil, SpaceFiller Slide Oil (green writing),
  mouthpiece brush.
- **Percussion** — school-owned; $100/yr fee begins in 2nd year. Rental
  kit: Yamaha Bell Kit with Roller Cart (YAM-SPK-285R), Innovative
  Percussion Chris Lamb Maple Snare Sticks (INN-CL1), Innovative
  Percussion James Ross Medium Soft mallets (INN-IP902), Innovative
  Percussion Medium Birch Marimba Mallets (IP240), Innovative Percussion
  Practice Pad (CP-1R), Yamaha Black Folding Music Stand with bag
  (YAM-MS1000), Innovative Percussion Stick Bag (SB-3). Kit rental
  vendors: H&H Music (hhmusic.com), Music & Arts (musicarts.com),
  Veritas (rentfromhome.com — the doc's "rentfromthome.com" is a typo).
  Percussion equipment vendors: Steve Weiss (steveweissmusic.com),
  Percussion Source (percussionsource.com), Sam Ash (samash.com).

**Bottom sections**:

- Every student needs *Standard of Excellence Book 1* (percussion:
  *Simple Steps to Successful Beginning Percussion*) and the performance
  uniform included in the $25 activity fee.
- "A note to parents on purchasing instruments" — verbatim from the doc,
  in **both English and Spanish**.
- "Open in Google Docs" button to the source doc (same pattern as the
  Forms page's handbook button).

**Links in**: RESOURCES nav dropdown in `Header.tsx` (after Instrument
Rental); cross-links from `/instrument-rental`, `/ensembles/beginner`,
and `/future-members`.

## 2. `/schedule` — Fall Sectionals grid

Replace the current generic blurb — which is wrong ("Monday through
Thursday, beginning August 17") — with a weekly grid. All sectionals are
**4:00–5:00 PM, KMS Band Hall**:

| Day | Group | Instruments | First sectional |
|---|---|---|---|
| Monday | Symphonic & Concert | Low Brass, Sax, Flute/Oboe | Aug 24 |
| Tuesday | Symphonic & Concert | Trumpet, Horn, Clarinet | Aug 25 |
| Wednesday | Honor Band | Low Brass, Horn, Clarinet | Aug 19 |
| Thursday | Honor Band | Flute, Trumpet, Oboe/Sax | Aug 20 |

Accompanying copy:

- Fall sectionals run through late October.
- Some weeks are skipped and occasional Friday makeup days are scheduled
  — **the band calendar is authoritative**; changes are announced via
  ParentSquare. Link to `/calendar`.
- The sectional acknowledgement form (due Aug 14) note stays.
- Spring sectionals begin January 11, 2027 (per the calendar); the fall
  grid covers Honor, Symphonic, and Concert bands only.

## Non-goals

- No date-by-date sectional listing (duplicates the Teamup embed and
  drifts the first time a week moves).
- No changes to the handbook Quick Reference (D6 untouched — sectionals
  are sourced from the calendar at the user's direction because the
  handbook lists them generically).

## Maintenance / churn

- The sectionals grid is seasonal: it needs an update in January 2027
  when spring sectionals start. Record this in the page comment and in
  CLAUDE.md's churn notes.
- The supply list changes at most yearly; the Google Doc remains the
  source of truth and is linked from the page.

## Verification

Standard local gate: `npm run typecheck && npm run lint && npm run
build:cf`, then `npm run preview:cf` and load `/supply-list` and
`/schedule`. Confirm all routes remain `○ (Static)`.
