# 2026-27 Season Refresh Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Bring kmspantherband.org from 2025-26 to 2026-27 content, fix a 404 in the main nav and two pages with no navigation, and correct published facts that contradict the official handbook.

**Architecture:** Static Next.js App Router site, no backend. `<Header />` moves from 14 individual page files into `src/app/layout.tsx`; transparency is already derived from `usePathname()` inside `Header.tsx`, so no per-page prop is needed. One new route, `/future-members`, is added. All other work is content edits to existing `page.tsx` files.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript strict, Tailwind CSS v4, OpenNext → Cloudflare Workers.

## Global Constraints

- **No test framework exists and none will be added.** The project has three runtime deps (`next`, `react`, `react-dom`) and CLAUDE.md optimizes for "nothing to maintain." Do not install vitest/jest/playwright. Verification per task is a `grep` assertion pair (bad string absent, good string present) plus the build gate.
- **The authoritative gate is `npm run typecheck && npm run lint && npm run build:cf`.** Run it where each task says to.
- **Never introduce `NEXT_PUBLIC_*` variables** (CLAUDE.md Caveat 4). This site has zero env vars.
- **No API routes, no server-side data fetching.** All routes must stay `○ (Static)`.
- **Images are served byte-for-byte** (`images.unoptimized: true`, D3). Any new image must go through `npm run images:compress` before commit.
- **Source authority order:** 2026-27 Handbook > Elementary Packet (2026-05-04) > director corrections > legacy Google Site. See the spec at `docs/superpowers/specs/2026-08-09-26-27-season-refresh-design.md`.
- **Copy rule:** "Recommended", never "Approved", when referring to music stores.
- **Escape apostrophes in JSX** as `&apos;` — `react/no-unescaped-entities` is on and `npm run lint` will fail otherwise.
- **Never put black or dark text on a navy background — including buttons.** `bg-primary` (`#001689`) takes `text-secondary`/`text-white` only. Buttons on navy use `bg-secondary text-primary` (white on navy-text), never `text-accent` or an unset color that inherits black. A full-site contrast audit is a later pass; this constraint stops new violations landing here.
- **Practice cards are discontinued for 2026-27.** The practice *expectation* stands, but it is no longer a logged or graded artifact. Do not list practice logs/records as a graded component or as a form.
- **Facts that must appear exactly:**
  - Activity fee **$25/year**, all students.
  - School-owned instrument usage **$100/year**. Percussion **$100/year starting Year 2**.
  - School-owned instruments: **Oboe, Bassoon, Alto Saxophone, French Horn, Euphonium, Tuba**.
  - Parent-provided: **Flute, Clarinet, Trumpet, Trombone, Percussion (Year 1)**.
  - Rental **$30–$50/month**.
  - Instrument Drive: **Friday, August 21, 2026, 5:00–8:00 PM, Null Middle School cafeteria**.
  - Sectionals: **Monday–Thursday, 4:00–5:00 PM, beginning August 17, 2026**.
  - Grading: **50% Major / 50% Daily**.
  - Directors: Dr. Bradley Boone, Ms. Catherine Ruiz, Mrs. Amanda Chavez. Phone **281-727-3500**.

---

## File Structure

| File | Responsibility | Task |
|---|---|---|
| `public/images/chavez-bio.jpg` | Create — compressed, EXIF-stripped headshot | 1 |
| `public/images/cooper-bio.jpg` | Delete — departed staff | 1 |
| `src/app/layout.tsx` | Modify — owns `<Header />` + spacer for all routes | 2 |
| `src/components/Header.tsx` | Modify — drop `variant` prop, fix nav, real logo | 2, 10 |
| all 14 `page.tsx` | Modify — remove per-page `<Header />` + spacer | 2 |
| `src/app/about/page.tsx` | Modify — Chavez replaces Cooper, Boone 5th year | 3 |
| `src/app/contact/page.tsx` | Modify — static contact info, form deleted | 4 |
| `src/app/handbook/page.tsx` | Modify — Quick Reference corrected | 5 |
| `src/app/schedule/page.tsx` | Modify — real sectionals, fabrication removed | 6 |
| `src/app/resources/forms/page.tsx` | Modify — real forms and deadlines | 7 |
| `src/app/future-members/page.tsx` | **Create** — fixes the nav 404 | 8 |
| `src/app/instrument-rental/page.tsx` | Modify — vendors, fees, "Recommended" | 9 |
| `src/components/Footer.tsx` | Modify — tel: fix, dead social links removed | 10 |
| `src/app/calendar/page.tsx` | Modify — 2026-2027, heading style | 11 |
| `CLAUDE.md`, `docs/deployment-runbook.md` | Modify — record the refresh | 12 |

---

### Task 1: Chavez headshot asset

Photo is a 4032×3024 / 4.6 MB iPhone original carrying **GPS EXIF**. It must not be committed as-is. `scripts/compress-images.mjs` calls `.rotate()` (bakes orientation) and never calls `.withMetadata()`, so sharp strips EXIF.

**Files:**
- Create: `public/images/chavez-bio.jpg`
- Delete: `public/images/cooper-bio.jpg`, `chavezbiophoto.jpeg` (repo root)

**Interfaces:**
- Produces: `/images/chavez-bio.jpg` — consumed by Task 3.

- [ ] **Step 1: Verify the original carries EXIF/GPS (the thing we are removing)**

```bash
cd /home/waffles/projects/kmspantherband
node -e "require('sharp')('chavezbiophoto.jpeg').metadata().then(m=>console.log({w:m.width,h:m.height,exif:!!m.exif,orientation:m.orientation}))"
```

Expected: `exif: true`, width 4032.

- [ ] **Step 2: Copy into place and compress**

```bash
cp chavezbiophoto.jpeg public/images/chavez-bio.jpg
npm run images:compress
```

Expected: a line reading `ok    chavez-bio.jpg ... -> ...  (-9x%)`.

- [ ] **Step 3: Verify EXIF is gone and size is sane**

```bash
node -e "require('sharp')('public/images/chavez-bio.jpg').metadata().then(m=>console.log({w:m.width,exif:!!m.exif}))"
ls -la public/images/chavez-bio.jpg
```

Expected: `exif: false`, width `1600`, file well under 500 KB (peers are 129–265 KB).
If `exif: true`, STOP — do not commit; the photo carries the director's home GPS coordinates.

- [ ] **Step 4: Remove the original and the departed director's photo**

```bash
rm chavezbiophoto.jpeg
git rm public/images/cooper-bio.jpg
```

- [ ] **Step 5: Commit**

```bash
git add public/images/chavez-bio.jpg
git commit -m "assets: add Chavez headshot, remove Cooper

Compressed 4.6 MB -> ~200 KB and stripped iPhone EXIF, which included
GPS coordinates. D3 serves public/images byte-for-byte."
```

---

### Task 2: Move Header into the root layout

This is the fix for `/join` and `/schedule` having no navigation. Patching those two files would leave the next new page free to repeat the bug.

`Header.tsx` already computes `transparentNavPages.includes(pathname)`. Once the `variant` prop is gone, that check alone decides transparency, and the same logic decides whether a spacer is needed — transparent pages deliberately let the hero sit under the header.

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `src/components/Header.tsx:18-31`
- Create: `src/components/HeaderSlot.tsx`
- Modify: all 14 `src/app/**/page.tsx` (remove `<Header />`, spacer, and now-unused import)

**Interfaces:**
- Produces: `<HeaderSlot />` — a client component rendering `<Header />` plus a conditional spacer. Consumed by `layout.tsx` only.
- Produces: `Header` no longer accepts props. Any `<Header variant="..." />` left anywhere is a TypeScript error.

- [ ] **Step 1: Create the slot component**

Create `src/components/HeaderSlot.tsx`:

```tsx
'use client';

import { usePathname } from 'next/navigation';
import Header, { TRANSPARENT_NAV_PAGES } from './Header';

/**
 * Renders the header for every route, plus the spacer that keeps content
 * clear of the fixed nav. Transparent-nav pages (the homepage and About)
 * intentionally run their hero underneath the header, so they get no spacer.
 */
export default function HeaderSlot() {
  const pathname = usePathname();
  const isTransparent = TRANSPARENT_NAV_PAGES.includes(pathname);

  return (
    <>
      <Header />
      {!isTransparent && <div className="h-20 lg:h-24" />}
    </>
  );
}
```

- [ ] **Step 2: Export the route list and drop the prop from Header**

In `src/components/Header.tsx`, delete the `HeaderProps` interface (lines 18-20) and replace the component signature and the transparency block (lines 22-31) with:

```tsx
// Routes whose hero sits under a transparent nav until the user scrolls.
export const TRANSPARENT_NAV_PAGES = ['/', '/about'];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileDropdowns, setMobileDropdowns] = useState<string[]>([]);
  const pathname = usePathname();

  const isTransparent = TRANSPARENT_NAV_PAGES.includes(pathname);
```

`/students` is deliberately dropped from that list — no such route exists.

- [ ] **Step 3: Add the slot to the layout**

In `src/app/layout.tsx`, add `import HeaderSlot from "@/components/HeaderSlot";` beside the `Footer` import, and replace the comment line `{/* Header is rendered inside each page component for variant control */}` with `<HeaderSlot />`.

- [ ] **Step 4: Strip Header from every page**

For each of the 14 `page.tsx` files, remove the `import Header from "@/components/Header";` line, the `<Header ... />` element, and the spacer `<div className="h-20 lg:h-24" />` along with its preceding comment. Leave all other markup alone.

```bash
grep -rln '@/components/Header' src/app/
```

- [ ] **Step 5: Verify no page renders its own Header**

```bash
cd /home/waffles/projects/kmspantherband
grep -rn 'components/Header\|h-20 lg:h-24' src/app/ && echo "FAIL: leftovers above" || echo "PASS: no per-page header"
grep -c 'HeaderSlot' src/app/layout.tsx
```

Expected: `PASS: no per-page header`, and `2` (import + usage).

- [ ] **Step 6: Run the gate**

```bash
npm run typecheck && npm run lint && npm run build
```

Expected: clean. A leftover `variant=` prop surfaces here as a TS error.

- [ ] **Step 7: Confirm nav now renders on the previously headerless pages**

Step 6's build prerenders every static route to HTML. Assert against that output
rather than starting a dev server:

```bash
cd /home/waffles/projects/kmspantherband
for p in join schedule about index; do
  f=".next/server/app/$p.html"
  echo -n "$p -> "; [ -f "$f" ] && grep -c 'FUTURE MEMBERS' "$f" || echo "MISSING $f"
done
```

Expected: each prints `1` or more. Before this task, `join` and `schedule`
printed `0` — that is the bug being fixed. If a file is missing, locate it with
`find .next/server/app -name '*.html'` (Next may nest or suffix the path).

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "fix: render Header from the root layout

/join and /schedule shipped with no navigation at all because each page
was responsible for its own <Header />. Transparency already derives from
usePathname(), so the variant prop was redundant. Drops the dead /students
entry from the transparent list."
```

---

### Task 3: About page — Chavez replaces Cooper, Boone to 5th year

**Files:**
- Modify: `src/app/about/page.tsx`

**Interfaces:**
- Consumes: `/images/chavez-bio.jpg` (Task 1).

- [ ] **Step 1: Update Boone's tenure**

Replace `This is Dr. Boone&apos;s fourth year at C.E. King Middle School.` with `This is Dr. Boone&apos;s fifth year at C.E. King Middle School.`

- [ ] **Step 2: De-new Ruiz's bio**

Her year count stays "5th year" (director-confirmed). Replace `My name is Catherine Ruiz and I am so excited to join the team at C.E. King Middle School!` with:

```
My name is Catherine Ruiz and I am so glad to be back with the team at C.E. King Middle School!
```

- [ ] **Step 3: Replace the Cooper card with Chavez**

Replace the entire `{/* Director 3 - Cooper */}` block (from that comment through its closing `</div>` before `</div>\n      </section>`) with:

```tsx
          {/* Director 3 - Chavez */}
          <div className="bg-white overflow-hidden">
            <div className="aspect-square relative">
              <Image
                src="/images/chavez-bio.jpg"
                alt="Mrs. Amanda Chavez - Assistant Band Director"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Mrs. Amanda Chavez</h3>
              <p className="text-primary font-medium mb-3">Assistant Band Director</p>
              <p className="text-gray-dark mb-3">
                B.M. and M.M. &ndash; Stephen F. Austin State University
              </p>
              <p className="text-gray-dark mb-3">
                Mrs. Chavez will be joining the KMS team all the way from Lubbock ISD, where
                she spent her first two years teaching at Atkins Middle School. She holds a
                bachelor&apos;s and master&apos;s degree from Stephen F. Austin State University
                (Go Jacks!) and is a clarinet player by trade.
              </p>
              <p className="text-gray-dark mb-3">
                Mrs. Chavez loves spending her time outside of school with her husband, Esteban,
                and their baby girl, Alondra. She loves playing board games, going on walks, and
                cooking. She also has two cats, Pepper and Sugar, who love to be lazy, snuggle
                and get into general cat trouble.
              </p>
              <p className="text-gray-dark">
                <strong>Email:</strong> <a href="mailto:amandachavez@sheldonisd.com" className="text-primary hover:underline">amandachavez@sheldonisd.com</a>
              </p>
            </div>
          </div>
```

- [ ] **Step 4: Verify Cooper is gone and Chavez is present**

```bash
cd /home/waffles/projects/kmspantherband
grep -rni 'cooper' src/ && echo "FAIL: Cooper still referenced" || echo "PASS: Cooper removed"
grep -c 'Amanda Chavez' src/app/about/page.tsx
grep -c 'fifth year' src/app/about/page.tsx
```

Expected: `PASS: Cooper removed`, then `1`, then `1`.

- [ ] **Step 5: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 6: Commit**

```bash
git add src/app/about/page.tsx
git commit -m "content: Chavez replaces Cooper; Boone to fifth year"
```

---

### Task 4: Contact page — replace the fake form

`handleSubmit` currently calls `alert('Thank you for your message! We will get back to you soon.')` and clears state. Nothing is sent. On a live site this is worse than having no form.

**Files:**
- Modify: `src/app/contact/page.tsx` (full rewrite)

- [ ] **Step 1: Replace the file entirely**

The page loses `'use client'`, `useState`, and all form handlers, becoming a static server component.

```tsx
export default function Contact() {
  const directors = [
    { name: "Dr. Bradley Boone", role: "Head Band Director", email: "bradleyboone@sheldonisd.com" },
    { name: "Ms. Catherine Ruiz", role: "Assistant Band Director", email: "catherineruiz@sheldonisd.com" },
    { name: "Mrs. Amanda Chavez", role: "Assistant Band Director", email: "amandachavez@sheldonisd.com" },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Contact Us
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-dark leading-relaxed text-center mb-12">
          The fastest way to reach us is by email. We check messages daily during the
          school week and will get back to you as soon as we can.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Directors</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {directors.map((d) => (
              <div key={d.email} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-1">{d.name}</h3>
                <p className="text-primary text-sm font-medium mb-3">{d.role}</p>
                <a href={`mailto:${d.email}`} className="text-primary hover:underline break-words">
                  {d.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Office</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-dark mb-3">
              C.E. King Middle School<br />
              8540 C.E. King Parkway<br />
              Houston, TX 77044
            </p>
            <p className="text-gray-dark mb-3">
              Phone: <a href="tel:+12817273500" className="text-primary hover:underline">(281) 727-3500</a>
            </p>
            <p className="text-gray-dark">
              <strong>Office Hours:</strong> Monday &ndash; Friday, 7:45 AM &ndash; 4:00 PM
            </p>
          </div>
        </section>

        <section className="bg-primary text-secondary p-8 rounded-lg text-center">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">Weekly Updates</h2>
          <p>
            Announcements and schedule changes go out through ParentSquare. Please make sure
            the band directors have a current parent email address on file.
          </p>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify the fake handler is gone**

```bash
cd /home/waffles/projects/kmspantherband
grep -n "alert(\|useState\|'use client'" src/app/contact/page.tsx && echo "FAIL: form remnants" || echo "PASS: static page"
grep -c 'amandachavez' src/app/contact/page.tsx
```

Expected: `PASS: static page`, then `1`.

- [ ] **Step 3: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "fix: replace non-functional contact form with direct contact info

The form told visitors 'we will get back to you soon' and sent nothing.
No backend exists by design (D2), so the honest fix is mailto links."
```

---

### Task 5: Handbook Quick Reference — correct to the 26-27 handbook

Four factual errors: grading split, concert attire, invented practice minimums, invented absence rule.

**Files:**
- Modify: `src/app/handbook/page.tsx:59-105` (Quick Reference `<section>`)

- [ ] **Step 1: Replace the Quick Reference section body**

Replace the `<div className="space-y-6">` block and its four children with:

```tsx
          <div className="space-y-6">
            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Grading</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• 50% Major Grades &mdash; playing tests and performances</li>
                <li>• 50% Daily Grades &mdash; participation and quizzes</li>
              </ul>
              <p className="text-gray-dark mt-3">
                Daily practice at home is still expected of every student, but practice
                cards are no longer used and are not turned in for a grade.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Fees</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• <strong>$25/year</strong> band activity fee &mdash; all students</li>
                <li>• <strong>$100/year</strong> school-owned instrument usage fee</li>
                <li>• <strong>$100/year</strong> percussion usage fee, starting Year 2</li>
              </ul>
              <p className="text-gray-dark mt-3">
                Pay by Ludus (credit/debit), check made out to the campus, or cash.
                Partial payments are accepted for cash and check.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Concert Attire</h3>
              <p className="text-gray-dark mb-2"><strong>Beginners:</strong></p>
              <ul className="space-y-1 text-gray-dark mb-4">
                <li>• Blue band performance T-shirt, tucked in</li>
                <li>• Black dress pants and black belt</li>
                <li>• Black long dress socks and black dress shoes</li>
              </ul>
              <p className="text-gray-dark mb-2"><strong>Returning students:</strong></p>
              <ul className="space-y-1 text-gray-dark mb-4">
                <li>• Blue performance polo</li>
                <li>• Black dress pants, black dress shoes and socks</li>
              </ul>
              <p className="text-gray-dark">
                <strong>Not permitted:</strong> jeans, sneakers, Converse, or Crocs.
              </p>
            </div>

            <div className="bg-gray-100 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Key Dates</h3>
              <ul className="space-y-2 text-gray-dark">
                <li>• <strong>Aug 14</strong> &mdash; Sectional acknowledgement form due</li>
                <li>• <strong>Aug 17</strong> &mdash; Fall sectionals begin (Mon&ndash;Thu, 4:00&ndash;5:00 PM)</li>
                <li>• <strong>Aug 21</strong> &mdash; Handbook acknowledgement, medical release, and random drug test forms due</li>
                <li>• <strong>Sept 4</strong> &mdash; Activity fees and shirt orders due</li>
                <li>• <strong>Sept 28</strong> &mdash; Sheldon ISD District Honor Band</li>
                <li>• <strong>Oct 31</strong> &mdash; Region 33 All-Region Auditions</li>
                <li>• <strong>March 2027</strong> &mdash; UIL Concert &amp; Sightreading Assessment</li>
              </ul>
            </div>
          </div>
```

The letter-grade rubric is deliberately not reproduced — the handbook's rubric skips C (100 A / 85 B / 70 D / 50 F), which is a probable typo that should not be amplified onto a public page.

- [ ] **Step 2: Verify the four wrong facts are gone**

```bash
cd /home/waffles/projects/kmspantherband
grep -nE 'White button-up|Participation & Attendance: 40%|20 minutes|unexcused absences' src/app/handbook/page.tsx && echo "FAIL: stale facts remain" || echo "PASS: stale facts removed"
grep -c '50% Major Grades' src/app/handbook/page.tsx
```

Expected: `PASS: stale facts removed`, then `1`.

- [ ] **Step 3: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/app/handbook/page.tsx
git commit -m "content: correct handbook Quick Reference to 26-27

Grading was published as 40/30/20/10 (actual: 50/50) and concert attire as
a white button-up (actual: blue performance polo). Practice minimums and the
three-absence rule appear in no source and are removed."
```

---

### Task 6: Schedule page — replace fabricated content

Current page invents class periods and a jazz band that appears in no source.

**Files:**
- Modify: `src/app/schedule/page.tsx` (full rewrite)
- Modify: `src/components/Header.tsx` (add `/schedule` and `/join` to nav)

- [ ] **Step 1: Rewrite the page**

```tsx
import Link from "next/link";

export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Rehearsal Schedule
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Fall Sectionals</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-dark mb-3">
              Sectionals run <strong>Monday through Thursday, 4:00&ndash;5:00 PM</strong>,
              beginning <strong>August 17, 2026</strong>.
            </p>
            <p className="text-gray-dark">
              Your student&apos;s assigned sectional day depends on their instrument. The
              sectional acknowledgement form is due <strong>August 14</strong>.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Class</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <p className="text-gray-dark">
              Band meets daily as a regular class period. Placement is set by the campus
              master schedule &mdash; check your student&apos;s schedule in Skyward.
            </p>
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">
            Performances &amp; Event Dates
          </h2>
          <p className="mb-6">
            Concerts, contests, and trip dates live on the band calendar. Changes are
            announced through ParentSquare.
          </p>
          <Link
            href="/calendar"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
          >
            View the Calendar
          </Link>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the orphaned routes to the nav**

In `src/components/Header.tsx`, inside the `navigation` array, change the RESOURCES `subItems` to include the schedule, and add a JOIN entry. Replace the `RESOURCES` object and the `CONTACT` entry with:

```tsx
    {
      name: 'RESOURCES',
      subItems: [
        { name: 'Band Handbook', href: '/handbook' },
        { name: 'Rehearsal Schedule', href: '/schedule' },
        { name: 'Instrument Rental', href: '/instrument-rental' },
        { name: 'Forms & Documents', href: '/resources/forms' }
      ]
    },
    { name: 'JOIN BAND', href: '/join' },
    { name: 'CONTACT', href: '/contact' }
```

- [ ] **Step 3: Verify fabricated content is gone and routes are reachable**

```bash
cd /home/waffles/projects/kmspantherband
grep -nE 'Jazz Band|1st Period|Sample Schedule' src/app/schedule/page.tsx && echo "FAIL: fabrication remains" || echo "PASS: fabrication removed"
grep -c "href: '/schedule'" src/components/Header.tsx
grep -c "href: '/join'" src/components/Header.tsx
```

Expected: `PASS: fabrication removed`, then `1`, then `1`.

- [ ] **Step 4: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add src/app/schedule/page.tsx src/components/Header.tsx
git commit -m "content: real sectional schedule; link /schedule and /join in nav

Both routes existed but were reachable from nowhere. The old schedule page
listed invented class periods and a jazz band that appears in no source."
```

---

### Task 7: Forms page — replace "Coming Soon"

Forms are due Aug 14 and Aug 21. A "Coming Soon" placeholder is actively harmful this week.

**Files:**
- Modify: `src/app/resources/forms/page.tsx` (full rewrite)

- [ ] **Step 1: Rewrite the page**

```tsx
import Link from "next/link";

export default function FormsDocuments() {
  const handbookUrl =
    "https://docs.google.com/document/d/1una3PXJwVNUcgznEZXNXnNqMYKTe4eacf_3yeU0BwHA/edit?usp=sharing";

  const forms = [
    {
      name: "Sectional Acknowledgement",
      due: "August 14, 2026",
      note: "Confirms you have seen the fall sectional schedule.",
    },
    {
      name: "Handbook Acknowledgement",
      due: "August 21, 2026",
      note: "Signed by both student and parent or guardian.",
    },
    {
      name: "Medical Release",
      due: "August 21, 2026",
      note: "Required before any off-campus performance or trip.",
    },
    {
      name: "Random Drug Test Consent",
      due: "August 21, 2026",
      note: "Required for all extracurricular participants.",
    },
    {
      name: "Activity Fee & Shirt Order",
      due: "September 4, 2026",
      note: "$25 per student. Pay by Ludus, check to the campus, or cash.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Forms &amp; Documents
      </h1>

      <div className="max-w-4xl mx-auto">
        <p className="text-lg text-gray-dark leading-relaxed mb-12">
          All forms below are included in the band handbook. Print the pages you need,
          or pick up a paper copy from the band hall.
        </p>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Start-of-Year Forms</h2>
          <div className="space-y-4">
            {forms.map((f) => (
              <div key={f.name} className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                  <h3 className="font-semibold text-lg">{f.name}</h3>
                  <p className="text-primary font-medium text-sm">Due {f.due}</p>
                </div>
                <p className="text-gray-dark text-sm">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">
            Find the Forms in the Handbook
          </h2>
          <p className="mb-6">
            Every form above is printable from the 2026&ndash;2027 band handbook.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/handbook"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
            >
              View the Handbook
            </Link>
            <a
              href={handbookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
            >
              Open in Google Docs
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify**

```bash
cd /home/waffles/projects/kmspantherband
grep -n 'Coming Soon' src/app/resources/forms/page.tsx && echo "FAIL" || echo "PASS: placeholder gone"
grep -c 'August 21, 2026' src/app/resources/forms/page.tsx
```

Expected: `PASS: placeholder gone`, then `3`.

- [ ] **Step 3: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 4: Commit**

```bash
git add src/app/resources/forms/page.tsx
git commit -m "content: real forms and deadlines replace Coming Soon placeholder"
```

---

### Task 8: Create `/future-members`

Fixes the live 404 — `Header.tsx` has linked `/future-members` since launch with no page behind it.

**Files:**
- Create: `src/app/future-members/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import Link from "next/link";

export default function FutureMembers() {
  const schoolOwned = ["Oboe", "Bassoon", "Alto Saxophone", "French Horn", "Euphonium", "Tuba"];
  const parentProvided = ["Flute", "Clarinet", "Trumpet", "Trombone", "Percussion"];

  const faqs = [
    {
      q: "Does my child need musical experience?",
      a: "No. Most of our beginners have never played an instrument before. We teach everything from the first note.",
    },
    {
      q: "Can they do band and a sport?",
      a: "Yes, and most do. A large share of our 7th and 8th graders play volleyball, football, basketball, or run track while staying in band. We build the sectional schedule expecting it.",
    },
    {
      q: "How do they choose an instrument?",
      a: "Every student tries several instruments and gets a score for each. We match their results, their preference, and the balance the band needs.",
    },
    {
      q: "What is the time commitment?",
      a: "Band meets daily as a regular class. Sectionals run Monday through Thursday, 4:00–5:00 PM, and each student attends the one for their instrument.",
    },
    {
      q: "What if we cannot afford an instrument or the fees?",
      a: "Talk to us. Partial payments are accepted for cash and check, and we will work with you. No student is turned away from band over cost.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Future Panthers
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            The Panther Band is one of the largest and most successful groups at C.E. King
            Middle School &mdash; over 250 students strong. If your student is coming to KMS
            next year, we would love to have them. No experience necessary.
          </p>
        </section>

        {/* Instrument Drive — the single most time-sensitive item on this page */}
        <section className="mb-12">
          <div className="bg-primary text-secondary p-8 rounded-lg">
            <h2 className="text-2xl font-semibold mb-4 text-white !text-white">
              Instrument Drive &mdash; Friday, August 21
            </h2>
            <p className="mb-3">
              <strong>5:00&ndash;8:00 PM &middot; Null Middle School cafeteria</strong>
            </p>
            <p className="mb-3">
              Please note the location: this event is at <strong>Null Middle School</strong>,
              not C.E. King.
            </p>
            <p>
              All three recommended vendors will be there with rental and purchase options,
              plus the required accessories. This is the easiest way to walk out with
              everything your student needs for the first day.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Choosing an Instrument</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-primary">Provided by the School</h3>
              <p className="text-gray-dark text-sm mb-3">
                No rental needed. A <strong>$100/year</strong> usage fee applies, and you buy
                only the accessories.
              </p>
              <ul className="text-gray-dark space-y-1">
                {schoolOwned.map((i) => (
                  <li key={i}>&bull; {i}</li>
                ))}
              </ul>
              <p className="text-gray-dark text-sm mt-3">
                Percussion becomes a $100/year school-owned instrument starting in Year 2.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2 text-primary">Provided by the Family</h3>
              <p className="text-gray-dark text-sm mb-3">
                Rent or purchase from a recommended vendor. Rental runs about
                <strong> $30&ndash;$50/month</strong>.
              </p>
              <ul className="text-gray-dark space-y-1">
                {parentProvided.map((i) => (
                  <li key={i}>&bull; {i}</li>
                ))}
              </ul>
              <p className="text-gray-dark text-sm mt-3">
                All three vendors visit our campus weekly, so repairs do not mean a drive
                across town.
              </p>
            </div>
          </div>
          <div className="text-center mt-6">
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              See recommended music stores and rental details &rarr;
            </Link>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">What It Costs</h2>
          <div className="bg-gray-100 p-6 rounded-lg">
            <ul className="space-y-2 text-gray-dark mb-4">
              <li>• <strong>$25/year</strong> band activity fee &mdash; every student</li>
              <li>• <strong>$100/year</strong> school-owned instrument usage fee, if applicable</li>
              <li>• <strong>$30&ndash;$50/month</strong> if you rent from a vendor</li>
            </ul>
            <p className="text-gray-dark mb-3">
              The activity fee covers the band T-shirt, a 1&quot; black binder, a pencil pouch,
              an instrument case tag, and the class method book.
            </p>
            <p className="text-gray-dark">
              Pay by Ludus (credit/debit), check made out to the campus, or cash. Partial
              payments are accepted for cash and check.
            </p>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Common Questions</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <div key={f.q} className="bg-white p-6 rounded-lg shadow">
                <h3 className="font-semibold mb-2">{f.q}</h3>
                <p className="text-gray-dark">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4 text-white !text-white">Still Have Questions?</h2>
          <p className="mb-6">
            Call the band office at{" "}
            <a href="tel:+12817273500" className="underline hover:no-underline">(281) 727-3500</a>{" "}
            or email a director &mdash; we are happy to talk it through.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
          >
            Contact the Directors
          </Link>
        </section>
      </div>
    </div>
  );
}
```

Note the athletics answer carries no percentage — the "8 in 10" figure is last year's and unverified.

- [ ] **Step 2: Verify the route resolves and the nav link is no longer dead**

```bash
cd /home/waffles/projects/kmspantherband
npm run build 2>&1 | grep -E 'future-members'
```

Expected: a line showing `/future-members` as `○` (Static).

- [ ] **Step 3: Confirm no stale facts leaked in from the Google Site**

```bash
grep -nEi 'SAT|96%|August 29|approved' src/app/future-members/page.tsx && echo "FAIL: stale content" || echo "PASS: clean"
```

Expected: `PASS: clean`.

- [ ] **Step 4: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 5: Commit**

```bash
git add src/app/future-members/page.tsx
git commit -m "feat: add /future-members page

The nav has linked this route since launch with no page behind it, so
FUTURE MEMBERS 404'd. Content drawn from the 26-27 elementary packet;
the legacy Google Site's unsourced SAT/graduation statistics and its
2023 event date are deliberately not carried over."
```

---

### Task 9: Instrument rental — vendors, fees, "Recommended"

Three defects: the "Approved" wording, a `$50 per semester` school fee that contradicts the $100/year in both authoritative sources, and a missing third vendor (Veritas).

**Files:**
- Modify: `src/app/instrument-rental/page.tsx`

- [ ] **Step 1: Fix the copy rule (both occurrences)**

- Line ~44: `Rent from our approved local music stores.` → `Rent from our recommended local music stores.`
- Line ~86: `<h2 ...>Approved Music Stores</h2>` → `<h2 ...>Recommended Music Stores</h2>`

- [ ] **Step 2: Correct the school instrument fee**

Replace the whole `School Rental Program` card body — its `<h3>`, its `<p>`, and the `<ul>` describing `$50 per semester` — with the block below. The new `<h3>` is included, so do not edit the heading separately:

```tsx
              <h3 className="text-xl font-semibold mb-3">School-Owned Instruments</h3>
              <p className="text-gray-dark mb-4">
                Oboe, bassoon, alto saxophone, French horn, euphonium, and tuba are
                provided by the school &mdash; no rental needed.
              </p>
              <ul className="space-y-2 text-gray-dark">
                <li>• $100/year usage fee</li>
                <li>• Percussion: $100/year starting Year 2</li>
                <li>• You purchase accessories only</li>
                <li>• Distributed on campus at the start of the year</li>
              </ul>
```

- [ ] **Step 3: Add Veritas as the third recommended vendor**

Insert after the Music & Arts card, before the `RG&apos;s Music Repair-Houston` card:

```tsx
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-lg mb-2">Veritas Instrument Rental</h3>
              <p className="text-gray-dark mb-2">
                Rentals delivered to your door, with weekly service visits to our campus.
              </p>
              <p className="text-gray-dark text-sm mb-2">
                Rental runs approximately $30&ndash;$50/month depending on instrument and brand.
              </p>
              <div className="mt-4">
                <a
                  href="https://www.rentfromhome.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary hover:bg-primary-hover text-white px-6 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
                >
                  Visit Veritas
                </a>
              </div>
            </div>
```

- [ ] **Step 4: Verify**

```bash
cd /home/waffles/projects/kmspantherband
grep -ni 'approved\|per semester' src/app/instrument-rental/page.tsx && echo "FAIL: stale copy" || echo "PASS"
grep -c 'Veritas' src/app/instrument-rental/page.tsx
grep -c '100/year' src/app/instrument-rental/page.tsx
```

Expected: `PASS`, then `1` or more, then `1` or more.

- [ ] **Step 5: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 6: Commit**

```bash
git add src/app/instrument-rental/page.tsx
git commit -m "content: correct rental fees and vendors for 26-27

School instrument fee was published as \$50/semester; both the handbook and
the elementary packet say \$100/year. Adds Veritas, the third recommended
vendor, and applies the Approved -> Recommended wording change."
```

---

### Task 10: Footer and header chrome

**Files:**
- Modify: `src/components/Footer.tsx`
- Modify: `src/components/Header.tsx:105-112`

- [ ] **Step 1: Fix the wrong phone number**

In `Footer.tsx`, `href="tel:2812817900"` displays `(281) 727-3500` but dials a different number. Replace with `href="tel:+12817273500"`.

- [ ] **Step 2: Remove the dead social links**

All three social `<a>` elements are `href="#"`. Replace the entire `{/* Follow Us */}` div with a real quick link instead:

```tsx
          {/* Future Members */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4 text-white !text-white">NEW TO BAND?</h3>
            <p className="text-sm text-gray-lighter mb-2">
              Incoming students and families start here.
            </p>
            <Link href="/future-members" className="text-sm text-gray-lighter hover:text-white transition-colors underline">
              Future Panthers &rarr;
            </Link>
          </div>
```

- [ ] **Step 3: Use the real logo**

`public/images/logo.svg` exists but the header renders a placeholder `K` box.

**Contrast hazard — verified 2026-08-09:** `logo.svg` contains no `fill`, `style`,
or `class` attributes on any path, so every path inherits the SVG default of
`fill: black`. Dropped onto the navy (`#001689`) header as-is, it renders a black
mark on navy — nearly invisible, and a direct violation of the global no-dark-on-navy
constraint. `brightness-0 invert` forces the artwork to pure white regardless of its
internal colors, which matches the white nav text. Do not omit those classes.

In `Header.tsx`, replace the inner `<div>` of the logo `<Link>` with:

```tsx
              <Image
                src="/images/logo.svg"
                alt="KMS Panther Band"
                fill
                priority
                className="object-contain brightness-0 invert"
              />
```

Add `import Image from 'next/image';` at the top of `Header.tsx`.

The logo sits on navy in both header states: `bg-primary` when solid, and over the
hero image when transparent on `/` and `/about`. White works for both. Verify the
logo is actually visible against the navy header in the preview at Task 12 — a
black-on-navy logo passes every automated check in this plan and still ships broken.

- [ ] **Step 4: Verify**

```bash
cd /home/waffles/projects/kmspantherband
grep -n 'tel:2812817900' src/components/Footer.tsx && echo "FAIL: wrong number" || echo "PASS: number fixed"
grep -n 'href="#"' src/components/Footer.tsx && echo "FAIL: dead links" || echo "PASS: no dead links"
grep -c 'logo.svg' src/components/Header.tsx
```

Expected: `PASS: number fixed`, `PASS: no dead links`, then `1`.

- [ ] **Step 5: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Footer.tsx src/components/Header.tsx
git commit -m "fix: footer dialed the wrong number; drop dead social links; use real logo

tel: pointed at 2812817900 while displaying (281) 727-3500."
```

---

### Task 11: Calendar year and style standardization

**Files:**
- Modify: `src/app/calendar/page.tsx`
- Modify: `src/app/join/page.tsx`, `src/app/about/page.tsx` (container only, if they differ)

- [ ] **Step 1: Roll the calendar year**

Replace `for the 2025-2026 school year` with `for the 2026-2027 school year`.

- [ ] **Step 2: Conform the calendar heading to the site standard**

Replace:

```tsx
          <h1 className="text-4xl lg:text-5xl text-center mb-8 text-primary">
            CALENDAR
          </h1>
```

with:

```tsx
          <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
            Calendar
          </h1>
```

- [ ] **Step 3: Conform container patterns**

The standard is `container mx-auto px-4 py-12`. Change any page still using `max-w-7xl mx-auto px-8 lg:px-16 py-20` to the standard.

```bash
cd /home/waffles/projects/kmspantherband
grep -rn 'max-w-7xl mx-auto px-8 lg:px-16' src/app/
```

Update each hit found.

- [ ] **Step 4: Verify no stale year and no outlier containers remain**

```bash
cd /home/waffles/projects/kmspantherband
grep -rn '2025-2026\|2025-26' src/ && echo "FAIL: stale year" || echo "PASS: year rolled"
grep -rn 'max-w-7xl mx-auto px-8 lg:px-16' src/app/ && echo "FAIL: outlier container" || echo "PASS: containers uniform"
```

Expected: both `PASS`.

- [ ] **Step 5: Gate**

```bash
npm run typecheck && npm run lint
```

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "style: roll calendar to 2026-2027 and unify heading/container patterns"
```

---

### Task 12: Full gate, preview, and documentation

**Files:**
- Modify: `CLAUDE.md`
- Modify: `docs/deployment-runbook.md`

- [ ] **Step 1: Run the authoritative gate**

```bash
cd /home/waffles/projects/kmspantherband
npm run typecheck && npm run lint && npm run build:cf
```

Expected: clean. Confirm the route table shows **16** entries, all `○ (Static)`, including `/future-members`.

Note: 16 = 15 page routes + `/_not-found`. CLAUDE.md's existing claim of "17 routes"
was already inaccurate before this plan (the real count was 15 entries: 14 pages +
`/_not-found`). Task 12 Step 4 corrects that number in CLAUDE.md rather than
propagating it.

- [ ] **Step 2: Site-wide fact sweep**

```bash
cd /home/waffles/projects/kmspantherband
echo "--- these must all return nothing ---"
grep -rniE 'cooper|approved music|2025-2026|per semester|white button-up|tel:2812817900|href="#"' src/ || echo "CLEAN"

echo "--- Coming Soon: only the five deferred ensemble pages may match ---"
grep -rln 'Coming Soon!' src/ | grep -v '^src/app/ensembles/' || echo "CLEAN"
```

Expected: `CLEAN` for both. Any other hit is a regression from an earlier task.

The `/ensembles/*` pages are deliberately excluded — they remain "Coming Soon"
placeholders and are listed under Deferred. Do not fix them in this plan.

- [ ] **Step 3: Drive the real worker**

```bash
npm run preview:cf
```

In the browser at `localhost:8787`, confirm:
- `/future-members` renders (was a 404).
- `/join` and `/schedule` show the navigation bar.
- `/about` shows Chavez, not Cooper, and her photo is upright.
- `/` and `/about` still have the transparent hero nav that turns solid on scroll.
- The mobile menu opens and closes at a narrow viewport.

- [ ] **Step 4: Record the work in CLAUDE.md**

Add to the Decisions section:

```markdown
### D5 — Header lives in the root layout (2026-08-09)
`<Header />` was rendered by each page, and `/join` and `/schedule` simply
forgot it — they shipped with no navigation. It now renders once from
`layout.tsx` via `HeaderSlot`, which also owns the spacer. Transparency
derives from `TRANSPARENT_NAV_PAGES` in `Header.tsx`, so the `variant`
prop is gone. A new page cannot repeat the bug.

### D6 — Handbook facts are summarized, never re-derived (2026-08-09)
The `/handbook` Quick Reference had drifted into contradicting the handbook
it links to: grading published as 40/30/20/10 against an actual 50/50, and
concert attire as a white button-up against an actual blue performance polo.
Practice minimums and an absence rule appeared in no source at all.

When the handbook changes, re-check that section against it. Source
authority is: handbook > elementary packet > director correction > anything
on the legacy Google Site, which is stale and should not be trusted.
```

Update the Directory Structure block to include `future-members/`.

Also fix the Stack section's route count. It currently reads "All 17 routes are
`○ (Static)`", which was already wrong before this plan. Replace it with the
verified figure from Step 1 — **16 entries (15 pages + `/_not-found`)** — phrased
so it does not need re-counting every time a page is added, e.g. "Every route is
`○ (Static)` — prerendered at build time."

- [ ] **Step 5: Add a content-refresh note to the runbook**

Append to `docs/deployment-runbook.md` a short "2026-27 season refresh" entry recording: the source documents used, the five source inconsistencies flagged to the director (two activity-fee due dates, the rubric with no C, the tinyurl pointing away from this site, the stale athletics figure, and the varying activity-fee inclusions), and that the May 2026 elementary packet still lists Cooper and needs a reprint.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "docs: record the 26-27 refresh, D5 header-in-layout, D6 handbook drift"
```

- [ ] **Step 7: Hand back to the director**

Do **not** run `npm run deploy`. Report the completed gate output and let the director choose when to publish.

---

## Deferred / Not in This Plan

- Per-instrument required-supplies list (packet pp. 7–8). The packet QR code already serves it.
- Announcements-in-`.tsx` editing friction (CLAUDE.md Known Gaps).
- Real social media URLs — links removed rather than left dead; restore when accounts exist.
- Ensemble pages (`/ensembles/*`) are still "Coming Soon" placeholders. Out of scope, but they are the largest remaining content gap after this plan lands.
