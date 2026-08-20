# AGBA Corporation — website

Rebuild of [agbacorp.com](https://agbacorp.com) as a Next.js application, keeping the
brand's red (`#d41000`) and type stack (Archivo / Space Grotesk / JetBrains Mono), and
adding the things the WordPress/Elementor build could not do — most importantly a control
panel the AGBA team owns.

The palette is **roughly 70% white**, with red and black as the accents, matching the
supplied brandmark. Three bands per page invert to near-black for rhythm (Forged Before
Threaded, the manufacturing process, and the closing CTA + footer); the control panel stays
dark throughout.

Still **four public pages**, as before.

## Running it

```bash
npm install
npm run seed      # sample content so nothing renders empty
npm run dev       # http://localhost:3009  (the `agba` preview config)
```

Production:

```bash
npm run build
npm start
```

Runs on any Node 20.9+ host. No third-party services, no API keys, no database server —
SQLite and the uploaded files live under `data/`.

## The four pages

| Route | What's on it |
|---|---|
| `/` | Hero · **certification brandmark strip** · **What is a Coupler?** · Forged Before Threaded · Slim Wall · Products & Services · Manufacturing Process · **Testimonials** · **News & Events** · CTA |
| `/about-us` | Story · stats · principles · **Knowledge Center (2 tabs)** · **News & Events** (full) · locations · CTA |
| `/find-your-coupler` | **Batch lookup** → certificate + related documents · traceability chain · **"Can't find your batch?" → Request Your Quote / Request Assistance** · **gated Downloads library** (empty until AGBA publish files) · CTA |
| `/contact` | Enquiry form (saves to the database) · clickable phone / email / WhatsApp / Maps · embedded map · GSTIN |

Renamed from the old site: **Find Your Join → Find Your Coupler**. The page leads with the
"Batch Traceability" eyebrow and a "Verify Your Batch" button, so all three of the names
the client suggested appear in their natural slot.

Global: floating WhatsApp button, cookie consent (declining is as easy as accepting).

## Control panel — `/admin`

Password-protected, `noindex`, absent from the sitemap.

| Section | Manages |
|---|---|
| Batches | batch/heat number, grade, size, class, dates, **certificate PDF**, related documents |
| Documents | the Downloads library — upload, categorise, publish, reorder |
| Testimonials | quote, name, role, company, project, rating, publish, order |
| News & Events | title, date, category, excerpt, body, cover image, publish |
| Leads | every enquiry, download and assistance request · CSV export |

Everything published here appears on the live site immediately — the public pages are
`force-dynamic` and read SQLite per request. No rebuild, no developer.

### Setting the password

```bash
npm run hash-password -- "your-real-password"
```

Paste both printed lines into `.env.local`. The plaintext password is never stored — only
an scrypt hash, and the session is an HMAC-signed httpOnly cookie.

**`.env.local` currently holds a temporary development password. Change it before going live.**

## Architecture

```
app/
  (site)/          the four public pages — header, footer, WhatsApp, cookie banner
  admin/           control panel: login + (panel)/ guarded routes + actions.ts
  api/
    batch/         public batch lookup
    leads/         enquiry · assistance · download gate (mints the gate cookie)
    files/[id]/    the ONLY route that serves an uploaded file
components/
  layout/  ui/  illustrations/  admin/  seo/
sections/          home/ about/ trace/ contact/ shared/
lib/
  site.ts          company facts, routes, contact details — single source of truth
  data.ts          static page copy
  db/              schema, connection, typed queries
  auth.ts  storage.ts  validation.ts  utils.ts
data/              agba.db + uploads/   ← gitignored, back these up
```

### How the download gate works

Uploads are written to `data/uploads/` — **outside `public/`** — under a random 32-hex
filename. The only way to reach one is `/api/files/[id]`, which checks:

- **batch certificates** → open. Traceability is the point, and the visitor is holding a
  coupler with the batch number stamped on it.
- **document library files** → require the name + email gate cookie.
- **signed-in admins** → everything.

So hiding the download button is not the security boundary; the route is. A guessed URL
returns 403, and the raw `data/uploads/…` path is not web-reachable at all.

### Design tokens and the light/dark split

All tokens live in the `@theme` block at the top of `app/globals.css`. Change them there to
re-theme globally.

Dark bands are not hand-coloured: they carry the `.on-dark` class, which redefines the same
token names to their dark values for that subtree. Text, panels, borders and even the SVG
diagrams invert automatically, because nothing hardcodes a hex value. To make a section
dark, add `className="on-dark bg-deep"`.

### The brandmark

`components/layout/Logo.tsx` holds a vector reconstruction of the supplied AGBA artwork —
the outlined triangle with the red inner leg, and the AGBA wordmark. It is drawn from
tokens, so one component serves both the white pages and the dark bands.

**If AGBA have the original vector file (.ai / .svg / .eps), use it instead** — an original
always beats a reconstruction for a registered mark. Drop it at `public/logo.svg` and swap
the `<svg>` bodies in that one file for an `<Image>`; nothing else references the artwork.

## Deploying

Target is a **GoDaddy VPS**. Full walkthrough in **[DEPLOY.md](DEPLOY.md)** —
server setup, nginx, TLS, DNS, backups and the launch checklist.

Short version:

```bash
npm ci && npm run build
pm2 start ecosystem.config.cjs      # or deploy/agba.service for systemd
sudo cp deploy/nginx.conf /etc/nginx/sites-available/agbacorp.com
sudo certbot --nginx -d agbacorp.com -d www.agbacorp.com
```

Updates afterwards are one command: `./deploy/deploy.sh` — it backs up `data/`,
pulls, rebuilds, restarts and waits for the site to answer before reporting
success.

**Back up `data/`.** It holds the database and every uploaded file, and it is
the only state on the server. `npm run backup` takes a consistent snapshot even
while the site is live; put it on a nightly cron.

Serverless hosts (Vercel, Netlify) will not work as-is: their filesystem is
ephemeral, so uploads and the database would vanish between deploys.

## Still outstanding

- **ISI mark** — the home page has a reserved, clearly-labelled empty slot
  (`CERTIFICATIONS.marks` in `lib/data.ts`, `kind: "reserved"`). It stays empty until BIS
  confirms the licence; a certification mark is never drawn speculatively.
- **Factory photographs** — captioned slots are reserved; the hero product and every
  technical diagram are hand-drawn SVG in the meantime.
- **Downloads** — the library ships empty and shows a "documents are being prepared"
  state. Upload the real drawings, data sheets, guides and certificates in the
  control panel under Documents.
