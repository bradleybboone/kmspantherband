# Teamup Calendar Restructure — Sub-Calendars + Scheduler View

**Date:** 2026-08-10
**Status:** Complete 2026-08-11. Teamup admin restructure done & verified (5 sub-calendars, all 87 events re-assigned, old single calendar gone). View decision landed on **`view=w` (Week)** — not `s`/`a` — for the vertical-space fit at the calendar's 60-minute row scale; previewed at desktop and 375px, and the iframe edit in `src/app/calendar/page.tsx` is in. Colors finalized ≥4.5:1 with Teamup's white event text: Beginner purple `#8763CA` (15), Concert green `#2D850E` (27), Honor blue `#1A699C` (22), Symphonic red `#CE1212` (37), No School gray `#757575` (47). Note: no Teamup link parameter controls time-grid resolution or visible hours — that lives in Teamup admin (Settings → Calendar Views) and flows into the embed.
**Goal:** Make the calendar discernible to parents & students new to band who don't yet
understand the after-school demands of this course vs. elementary music.

## Current state (verified 2026-08-10)

- The calendar (`teamup.com/ksy2fym655un5pdh88`, embedded read-only at `/calendar`)
  has **exactly one sub-calendar**: "KMS Band Calendar" (id 14615124). Confirmed via
  the public JSON endpoint `GET /ksy2fym655un5pdh88/subcalendars`.
- All audience targeting lives in the free-text **"Who" field**: "All Band Students",
  "HB Sectionals [Low Brass, Horn, Clarinet]", "Sym/Con [Trumpet, Horn, Clarinet]",
  "Beginner Band Students", etc.
- The Who field only surfaces in List/Agenda views or on event click. In Month view a
  new-to-band parent sees "Honor Band Sectional" 4×/week with no way to tell whether
  it applies to their kid. That is the discernibility problem.
- 2026–27 has **87 rendered events** ≈ **~10 recurring series + ~45 one-offs**.
  Natural clusters: program-wide dates (first day, forms due, uniform check,
  fundraisers), Beginner-specific (instrument drive, instruments due, winter concert,
  select rehearsals), Concert/Symphonic sectionals, Honor sectionals + Honor's many
  performances, Symphonic+Honor combined events (UIL, Sheldon Showdown), school closures.
- Account is the **legacy free tier: 8 sub-calendars**. The *current* free plan is only
  5 sub-calendars — the grandfathering is worth protecting. **Do not change plans.**

## Recommended structure: 5 sub-calendars, and NO "All" calendar

1. **Beginner Band**
2. **Concert Band**
3. **Symphonic Band**
4. **Honor Band**
5. **No School / District Dates** (gray — breaks, early dismissal, NO SCHOOL days)

**Key decision: skip the "All" sub-calendar. Assign program-wide events to all four
ensemble calendars instead.** Teamup allows one event on multiple sub-calendars.

- Desired parent mental model: *"tick your kid's band in the sidebar and you see
  everything that applies to them."*
- With a separate "All" calendar, a parent filtering to just "Beginner Band" silently
  loses "Forms Due" and "First Day of School" — the exact failure mode to prevent.
  Multi-assignment means filtering can never hide something that applies to their kid.
- Combined events work the same way: "Sheldon Showdown" goes on both Symphonic and Honor.

Keep the **Who field** for instrument-group detail on sectionals
("[Low Brass, Horn, Clarinet]") — right granularity once the ensemble question is
answered by the sub-calendar.

That's 5 of 8 sub-calendars; **bank the 3 spares** rather than adding "Deadlines" or
"Auditions" calendars — more checkboxes = more ways for a parent to mis-filter.

Give the four ensembles **strongly distinct colors** and keep them consistent; parents
pattern-match on color within weeks.

## Default view: Scheduler (yes, it's on the free plan)

- Scheduler view is available on **all plans including Free** (per Teamup pricing).
- No Teamup settings change needed: add **`view=s`** to the iframe `src` in
  `src/app/calendar/page.tsx` (line ~32). Link parameters override calendar defaults
  for that link only.
- Scheduler = **one column per sub-calendar**, so it is pointless with today's single
  sub-calendar but becomes the discernibility win after the restructure: a Beginner
  parent reads down the "Beginner Band" column and sees their after-school life —
  side-by-side with the Honor column's 4 sectionals/week. That comparison *is* the
  "this is more demanding than elementary music" message, made visual.

**Mobile caveat:** 5 columns × hourly grid inside an iframe is cramped at phone width,
and most parents are on phones. Options:

- Default `view=s` anyway (Teamup's mobile rendering collapses reasonably; sidebar
  filter still works), or
- Default `view=a` (agenda) or `view=l` (list) — reads well on mobile, shows a colored
  ensemble chip per event once sub-calendars exist, and the view switcher stays
  visible (`showViewHeader=1` already in the embed URL) for desktop users to reach
  Scheduler themselves.

**Decision path:** restructure sub-calendars first, then preview both `view=s` and
`view=a` at 375px before committing the iframe change.

### Useful link-parameter reference (verified against Teamup KB)

`view=` codes: `d` day · `w` week · `mw`/`mw<n>` multi-week · `m` month · `y` year ·
`a` agenda · `l` list · `t` timeline · `s` scheduler · `ta` table · `ti` tiles.
Also `date=yyyy-mm-dd|today|+1week…`, `showSidepanel=0|1`, `disableSidepanel=1`.
There is **no URL parameter to pre-select sub-calendars** — use scoped share links
(below) for that.

## Bonus wins unlocked by the restructure

- **Scoped share links:** Teamup sharing settings can create read-only links exposing
  only chosen sub-calendars — e.g. a "Beginner families" link (Beginner + the shared
  events land there automatically via multi-assignment). `/ensembles/beginner` could
  embed or link that view directly.
- **Per-ensemble iCal feeds:** parents subscribe just their kid's sub-calendar on
  their phone. Free tier feed refresh is every 12 hours — fine for this cadence.

## Effort

- Teamup admin: add 5 sub-calendars (Settings → Sub-calendars), then re-assign
  ~10 recurring series + ~45 one-offs — roughly an hour, easiest in List view.
- Site: one-line iframe `src` edit in `src/app/calendar/page.tsx`, then the routine
  local gate + deploy loop.

## Sources

- [Teamup pricing / plan comparison](https://www.teamup.com/pricing/)
- [Calendar link parameters (KB)](https://calendar.teamup.com/kb/calendar-link-parameters/)
- [Embed a Teamup calendar (KB)](https://calendar.teamup.com/kb/embed-teamup-calendar/)
- [Using calendar link parameters (blog)](https://blog.teamup.com/using-calendar-link-parameters-for-a-more-customized-calendar/)
