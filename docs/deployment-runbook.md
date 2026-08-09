# Deployment Runbook — kmspantherband.org

**Phone-friendly version:** https://claude.ai/code/artifact/650ced0c-18fd-4279-863a-4cebeee7d9a4
(private artifact — copy buttons on every pastable value, and step check-off that
survives the propagation wait). This file is the source of truth; republish the
artifact if you change it.

## ✅ COMPLETE — kmspantherband.org went live 2026-08-09

The migration is finished. **https://kmspantherband.org** and
**https://www.kmspantherband.org** both serve the site over HTTPS, and HTTP
301-redirects to HTTPS. Every UI label below was verified by driving the live
dashboards, not read from documentation.

| Step | Result |
|---|---|
| 0 · Email forwarding check | None configured — *"You haven't defined any Email Redirect yet."* |
| 1 · Deploy Worker | Version `e10acfb5`, 51 assets, 46 ms startup |
| 2 · DNSSEC off | Was already **off** — no action needed |
| 3 · Add domain to Cloudflare | Zone created, Free plan |
| 4 · Empty the zone | All 8 parked records deleted |
| 5 · Nameservers → Cloudflare | `amos.ns.cloudflare.com` · `nataly.ns.cloudflare.com` |
| 6 · Wait for Active | Propagated in **minutes**, not the 1–2 h quoted |
| 7 · Email routing | Skipped, not applicable |
| 8 · Attach custom domain | Apex + `www`; two locked `Worker`-type records created |
| 9 · Verify | All routes 200 over HTTPS |

**Certificate:** issued by Google Trust Services (Cloudflare Universal SSL),
`CN=kmspantherband.org`, valid 2026-08-09 → 2026-11-07, renews automatically.
Edge POP is DFW (Dallas), the nearest to Houston.

**Post-launch change not in the original plan:** `Always Use HTTPS` was **off**
by default, so `http://` served the site in plaintext rather than redirecting.
Enabled at **SSL/TLS → Edge Certificates → Always Use HTTPS**. Verified: HTTP now
returns `301 → https://`. The redirect-loop warning on that setting does not
apply here — the origin is the Worker itself and it issues no redirects.

From here, only the **Routine updates** section at the bottom of this document
matters. The steps below are kept as the record of how it was done and for the
next domain.

---

**Last verified: 2026-08-09.** Work top to bottom. Step 0 is the only step that
can break something other than the website, so do it first.

---

## Current state (observed 2026-08-09)

The domain points at Namecheap's **parking page**, not at any host. The zone has
never been edited — SOA serial `1753578494` is a Unix timestamp of 2025-07-27,
the day the domain was registered.

| Type | Host | Value | Fate |
|---|---|---|---|
| NS | — | `dns1.registrar-servers.com`, `dns2.registrar-servers.com` | Replaced in Step 5 |
| A | `@` | `192.64.119.217` | **Delete** (parking) |
| CNAME | `www` | `parkingpage.namecheap.com` | **Delete** (parking) |
| MX | `@` | `eforward1`, `eforward2`, `eforward3` (pri 10), `eforward4` (15), `eforward5` (20), all `.registrar-servers.com` | See Step 0 |
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | See Step 0 |

**Why it reads as "unreachable":** plain HTTP returns the parking page, but
HTTPS **times out** on both apex and `www` — the parking page serves no TLS.
Browsers try HTTPS first, so you get a connection error rather than a page.

---

## Step 0 — Does anyone actually use an @kmspantherband.org address?

> ## ✅ RESOLVED 2026-08-09 — **No.**
>
> Namecheap's **Redirect Email** section reports *"You haven't defined any Email
> Redirect yet."* No forwarding rules exist, so nothing depends on the MX or SPF
> records. **Skip Step 7 entirely**, and delete the email records in Step 4
> rather than migrating them.
>
> This removes the only genuinely risky part of the migration. The rest is just
> a website move. The procedure below is retained for the day someone does set
> up a band email address.

Those five MX records are Namecheap **defaults**. Every registered domain gets
them whether or not forwarding was ever configured. This step decides whether
the rest of the migration is risky or trivial.

Namecheap uses **two separate screens** for forwarding, and you need both:

**0a. The rules**
1. Sign in to Namecheap
2. Left sidebar → **Domain List**
3. Click **Manage** next to `kmspantherband.org`
4. You land on the **Domain** tab. Scroll to the **Redirect Email** section.
5. Read the rows. Columns are **Alias** and **Forward to**.

**0b. The switch**
1. Same page, click the **Advanced DNS** tab
2. Find the **Mail Settings** section
3. Read the dropdown value. Forwarding only functions when it is set to
   **Email Forwarding**.

### If Redirect Email is empty (or Mail Settings is not "Email Forwarding")

Nothing is being forwarded. Those MX records point at a service you never turned
on. **Skip Step 7 entirely** and ignore every email caution in this document.

### If there are rows

Write down each `Alias → Forward to` pair now. You will recreate them in Step 7,
because:

> Namecheap's free Email Forwarding is available only for domains pointed to
> **BasicDNS, PremiumDNS or FreeDNS**. Moving nameservers to Cloudflare ends it.
> Copying the MX records across does **not** preserve it — the service refuses
> domains that are not on Namecheap DNS.

The failure is silent. No error appears; senders get a bounce or nothing, and
you find out when a parent says they emailed and never heard back.

**Before you proceed, read this limitation of the replacement** (Cloudflare Email
Routing), because it may change your mind:

> "Email Routing does not support sending or replying from your Cloudflare
> domain."

Replies come from the destination inbox (`yourname@gmail.com`), not from
`director@kmspantherband.org`. If staff need to *send as* the band domain, you
need Google Workspace or a paid mail provider instead — not Email Routing.

---

## Step 1 — Deploy to Cloudflare Workers

Nothing here touches DNS. The site goes live on a `workers.dev` URL first so you
can confirm it works before pointing the domain at it.

```bash
cd ~/projects/kmspantherband

# Local gate — all three must pass before deploying
npm run typecheck
npm run lint
npm run build:cf

# Run the real worker locally and click around
npm run preview:cf          # http://localhost:8787
```

Authenticate and deploy:

```bash
npx wrangler login          # opens a browser for OAuth
npm run deploy
```

`wrangler login` prints `Attempting to login via OAuth...` and opens your
browser. If it cannot open one, copy the printed URL into a browser manually.

**On the workers.dev subdomain:** current docs say *"If you have not configured
any subdomain or domain, Wrangler will prompt you during the publish process to
set one up"* — so expect a prompt, not a hard failure. If you do hit an error,
the fix is the dashboard: **Workers & Pages** → select your Worker → **Your
subdomain** → **Change**. Docs also note transient **523 errors** on a brand-new
`workers.dev` subdomain that *"will resolve themselves"* after a minute.

Verify at `https://kmspantherband.<your-subdomain>.workers.dev`. Load several
pages and confirm the carousel photos appear.

### Optional: preview without publishing

Useful for your weekly announcement edits — upload a version, get a private URL,
and only promote it once it looks right.

```bash
npx wrangler versions upload      # returns a preview URL, does NOT go live
npx wrangler versions deploy      # promote a version to production
```

---

## Step 2 — Turn OFF DNSSEC at Namecheap

**Do not skip this.** Cloudflare's documentation is explicit:

> "If your domain uses DNSSEC, you must turn it off at your registrar before
> changing nameservers. Changing nameservers while DNSSEC is active can cause
> your domain to become unreachable."

1. Namecheap → **Domain List** → **Manage** next to `kmspantherband.org`
2. Click the **Advanced DNS** tab
3. Scroll to the **DNSSEC** section — it sits between the **HOST RECORDS** table
   and **MAIL SETTINGS**, and shows a single **Status** toggle
4. If the toggle is green / to the right it is **ON** — click to turn it off.
   If it is already grey / left, do nothing.
5. If you changed it, Namecheap says to *"wait 60 minutes for the settings to
   take effect."*

> **Checked 2026-08-09: DNSSEC was already OFF** on this domain, so this step was
> a no-op. Namecheap's docs never state the default, so look rather than assume —
> but the likely outcome is that there is nothing to do.

The toggle has no text label; identify it by the **DNSSEC** section heading.

You can re-enable DNSSEC through Cloudflare after the domain is active.

---

## Step 3 — Add the domain to Cloudflare

A Workers **custom domain requires the DNS zone to live on Cloudflare**. This is
a hard requirement:

> "You cannot create a Custom Domain on a hostname with an existing CNAME DNS
> record or on a zone you do not own."

(Cloudflare Pages allows external DNS via CNAME, but **subdomains only** — an
apex domain like `kmspantherband.org` always needs the zone.)

1. Sign in to the Cloudflare dashboard
2. Go to **Domains** (account level — direct link:
   `https://dash.cloudflare.com/?to=/:account/domains/overview`)
3. Select **Add a site**. Three options appear — **pick the first one:**

   | Option | Its description | Use it? |
   |---|---|---|
   | **Connect a domain** | *"Make your site faster, more secure, and more reliable"* | ✅ **Yes — this one** |
   | **Transfer a domain** | *"Move your domain registration to Cloudflare and save on renewals"* | ❌ No |
   | **Buy a domain** | *"Register a new domain with zero markup fees"* | ❌ No |

   > ⚠️ **"Transfer a domain" is the trap.** It sounds like what you're doing, but it
   > moves the *domain registration itself* off Namecheap — an auth code, a 60-day
   > transfer lock, and a renewal charge. You are not changing registrars. You are
   > only changing which nameservers answer for the domain, which is
   > **Connect a domain**. The registration stays at Namecheap, where you renew it.

4. Enter the apex domain, exactly:

   ```
   kmspantherband.org
   ```

5. Choose how to add your DNS records — take the automatic scan
6. Select **Continue**
7. Choose the **Free** plan

> **Docs vs. live UI:** Cloudflare's published documentation calls this entry point
> "Onboard a domain." The live dashboard says **Add a site → Connect a domain**
> (observed 2026-08-09). Trust the screen in front of you; the docs lag.

> **28-day clock:** *"If your domain is on the Free plan, it will be
> automatically deleted if it is not activated within 28 days."* Finish Step 5
> promptly.

---

## Step 4 — Empty the DNS zone

### Read this first — it explains why "delete everything" is correct

The end state for this zone, before Step 8, is **zero DNS records**. That feels
wrong, so here is why it isn't:

Every record the scan imported belongs to the old parked domain. The `A` record
points at Namecheap's parking IP. The `CNAME` points at Namecheap's parking page
and will actively **block** Step 8. The five `MX` records and the SPF `TXT`
record describe a mail service that Step 0 proved was never switched on, and
which stops working for this domain the moment nameservers move regardless.

None of it survives the migration. And you do not need to hand-build
replacements, because **Step 8 creates the records for you** — attaching the
Worker as a Custom Domain is what writes the `A`/`AAAA` records for
`kmspantherband.org` and `www`, and provisions the certificate.

So: empty zone now, Cloudflare fills it in Step 8.

### Do this — two clicks

**Verified by driving the live dashboard on 2026-08-09**, not from
documentation. Page heading is **Review your DNS records**; URL ends
`/confirm-scanned-records`.

1. Tick the **checkbox in the table header row**, immediately left of the
   **Type** column. All eight records select at once and a control bar appears
   above the table reading **8 of 8 selected · Clear selection**, with two
   buttons on the right.
2. Click the red **Delete 8 records** button. A **Delete DNS records** modal
   asks *"Are you sure you want to permanently delete 8 records?"* and requires
   you to **type `DELETE`** in a confirmation field. Type it, then click
   **Delete**. A green toast confirms *"Records successfully deleted"* and the
   table reads *"No DNS records."*
3. Click the blue **Continue to activation** button at the bottom of the page.
4. An **Add records later** modal warns *"Without DNS records, Cloudflare is
   unable to activate your site. It's best if you set up your DNS records now."*
   Click **Confirm** — this is expected, see below.

That is the entire step. It goes to Step 5.

> **On that last warning:** it is advisory, not a blocker. Zone activation
> depends on nameserver delegation, not on records. Step 8 populates the zone.
> Verified 2026-08-09 — confirming through it works exactly as intended.

### What you should be looking at

The scan finds exactly **eight** records, all belonging to the parked domain:

| Type | Content | Proxy status |
|---|---|---|
| A | `192.64.119.217` | Proxied |
| CNAME (`www`) | `parkingpage.na…` | Proxied |
| MX | `eforward5.re…` priority 20 | DNS only |
| MX | `eforward4.re…` priority 15 | DNS only |
| MX | `eforward3.re…` priority 10 | DNS only |
| MX | `eforward2.re…` priority 10 | DNS only |
| MX | `eforward1.reg…` priority 10 | DNS only |
| TXT | `"v=spf1 include:…` | DNS only |

Two things that look alarming and are not:

- **The ⚠️ triangles** beside the `A` and `CNAME` rows refer to those records
  being proxied. Both rows are being deleted, so ignore them.
- **The orange banner** — *"Our scan may have missed uncommon records or custom
  subdomains…"* — is generic advice shown to everyone. Step 0 already
  established there is nothing to preserve here.

If the scan shows something **not** in the eight rows above, stop and find out
what it is before deleting. That would be a record neither of us knew about.

### Why the per-row Actions column is inconsistent

Worth knowing, because it is what made this step confusing before the bulk path
was found: the `A` and `CNAME` rows offer a direct **Delete** link, while the
five `MX` rows and the `TXT` row offer **Edit ▶** instead, with no visible
delete. Selecting all and using **Delete 8 records** sidesteps that entirely.

### An empty zone here is intended

Cloudflare warns that activating *"without setting up the correct DNS records…
may [cause] DNS_PROBE_FINISHED_NXDOMAIN errors."* That is exactly the state you
want between now and Step 8, when attaching the Custom Domain writes the real
records and provisions the certificate. Nothing is live until nameservers change
in Step 5, and the site is not reachable today anyway.

If a band email address is ever wanted, Cloudflare Email Routing (Step 7) builds
its own MX, SPF and DKIM records from scratch.

<details>
<summary>Retained for reference — the mail records as they existed</summary>

Type `MX`, Name `kmspantherband.org`:

```
10   eforward1.registrar-servers.com
10   eforward2.registrar-servers.com
10   eforward3.registrar-servers.com
15   eforward4.registrar-servers.com
20   eforward5.registrar-servers.com
```

Type `TXT`, Name `kmspantherband.org`:

```
v=spf1 include:spf.efwd.registrar-servers.com ~all
```

</details>

---

## Step 5 — Point Namecheap at Cloudflare's nameservers

### 5a. Copy the nameservers from Cloudflare

They appear during onboarding. To find them again: open the domain and go to its
**Overview** page. You get two, formatted `<name>.ns.cloudflare.com`.

> "Copy the nameserver names directly from the Cloudflare dashboard rather than
> typing them manually. Typos such as `cloudlfare.com` or `cloudfare.com` are a
> common cause of the zone remaining in **Pending Nameserver Update** status."

### 5b. Set them at Namecheap

1. Namecheap → **Domain List** → **Manage** next to `kmspantherband.org`
2. Stay on the **Domain** tab, find the **NAMESERVERS** section
3. Open the dropdown. It offers exactly three options —
   **Namecheap BasicDNS** (current), **Namecheap Web Hosting DNS**, and
   **Custom DNS**. Choose **Custom DNS**.
4. Two empty fields appear, **Nameserver 1** and **Nameserver 2**. Type one
   Cloudflare nameserver in each. (An **ADD NAMESERVER** link below adds more
   rows; you do not need it — Cloudflare assigns exactly two.)
5. Save with the **green checkmark ✓** to the right of the dropdown — there is no
   "Save" button. A red ✗ beside it cancels.

For this domain the values were:

```
amos.ns.cloudflare.com
nataly.ns.cloudflare.com
```

> **Side effect worth knowing:** this domain also had a Namecheap
> **REDIRECT DOMAIN** rule (`kmspantherband.org → http://www.kmspantherband.org/`).
> Like email forwarding, Namecheap URL redirects only work on Namecheap
> nameservers, so it stops applying. That is fine here — Cloudflare now serves
> both the apex and `www` directly from the Worker, so no redirect is needed.
> After saving, the section replaces the rule with a note that redirects are now
> managed by your DNS provider.

Only the two Cloudflare nameservers may be listed:

> "At the registrar (or parent zone), only the assigned Cloudflare nameservers
> must be listed. Any nameservers from other DNS providers cause failure."

### 5c. Optional cleanup

While on the **Domain** tab, scroll to **Other Domain Settings** and set
**Parking Page** to **Turn Off**. Not required once nameservers move, but it
stops Namecheap re-adding parking records if DNS ever comes back.

---

## Step 6 — Wait for the zone to go Active

Namecheap says *"It may take up to 24 hours (more, in rare cases)"*; in practice
it is usually far quicker.

Cloudflare checks automatically: *"The first check occurs after 60 seconds and
the following attempts happen at gradually increased intervals."*

To request an earlier check, go to the domain's **Overview** page. While pending
it shows a panel headed **"Waiting for your registrar to propagate your new
nameservers"** — *"This typically takes 1-2 hours but may take up to 24 hours,
depending on your registrar"* — with a **Check nameservers now** button beneath
it. Clicking it responds *"Cloudflare is now checking the nameservers for
kmspantherband.org. Please wait a few hours for an update."*

You will know it worked when:

- The status on the **Domains** page changes from **Pending Nameserver Update**
  to **Active**
- Cloudflare emails you
- `dig +short NS kmspantherband.org` returns the `.ns.cloudflare.com` names

---

## Step 7 — Recreate email forwarding — ⏭️ SKIP (not applicable)

**Step 0 confirmed there are no forwarding rules**, so there is nothing to
recreate. Go straight to Step 8.

Keep this section for the day someone wants `director@kmspantherband.org` to
land in a real inbox. Note the limitation first: Email Routing forwards *inbound*
mail only and **cannot send or reply as the domain** — replies come from the
destination inbox. Sending as the band domain needs Workspace or a paid provider.

Email Routing now lives under Cloudflare Email Service.

### 7a. Onboard the domain

1. Cloudflare dashboard → **Compute** → **Email Service** → **Email Routing**
2. Select **Onboard Domain**
3. Choose `kmspantherband.org`. Cloudflare shows the DNS records it will add:
   MX records for routing, a TXT record for SPF, and a TXT record for DKIM.
4. Select **Done**

Cloudflare adds its own MX records under `*.mx.cloudflare.net` and replaces the
Namecheap `eforward*` ones. This is required and not optional:

> "Email Routing requires Cloudflare MX records · Remove or update existing MX
> records · **Cannot use Email Routing with external mail servers**"

These records become **Locked** in **DNS → Records** to prevent accidental edits.

### 7b. Verify each destination inbox

1. Go to **Compute** → **Email Service** → **Email Routing** → **Destination
   Addresses**
2. Enter the real inbox each alias should forward to and submit
3. Cloudflare emails that address. Open it and select **Verify email address**

> "Until a destination address is verified, any routing rule that points to it
> stays disabled."

### 7c. Recreate each rule

1. Go to **Compute** → **Email Service** → **Email Routing** → **Routing Rules**
2. Select **Create routing rule**
3. **Email pattern** — the local part, e.g. `director`, and pick the domain
4. **Action** — choose **Send to an email**
5. **Destination** — pick the verified address
6. Select **Save**

Repeat per alias from Step 0. Limits are generous: 200 rules per domain, 200
destination addresses per account, and inbound routing is **unlimited and free**
on the Workers Free plan.

Send a real test message to a forwarded address and confirm it lands.

---

## Step 8 — Attach the custom domain to the Worker

**The documented path is wrong.** Docs say *Settings → Domains & Routes → Add →
Custom Domain*. The live dashboard has no such section. The real path:

1. Cloudflare dashboard → **Compute** → **Workers & Pages**
2. Select the `kmspantherband` Worker
3. Click the **Domains** tab (it sits between **Observability** and **Settings**,
   *not* inside Settings)
4. Under **Custom Domains and Routes**, click **+ Add Domain**
5. A **Connect domain** modal lists the domains in your account. Click
   `kmspantherband.org`
6. A **Connect to kmspantherband.org** step appears with one field,
   **Subdomain (optional)**, labelled *"Leave empty for root domain"*
7. Click **Add domain**

Do this **twice**:

- **Apex** — leave the Subdomain field **empty**
- **www** — type `www` in the Subdomain field

> "Custom Domains do not support wildcard DNS records. An incoming request must
> exactly match the domain or subdomain your Custom Domain is registered to."
> A Worker attached to the apex will not receive `www` requests, or vice versa.

### It works while the zone is still pending

Documented prerequisites say Custom Domains need *"an active Cloudflare zone."*
In practice the domain appears in the Connect modal with a **pending** badge and
attaches fine. **Verified 2026-08-09** — both hostnames were attached with the
zone still in Pending Nameserver Update.

Cloudflare immediately creates one DNS record per hostname, visible under
**DNS → Records**:

| Name | Type | Content | Proxy status |
|---|---|---|---|
| `kmspantherband.org` | **Worker** | `kmspantherband` | Proxied |
| `www.kmspantherband.org` | **Worker** | `kmspantherband` | Proxied |

Both carry a **padlock** — they are managed by Workers and cannot be edited from
the DNS page. `Worker` is a record type specific to this mechanism; you will not
see an `A` or `CNAME`. Until the zone activates, querying Cloudflare's
nameservers directly returns only a `100::` placeholder AAAA, which is expected.

If it refuses to add the domain, the parking `www` CNAME from Step 4 was probably
not deleted.

**Ignore the DNS page's "Recommendations" notice** — *"Email cannot reach
@kmspantherband.org addresses and they could be spoofed."* That is correct and
intentional; there is no email on this domain.

---

## Step 9 — Verify

```bash
# Nameservers now Cloudflare's
dig +short NS kmspantherband.org

# No longer the parking IP
dig +short A kmspantherband.org
dig +short www.kmspantherband.org

# THE REAL TEST — this currently times out; it must return headers
curl -sSI https://kmspantherband.org | head -3
curl -sSI https://www.kmspantherband.org | head -3

# Email records (Cloudflare's, if you did Step 7)
dig +short MX kmspantherband.org
dig +short TXT kmspantherband.org
```

Success: HTTPS returns `HTTP/2 200` instead of timing out, and the apex no longer
resolves to `192.64.119.217`. Then open the site in a browser and click through.

---

## Routine updates

Weekly announcements and monthly photos:

```bash
# 1. Edit content, then compress any new photos
npm run images:compress

# 2. Local gate
npm run typecheck && npm run lint && npm run build:cf

# 3. Spot-check
npm run preview:cf

# 4. Ship
npm run deploy
```

**Always run `images:compress` after adding photos.** `images.unoptimized` is on,
so `public/images/` is downloaded byte-for-byte — there is no resize-on-request
safety net.

## Rollback

```bash
npx wrangler deployments list          # 10 most recent
npx wrangler rollback <VERSION_ID>     # omit ID to go back one version
```

> "A rollback will immediately create a new deployment with the specified version
> of your Worker and become the active deployment across all your deployed routes
> and domains."

Instant, and there is no database, so nothing else needs restoring.

## Free plan headroom

| Limit | Free plan | This site |
|---|---|---|
| Requests | 100,000/day | ~100/day expected |
| **Static asset requests** | **Free and unlimited** | all page loads and photos |
| CPU time per request | 10 ms | static assets use none |
| Worker size (gzipped) | 3 MB | ~2.3 KB |
| Static asset files | 20,000 | ~40 |
| Individual asset file | 25 MiB | largest ~496 KB |
| Builds | 500/month | ~4/month |

> "Requests to static assets are free and unlimited. Requests to the Worker
> script (for example, in the case of SSR content) are billed according to
> Workers pricing."

Since every route is prerendered static, effectively all traffic is free. The
100,000/day request cap would need roughly a thousandfold traffic increase to
matter.

---

## 2026-27 season refresh (2026-08-09)

The site launched carrying 2025-26 content. A same-day follow-up pass (12
tasks, branch `season-refresh-26-27`) brought it current: staff change
(Cooper → Chavez), handbook corrections, a `/join`/`/schedule` navigation
fix, a new `/future-members` page, and assorted fee/vendor corrections. Full
design record: `docs/superpowers/specs/2026-08-09-26-27-season-refresh-design.md`.

**Source documents, highest authority first:**

| Source | Date | Notes |
|---|---|---|
| 2026-27 Band Handbook (Google Doc) | updated 2026-08-05 | Authoritative; embedded at `/handbook`. |
| Elementary Packet — 6th Graders (PDF) | 2026-05-04 | Authoritative for beginner/vendor/fee detail. |
| Director-supplied corrections | 2026-08-09 | Overrides both where explicitly given. |
| Legacy Google Site | stale | Structure only; content verified before reuse, never trusted outright. |

**Five source inconsistencies flagged to the director — not resolved in code,**
because fixing them means editing a document outside this repo:

1. **Activity fee has two due dates in the handbook itself** — August 21 in the
   fees section, September 4 in the calendar. The site follows the calendar
   (Sept 4) for the fee and forms pages; forms besides the fee use Aug 21/14
   as the handbook states.
2. **The letter-grade rubric skips C** (100 A / 85 B / 70 D / 50 F) — looks
   like a typo. The site states the 50/50 grading split only and does not
   reproduce the rubric.
3. **The handbook sends every family to `tinyurl.com/kingmsband`**, not
   kmspantherband.org. If that tinyurl still points at the legacy Google
   Site, every family reading the new handbook lands off this site.
   **Someone with access to the tinyurl needs to repoint it here.**
4. **The "8 in 10 of our 7th & 8th graders" athletics figure is last year's**
   and unverified for 26-27. The site states the claim without a percentage
   until a current figure is supplied.
5. **Activity-fee inclusions vary by source** — the handbook lists T-shirt and
   method book; the elementary packet lists T-shirt, 1" binder, pencil
   pouch, case tag, and the method book. The site uses the packet's fuller
   list, which supersets the handbook's.

**Also flagged: the May 2026 elementary packet still lists Jenny Cooper** as a
director. It predates the Cooper → Chavez change and needs a reprint before
the next batch goes out to incoming families.

None of the above blocked this pass — each has a stated fallback on the live
site — but none of them can be fixed by another commit here. They need a
person with edit access to the handbook Google Doc, the tinyurl, and the
packet's source file.

---

## Sources

- [Cloudflare — Onboard a domain](https://developers.cloudflare.com/fundamentals/manage-domains/add-site/)
- [Cloudflare — Set up a primary zone (Full setup)](https://developers.cloudflare.com/dns/zone-setups/full-setup/setup/)
- [Cloudflare — Records quick scan](https://developers.cloudflare.com/dns/zone-setups/reference/dns-quick-scan/)
- [Cloudflare — Zone status](https://developers.cloudflare.com/dns/zone-setups/reference/domain-status/)
- [Cloudflare — Proxy status](https://developers.cloudflare.com/dns/proxy-status/)
- [Cloudflare — Workers Custom Domains](https://developers.cloudflare.com/workers/configuration/routing/custom-domains/)
- [Cloudflare — Workers limits](https://developers.cloudflare.com/workers/platform/limits/)
- [Cloudflare — Static assets billing and limitations](https://developers.cloudflare.com/workers/static-assets/billing-and-limitations/)
- [Cloudflare — Preview URLs](https://developers.cloudflare.com/workers/versions-and-deployments/preview-urls/)
- [Cloudflare — Email Service: route emails](https://developers.cloudflare.com/email-service/get-started/route-emails/)
- [Cloudflare — Email Service limits](https://developers.cloudflare.com/email-service/platform/limits/)
- [Namecheap — How to Change DNS For a Domain](https://www.namecheap.com/support/knowledgebase/article.aspx/767/10/how-can-i-change-the-nameservers-for-my-domain/)
- [Namecheap — Managing DNSSEC for domains pointed to Premium or BasicDNS](https://www.namecheap.com/support/knowledgebase/article.aspx/9723/2232/managing-dnssec-for-domains-pointed-to-premium-or-basicdns/)
- [Namecheap — How to set up Free Email Forwarding](https://www.namecheap.com/support/knowledgebase/article.aspx/308/2214/how-to-set-up-free-email-forwarding/)
