# KMS Panther Band Website — Development Guide

## Project Overview
Public marketing site for the C.E. King Middle School (KMS) Panther Band program.
Audience: students (ages 11–14), parents/guardians, and community members.

Expected traffic is small — roughly 300 students plus guardians, so on the order
of **3,000 monthly visitors at the high end**, likely well under that. Update
cadence is **weekly announcements and monthly photo refreshes**; everything else
is effectively static.

**This site is deliberately outside the studio platform arc.** `~/projects/meta/README.md`
classifies it as "band marketing site — unrelated to the arc," and that is correct.
It has no students, no roster, no FERPA data, and no reason to join the Supabase
consolidation. Optimize here for *nothing to maintain*, not for capability.

## Stack
- **Framework**: Next.js `^16.2.6` (App Router) + React `^19.2.4` + TypeScript strict
- **Styling**: Tailwind CSS v4 (mobile-first)
- **Hosting**: **Cloudflare Workers via OpenNext** (`@opennextjs/cloudflare`, `wrangler`)
- **Database**: none
- **Auth**: none
- **Node**: 22.x local

All 17 routes are `○ (Static)` — prerendered at build time. There are **no API
routes and no server-side data fetching**. Keep it that way (see Decisions).

## Decisions

### D1 — Host on Cloudflare Workers, not Netlify (2026-08-09)
The original plan was Netlify. Changed because:
- Netlify was the **only platform in `~/projects` not already in production use**.
  `studio` (3 apps, 1897 commits) runs Next on Cloudflare Workers via OpenNext;
  `musicassess` runs Firebase Hosting; the frozen `checkout-app` /
  `solo-ensemble-app` ran Vercel. Netlify would have been a fourth account, a
  fourth billing model, and a fourth thing only one person knows.
- Netlify moved to **credit-based pricing**: 300 credits/month free, 15 credits
  per production deploy (flat), 20 credits/GB bandwidth, 2 credits/10K requests.
  At ~3,000 visitors plus weekly deploys the estimate landed near **220 of 300
  credits** — it fits, with no headroom for a shared-on-Facebook spike.
- Cloudflare Workers free tier: **100k requests/day, unmetered static asset
  bandwidth, 500 builds/month**. Static assets cost no CPU and no bandwidth.

Direct consequence: bandwidth stops being a budget question entirely.

### D2 — Do not build the member portal (NextAuth + Google Drive)
The original Phase 3/4 plan (NextAuth Google OAuth + Google Drive integration for
sheet music) is **cancelled**. Use a shared Google Drive folder link and an
embedded Google Calendar instead.

Reasoning:
- The district already runs Google Workspace for Education. Access control is
  solved there. Rebuilding it here buys nothing.
- Adding auth converts a free, static, unbreakable site into one with serverless
  compute, OAuth consent screens, client secrets that expire, and token refresh.
- `BeginnerTryoutFinal/LESSONS_LEARNED.md` §6 already names the cost:
  *"Single point of failure. If the builder is sick, leaves the district, or burns
  out, the entire infrastructure is inaccessible."* This site should not be added
  to that list.

Note on quota risk specifically: `solo-ensemble-app`'s load test hit the Sheets
API 60/min per-user cap and returned *"FAIL — mitigations required before event
day."* That failure came from 12 judges polling every 20–30s during a live event.
A marketing site will never produce that traffic shape, so **quota is not the
reason** to skip the portal — maintenance surface is.

### D3 — `images.unoptimized: true`, compression at source
`next.config.ts` disables Next's image optimizer. On Workers, per-request
optimization burns the **10ms CPU budget** on the free plan — the same budget
that forced Hyperdrive onto `studio/apps/beginner`. Static assets cost zero CPU.

**The tradeoff: whatever is in `public/images/` is downloaded byte-for-byte.**
There is no resize-on-request to hide an oversized file behind.

Run `npm run images:compress` after adding photos. The script (`scripts/compress-images.mjs`)
resizes to max 1600px wide and re-encodes (JPEG q82 mozjpeg / PNG level 9),
in place and idempotently. Originals are recoverable from git.

Initial pass: **16.6 MB → 3.6 MB (−79%)**. The carousel alone held nine JPEGs
averaging 1.7 MB.

### D4 — Stagewise dev toolbar removed from the bundle
`@stagewise/toolbar-next` was in `dependencies` and rendered unconditionally in
`layout.tsx`, shipping to production. A `NODE_ENV` guard was **not sufficient** —
the top-level import still produced a **708 KB client chunk**, larger than the
rest of the site combined.

It is now removed from `layout.tsx` entirely; the packages stay in
`devDependencies`. Re-enable instructions are in the comment in `layout.tsx`.
Largest client chunk after removal: **223 KB**.

## Design System

### Colors (Official School District Colors)
- **Primary**: Deep Blue `#001689` — headers and navigation
- **Secondary**: White `#FFFFFF` — text on dark backgrounds
- **Accent**: Black `#000000` — text and emphasis
- **Light Gray**: `#A4A9AD` — borders and subtle backgrounds
- **Dark Gray**: `#555759` — secondary text and muted elements

### Typography
- **Headings**: Oswald · **Body**: Inter (both via Google Fonts in `globals.css`)
- Mobile-first scaling, base 16px

## Directory Structure
```
src/
├── app/              # App Router pages (all static)
│   ├── ensembles/    # beginner, cadet, concert, honor, symphonic
│   ├── resources/    # forms
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Homepage (hero + ImageCarousel)
└── components/       # Header, Footer, ImageCarousel, ...
scripts/
└── compress-images.mjs
public/images/        # Served byte-for-byte — compress before committing
```

## Commands
```bash
npm run dev              # Dev server (Turbopack)
npm run build            # Next production build
npm run lint             # ESLint (flat config)
npm run typecheck        # tsc --noEmit
npm run images:compress  # Compress public/images in place

npm run build:cf         # OpenNext -> .open-next/
npm run preview:cf       # Run the real worker locally (localhost:8787)
npm run deploy           # Build + deploy to Cloudflare
```

**Before deploying, run the local gate:** `npm run typecheck && npm run lint && npm run build:cf`.
Then `npm run preview:cf` and load a page. This mirrors the studio charter's rule
that the local gate is authoritative.

## Deployment
See **`docs/deployment-runbook.md`** for the full DNS and Cloudflare walkthrough,
including the Namecheap email-forwarding trap.

Short version: `npm run deploy` publishes to Cloudflare. DNS for
`kmspantherband.org` must be on Cloudflare nameservers for a Workers custom
domain — this is not optional, and it has an email side effect.

## Standing Caveats (never prune)

1. **Namecheap free Email Forwarding dies when nameservers leave Namecheap.**
   It only works on BasicDNS/PremiumDNS/FreeDNS. Copying the five
   `eforward*.registrar-servers.com` MX records into Cloudflare does **not**
   preserve it — the service itself refuses domains not using Namecheap DNS.
   Replacement is Cloudflare Email Routing (free). Confirm whether any
   `@kmspantherband.org` forwarding rule is actually in use before worrying:
   Namecheap → Domain List → Manage → **Redirect Email**.

2. **DNS nameserver changes are a replacement, not a merge.** The moment
   nameservers flip, only records present at the new provider exist. Cloudflare's
   import scan is documented as *"not guaranteed to find all existing DNS
   records."* Verify MX and TXT by hand before flipping.

3. **`next lint` was removed in Next 16**, and the Next 15 `FlatCompat` +
   `compat.extends("next/core-web-vitals")` shim throws a circular-reference
   error against v16's configs. `eslint.config.mjs` imports the flat arrays from
   `eslint-config-next/core-web-vitals` and `/typescript` directly.

4. **Never introduce `NEXT_PUBLIC_*` variables here.** Next inlines them at build
   time from `.env*`, which is what baked a local Supabase URL into the
   soloensemble spike's first Cloudflare deploy. This site currently has zero env
   vars — that is a feature.

5. **OpenNext has no zero-config path.** `open-next.config.ts` must exist even if
   it is just `defineCloudflareConfig({})`.

6. **First deploy on a fresh Cloudflare account.** Current Cloudflare docs say
   Wrangler *prompts* you to set up a `workers.dev` subdomain during publish, so
   expect a prompt rather than a hard failure. The soloensemble spike hit an
   older path where it errored and the CLI's remediation URL 404'd — if that
   happens, fix it at Workers & Pages → your Worker → **Your subdomain** →
   **Change**. Docs also note transient 523 errors on a brand-new subdomain that
   resolve on their own.

7. **DNSSEC must be turned off at Namecheap before changing nameservers.**
   Cloudflare: *"Changing nameservers while DNSSEC is active can cause your
   domain to become unreachable."* It lives on Namecheap's **Advanced DNS** tab
   under the **DNSSEC** section. Re-enable through Cloudflare after activation.

8. **Cloudflare Email Routing cannot send or reply *as* the domain.** Replies
   come from the destination inbox. It also *"cannot be used with external mail
   servers"* — it requires Cloudflare's own MX records. If staff ever need to
   send as `@kmspantherband.org`, that needs Workspace or a paid mail provider,
   not Email Routing.

9. **`*:Zone.Identifier` files** are WSL/NTFS metadata. Nine were committed and
   have been removed; `.gitignore` now blocks them. They would otherwise upload
   as static assets.

## Known Gaps / Next Work
- **Content editing friction.** Announcements are hardcoded in `.tsx`, so a
  weekly update is a commit and a deploy. Embedding the Google Calendar handles
  the highest-churn content. Worth solving before November.
- **Dev-dependency audit warnings.** `npm audit` reports ReDoS/DoS advisories in
  ESLint's transitive tree (ajv, brace-expansion, flatted, js-yaml, minimatch).
  All dev-only build tooling, none shipped to visitors.

## Accessibility & Performance Targets
- WCAG 2.1 AA; semantic HTML; keyboard navigation; 4.5:1 contrast minimum
- Touch targets ≥ 44px
- Lighthouse > 90; FCP < 1.5s; TTI < 3.5s
