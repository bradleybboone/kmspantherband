# Supply List Page & Fall Sectionals Grid Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a native `/supply-list` page, replace the wrong Fall Sectionals blurb on `/schedule` with the real weekly grid, and fix the three pages that contradict it.

**Architecture:** Everything stays static App Router pages. New content is typed data arrays at the top of each page file rendered with the site's existing card idiom. No client components, no new dependencies, no env vars.

**Tech Stack:** Next.js 16 App Router, React 19 server components, Tailwind v4, TypeScript strict.

**Spec:** `docs/superpowers/specs/2026-08-10-supply-list-and-fall-sectionals-design.md`

## Global Constraints

- Every route must remain `○ (Static)` in build output; no API routes, no server-side fetching, no `NEXT_PUBLIC_*` vars.
- No new npm dependencies.
- There is no test framework in this repo and none should be added. The per-task check is `npm run typecheck && npm run lint`; the final task runs the full local gate `npm run typecheck && npm run lint && npm run build:cf` plus a `npm run preview:cf` spot-check (per CLAUDE.md).
- Use existing design tokens/classes only: `text-primary`, `bg-primary-tint`, `bg-primary`, `text-secondary`, `text-gray-dark`, `bg-white p-6 rounded-lg shadow` cards, `container mx-auto px-4 py-12` page shell, `max-w-4xl mx-auto` column.
- Mobile-first: no horizontal scroll at 375px anywhere; no `<table>` elements.
- Per-route `metadata` = `title` + `description` only; Open Graph fields are inherited from the root layout — do not add an `openGraph` block.
- Facts must match the spec exactly (models, supplies, days, dates, fees). Do not re-derive or "improve" them.
- Commit after each task. Commit messages end with:
  `Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>`
- Next.js 16 has breaking changes vs training data — if any App Router API is in doubt, check `node_modules/next/dist/docs/` before using it.

---

### Task 1: Create `/supply-list` page and add it to the nav

**Files:**
- Create: `src/app/supply-list/page.tsx`
- Modify: `src/components/Header.tsx` (RESOURCES `subItems`, currently lines 64–70)

**Interfaces:**
- Produces: route `/supply-list`, linked from the RESOURCES dropdown. Later tasks link to it with `<Link href="/supply-list">`.

- [ ] **Step 1: Write the page**

Create `src/app/supply-list/page.tsx` with exactly this content:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Instrument Supply List",
  description:
    "Preferred instrument models and required supplies for every KMS Panther Band instrument, plus what the school provides.",
};

const supplyDocUrl =
  "https://docs.google.com/document/d/1ndtFkoyXGrlWbfTt37ef3JVKoJRArXVae2hSkAVWNJM/edit?usp=sharing";

type Instrument = {
  name: string;
  /** School-owned instruments carry the $100/yr usage fee; families buy accessories only. */
  schoolOwned?: boolean;
  models?: string;
  modelNote?: string;
  supplies: string[];
};

const instruments: Instrument[] = [
  {
    name: "Flute",
    models: "Yamaha 262Y, DiZhao DZ300, Pearl Quantz 505, Gemeinhardt 3",
    modelNote: "Preferred options: open hole with offset G",
    supplies: ["Silk cleaning cloth", "Polish cloth"],
  },
  {
    name: "Clarinet",
    models: "Buffet E11, Yamaha YCL-255, LeBlanc Serenade",
    modelNote: "Preferred options: wood or composite body",
    supplies: [
      "5RV Lyre mouthpiece",
      "Rovner 1R ligature",
      "1 box Vandoren 2.5 clarinet reeds",
      "Silk drop swab",
      "Reed guard (holds at least 4 reeds)",
      "Mouthpiece brush",
      "Cork grease",
    ],
  },
  {
    name: "Alto Saxophone",
    schoolOwned: true,
    models: "Yamaha YAS200AD, Selmer AS400",
    supplies: [
      "Vandoren Optimum AL3 mouthpiece",
      "Padded neck strap",
      "Rovner 1RL ligature",
      "Silk drop swab",
      "Reed guard (holds at least 4 reeds)",
      "1 box Vandoren 2.5 saxophone reeds",
      "Cork grease",
    ],
  },
  {
    name: "Oboe",
    schoolOwned: true,
    supplies: [
      "4 medium oboe reeds",
      "Reed case (holds at least 4 reeds)",
      "Soaker cup with stand clip",
      "Silk drop swab",
    ],
  },
  {
    name: "Bassoon",
    schoolOwned: true,
    supplies: [
      "4 medium bassoon reeds",
      "Reed case (holds at least 4 reeds)",
      "Soaker cup with stand clip",
      "Silk drop swab",
    ],
  },
  {
    name: "Trumpet",
    models: "Bach TR300, Yamaha YTR2330",
    supplies: [
      "Bach 5C mouthpiece",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "French Horn",
    schoolOwned: true,
    supplies: [
      "Farkas MDC mouthpiece",
      "Hetman Synthetic Light rotor lubricant",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Trombone",
    models: "Bach TB301, Yamaha YSL-354, Yamaha YSL-448G",
    supplies: [
      "Bach 6½AL mouthpiece",
      "Slide-O All-in-One Rapid Comfort slide lubricant",
      "SpaceFiller Slide Oil (green writing)",
      "Small spray water bottle",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Euphonium",
    schoolOwned: true,
    supplies: [
      "Schilke 51D mouthpiece (small shank)",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
  {
    name: "Tuba",
    schoolOwned: true,
    supplies: [
      "Bach 18 mouthpiece",
      "Hetman Synthetic Piston Valve Oil",
      "SpaceFiller Slide Oil (green writing)",
      "Mouthpiece brush",
    ],
  },
];

const percussionKit = [
  "Yamaha Bell Kit with Roller Cart (YAM-SPK-285R)",
  "Innovative Percussion Chris Lamb Maple Snare Sticks (INN-CL1)",
  "Innovative Percussion James Ross Medium Soft mallets (INN-IP902)",
  "Innovative Percussion Medium Birch Marimba Mallets (IP240)",
  "Innovative Percussion Practice Pad (CP-1R)",
  "Yamaha Black Folding Music Stand with carry bag (YAM-MS1000)",
  "Innovative Percussion Stick Bag (SB-3)",
];

const percussionVendors = [
  { name: "Steve Weiss Music", url: "https://www.steveweissmusic.com" },
  { name: "Percussion Source", url: "https://www.percussionsource.com" },
  { name: "Sam Ash", url: "https://www.samash.com" },
];

export default function SupplyList() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Instrument Supply List
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <p className="text-lg text-gray-dark leading-relaxed">
            Preferred models and required supplies for each instrument.
            Instruments marked <strong>school-owned</strong> are provided by
            the school for a <strong>$100/year</strong> usage fee &mdash; you
            buy only the accessories listed. See{" "}
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              Instrument Rental
            </Link>{" "}
            for where and how to rent everything else.
          </p>
        </section>

        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {instruments.map((inst) => (
              <div key={inst.name} className="bg-white p-6 rounded-lg shadow">
                <div className="flex flex-col gap-1 mb-3">
                  <h2 className="font-semibold text-lg text-primary">{inst.name}</h2>
                  {inst.schoolOwned && (
                    <p className="text-sm font-medium text-gray-dark">
                      School-owned &mdash; $100/year usage fee
                    </p>
                  )}
                </div>
                {inst.models && (
                  <p className="text-gray-dark text-sm mb-1">
                    <strong>
                      {inst.schoolOwned
                        ? "Preferred models (if purchasing your own):"
                        : "Preferred models:"}
                    </strong>{" "}
                    {inst.models}
                  </p>
                )}
                {inst.modelNote && (
                  <p className="text-gray-dark text-sm mb-1">{inst.modelNote}</p>
                )}
                <p className="text-gray-dark text-sm font-medium mt-3 mb-2">
                  Required supplies:
                </p>
                <ul className="space-y-1 text-gray-dark text-sm">
                  {inst.supplies.map((s) => (
                    <li key={s}>&bull; {s}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Percussion</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <p className="text-sm font-medium text-gray-dark mb-3">
              School-owned &mdash; $100/year usage fee beginning in Year 2
            </p>
            <p className="text-gray-dark text-sm font-medium mb-2">
              Beginner percussion kit:
            </p>
            <ul className="space-y-1 text-gray-dark text-sm mb-4">
              {percussionKit.map((s) => (
                <li key={s}>&bull; {s}</li>
              ))}
            </ul>
            <p className="text-gray-dark text-sm mb-3">
              Two ways to get the kit: <strong>rent-to-own</strong> it through
              any of the{" "}
              <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
                recommended music stores
              </Link>
              , or <strong>purchase</strong> it from a percussion retailer:
            </p>
            <ul className="space-y-1 text-gray-dark text-sm">
              {percussionVendors.map((v) => (
                <li key={v.name}>
                  &bull;{" "}
                  <a
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {v.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Every Student Also Needs</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <ul className="space-y-2 text-gray-dark">
              <li>
                &bull; The class textbook <strong>&ldquo;Standard of Excellence Book 1&rdquo;</strong>{" "}
                (percussion: <strong>&ldquo;Simple Steps to Successful Beginning Percussion&rdquo;</strong>)
              </li>
              <li>
                &bull; The band performance uniform, included in the $25 activity fee
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-primary">
            A Note to Parents on Purchasing Instruments
          </h2>
          <p className="text-gray-dark leading-relaxed mb-6">
            Buying a band instrument is similar to buying a car. You have your
            choice of something high end and luxurious, something smart and
            dependable, or you can get the old clunker. We want you to get the
            best value for your money, and usually with instruments, you get
            what you pay for. We do not want you to get the most expensive
            instrument you can find. We strongly advise you to stay away from
            the most inexpensive instruments, which are typically found in
            places like the internet or stores that sell other things besides
            music instruments (like department stores). In our experience,
            while these instruments appear to be affordable, the build quality
            is inconsistent and repairs are not always possible. Please only
            purchase instruments from a reputable music store. If you find what
            you think is a good, used instrument in a place such as a pawn
            shop, Facebook marketplace, Craigslist, etc, please send a link to
            the band director first so that they can see if you are getting
            your money&rsquo;s worth. Please try to stick to the brands given
            to you on this list.
          </p>
          <h3 className="text-xl font-semibold mb-4 text-primary">
            Una nota para los padres sobre los instrumentos de compra
          </h3>
          <p className="text-gray-dark leading-relaxed" lang="es">
            Comprar un instrumento de banda es similar a comprar un
            autom&oacute;vil. Puede elegir entre algo lujoso y de alta gama,
            algo inteligente y confiable, o puede obtener el viejo cacharro.
            Queremos que obtenga el mejor valor por su dinero y, por lo
            general, con los instrumentos, obtiene lo que paga. No queremos que
            obtenga el instrumento m&aacute;s caro que pueda encontrar. Le
            recomendamos encarecidamente que se mantenga alejado de los
            instrumentos m&aacute;s econ&oacute;micos, que normalmente se
            encuentran en lugares como Internet o tiendas que venden otras
            cosas adem&aacute;s de instrumentos musicales (como los grandes
            almacenes). En nuestra experiencia, si bien estos instrumentos
            parecen ser asequibles, la calidad de construcci&oacute;n es
            inconsistente y no siempre es posible realizar reparaciones.
            Adquiera instrumentos &uacute;nicamente en una tienda de
            m&uacute;sica acreditada. Si encuentra lo que cree que es un buen
            instrumento usado en un lugar como una casa de empe&ntilde;o,
            mercado de Facebook, Craigslist, etc., env&iacute;e primero un
            enlace al director de la banda para que pueda ver si est&aacute;
            obteniendo el valor de su dinero. Intente ce&ntilde;irse a las
            marcas que se le proporcionaron en esta lista.
          </p>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Prefer the Original Document?</h2>
          <p className="mb-6">
            This page mirrors the official supply list. The Google Doc is the
            source of truth.
          </p>
          <a
            href={supplyDocUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-secondary hover:bg-gray-light text-primary px-8 py-3 font-semibold transition-colors duration-200"
          >
            Open in Google Docs
          </a>
        </section>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Add the nav entry**

In `src/components/Header.tsx`, find the RESOURCES `subItems` array (currently lines 64–70):

```tsx
        { name: 'Band Handbook', href: '/handbook' },
        { name: 'Rehearsal Schedule', href: '/schedule' },
        { name: 'Instrument Rental', href: '/instrument-rental' },
        { name: 'Forms & Documents', href: '/resources/forms' }
```

and insert one line after Instrument Rental:

```tsx
        { name: 'Band Handbook', href: '/handbook' },
        { name: 'Rehearsal Schedule', href: '/schedule' },
        { name: 'Instrument Rental', href: '/instrument-rental' },
        { name: 'Supply List', href: '/supply-list' },
        { name: 'Forms & Documents', href: '/resources/forms' }
```

Do not touch anything else in Header.tsx — it carries load-bearing comments about focus/inert behavior.

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both pass with no errors.

Then run `npm run dev`, load `http://localhost:3000/supply-list`, and check: 10 instrument cards + percussion section render; six cards show the flag-driven "School-owned — $100/year usage fee" line (Alto Sax, Oboe, Bassoon, French Horn, Euphonium, Tuba) and the percussion section shows its own hand-written Year-2 variant (this is intentional — do not add percussion to the `instruments` array); nav dropdown shows Supply List on desktop and in the mobile menu at 375px with no horizontal scroll. Stop the dev server after.

- [ ] **Step 4: Commit**

```bash
git add src/app/supply-list/page.tsx src/components/Header.tsx
git commit -m "feat: instrument supply list page, linked from RESOURCES nav

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 2: Replace the Fall Sectionals section on `/schedule`

**Files:**
- Modify: `src/app/schedule/page.tsx` (full-file replacement)

**Interfaces:**
- Consumes: routes `/calendar`, `/resources/forms` (existing).
- Produces: the corrected sectionals facts other pages link to via `/schedule`.

- [ ] **Step 1: Replace the file**

Replace the entire contents of `src/app/schedule/page.tsx` with:

```tsx
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Rehearsal Schedule",
  description:
    "Daily band class and after-school sectional times for the KMS Panther Band.",
};

/*
  Seasonal content: this grid is the FALL 2026 sectional schedule, derived
  from the Teamup calendar (the handbook p. 31 lists sectionals only
  generically). Skipped weeks and Friday make-ups are NOT mirrored here on
  purpose — the calendar is authoritative for exceptions. Update this grid
  when spring sectionals start (week of January 11, 2027).
*/
const sectionals = [
  {
    day: "Monday",
    group: "Symphonic & Concert Bands",
    instruments: "Low Brass, Sax, Flute/Oboe",
    first: "August 24",
  },
  {
    day: "Tuesday",
    group: "Symphonic & Concert Bands",
    instruments: "Trumpet, Horn, Clarinet",
    first: "August 25",
  },
  {
    day: "Wednesday",
    group: "Honor Band",
    instruments: "Low Brass, Horn, Clarinet",
    first: "August 19",
  },
  {
    day: "Thursday",
    group: "Honor Band",
    instruments: "Flute, Trumpet, Oboe/Sax",
    first: "August 20",
  },
];

export default function Schedule() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl md:text-5xl font-bold text-primary text-center mb-8">
        Rehearsal Schedule
      </h1>

      <div className="max-w-4xl mx-auto">
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Fall Sectionals</h2>
          <p className="text-gray-dark mb-6">
            Honor, Symphonic, and Concert Band students attend one sectional
            per week for their instrument. All sectionals meet{" "}
            <strong>4:00&ndash;5:00 PM</strong> in the <strong>KMS Band Hall</strong>{" "}
            and run through late October. Beginner Band students do not attend
            sectionals.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {sectionals.map((s) => (
              <div key={s.day} className="bg-primary-tint p-6 rounded-lg">
                <h3 className="font-semibold text-lg text-primary mb-1">{s.day}</h3>
                <p className="text-gray-dark font-medium mb-1">{s.group}</p>
                <p className="text-gray-dark mb-2">{s.instruments}</p>
                <p className="text-gray-dark text-sm">First sectional: {s.first}</p>
              </div>
            ))}
          </div>

          <p className="text-gray-dark mb-3">
            Some weeks are skipped and occasional Friday make-up days are
            added &mdash; the{" "}
            <Link href="/calendar" className="text-primary hover:underline font-medium">
              band calendar
            </Link>{" "}
            is the authoritative schedule, and changes are announced through
            ParentSquare. Spring sectionals begin the week of January 11, 2027.
          </p>
          <p className="text-gray-dark">
            The sectional acknowledgement form confirms you have seen this
            schedule &mdash; find it and its due date on the{" "}
            <Link href="/resources/forms" className="text-primary hover:underline font-medium">
              Forms &amp; Documents page
            </Link>
            .
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-6 text-primary">Band Class</h2>
          <div className="bg-primary-tint p-6 rounded-lg">
            <p className="text-gray-dark">
              Band meets daily as a regular class period. Placement is set by the campus
              master schedule &mdash; check your student&apos;s schedule in Skyward.
            </p>
          </div>
        </section>

        <section className="text-center bg-primary text-secondary p-8 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">
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

- [ ] **Step 2: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both pass.

Then `npm run dev`, load `/schedule`, and check: four day cards stacked at 375px (no horizontal scroll), 2×2 at desktop; the words "August 17" appear nowhere on the page; no hardcoded "August 14".

- [ ] **Step 3: Commit**

```bash
git add src/app/schedule/page.tsx
git commit -m "fix: real fall sectional grid from the band calendar, replacing wrong generic blurb

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 3: Fix the handbook Key Dates line and the future-members FAQ

**Files:**
- Modify: `src/app/handbook/page.tsx:113`
- Modify: `src/app/future-members/page.tsx` (FAQ at ~line 29, vendor-link block at ~lines 108–112)

**Interfaces:**
- Consumes: routes `/schedule` (Task 2 facts) and `/supply-list` (Task 1).

- [ ] **Step 1: Fix the handbook Key Dates line**

In `src/app/handbook/page.tsx`, replace:

```tsx
                <li>• <strong>Aug 17</strong> &mdash; Fall sectionals begin (Mon&ndash;Thu, 4:00&ndash;5:00 PM)</li>
```

with:

```tsx
                <li>
                  • <strong>Week of Aug 17</strong> &mdash; Fall sectionals begin &mdash; see the{" "}
                  <Link href="/schedule" className="text-primary hover:underline font-medium">
                    rehearsal schedule
                  </Link>
                </li>
```

(`Link` is already imported in this file.)

- [ ] **Step 2: Fix the future-members FAQ answer**

In `src/app/future-members/page.tsx`, replace the time-commitment FAQ entry:

```tsx
    {
      q: "What is the time commitment?",
      a: "Band meets daily as a regular class. Sectionals run Monday through Thursday, 4:00–5:00 PM, and each student attends the one for their instrument.",
    },
```

with:

```tsx
    {
      q: "What is the time commitment?",
      a: "Band meets daily as a regular class. Beginners have no after-school rehearsals. From the second year on, students attend one after-school sectional per week for their instrument (Monday–Thursday, 4:00–5:00 PM).",
    },
```

Leave the sports FAQ ("We build the sectional schedule expecting it") unchanged — it is about 7th/8th graders and remains true.

- [ ] **Step 3: Add the supply-list cross-link**

In the same file, in the "Choosing an Instrument" section, replace:

```tsx
          <div className="text-center mt-6">
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              See recommended music stores and rental details &rarr;
            </Link>
          </div>
```

with:

```tsx
          <div className="text-center mt-6 flex flex-col sm:flex-row gap-2 sm:gap-6 justify-center">
            <Link href="/instrument-rental" className="text-primary hover:underline font-medium">
              See recommended music stores and rental details &rarr;
            </Link>
            <Link href="/supply-list" className="text-primary hover:underline font-medium">
              See the full supply list per instrument &rarr;
            </Link>
          </div>
```

- [ ] **Step 4: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both pass.

Then `npm run dev`: `/handbook` Key Dates shows "Week of Aug 17" with a working link; `/future-members` FAQ shows the new answer and both cross-links render side-by-side on desktop, stacked at 375px.

- [ ] **Step 5: Commit**

```bash
git add src/app/handbook/page.tsx src/app/future-members/page.tsx
git commit -m "fix: reconcile handbook key dates and future-members FAQ with the real sectional schedule

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 4: Rework the beginner page paragraph and link the supply list from beginner + rental pages

**Files:**
- Modify: `src/app/ensembles/beginner/page.tsx` (the "What the Year Looks Like" section, ~lines 71–89)
- Modify: `src/app/instrument-rental/page.tsx` (School-Owned Instruments card, ~line 39)

**Interfaces:**
- Consumes: route `/supply-list` (Task 1).

- [ ] **Step 1: Rework the beginner paragraphs**

In `src/app/ensembles/beginner/page.tsx`, replace the two paragraphs of the "What the Year Looks Like" section:

```tsx
          <p className="text-gray-dark leading-relaxed mb-4">
            Beginners spend the fall on fundamentals: making a good first sound,
            reading music, and playing together as a class. By the winter and
            spring concerts, students are performing real band music on stage.
            Each instrument also has one after-school sectional per week &mdash;
            see the{" "}
            <Link href="/schedule" className="text-primary hover:underline font-medium">
              rehearsal schedule
            </Link>{" "}
            for days and times.
          </p>
          <p className="text-gray-dark leading-relaxed">
            Worried about cost or getting an instrument? Don&apos;t be &mdash;
            no student is turned away from band over cost. The{" "}
            <Link href="/future-members" className="text-primary hover:underline font-medium">
              Future Panthers page
            </Link>{" "}
            walks through instruments, fees, and payment options.
          </p>
```

with:

```tsx
          <p className="text-gray-dark leading-relaxed mb-4">
            Beginners spend the fall on fundamentals: making a good first sound,
            reading music, and playing together as a class. By the winter and
            spring concerts, students are performing real band music on stage.
            Everything happens during the school day &mdash; beginners have no
            after-school rehearsals.
          </p>
          <p className="text-gray-dark leading-relaxed">
            Worried about cost or getting an instrument? Don&apos;t be &mdash;
            no student is turned away from band over cost. The{" "}
            <Link href="/future-members" className="text-primary hover:underline font-medium">
              Future Panthers page
            </Link>{" "}
            walks through instruments, fees, and payment options, and the{" "}
            <Link href="/supply-list" className="text-primary hover:underline font-medium">
              supply list
            </Link>{" "}
            shows exactly what to buy for each instrument.
          </p>
```

Note: this removes the file's only `<Link href="/schedule">` usage but other `Link` usages remain, so the import stays.

- [ ] **Step 2: Link the supply list from the rental page**

In `src/app/instrument-rental/page.tsx`, in the School-Owned Instruments card, replace:

```tsx
                <li>• You purchase accessories only</li>
```

with:

```tsx
                <li>
                  • You purchase accessories only &mdash; see the{" "}
                  <Link href="/supply-list" className="text-primary hover:underline font-medium">
                    supply list
                  </Link>
                </li>
```

(`Link` is already imported in this file.)

- [ ] **Step 3: Verify**

Run: `npm run typecheck && npm run lint`
Expected: both pass. Lint would catch an unused `Link` import if Step 1 went wrong.

Then `npm run dev`: `/ensembles/beginner` no longer mentions sectionals and links to the supply list; `/instrument-rental` accessories bullet links to it.

- [ ] **Step 4: Commit**

```bash
git add src/app/ensembles/beginner/page.tsx src/app/instrument-rental/page.tsx
git commit -m "fix: beginners have no sectionals; cross-link the supply list

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```

---

### Task 5: Record churn notes in CLAUDE.md and run the full local gate

**Files:**
- Modify: `CLAUDE.md` (Known Gaps / Next Work section, and the directory-structure `src/app` listing)

**Interfaces:**
- Consumes: everything above; this is the release gate.

- [ ] **Step 1: Update CLAUDE.md**

In the `## Known Gaps / Next Work` section of `CLAUDE.md`, add this bullet after the "Content editing friction" bullet:

```markdown
- **Sectional grid is seasonal content.** `/schedule` shows the fall 2026
  weekly sectional grid, derived from the Teamup calendar (handbook p. 31 is
  generic). Skipped weeks and Friday make-ups are deliberately not mirrored —
  the calendar is authoritative. The grid needs a rewrite when spring
  sectionals start (week of 2027-01-11). Beginners have no sectionals
  (director-confirmed 2026-08-10) — do not reintroduce that claim; it was
  removed from /ensembles/beginner and the /future-members FAQ.
```

In the directory-structure block, update the `resources/` line's sibling listing to include the new route by changing:

```
│   ├── resources/    # forms
```

to:

```
│   ├── resources/    # forms
│   ├── supply-list/  # per-instrument models & supplies (source: supply-list Google Doc)
```

- [ ] **Step 2: Run the full local gate**

Run: `npm run typecheck && npm run lint && npm run build:cf`
Expected: all pass; build output lists every route as `○ (Static)`, including `/supply-list`.

- [ ] **Step 3: Preview the real worker**

Run: `npm run preview:cf` (background), then load `http://localhost:8787/supply-list` and `http://localhost:8787/schedule` and confirm both render. Stop the preview after.

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md
git commit -m "docs: record seasonal sectional-grid churn and supply-list route in CLAUDE.md

Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>"
```
