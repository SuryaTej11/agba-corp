# Deploying agbacorp.com

This site is a **Node application**, not static HTML. It runs a server on every
request (batch lookups, the gated file route, form posts, the control panel) and
keeps state in two places on disk:

```
data/agba.db      SQLite database
data/uploads/     every file uploaded through the control panel
```

Both must survive restarts and deploys. That single fact decides where it can run.

---

## Read this before picking a GoDaddy plan

GoDaddy sells several products under "hosting" and **they are not interchangeable
for this site**:

| GoDaddy product | Will this site run? |
|---|---|
| **VPS / Dedicated Server** | **Yes.** Root access, any Node version, PM2, nginx. This is the recommended path. |
| **Web Hosting (cPanel) — Deluxe / Ultimate / Maximum** | **Usually**, via cPanel's *Setup Node.js App*. Check it offers **Node 20.9 or newer** — Next.js 16 will not start below that. Constrained but workable. |
| **Web Hosting — Economy / Starter** | **No.** No Node runtime. |
| **Managed WordPress** | **No.** PHP only; it cannot execute Node at all. |
| **Website Builder** | **No.** |

If the plan on the account is one of the "No" rows, there are two honest options:

1. **Upgrade to a GoDaddy VPS**, or
2. **Keep the domain at GoDaddy and host the app elsewhere** — point an `A`
   record at a small VPS (Hetzner, DigitalOcean, Railway, Render). The domain,
   email and DNS all stay exactly where they are; only the web server moves.

> Vercel and Netlify are **not** options as-is. Their filesystems are ephemeral,
> so the database and every uploaded certificate would disappear on the next
> deploy. Moving to them would mean swapping SQLite for Postgres and `data/uploads`
> for S3 — a real change, not a config flag.

---

## Path A — VPS (recommended)

Assumes Ubuntu 22.04+ and a domain already pointing at the server's IP.

### 1. Install Node 20 LTS and PM2

```bash
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo npm install -g pm2
```

`build-essential` is required — `better-sqlite3` compiles a native binding.

### 2. Get the code onto the server

```bash
sudo mkdir -p /var/www && cd /var/www
git clone <your-repo-url> agba-corp && cd agba-corp
npm ci
npm approve-scripts better-sqlite3 sharp unrs-resolver && npm rebuild
```

### 3. Configure the environment

```bash
npm run hash-password -- "the-real-control-panel-password"
```

Put what it prints into `.env.local`, plus the live origin:

```
ADMIN_PASSWORD_HASH=scrypt$…
ADMIN_SESSION_SECRET=…
NEXT_PUBLIC_SITE_URL=https://agbacorp.com
NODE_ENV=production
```

### 4. Build, seed and start

```bash
npm run build
npm run seed        # optional: sample batches/testimonials/news to delete later
pm2 start ecosystem.config.cjs
pm2 save && pm2 startup   # run the command it prints
```

The app is now on `127.0.0.1:3009`.

### 5. nginx in front, with TLS

```nginx
server {
    server_name agbacorp.com www.agbacorp.com;

    # Uploaded certificates and drawings can be large.
    client_max_body_size 55M;

    location / {
        proxy_pass http://127.0.0.1:3009;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d agbacorp.com -d www.agbacorp.com
```

Certbot adds the HTTPS block and the HTTP→HTTPS redirect. The app already sends
HSTS, so once the certificate is live browsers will refuse plain HTTP.

### 6. Nightly backups

```bash
crontab -e
```

```
0 2 * * * cd /var/www/agba-corp && /usr/bin/npm run backup >> logs/backup.log 2>&1
```

Copy `backups/` off the server periodically — a backup that only exists on the
machine it is backing up is not a backup.

---

## Path B — GoDaddy cPanel with Node.js support

1. cPanel → **Setup Node.js App** → Create Application
   - Node version: **20.9+** (if the highest offered is 18, stop — this will not run)
   - Application root: `agba-corp`
   - Application startup file: `server.js` (see below)
2. Upload the project (Git or File Manager), excluding `node_modules` and `.next`.
3. In the app's panel, add the environment variables from step 3 above.
4. Open the app's terminal ("Run NPM Install"), then:
   ```bash
   npm run build
   ```
5. Create `server.js` in the project root — Passenger needs a script, not `next start`:

   ```js
   const next = require("next");
   const http = require("http");
   const app = next({ dev: false });
   const handle = app.getRequestHandler();
   app.prepare().then(() => {
     http.createServer((req, res) => handle(req, res))
       .listen(process.env.PORT || 3009);
   });
   ```
6. Restart the application.

Watch for on shared hosting:

- **`better-sqlite3` needs to compile.** If the build fails, the plan lacks a
  compiler and this path is dead — use Path A.
- **Disk quota.** Uploaded certificates count against it.
- **Process limits.** Shared plans kill long-running processes; the app may
  cold-start on the first request after idle.

---

## DNS at GoDaddy

In **Domain → DNS → Manage Zones** for `agbacorp.com`:

| Type | Name | Value |
|---|---|---|
| A | `@` | your server's IPv4 |
| CNAME | `www` | `agbacorp.com` |

Leave `MX` and any email records untouched — moving the website does not move email.

Propagation is usually minutes, occasionally a few hours.

---

## Launch checklist

Before announcing:

- [ ] `ADMIN_PASSWORD_HASH` regenerated — the repo ships a **development**
      password that must not reach production
- [ ] `ADMIN_SESSION_SECRET` is a fresh random value
- [ ] `NEXT_PUBLIC_SITE_URL=https://agbacorp.com` (no trailing slash)
- [ ] HTTPS live, HTTP redirects to it
- [ ] `https://agbacorp.com/robots.txt` and `/sitemap.xml` show the real domain
- [ ] `/admin` redirects to the login screen when signed out
- [ ] Sample content deleted: the four sample batches, four sample testimonials,
      six sample news items, and the sample leads
- [ ] Real batch records uploaded with their NABL certificates
- [ ] Real documents uploaded to Downloads (the section shows a "being prepared"
      state until the first one is published)
- [ ] A test enquiry submitted and confirmed visible in **Leads**
- [ ] Nightly backup cron installed and one restore tested
- [ ] Submit the sitemap in Google Search Console

Still waiting on AGBA:

- [ ] **ISI mark** — the home page slot is reserved and clearly labelled; it stays
      empty until the BIS licence and CM/L number are confirmed
- [ ] **Original logo vector** (`.ai` / `.svg` / `.eps`) to replace the
      reconstruction in `components/layout/Logo.tsx`
- [ ] **Factory photographs** for the reserved image slots

---

## Updating the site after launch

```bash
cd /var/www/agba-corp
git pull
npm ci
npm run build
pm2 restart agba
```

`data/` is never touched by a deploy — content the team has uploaded survives.
