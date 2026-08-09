# Deployment Runbook — kmspantherband.org

Last verified: 2026-08-09

Covers the first deploy to Cloudflare Workers and the DNS migration from
Namecheap. Read **Step 0** before touching anything — it is the one step that can
break something other than the website.

---

## Current state (as observed 2026-08-09)

The domain resolves to Namecheap's **parking page**, not to any host. The DNS
zone has never been edited — the SOA serial `1753578494` is a Unix timestamp of
2025-07-27, the day the domain was registered.

| Record | Host | Value | Purpose |
|---|---|---|---|
| NS | — | `dns1.registrar-servers.com`, `dns2.registrar-servers.com` | Namecheap holds the zone |
| A | `@` | `192.64.119.217` | Namecheap parking (delete) |
| CNAME | `www` | `parkingpage.namecheap.com` | Namecheap parking (delete) |
| MX | `@` | `eforward1`,`eforward2`,`eforward3` (pri 10), `eforward4` (15), `eforward5` (20) `.registrar-servers.com` | Email forwarding |
| TXT | `@` | `v=spf1 include:spf.efwd.registrar-servers.com ~all` | SPF for that forwarding |

**Why the site currently reads as "unreachable":** plain HTTP returns the parking
page, but **HTTPS times out entirely** on both apex and `www` — the parking page
serves no TLS. Browsers try HTTPS first, so you get a connection error rather
than a parking page.

---

## Step 0 — Check whether email forwarding is actually in use

**Do this first. It determines whether the rest of the migration is risky or
trivial.**

Those five MX records are Namecheap **defaults**. Every domain they register gets
them whether or not forwarding was ever configured.

1. Namecheap → **Domain List** → **Manage** next to `kmspantherband.org`
2. Find the **Redirect Email** section
3. Read the forwarding rules

**If the list is empty:** nothing is being forwarded. The MX records point at a
service you never turned on. Ignore every email caution below and proceed freely.

**If there are rules:** write down each one — which `@kmspantherband.org` address
forwards to which real inbox. You will recreate them in Cloudflare Email Routing
in Step 4. **Do not skip this**, because:

> Namecheap's free Email Forwarding only works while the domain uses Namecheap's
> BasicDNS/PremiumDNS/FreeDNS. Moving nameservers to Cloudflare breaks it.
> Copying the MX records across does **not** preserve it — the forwarding service
> refuses domains that aren't on Namecheap DNS.

The failure is silent. You get no error; senders get a bounce or nothing at all,
and you find out when a parent says they emailed and never heard back.

---

## Step 1 — Deploy to Cloudflare Workers

Nothing here touches DNS. The site will be live on a `workers.dev` URL first, so
you can confirm it works before pointing the domain at it.

```bash
cd ~/projects/kmspantherband

# Local gate — all three must pass
npm run typecheck
npm run lint
npm run build:cf

# Optional but recommended: run the real worker locally
npm run preview:cf     # -> http://localhost:8787
```

Then authenticate and deploy:

```bash
npx wrangler login     # opens a browser to authorize
npm run deploy
```

**Expected first-deploy hiccup:** if this Cloudflare account has never deployed a
Worker, `wrangler` fails with *"You need to register a workers.dev subdomain."*
The remediation URL it prints (`/workers/onboarding`) **404s** in the current
dashboard. Just visit **Workers & Pages** in the Cloudflare dashboard once — that
provisions the subdomain — then re-run `npm run deploy`. One-time per account.

Verify at `https://kmspantherband.<your-subdomain>.workers.dev`. Load a few pages
and confirm the carousel images appear.

---

## Step 2 — Add the domain to Cloudflare (nameservers NOT yet changed)

A Workers **custom domain requires the DNS zone to live on Cloudflare**. This is
a hard requirement — there is no CNAME-from-elsewhere option for an apex domain.
(Cloudflare Pages supports external DNS via CNAME, but *subdomains only*; the
apex still requires the zone.)

1. Cloudflare dashboard → **Add a domain** → enter `kmspantherband.org`
2. Choose the **Free** plan
3. Cloudflare runs a **quick scan** of your existing DNS records

**Now review the scan by hand.** Cloudflare's own documentation says the scan
"is not guaranteed to find all existing DNS records," and specifically names MX
and SPF/TXT records as things to verify.

Compare what it imported against the table at the top of this document. You want:

- ✅ All five `MX` records present, with priorities 10/10/10/15/20
- ✅ The `v=spf1 include:spf.efwd.registrar-servers.com ~all` TXT record present
- ❌ Delete the parking `A` record (`192.64.119.217`)
- ❌ Delete the parking `CNAME` for `www` (`parkingpage.namecheap.com`)

Add anything the scan missed manually before continuing.

> **Why this matters:** changing nameservers is a **replacement, not a merge**.
> The instant the switch takes effect, only records present at Cloudflare exist.
> Namecheap's copy is not a fallback.

---

## Step 3 — Point Namecheap at Cloudflare's nameservers

Cloudflare gives you two nameservers (e.g. `xxx.ns.cloudflare.com`). In Namecheap:

1. **Domain List** → **Manage** next to `kmspantherband.org`
2. Stay on the **Domain** tab, find the **Nameservers** section
3. Change the dropdown from **Namecheap BasicDNS** to **Custom DNS**
4. Enter both Cloudflare nameservers, removing `dns1`/`dns2.registrar-servers.com`
5. Save (the green checkmark)

While you're on this tab: scroll to **Other Domain Settings** and set
**Parking Page** to **Turn Off**. Not strictly required once nameservers move,
but it stops Namecheap re-adding parking records if you ever move DNS back.

Propagation is usually well under an hour; Cloudflare emails you when the zone
goes active.

---

## Step 4 — Recreate email forwarding (only if Step 0 found rules)

Once the zone is active on Cloudflare:

1. Cloudflare dashboard → your domain → **Email** → **Email Routing**
2. Enable it. Cloudflare will offer to add its own MX and SPF records —
   **accept**, and let it replace the Namecheap ones. The `eforward*` records are
   dead weight now; the service behind them no longer accepts your mail.
3. Recreate each forwarding rule from Step 0 (custom address → destination)
4. Cloudflare sends a verification email to each destination inbox. **Click the
   link** — forwarding does not activate until the destination is verified.
5. Send a test message to a forwarded address and confirm it arrives.

---

## Step 5 — Attach the custom domain to the Worker

1. Cloudflare dashboard → **Workers & Pages** → **kmspantherband**
2. **Settings** → **Domains & Routes** → **Add** → **Custom domain**
3. Add `kmspantherband.org`, then repeat for `www.kmspantherband.org`

Cloudflare creates the DNS records and provisions the TLS certificate
automatically. Certificate issuance typically takes a few minutes.

> A Custom Domain cannot be created on a hostname that already has a conflicting
> CNAME record. If it refuses, check that the parking `www` CNAME from Step 2 was
> actually deleted.

---

## Step 6 — Verify

```bash
# Should return Cloudflare nameservers
dig +short NS kmspantherband.org

# Should NOT be 192.64.119.217
dig +short A kmspantherband.org
dig +short www.kmspantherband.org

# The real test — this currently times out; it must return headers
curl -sSI https://kmspantherband.org | head -3
curl -sSI https://www.kmspantherband.org | head -3

# Email records survived
dig +short MX kmspantherband.org
dig +short TXT kmspantherband.org
```

Success looks like: HTTPS returns `HTTP/2 200` instead of timing out, the apex no
longer resolves to the parking IP, and MX records exist (Cloudflare's, if you did
Step 4). Then load the site in a browser and click through a few pages.

---

## Routine updates

```bash
# after editing content
npm run typecheck && npm run lint && npm run build:cf
npm run preview:cf        # spot-check locally
npm run deploy
```

After adding photos, **always** run `npm run images:compress` before committing.
`images.unoptimized` is on, so `public/images/` is downloaded byte-for-byte with
no resize-on-request safety net.

## Rollback

```bash
npx wrangler deployments list
npx wrangler rollback <version-id>
```

The flip is instant and touches no data. There is no database, so there is
nothing else to restore.
