# AGBA Corporation — website

Next.js 16 rebuild of agbacorp.com (a Nagpur manufacturer of IS 16172:2023 parallel-thread
rebar couplers). Four public pages plus a password-protected control panel. See
[README.md](README.md) for setup, architecture and deployment.

## Next.js 16 gotchas

Turbopack is the default. `cookies()`, `headers()`, `params` and `searchParams` are **all
async** — `await` them. The `middleware.ts` convention is deprecated in favour of `proxy.ts`;
this project uses neither. Admin auth is enforced in `app/admin/(panel)/layout.tsx` via
`requireAdmin()`, and **independently** inside every server action, because a server action
is its own POST endpoint and the page guard does not protect it.

`better-sqlite3` is a native addon: it is listed in `serverExternalPackages` in
`next.config.ts` and must never be imported from a client component. Everything under
`lib/db/`, `lib/auth.ts` and `lib/storage.ts` starts with `import "server-only"`.

npm 11 gates install scripts — after a fresh `npm install`, native modules need
`npm approve-scripts better-sqlite3 sharp unrs-resolver && npm rebuild`. The approvals are
already recorded in `package.json` under `allowScripts`.

## Route layout

`app/layout.tsx` is the document shell **only** (html/body/fonts). Site chrome lives in
`app/(site)/layout.tsx` so `/admin` can have its own. Adding a public page means putting it
inside `app/(site)/`.

Public pages that read the database are `export const dynamic = "force-dynamic"` — that is
what makes control-panel edits appear without a rebuild. Do not remove it.

## Content: two places, no third

- **Static copy** → `lib/data.ts`, keyed by page. Company facts, routes and contact details
  → `lib/site.ts` (`SITE`, `ROUTES`, `NAV`, `CONTACT`, plus `waLink()`/`telLink()`/`mailLink()`
  helpers — never hand-build those URLs). Nav and footer read from here, so a phone number
  changes in one place.
- **Dynamic content** → SQLite, edited at `/admin`. Batches, documents, testimonials, the
  tutorial video, news, leads.

Never hardcode content in JSX.

## The download gate — do not weaken it

Uploads go to `data/uploads/` (**outside `public/`**) under a random 32-hex filename. The
only route that serves them is `app/api/files/[id]/route.ts`, which decides:

- batch certificates → open (traceability is the feature)
- document-library files → require the gate cookie from `hasDownloadAccess()`
- signed-in admins → everything

Hiding a button is not the boundary; the route is. If you add a new way to reach a file,
route it through there.

## Design system

All tokens are in the `@theme` block at the top of `app/globals.css`. The site is a
**light theme, ~70% white**: `--color-base` (white page), `--color-surface` (light bands),
`--color-heading` (near-black text), `--color-muted` (body grey), and the brand
`--color-red` `#d41000` lifted from the original site and the brandmark.

**Dark bands use the `.on-dark` class**, which re-declares those same tokens to their dark
values on that subtree. Anything inside — panels, text, borders, even the SVG illustrations
— inverts automatically, because everything reads from tokens rather than hardcoded hex.
To make a section dark, add `className="on-dark bg-deep"`; never hand-pick dark colours.
Three bands are dark by design; keep roughly that ratio if you add sections.

Type is Archivo (display) / Space Grotesk (UI + body) / JetBrains Mono (eyebrows, batch
numbers, all technical data — use the `.data` class).

Component classes worth reusing before writing new CSS: `.container-x`, `.eyebrow`,
`.btn` + `.btn-primary`/`.btn-ghost`, `.panel`, `.panel-hover`, `.data`, `.grid-bg`.

Icons and diagrams are **inline SVG only — never unicode or emoji symbols.** The technical
illustrations in `components/illustrations/` are hand-drawn and animate on scroll; when a
diagram is wide, wrap it in `overflow-x-auto` with a `min-w-[…]` on the SVG so it scrolls
inside its panel rather than widening the page.

`html` has `overflow-x: clip` (not `hidden`) so decorative bleed cannot widen the document
while `position: sticky` still works.

## Motion

`Reveal` / `RevealGroup` / `RevealItem` (`components/ui/Reveal.tsx`) for scroll reveals;
`useReveal` (`hooks/useReveal.ts`) has a deliberate `fallbackMs` so content is never stuck
invisible if IntersectionObserver never fires. Everything respects `useReducedMotion()`.
Buttons in `components/ui/Button.tsx` are magnetic on hover — use `ButtonLink`/`Button`
rather than a raw `<a class="btn">`, except inside server components where the plain class
is fine.

## Client decisions worth not re-litigating

- **Four pages only.** Downloads, Knowledge Center, News and the video are *sections inside*
  the four pages, not new routes.
- "Find Your Join" was renamed **Find Your Coupler** (nav), with "Batch Traceability" as the
  page eyebrow and "Verify Your Batch" as the button — all three client suggestions used.
- **Knowledge Center** is the renamed "Understanding the Code". No such section existed on
  the live site; it was written from scratch, two tabs, in `KNOWLEDGE` in `lib/data.ts`.
- **One tutorial video, linked not uploaded.** The client cut a full video gallery for
  storage reasons. `saveVideoAction` rejects anything that is not a YouTube/Vimeo URL —
  keep it that way.
- **The ISI mark slot is deliberately empty** (`kind: "reserved"` in `CERTIFICATIONS.marks`).
  AGBA's BIS licence is unconfirmed; do not draw or imply a certification mark until the
  CM/L number is supplied.
- The live site duplicates the "Machined — grain cut" card twice under *Forged Before
  Threaded*; this rebuild fixes it to the machined-vs-forged comparison it was meant to be.
- Only three photographs exist on the live site and factory photos have not been shared, so
  the hero product and every diagram are drawn as SVG. Reserved slots are commented.
