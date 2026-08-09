# Pinned for the Next Pass

Raised 2026-08-09 while the 26-27 season refresh was being executed. Deliberately
**not** in `2026-08-09-26-27-season-refresh.md` — recorded here so they survive.

## 1. Contrast audit — root cause FIXED 2026-08-09, sweep still owed

Director requirement: **no black or dark text on navy backgrounds anywhere,
including buttons.** `--primary` is `#001689`; black on it fails WCAG badly, and
CLAUDE.md targets WCAG 2.1 AA at 4.5:1.

**The root cause was found and fixed during the season refresh.** `globals.css`
is unlayered, and `@import "tailwindcss"` puts utilities in `@layer utilities`.
An unlayered rule beats *any* layered rule regardless of specificity, so:

- `h1..h6 { color: var(--accent) }` forced every heading black, including inside
  navy sections — that is where the `text-white !text-white` stutter came from.
- `a { color: var(--primary) }` painted navy text on navy buttons.
- `* { padding: 0; margin: 0 }` and the hand-written "Responsive Utilities"
  duplicates killed Tailwind spacing/sizing site-wide (`p-6` computed to 0px).

All three are now wrapped in `@layer base` or had the `color` removed.

**Still owed:** a real sweep. An ad-hoc runtime contrast checker was attempted
and proved unreliable — it cannot parse Tailwind v4's `lab()` colours and it
mis-resolves backgrounds for hero text sitting over an `<Image>` rather than a
CSS background. Use a proper tool (axe-core, Lighthouse, or pa11y) rather than
hand-rolling it. Two instances were found and fixed by inspection (`/join` CTA
heading, `/future-members` phone link); assume others exist.

The `text-white !text-white` stutter is now redundant and can be simplified to a
single `text-white` during that sweep.

## 2. Prominent ParentSquare CTA

ParentSquare is the actual weekly-communication channel and is currently a
footnote. It needs a real, prominent call to action.

Two distinct newsletters go out weekly:
- **Beginners**
- **Returners** — Concert, Symphonic, and Honor Band students

The CTA should make the split obvious so families subscribe to the right one.
Placement candidates: homepage, `/future-members`, and `/contact` (which now ends
with a quiet ParentSquare paragraph that this would replace).

Needs from the director: the ParentSquare join URL(s), and whether the two
newsletters have separate sign-up links or one link with group selection.

## 3. Replace the TeamUp calendar embed

Director's assessment: TeamUp was a good idea but is not the best fit for direct
integration. He uses **Office (Outlook) calendar** and can also update **Google
Calendar**.

CLAUDE.md D2 already points at an embedded Google Calendar as the intended
approach, and calls the calendar the highest-churn content — so this is the
highest-leverage remaining fix for content-editing friction.

Decide between: Outlook/Microsoft 365 published calendar embed vs. Google
Calendar embed. Google is likely simpler (district runs Google Workspace for
Education, per D2) and keeps the site static with a single iframe swap in
`src/app/calendar/page.tsx`.

## 4. Publish after-school sectionals to the student-facing calendar

Sectionals (Mon–Thu, 4:00–5:00 PM, from Aug 17) are described in prose on
`/schedule` but do not appear as calendar entries students can see. Once item 3
lands, add recurring sectional events to the calendar, broken out by instrument
so a student can find their own day.

Depends on item 3 — do not build this against TeamUp.

## 4b. Instagram link — account coming

Director confirmed 2026-08-09: the band has **no Facebook and no Twitter**, and
**no Instagram yet, but one is coming**.

The footer previously carried all three as `href="#"` placeholders; the season
refresh removed them (dead links on a live site are worse than none) and replaced
the column with a "NEW TO BAND?" link to `/future-members`.

When the Instagram account exists, add a single icon back to `src/components/Footer.tsx`
with the real URL. Do not re-add Facebook or Twitter. Keep the `/future-members`
link — it earns its place independently of social.

## 5. Ensemble pages are still placeholders

Not raised by the director, but noted during the refresh: all five
`/ensembles/*` pages are "Coming Soon". Largest remaining content gap.

## 6. Open items still owed by the director

- Current athletics participation figure (the "8 in 10 of our 7th & 8th graders"
  line is last year's and is published without a number until replaced).
- Whether `tinyurl.com/kingmsband` has been repointed to kmspantherband.org.
  The 26-27 handbook sends every family to that tinyurl.
- The May 2026 elementary packet still lists Jenny Cooper as assistant director
  and needs a reprint before further distribution.
