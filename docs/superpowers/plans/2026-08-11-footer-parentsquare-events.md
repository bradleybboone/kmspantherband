# Footer Affiliation + ParentSquare Push + Homepage Events Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Footer signals school/district affiliation (KMS logo on white chip, Sheldon ISD + ParentSquare links), the homepage surfaces upcoming events via a compact Teamup agenda embed, and a Stay Connected strip pushes ParentSquare.

**Architecture:** Pure static additions — one committed image asset, edits to `Footer.tsx` and the homepage `page.tsx`. No new dependencies, no client JS beyond a second lazy iframe of the existing Teamup calendar, no event data in code (Teamup stays the single source of truth).

**Tech Stack:** Next.js 16 App Router (all routes `○ (Static)`), Tailwind v4 utility classes plus the site's own CSS vocabulary in `globals.css`, sharp (already a dependency) for a one-off image downscale.

**Spec:** `docs/superpowers/specs/2026-08-11-footer-parentsquare-events-design.md`

## Global Constraints

- No hand-maintained event data anywhere; the Teamup calendar `ksy2fym655un5pdh88` is the single source of truth (D6).
- No new dependencies, no env vars, no API routes; every route stays `○ (Static)` in the build output.
- Images are served byte-for-byte (D3) — the logo must be downscaled *before* committing; `scripts/compress-images.mjs` only resizes above 1600px and will NOT do it.
- All external links: `target="_blank" rel="noopener noreferrer"`.
- Tap targets ≥ 44px: with `text-sm` (20px line-height) that is `py-3` (12px + 12px + 20px = 44px), applied uniformly to ALL footer links, not just new ones.
- Button vocabulary: only `.btn` + `.btn-outline` (on-dark) exist. On light backgrounds use the quick-link text style: `text-primary font-medium text-sm uppercase tracking-wide hover:text-primary-hover transition-colors`.
- Nothing new loads above the fold; both iframes carry `loading="lazy"`.
- There is no JS test framework in this repo. The test cycle per task is: `npm run typecheck && npm run lint`, and the plan ends with the full local gate (`npm run build:cf` + `npm run preview:cf`) and visual checks. This mirrors the project's documented authoritative gate.

---

### Task 1: KMS school logo asset

**Files:**
- Create: `public/images/kms-school-logo.png` (160×160 PNG, transparent)

**Interfaces:**
- Produces: `/images/kms-school-logo.png`, referenced by Task 2's `<Image>`.

- [ ] **Step 1: Download the 512px source from the district CDN into the scratchpad (NOT into the repo)**

```bash
curl -sL "https://resources.finalsite.net/images/f_auto,q_auto,t_image_size_2/v1776883964/sheldonisdcom/gk7ogjobglswy1xvtlvy/CEKingMiddleSchool.png" \
  -o "$SCRATCH/kms-logo-512.png"
file "$SCRATCH/kms-logo-512.png"
```

(`$SCRATCH` = the session scratchpad directory. Expected: `PNG image data, 512 x 512`.)

- [ ] **Step 2: Downscale to 160×160 with the project's sharp**

Run from the repo root (sharp resolves from `node_modules`):

```bash
node -e "
const sharp = require('sharp');
sharp(process.argv[1])
  .resize(160, 160)
  .png({ compressionLevel: 9 })
  .toFile('public/images/kms-school-logo.png')
  .then(info => console.log(info.width + 'x' + info.height, info.size + ' bytes'));
" "$SCRATCH/kms-logo-512.png"
```

Expected output: `160x160` and a byte size well under the 31 KB source (roughly 5–15 KB).

- [ ] **Step 3: Verify the committed file is the downscaled one**

```bash
file public/images/kms-school-logo.png
ls -la public/images/kms-school-logo.png
```

Expected: `PNG image data, 160 x 160`; size matches Step 2's output. If it reads 512×512, Step 2 wrote to the wrong path — fix before committing.

- [ ] **Step 4: Commit**

```bash
git add public/images/kms-school-logo.png
git commit -m "feat: add KMS school logo asset (downscaled to 160px at source, per D3)"
```

---

### Task 2: Footer — logo chip, Sheldon ISD + ParentSquare links, uniform 44px tap targets

**Files:**
- Modify: `src/components/Footer.tsx` (full-file replacement below)

**Interfaces:**
- Consumes: `/images/kms-school-logo.png` from Task 1.
- Produces: nothing later tasks depend on.

- [ ] **Step 1: Replace `src/components/Footer.tsx` with:**

```tsx
import Image from 'next/image';
import Link from 'next/link';

/*
  Every link in the footer carries `inline-block py-3`: with text-sm's 20px
  line-height that is exactly a 44px tap target (WCAG target size), applied
  uniformly so new and old links stay visually consistent. List rhythm comes
  from the link padding, so the <ul>s have no space-y-*.
*/
export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            {/*
              The school logo's black panther and navy text are illegible on
              the navy footer, so it sits on a white chip (see the logo
              provenance note in the spec).
            */}
            <div className="mb-4 inline-block rounded-lg bg-white p-2">
              <Image
                src="/images/kms-school-logo.png"
                alt="C.E. King Middle School logo"
                width={80}
                height={80}
              />
            </div>
            <h3 className="text-lg font-display font-medium mb-4">KMS PANTHER BAND</h3>
            <p className="text-sm text-gray-lighter">Excellence in music education at</p>
            <a
              href="https://kms.sheldonisd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
            >
              C.E. King Middle School
            </a>
            <br />
            <a
              href="https://www.sheldonisd.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
            >
              Sheldon ISD
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">QUICK LINKS</h3>
            <ul>
              <li>
                <Link href="/calendar" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Calendar
                </Link>
              </li>
              <li>
                <Link href="/handbook" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Handbook
                </Link>
              </li>
              <li>
                <Link href="/resources/forms" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors">
                  Forms &amp; Documents
                </Link>
              </li>
              <li>
                <a
                  href="https://www.sheldonisd.com/departments/communications/parent-square"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors"
                >
                  ParentSquare
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">CONTACT</h3>
            <ul className="space-y-1 text-sm text-gray-lighter">
              <li>C.E. King Middle School</li>
              <li>8540 C.E. King Parkway</li>
              <li>Houston, TX 77044</li>
              <li className="pt-2">
                <a href="tel:+12817273500" className="inline-block py-3 hover:text-white transition-colors">
                  (281) 727-3500
                </a>
              </li>
            </ul>
          </div>

          {/* Future Members */}
          <div>
            <h3 className="text-lg font-display font-medium mb-4">NEW TO BAND?</h3>
            <p className="text-sm text-gray-lighter mb-2">
              Incoming students and families start here.
            </p>
            <Link href="/future-members" className="inline-block py-3 text-sm text-gray-lighter hover:text-white transition-colors underline">
              Future Panthers &rarr;
            </Link>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/20">
          <p className="text-sm text-gray-lighter text-center">
            © {new Date().getFullYear()} KMS Panther Band. All rights reserved. | Excellence From Within
          </p>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Run the checks**

```bash
npm run typecheck && npm run lint
```

Expected: both pass with no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/Footer.tsx
git commit -m "feat: footer affiliation — KMS logo chip, Sheldon ISD + ParentSquare links, 44px tap targets"
```

---

### Task 3: Homepage upcoming-events section (Teamup agenda embed)

**Files:**
- Modify: `src/app/page.tsx` — insert a new section between the Quick Links section (closes at the `</section>` before the `{/* Image Gallery Section */}` comment) and the gallery.

**Interfaces:**
- Consumes: nothing from other tasks (independent of Tasks 1–2).
- Produces: section order Quick Links → **Upcoming Events** → (Task 4's strip) → Panther Pride. Task 4 inserts *after* this section.

- [ ] **Step 1: Sanity-check the embed URL resolves**

```bash
curl -s -o /dev/null -w "%{http_code}\n" "https://teamup.com/ksy2fym655un5pdh88?view=a&tz=Calendar%20default&showProfileAndInfo=0&showSidepanel=0&showViewHeader=0&showAgendaDetails=0&showDateControls=1&showDateRange=0"
```

Expected: `200`. (Whether `view=a` truly renders the agenda view, and whether date paging survives the reduced chrome, is confirmed visually in Task 5 Step 3 — if agenda does not render, the fallback is to try `view=l`, then `view=md`, keeping all other params.)

- [ ] **Step 2: Insert the section into `src/app/page.tsx`**

Directly after the Quick Links `</section>` and before `{/* Image Gallery Section */}`:

```tsx
      {/* Upcoming Events — same Teamup calendar as /calendar, agenda view.
          The calendar is the single source of truth (D6): no event data in
          code, ever. Fixed height means the agenda scrolls inside the frame;
          that is deliberate (a date-range cap would need periodic re-tuning).
          showDateControls=1 keeps forward paging available. */}
      <section className="py-20 bg-white">
        <div className="container">
          <h2 className="text-center text-3xl lg:text-4xl mb-12 text-primary">
            UPCOMING EVENTS
          </h2>
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden border border-gray-light/40">
            <iframe
              src="https://teamup.com/ksy2fym655un5pdh88?view=a&tz=Calendar%20default&showProfileAndInfo=0&showSidepanel=0&showViewHeader=0&showAgendaDetails=0&showDateControls=1&showDateRange=0"
              className="w-full h-[420px]"
              loading="lazy"
              title="Upcoming KMS Panther Band events"
            />
          </div>
          <p className="text-center mt-8">
            <Link
              href="/calendar"
              className="inline-block py-3 text-primary font-medium text-sm uppercase tracking-wide hover:text-primary-hover transition-colors"
            >
              View Full Calendar &rarr;
            </Link>
          </p>
        </div>
      </section>
```

(`Link` is already imported at the top of `page.tsx`. If `border-gray-light/40` fails the build because the token lacks opacity support, drop the `/40` — the border is cosmetic.)

- [ ] **Step 3: Run the checks**

```bash
npm run typecheck && npm run lint
```

Expected: both pass.

- [ ] **Step 4: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: homepage upcoming-events section — compact Teamup agenda embed + calendar link"
```

---

### Task 4: Homepage Stay Connected strip (ParentSquare)

**Files:**
- Modify: `src/app/page.tsx` — insert between Task 3's events section and `{/* Image Gallery Section */}`.

**Interfaces:**
- Consumes: Task 3's section placement (this strip goes immediately after it).
- Produces: final homepage order: hero → announcement → Quick Links (bg-primary-canvas) → Upcoming Events (bg-white) → Stay Connected (bg-primary-canvas) → Panther Pride (bg-white) → CTA.

- [ ] **Step 1: Insert the section into `src/app/page.tsx`**

Directly after the Upcoming Events `</section>` and before `{/* Image Gallery Section */}`:

```tsx
      {/* Stay Connected — ParentSquare push. External links only; weekly
          news itself lives in ParentSquare, not on this site. */}
      <section className="py-16 bg-primary-canvas">
        <div className="container text-center">
          <h2 className="text-3xl lg:text-4xl mb-6 text-primary">
            STAY CONNECTED
          </h2>
          <p className="text-base text-gray-dark max-w-2xl mx-auto mb-6">
            Weekly band news goes out on ParentSquare &mdash; the district&apos;s
            family communication app.
          </p>
          <div className="flex flex-wrap justify-center gap-x-10">
            <a
              href="https://www.sheldonisd.com/departments/communications/parent-square"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-primary font-medium text-sm uppercase tracking-wide hover:text-primary-hover transition-colors"
            >
              About ParentSquare &rarr;
            </a>
            <a
              href="https://apps.apple.com/us/app/parentsquare/id908126679"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-primary font-medium text-sm uppercase tracking-wide hover:text-primary-hover transition-colors"
            >
              App Store &rarr;
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.parentsquare.psapp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block py-3 text-primary font-medium text-sm uppercase tracking-wide hover:text-primary-hover transition-colors"
            >
              Google Play &rarr;
            </a>
          </div>
        </div>
      </section>
```

- [ ] **Step 2: Run the checks**

```bash
npm run typecheck && npm run lint
```

Expected: both pass.

- [ ] **Step 3: Commit**

```bash
git add src/app/page.tsx
git commit -m "feat: Stay Connected strip — ParentSquare district page + app store links"
```

---

### Task 5: Local gate + visual verification

**Files:**
- No file changes (verification only; fixes discovered here amend the relevant task's file and get their own commit).

**Interfaces:**
- Consumes: everything from Tasks 1–4.

- [ ] **Step 1: Run the full local gate**

```bash
npm run typecheck && npm run lint && npm run build:cf
```

Expected: all pass. In the Next build route table, every route still shows `○ (Static)` — if anything shows `ƒ`, stop and find what introduced dynamism.

- [ ] **Step 2: Preview the real worker**

```bash
npm run preview:cf
```

Load `http://localhost:8787/` and scroll the full page.

- [ ] **Step 3: Visual checks (desktop ~1280px and mobile 375px)**

- Footer: white chip renders the KMS logo legibly on navy; "Sheldon ISD" and "ParentSquare" links present; link spacing looks even (padding, not squished).
- Events embed: renders the **agenda/list of events** (not a week grid). If it renders a non-agenda view, swap `view=a` → `view=l` (then `view=md`) in `src/app/page.tsx`, re-run Step 2, and note the working value in a code comment.
- Events embed navigation: with the reduced chrome, confirm you can still page forward in time inside the frame. If date controls are missing, set `showViewHeader=1` (keeping `showSidepanel=0`) and re-check.
- Nested scroll: the agenda scrolls inside its 420px frame; page scroll still works normally when scrolling past it on mobile.
- Stay Connected: sentence + three links wrap cleanly at 375px, no horizontal overflow.
- Lazy loading: `curl -s http://localhost:8787/ | grep -o 'loading="lazy"' | wc -l` → expected ≥ 1 on the homepage HTML (the events iframe; the carousel images may add more).
- Tap targets: in devtools, inspect a footer link and confirm computed height ≥ 44px.

- [ ] **Step 4: Commit any fixes from Step 3**

```bash
git add -A src/ && git commit -m "fix: adjust Teamup embed params / visual fixes from preview pass"
```

(Skip if Step 3 needed no changes.)

- [ ] **Step 5: Report**

Report gate output and each visual check's result (pass/fail with what was seen). Deployment (`npm run deploy`) is NOT part of this plan — the director deploys after reviewing the preview.
