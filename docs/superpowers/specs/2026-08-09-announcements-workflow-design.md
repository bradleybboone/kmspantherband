# Announcements Workflow — Design

**Date:** 2026-08-09
**Status:** Approved (brainstorm with the director, this date)
**Problem source:** CLAUDE.md → Known Gaps → "Content editing friction"

## Problem

Changing the homepage banner means hand-editing ~20 lines of JSX in
`src/app/page.tsx`, and taking one down means remembering a `git revert`
(a memory file exists solely to trigger the September revert of the August
instrument-drive CTA). Every edit re-risks breaking the Announcement
Panel's markup, and an out-of-date banner stays up until someone acts.

## Scope — deliberately narrow

Brainstorm findings that shrank the original "weekly announcements" framing:

- Event churn is already externalized: the calendar page embeds a live
  Teamup calendar the directors edit directly.
- Parents already get weekly announcements through ParentSquare; the
  website is not that channel.
- What remains is the homepage **Announcement Panel** (DESIGN.md signature
  surface, one per page): an urgent banner a handful of times per semester.
- The only editor is the head director, working at a computer with the
  repo, on planned changes.

Therefore: no external content source, no CMS, no build-time fetching, no
new dependencies. The fix is to make the existing repo workflow dumb, fast,
and safe. Options rejected: status-quo-plus-recipe (no expiry safety net,
every edit re-risks the markup) and external content source (Google
Doc/Sheet or Teamup fetch — solves a multi-editor problem this site does
not have, at exactly the maintenance cost D2 forbids).

## Design

### 1. Content file — the only thing ever edited

`src/content/announcement.tsx`:

```tsx
import type { ReactNode } from "react";

export interface Announcement {
  heading: string;
  body: ReactNode;            // text-level markup only (<strong>, &nbsp;)
  cta?: { label: string; href: string };
  expires?: string;           // "YYYY-MM-DD" — last day shown, local time
}

export const announcement: Announcement | null = {
  heading: "INSTRUMENT DRIVE — FRIDAY, AUGUST 21",
  body: (
    <>Need an instrument? All three recommended vendors in one room,
    5:00–8:00 PM at the <strong>Null Middle School cafeteria</strong> (not
    C.E. King) — rental and purchase options plus the required
    accessories.</>
  ),
  cta: { label: "See Rental Options", href: "/instrument-rental" },
  expires: "2026-08-21",
};
```

- `null` = no banner.
- `body` is a ReactNode so `<strong>` and non-breaking spaces survive. A
  header comment in the file states the boundary: text-level markup only;
  layout, color, and spacing belong to the component.
- A worked "empty" example (`= null;`) and a filled example live in the
  file's header comment so a future edit is copy-paste, not recall.

### 2. Component — owns all the JSX

`src/components/AnnouncementPanel.tsx`, a client component:

- Renders the exact current design, lifted verbatim from `page.tsx`:
  `py-12 bg-white` section wrapper → navy `bg-primary text-secondary p-8
  rounded-lg text-center` panel → heading, body, optional CTA button
  (`bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg
  font-semibold`).
- Returns `null` when the content file exports `null` — no empty section,
  no layout gap.
- `src/app/page.tsx` renders `<AnnouncementPanel />` where the hardcoded
  section is today. The DESIGN.md rule "one Announcement Panel per page"
  becomes enforced by construction: there is one component and one content
  slot.

### 3. Expiry — client-side, hydration-safe, timezone-correct

- The static build always includes the banner HTML. A `useEffect` hides
  the panel once the viewer's local date is past `expires`.
- **Hydration:** the expiry check lives in the effect, not in render, so
  server HTML and first client render always agree. Cost: a brief flash of
  an expired banner, only in the window between expiry and the next
  deploy. Accepted.
- **Timezone:** parse by splitting `"YYYY-MM-DD"` and constructing
  end-of-day local time (`new Date(y, m - 1, d, 23, 59, 59)`). A naïve
  `new Date("2026-08-21")` is UTC midnight — 7:00 PM the *previous*
  evening in Texas — and would hide banners a night early.
- No `expires` = shows until edited away. `expires` is the safety net: the
  panel disappears on schedule even if nobody deploys for months.

### 4. What this retires / updates

- The hardcoded instrument-drive CTA in `page.tsx` becomes the first
  content-file entry with `expires: "2026-08-21"`.
- The planned **September `git revert 0c8229e` is cancelled** — the banner
  now expires itself on August 22. The `august-cta-revert` memory gets
  rewritten to say so.
- CLAUDE.md → Known Gaps → "Content editing friction" is rewritten to
  describe the new workflow.
- `docs/deployment-runbook.md` → Routine updates gains a "Change the
  homepage banner" recipe: edit `src/content/announcement.tsx` → local
  gate → `preview:cf` spot-check → `npm run deploy` → the existing
  edge-cache purge note applies.

## Error handling

- TypeScript (strict) enforces the `Announcement` shape at the gate; a
  malformed entry fails `npm run typecheck` before it can deploy.
- A malformed `expires` string (wrong format) fails safe: the split/parse
  produces `NaN` comparisons, the effect never fires, and the banner
  simply stays visible — wrong date handling can hide nothing that should
  show.

## Verification (manual, via `npm run preview:cf`)

1. Banner renders pixel-identical to current production.
2. `expires` set to yesterday → panel hidden after hydration.
3. `announcement = null` → section absent entirely, no layout gap between
   hero and Quick Links.
4. Local gate passes (`typecheck && lint && build:cf`).

No test framework exists in this repo and none is added for this.

## Out of scope

- Multi-editor workflows (other directors posting) — revisit only if the
  "just me" answer changes; the content-file boundary makes a future
  external source a drop-in replacement for one file.
- Multiple simultaneous banners, banner scheduling (`starts` date),
  per-page banners — YAGNI until a real need appears.
