# Deployment Runbook — kmspantherband.org

**Phone-friendly version:** https://claude.ai/code/artifact/650ced0c-18fd-4279-863a-4cebeee7d9a4
(private artifact — copy buttons on every pastable value, and step check-off that
survives the propagation wait). This file is the source of truth; republish the
artifact if you change it.

**Last verified: 2026-08-09.** UI labels below were checked against current
Cloudflare and Namecheap documentation on that date, not from memory. Where a
label could not be confirmed in official docs, it is marked **[unverified]** and
described by location instead of quoted.

Work top to bottom. Step 0 is the only step that can break something other than
the website, so do it first.

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
3. Find the **DNSSEC** section
4. Look at the toggle. If it is green / to the right, it is **ON** — click it to
   turn it off. If it is already off, do nothing.
5. Namecheap says to *"wait 60 minutes for the settings to take effect."*

The toggle has no text label **[unverified]**; identify it by the **DNSSEC**
section heading. Namecheap's docs never state whether DNSSEC is on by default,
so look rather than assume.

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

## Step 4 — Review the imported records by hand

Cloudflare's scan is explicitly not exhaustive:

> "Since the quick scan is not guaranteed to find all existing DNS records, you
> need to review your records, paying special attention to the following:
> Zone apex records · Subdomain records · **Email records**"
>
> "You should always review your DNS records and manually add any missing ones
> **before changing your nameservers**."

Compare against the table at the top of this document.

**Delete these two** (parking, and the `www` CNAME will block Step 8):

| Type | Name | Content |
|---|---|---|
| A | `kmspantherband.org` | `192.64.119.217` |
| CNAME | `www` | `parkingpage.namecheap.com` |

**Also delete the email records.** Step 0 confirmed no forwarding rules exist,
so these point at a Namecheap service that will not serve this domain once the
nameservers move. Leaving them would advertise a mail route that silently
rejects everything. Delete all five `MX` records and the `v=spf1` `TXT` record.

If you later want a band email address, Cloudflare Email Routing (Step 7)
creates its own MX and SPF records from scratch.

<details>
<summary>Retained for reference — the records as they existed</summary>

Type `MX`, Name `kmspantherband.org`:

```
10   eforward1.registrar-servers.com
10   eforward2.registrar-servers.com
10   eforward3.registrar-servers.com
15   eforward4.registrar-servers.com
20   eforward5.registrar-servers.com
```

**Confirm this TXT record exists.** Type `TXT`, Name `kmspantherband.org`:

```
v=spf1 include:spf.efwd.registrar-servers.com ~all
```

</details>

**On the orange cloud:** you will see a **Proxy status** column with **Proxied**
(orange) and **DNS only** (gray). Proxying is on by default for new records. You
do not need to worry about it for email — *"Other record types (such as MX or
TXT) are always DNS-only"* and have no toggle at all.

> If you activate the domain without correct records, *"your visitors may
> experience DNS_PROBE_FINISHED_NXDOMAIN errors."*

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
2. Stay on the **Domain** tab, find the **Nameservers** section
3. Open the dropdown and change **Namecheap BasicDNS** to **Custom DNS**
4. Two input fields appear. Paste one Cloudflare nameserver per line, replacing
   `dns1.registrar-servers.com` and `dns2.registrar-servers.com`. (If you ever
   need more than two rows, there is an **Add Nameserver** control below them.)
5. Save with the **green checkmark** at the right of the section — there is no
   "Save" button

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
the following attempts happen at gradually increased intervals."* You can request
an earlier check from the domain's **Overview** page **[unverified — the button
label is not published in the docs]**.

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

1. Cloudflare dashboard → **Workers & Pages**
2. In **Overview**, select your Worker (`kmspantherband`)
3. Go to **Settings** → **Domains & Routes** → **Add** → **Custom Domain**
4. Enter the domain, then select **Add Custom Domain**

Do this **twice** — once for each hostname:

```
kmspantherband.org
```

```
www.kmspantherband.org
```

> "Custom Domains do not support wildcard DNS records. An incoming request must
> exactly match the domain or subdomain your Custom Domain is registered to."
> A Worker attached to `example.com` will not receive requests for
> `www.example.com`, and vice versa.

Cloudflare creates the DNS records and provisions the TLS certificate
automatically, usually within a few minutes. If it refuses to add the domain,
the parking `www` CNAME from Step 4 was probably not deleted.

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
