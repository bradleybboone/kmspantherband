# Announcements Workflow (Banner-as-Data) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hardcoded homepage Announcement Panel with one typed content file (`src/content/announcement.tsx`) plus one client component, so posting or clearing a banner is a 6-line edit with a self-expiring safety net.

**Architecture:** A content file exports `Announcement | null`; a client component owns all panel JSX (lifted verbatim from `src/app/page.tsx:42-62`) and hides itself client-side after `expires` (end-of-day, viewer-local). The homepage renders `<AnnouncementPanel />`. Docs, runbook, and the `august-cta-revert` memory are updated to match.

**Tech Stack:** Next.js 16 App Router (all-static), React 19, TypeScript strict, Tailwind v4. No new dependencies. No test framework exists and none is added — verification is `typecheck && lint && build:cf` plus scripted browser checks.

**Spec:** `docs/superpowers/specs/2026-08-09-announcements-workflow-design.md`

## Global Constraints

- No new dependencies, no env vars (CLAUDE.md caveat 4), no API routes — every route stays `○ (Static)`.
- The migrated content must preserve `&mdash;`, `&ndash;`, `&nbsp;` exactly as in `page.tsx` — a plain space or hyphen fails the parity check.
- Panel markup is copied **verbatim from `src/app/page.tsx:42-62`**, including the `container` wrapper div and the CTA's `inline-block` and `transition-colors duration-200` classes.
- Local gate before any deploy: `npm run typecheck && npm run lint && npm run build:cf`, then `npm run preview:cf` spot-check (CLAUDE.md).
- **Recorded deviation from spec §1:** `heading` is `ReactNode`, not `string`, so `&mdash;`/`&nbsp;` can be written as JSX entities instead of escape literals. Sanctioned by the spec's character-fidelity amendment ("as entities in JSX or their literal characters in strings").

---

### Task 1: Content file `src/content/announcement.tsx`

**Files:**
- Create: `src/content/announcement.tsx`

**Interfaces:**
- Consumes: nothing.
- Produces: `export interface Announcement { heading: ReactNode; body: ReactNode; cta?: { label: string; href: string }; expires?: string }` and `export const announcement: Announcement | null` — Task 2 imports both by these exact names from `@/content/announcement`.

- [ ] **Step 1: Create the file with types, header docs, and the migrated instrument-drive entry**

```tsx
import type { ReactNode } from "react";

/*
  Homepage Announcement Panel content. THIS FILE IS THE ONLY THING TO EDIT
  when posting or clearing a banner — the look lives in
  src/components/AnnouncementPanel.tsx and is never duplicated here.

  Rules:
  - Text-level markup only in `heading`/`body` (<strong>, &nbsp;, &ndash;).
    Layout, color, and spacing belong to the component.
  - `expires` is "YYYY-MM-DD" — the LAST day the banner shows
    (viewer-local time). Omit it for a banner that stays until edited away.
  - No banner:
      export const announcement: Announcement | null = null;
  - Filled example:
      export const announcement: Announcement | null = {
        heading: <>SPRING CONCERT &mdash; THURSDAY, MAY&nbsp;14</>,
        body: <>Doors at 6:30 PM in the C.E. King auditorium.</>,
        cta: { label: "See the Calendar", href: "/calendar" },
        expires: "2026-05-14",
      };
*/

export interface Announcement {
  heading: ReactNode;
  body: ReactNode;
  cta?: { label: string; href: string };
  /** "YYYY-MM-DD" — last day the banner is shown, viewer-local time. */
  expires?: string;
}

export const announcement: Announcement | null = {
  heading: <>INSTRUMENT DRIVE &mdash; FRIDAY, AUGUST&nbsp;21</>,
  body: (
    <>
      Need an instrument? All three recommended vendors in one room,
      5:00&ndash;8:00 PM at the <strong>Null Middle School cafeteria</strong>{" "}
      (not C.E. King) &mdash; rental and purchase options plus the required
      accessories.
    </>
  ),
  cta: { label: "See Rental Options", href: "/instrument-rental" },
  expires: "2026-08-21",
};
```

The body JSX (including `{" "}` after the `<strong>`) is copied character-for-character from `src/app/page.tsx:49-54`.

- [ ] **Step 2: Verify the gate accepts it**

Run: `npm run typecheck && npm run lint`
Expected: both pass with no output about `src/content/announcement.tsx`.

- [ ] **Step 3: Commit**

```bash
git add src/content/announcement.tsx
git commit -m "feat: announcement content file — the one file banner edits touch"
```

---

### Task 2: `AnnouncementPanel` component + homepage integration

**Files:**
- Create: `src/components/AnnouncementPanel.tsx`
- Modify: `src/app/page.tsx:35-62` (delete the seasonal comment + hardcoded section; render the component)

**Interfaces:**
- Consumes: `announcement` from `@/content/announcement` (Task 1).
- Produces: default export `AnnouncementPanel(): JSX.Element | null` — `page.tsx` renders `<AnnouncementPanel />` with no props.

- [ ] **Step 1: Capture the current banner HTML for the parity check**

With the dev server running (`npm run dev`), save the reference markup:

```js
// Playwright (browser_run_code_unsafe) — BEFORE changing page.tsx
async (page) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  return await page.evaluate(() =>
    document.querySelector('main section.py-12.bg-white').outerHTML);
}
```

Save the returned string to `scratchpad/banner-before.html`.

- [ ] **Step 2: Create the component**

```tsx
'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { announcement } from '@/content/announcement';

/*
  The homepage's one Announcement Panel (DESIGN.md: "one per page at most").
  Content comes exclusively from src/content/announcement.tsx.

  Expiry runs client-side in an effect, NOT at render: the static build
  always ships the banner HTML, and the effect hides it once the viewer's
  local date passes `expires`. Server HTML and first client render stay
  identical (no hydration mismatch), and — because deploys do not purge
  Cloudflare's edge cache (docs/deployment-runbook.md) — an expired banner
  hides even on stale cached HTML. Accepted costs, confined to the window
  between expiry and the next deploy: a brief flash + layout jump as the
  section unmounts, and no-JS visitors see the expired banner until the
  next deploy.
*/

// "YYYY-MM-DD" -> end of that day, viewer-local time. A naïve
// new Date("YYYY-MM-DD") is UTC midnight — 7 PM the previous evening in
// Texas — and would hide banners a night early.
function endOfDayLocal(expires: string): Date {
  const [y, m, d] = expires.split('-').map(Number);
  return new Date(y, m - 1, d, 23, 59, 59);
}

export default function AnnouncementPanel() {
  const [expired, setExpired] = useState(false);

  useEffect(() => {
    // An unparsable `expires` yields NaN; NaN comparisons are false, so a
    // malformed date fails safe — the banner stays visible.
    if (
      announcement?.expires &&
      Date.now() > endOfDayLocal(announcement.expires).getTime()
    ) {
      setExpired(true);
    }
  }, []);

  if (!announcement || expired) return null;

  return (
    <section className="py-12 bg-white">
      <div className="container">
        <div className="bg-primary text-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl lg:text-3xl mb-4">{announcement.heading}</h2>
          <p className="mb-6 max-w-2xl mx-auto">{announcement.body}</p>
          {announcement.cta && (
            <Link
              href={announcement.cta.href}
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 rounded-lg font-semibold transition-colors duration-200"
            >
              {announcement.cta.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Swap the hardcoded section out of `page.tsx`**

In `src/app/page.tsx`, delete the `SEASONAL — August 2026 only` comment block AND the entire `<section className="py-12 bg-white">…</section>` that follows it (currently around lines 35–62 — the content, not the line numbers, is authoritative) and put in their place:

```tsx
      <AnnouncementPanel />
```

Add the import next to the other component import at the top:

```tsx
import AnnouncementPanel from "@/components/AnnouncementPanel";
```

Do NOT remove the `Image`, `Link`, or `ImageCarousel` imports — the hero and Quick Links still use them (lint will confirm).

- [ ] **Step 4: Parity check**

Run the same Playwright snippet from Step 1 against the changed dev server and save the result to `scratchpad/banner-after.html`. Diff the two strings:

```bash
diff scratchpad/banner-before.html scratchpad/banner-after.html
```

Expected: identical, or differing ONLY in React-internal attribute noise (none expected — both renders are the same classes and text). Any class or text difference is a failure: fix the component, not the reference.

- [ ] **Step 5: Expired-banner check**

Temporarily set `expires: "2020-01-01"` in `src/content/announcement.tsx`. In the browser: the panel must be gone after hydration.

```js
async (page) => {
  await page.goto('http://localhost:3000/');
  await page.waitForLoadState('networkidle');
  return await page.evaluate(() =>
    ({ panelPresent: !!document.querySelector('main section.py-12.bg-white') }));
}
```

Expected: `{ panelPresent: false }`. Revert `expires` to `"2026-08-21"`.

- [ ] **Step 6: No-banner check**

Temporarily set `export const announcement: Announcement | null = null;` (comment out the object). Re-run the Step 5 snippet.
Expected: `{ panelPresent: false }` and no empty white gap between the hero and Quick Links (screenshot if unsure). Restore the object.

- [ ] **Step 7: Gate**

Run: `npm run typecheck && npm run lint && npm run build:cf`
Expected: all pass; build output still shows every route `○ (Static)`.

- [ ] **Step 8: Commit**

```bash
git add src/components/AnnouncementPanel.tsx src/app/page.tsx
git commit -m "feat: AnnouncementPanel renders from the content file; self-expires client-side"
```

---

### Task 3: Docs, runbook, and memory updates

**Files:**
- Modify: `CLAUDE.md` (Known Gaps → "Content editing friction" bullet, ~line 237)
- Modify: `docs/deployment-runbook.md` (Routine updates section)
- Modify: `/home/waffles/.claude/projects/-home-waffles-projects-kmspantherband/memory/august-cta-revert.md` and its line in `MEMORY.md` (memory files are NOT committed to the repo)

**Interfaces:**
- Consumes: the shipped behavior from Tasks 1–2 (file path `src/content/announcement.tsx`, expiry semantics).
- Produces: nothing downstream; documentation only.

- [ ] **Step 1: Rewrite the CLAUDE.md bullet**

Replace:

```markdown
- **Content editing friction.** Announcements are hardcoded in `.tsx`, so a
  weekly update is a commit and a deploy. Embedding the Google Calendar handles
  the highest-churn content. Worth solving before November.
```

with:

```markdown
- **Content editing friction — resolved 2026-08-09 (banner-as-data).** The
  homepage Announcement Panel is the only churn surface not already
  externalized (events live in the embedded Teamup calendar; weekly parent
  news goes out via ParentSquare). Post or clear a banner by editing
  **`src/content/announcement.tsx` only**, then run the routine-update
  loop; `expires` auto-hides a stale banner client-side even on stale
  edge-cached HTML. Recipe: runbook → "Change the homepage banner". Spec:
  `docs/superpowers/specs/2026-08-09-announcements-workflow-design.md`.
```

- [ ] **Step 2: Add the runbook recipe**

In `docs/deployment-runbook.md`, insert immediately BEFORE the `### Deploying does not purge the edge cache` heading:

```markdown
### Change the homepage banner

Edit **`src/content/announcement.tsx`** — nothing else. Its header comment
carries copy-paste examples for a filled banner and for none (`null`).
Always set `expires` ("YYYY-MM-DD", the last day the banner shows) so the
panel retires itself even if nobody deploys. Then run the four-step loop
above. The edge-cache note below applies to *new* banners; an *expired*
banner hides itself client-side even on stale cached HTML.
```

- [ ] **Step 3: Rewrite the memory file**

Overwrite the body of `august-cta-revert.md` (keep frontmatter `name`; update `description`):

```markdown
---
name: august-cta-revert
description: September revert of 0c8229e is CANCELLED — the instrument-drive banner now self-expires via src/content/announcement.tsx
metadata:
  type: project
---

The planned September 2026 `git revert 0c8229e` is **cancelled**. The
instrument-drive CTA was migrated into `src/content/announcement.tsx`
(banner-as-data, 2026-08-09) with `expires: "2026-08-21"`, so it hides
itself client-side starting August 22 with no action needed. Optional
tidy-up whenever convenient: set the file's export to `null` and deploy.
Do NOT run the revert — it would conflict with the migrated homepage.
```

Update its line in `MEMORY.md` to:

```markdown
- [August CTA revert](august-cta-revert.md) — CANCELLED; banner self-expires Aug 22 via src/content/announcement.tsx
```

- [ ] **Step 4: Commit the repo docs (memory files are outside the repo)**

```bash
git add CLAUDE.md docs/deployment-runbook.md
git commit -m "docs: banner-as-data workflow — CLAUDE.md gap resolved, runbook recipe added"
```

---

### Task 4: Ship and verify production

**Files:** none (operational task).

**Interfaces:**
- Consumes: all prior commits on `main`.
- Produces: the feature live at kmspantherband.org.

- [ ] **Step 1: Full gate + preview spot-check**

```bash
npm run typecheck && npm run lint && npm run build:cf
npm run preview:cf   # background; then:
curl -s http://localhost:8787/ | grep -c "INSTRUMENT DRIVE"
```

Expected: gate passes; grep prints `1`. Stop the preview worker afterwards.

- [ ] **Step 2: Push and deploy**

```bash
git push
npm run deploy
```

Expected: `Deployed kmspantherband triggers` with a new Version ID.

- [ ] **Step 3: Verify production**

```bash
curl -s "https://kmspantherband.org/?v=$(date +%s)" | grep -c "INSTRUMENT DRIVE"
```

Expected: `1`. Note for the operator: per the runbook, the un-busted URL may serve stale edge-cached HTML for a while; the banner content is unchanged by this migration, so no purge is needed.
