# Deploying agbacorp.com

## Where things actually stand (checked 2026-08-21)

| | |
|---|---|
| Domain registrar | **BigRock** — expires **4 Dec 2026** |
| Nameservers | **Hostinger** (`artemis` / `hermes.dns-parking.com`) |
| Web host | **Hostinger shared hosting** — LiteSpeed, PHP 8.3, hPanel, IP `82.25.125.160` |
| Current site | WordPress |

**No part of this is on GoDaddy**, and **Hostinger shared hosting cannot run
Node** — it serves PHP only. So the new site cannot go live on the server the
domain points at today. A VPS is required. The steps below work on any VPS
(Hostinger, GoDaddy, Hetzner, DigitalOcean); only the DNS step differs.

Everything below assumes root SSH on an Ubuntu 22.04+ server.

## Two ways to run it — pick one

**Render (recommended for this project).** A managed platform: connect the git
repo, it builds and deploys on every push, HTTPS is automatic, and there is no
server to patch or secure. `render.yaml` in this repo is a Blueprint — Render
reads it and creates everything in one step. **The persistent disk is what makes
this work**; it is where SQLite and the uploaded certificates live, and it
survives redeploys. Roughly $7/month plus a few cents for the disk.

**A VPS.** More control and marginally cheaper, but you own the operating
system: nginx, TLS renewal, security updates, process supervision. Full steps
are further down.

Both run the identical codebase. The only difference is `DATA_DIR` — unset on a
VPS (defaults to `./data`), set to the mount path on Render.

---

## What you are deploying

A **Node application**, not static HTML. It runs a server on every request —
batch lookups, the gated file route, form posts, the control panel — and keeps
state in two places on disk:

```
data/agba.db      SQLite database
data/uploads/     every file uploaded through the control panel
```

Neither is in git, and neither is touched by a deploy. **They are the only
things on the server that cannot be rebuilt**, so the backup step matters.

---

## 1. Prepare the server

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential nginx
sudo npm install -g pm2
node -v          # must be 20.9.0 or newer
```

`build-essential` is not optional — `better-sqlite3` compiles a native binding
during install.

## 2. Get the code onto the server

```bash
sudo mkdir -p /var/www && sudo chown -R "$USER" /var/www
cd /var/www
git clone <your-repo-url> agba-corp && cd agba-corp

npm ci
npm approve-scripts better-sqlite3 sharp unrs-resolver
npm rebuild
```

## 3. Configure the environment

```bash
npm run hash-password -- "the-real-control-panel-password"
```

Create `.env.local` with what it prints, plus the live origin:

```
ADMIN_PASSWORD_HASH=scrypt$…
ADMIN_SESSION_SECRET=…
NEXT_PUBLIC_SITE_URL=https://agbacorp.com
NODE_ENV=production
```

> The repo ships a **development** password (`agba-dev-2026-change-me`).
> It must never reach the server. Generate a new one here.

`NEXT_PUBLIC_SITE_URL` is baked in at build time and drives canonical URLs,
`robots.txt`, `sitemap.xml` and the JSON-LD — set it **before** building.

## 4. Build and start

```bash
npm run build
npm run seed              # optional sample content; skip if AGBA have real data ready
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup               # run the command it prints, so it survives a reboot
```

The app now answers on `127.0.0.1:3009`.

> Prefer systemd to PM2? `deploy/agba.service` is a drop-in alternative.
> Use one or the other, never both.

## 5. Put nginx in front and get a certificate

```bash
sudo cp deploy/nginx.conf /etc/nginx/sites-available/agbacorp.com
sudo ln -s /etc/nginx/sites-available/agbacorp.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d agbacorp.com -d www.agbacorp.com
```

Certbot adds the TLS block and the HTTP→HTTPS redirect. Install the config
**before** running certbot, or it will have nothing to rewrite.

The app sends HSTS with a two-year max-age, so once the certificate is live
browsers stop trying plain HTTP. That also means: don't enable HTTPS until the
certificate genuinely works, or you will pin visitors to a broken site.

## 6. Point the domain

DNS is served by Hostinger's nameservers, so the records are edited in
**Hostinger hPanel → Domains → DNS / Nameservers**, *not* at BigRock and not at
GoDaddy:

| Type | Name | Value |
|---|---|---|
| A | `@` | your VPS IPv4 |
| CNAME | `www` | `agbacorp.com` |

Leave `MX` and any other email records alone — moving the website does not move
email. Propagation is usually minutes.

> Do this **last**, only once the new site is confirmed working on the VPS. Until
> you change the A record, WordPress stays live and nothing is at risk.

## 7. Nightly backups

```bash
crontab -e
```

```
0 2 * * * cd /var/www/agba-corp && /usr/bin/npm run backup >> logs/backup.log 2>&1
```

`npm run backup` uses SQLite's online-backup API, so a snapshot taken while the
site is serving traffic is still consistent — a plain `cp` of a WAL-mode
database can capture a torn state.

Copy `backups/` off the server on a schedule. A backup that only lives on the
machine it is backing up is not a backup.

---

## Deploying updates

```bash
cd /var/www/agba-corp
./deploy/deploy.sh
```

That backs up `data/`, pulls, installs, rebuilds, restarts and then waits until
the site actually answers before reporting success. Content uploaded through the
control panel is never affected.

---

## Launch checklist

- [ ] `ADMIN_PASSWORD_HASH` regenerated on the server — the dev password is gone
- [ ] `ADMIN_SESSION_SECRET` is a fresh random value
- [ ] `NEXT_PUBLIC_SITE_URL=https://agbacorp.com`, no trailing slash, set before `npm run build`
- [ ] HTTPS live; `http://` redirects to it
- [ ] `https://agbacorp.com/robots.txt` and `/sitemap.xml` show the real domain
- [ ] `/admin` redirects to the login screen when signed out
- [ ] Signed in to `/admin` once and confirmed every section loads
- [ ] A test enquiry submitted from `/contact` and visible under **Leads**
- [ ] A batch number looked up on `/find-your-coupler` and its certificate opens
- [ ] `pm2 save && pm2 startup` done — the site comes back after a reboot
- [ ] Backup cron installed, and one restore tested from an archive
- [ ] Sitemap submitted in Google Search Console

### Sample content

Four sample batches, four testimonials and six news items ship with the site so
it does not look empty during review. **Delete them from the control panel
before the public launch.** The Downloads library is already empty and shows a
"documents are being prepared" state until AGBA publish the first real file.

### Still needed from AGBA

- [ ] **ISI mark** — the home-page slot is built and reserved, and stays empty
      until the BIS licence and CM/L number are confirmed
- [ ] **Original logo vector** (`.ai` / `.svg` / `.eps`) to replace the
      reconstruction in `components/layout/Logo.tsx`
- [ ] **Factory photographs** for the reserved image slots
- [ ] Real batch records and their NABL certificates
- [ ] Real drawings, data sheets, guides and certificates for Downloads

---

## Deploying on Render

1. Push this repo to GitHub.
2. Render → **New → Blueprint** → select the repo. It reads `render.yaml`.
3. Before the first deploy, set the two secrets in the Render dashboard —
   generate them locally with `npm run hash-password -- "your-password"`:
   - `ADMIN_PASSWORD_HASH`
   - `ADMIN_SESSION_SECRET`
4. Deploy. The site comes up on `agba-corp.onrender.com`.
5. Optionally seed sample content from Render's shell: `npm run seed`.
6. Render → Settings → **Custom Domain** → add `agbacorp.com` and
   `www.agbacorp.com`. Render shows the DNS records to create.
7. Add those records in **Hostinger hPanel → Domains → DNS**. TLS is issued
   automatically once they resolve.

Updates after that are just `git push`.

Two things to know about the disk: a service with a disk attached **cannot run
more than one instance** (SQLite has a single writer anyway), and deploys take a
few seconds of downtime rather than being zero-downtime. Neither matters for a
site like this.

## What will NOT work

**Vercel and Netlify.** Their filesystems are ephemeral, so the database and
every uploaded certificate would vanish on the next deploy. Using them would
mean swapping SQLite for Postgres and `data/uploads` for S3 — a real migration,
not a setting.

**Any shared/cPanel hosting**, including the current Hostinger plan. PHP only,
no Node runtime.
