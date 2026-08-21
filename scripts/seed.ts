/**
 * Seeds the control panel with representative AGBA content so nothing renders
 * empty on first run.
 *
 *   npm run seed          add sample rows (skips if data already exists)
 *   npm run seed -- --reset   wipe every table first
 *
 * Everything created here is clearly marked as a sample. The AGBA team deletes
 * these rows from /admin once real content is uploaded.
 */

import Database from "better-sqlite3";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { SCHEMA } from "../lib/db/schema.ts";
import { makePdf } from "./make-pdf.mjs";

const ROOT = process.cwd();
const DATA_DIR = process.env.DATA_DIR?.trim() || path.join(ROOT, "data");
const UPLOAD_DIR = path.join(DATA_DIR, "uploads");

fs.mkdirSync(UPLOAD_DIR, { recursive: true });

const db = new Database(path.join(DATA_DIR, "agba.db"));
db.pragma("journal_mode = WAL");
db.pragma("foreign_keys = ON");
db.exec(SCHEMA);

const reset = process.argv.includes("--reset");

if (reset) {
  db.exec(`
    DELETE FROM batch_documents;
    DELETE FROM leads;
    DELETE FROM batches;
    DELETE FROM documents;
    DELETE FROM testimonials;
    DELETE FROM news;
    DELETE FROM files;
  `);
  // Uploaded files are orphaned by the wipe above — clear them too.
  for (const f of fs.readdirSync(UPLOAD_DIR)) {
    fs.rmSync(path.join(UPLOAD_DIR, f), { force: true });
  }
  console.log("· reset: all tables and uploads cleared");
}

const existing = (db.prepare(`SELECT COUNT(*) c FROM batches`).get() as { c: number }).c;
if (existing > 0 && !reset) {
  console.log("Database already has content — nothing seeded. Use --reset to wipe.");
  process.exit(0);
}

/* ------------------------------------------------------------------ files -- */

const insertFile = db.prepare(
  `INSERT INTO files (filename, original_name, mime, size) VALUES (?, ?, ?, ?)`,
);

function addPdf(originalName: string, title: string, lines: string[]): number {
  const buf = makePdf(title, lines);
  const filename = `${crypto.randomBytes(16).toString("hex")}.pdf`;
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buf);
  const r = insertFile.run(filename, originalName, "application/pdf", buf.length);
  return Number(r.lastInsertRowid);
}

/* -------------------------------------------------------------- documents -- */

// The Downloads library ships EMPTY on purpose. AGBA upload the real drawings,
// data sheets, guides and certificates through the control panel; seeding
// placeholder PDFs here would only have to be deleted again before launch.
// The public Downloads section renders a "documents are being prepared"
// state until the first one is published.

/* ---------------------------------------------------------------- batches -- */

const BATCHES = [
  {
    batch_no: "AGB-2503-0142",
    heat_no: "H-24118-B",
    grade: "Fe 500D",
    size_mm: "25",
    class: "Class H",
    mfg_date: "2026-03-04",
    test_date: "2026-03-07",
  },
  {
    batch_no: "AGB-2504-0187",
    heat_no: "H-24203-A",
    grade: "Fe 550D",
    size_mm: "32",
    class: "Class H",
    mfg_date: "2026-04-11",
    test_date: "2026-04-14",
  },
  {
    batch_no: "AGB-2505-0219",
    heat_no: "H-24339-C",
    grade: "Fe 500D",
    size_mm: "16",
    class: "Class L",
    mfg_date: "2026-05-02",
    test_date: "2026-05-06",
  },
  {
    batch_no: "AGB-2506-0264",
    heat_no: "H-24471-A",
    grade: "Fe 500D",
    size_mm: "40",
    class: "Class H",
    mfg_date: "2026-06-19",
    test_date: "2026-06-23",
  },
];

const insertBatch = db.prepare(
  `INSERT INTO batches
     (batch_no, heat_no, grade, size_mm, class, mfg_date, test_date, status, notes, certificate_file_id)
   VALUES (?, ?, ?, ?, ?, ?, ?, 'released', ?, ?)`,
);

for (const b of BATCHES) {
  const certId = addPdf(
    `nabl-test-certificate-${b.batch_no}.pdf`,
    `NABL Test Certificate — ${b.batch_no}`,
    [
      `Batch number:      ${b.batch_no}`,
      `Heat number:       ${b.heat_no}`,
      `Bar grade:         ${b.grade}`,
      `Bar diameter:      ${b.size_mm} mm`,
      `Coupler class:     ${b.class}`,
      `Date of manufacture: ${b.mfg_date}`,
      `Date of test:        ${b.test_date}`,
      "",
      "Tensile test:      PASS — failure in the parent bar, outside the splice.",
      "Residual slip:     PASS — within the limits for the declared class.",
      "Thread inspection: PASS — 100% go/no-go plug gauge.",
      "",
      "Tested at a NABL-accredited independent laboratory.",
      "SAMPLE PLACEHOLDER — upload the signed certificate via the control panel.",
    ],
  );

  const r = insertBatch.run(
    b.batch_no,
    b.heat_no,
    b.grade,
    b.size_mm,
    b.class,
    b.mfg_date,
    b.test_date,
    "Sample batch record — replace with production data.",
    certId,
  );
  // Related documents are attached in the control panel once the team has
  // uploaded them — there is nothing to link to on a fresh install.
}

console.log(`· ${BATCHES.length} batches seeded (each with a sample certificate)`);

/* ----------------------------------------------------------- testimonials -- */

const TESTIMONIALS = [
  {
    name: "Sample Testimonial",
    role: "Project Manager",
    company: "Sample Infrastructure Ltd",
    project: "Residential tower, Nagpur",
    quote:
      "Replace this with a real client quote from the control panel. Testimonials are stored in the database — edit, reorder or unpublish them without touching the code.",
    rating: 5,
  },
  {
    name: "Sample Testimonial",
    role: "Structural Consultant",
    company: "Sample Consulting Engineers",
    project: "Metro viaduct package",
    quote:
      "The certificate arriving with every consignment is what our QA process actually needs — traceability that stands up in an audit.",
    rating: 5,
  },
  {
    name: "Sample Testimonial",
    role: "Site Engineer",
    company: "Sample Constructions",
    project: "Industrial shed, Butibori",
    quote:
      "Slimmer coupler body made a visible difference to concrete flow in the column cages. Fewer honeycombing call-outs at strike.",
    rating: 5,
  },
  {
    name: "Sample Testimonial",
    role: "Procurement Head",
    company: "Sample Builders Pvt Ltd",
    project: "Commercial complex",
    quote:
      "Dispatch from Nagpur direct to site, with technical support on the phone when the bar schedule changed mid-pour.",
    rating: 5,
  },
];

const insertTesti = db.prepare(
  `INSERT INTO testimonials (name, role, company, project, quote, rating, published, sort)
   VALUES (?, ?, ?, ?, ?, ?, 1, ?)`,
);
TESTIMONIALS.forEach((t, i) =>
  insertTesti.run(t.name, t.role, t.company, t.project, t.quote, t.rating, i),
);
console.log(`· ${TESTIMONIALS.length} testimonials seeded`);

/* ------------------------------------------------------------------- news -- */

const NEWS = [
  {
    slug: "is-16172-2023-transition-complete",
    title: "Full production transitioned to IS 16172:2023",
    category: "Certification",
    event_date: "2026-06-02",
    location: "Butibori MIDC, Nagpur",
    excerpt:
      "Every size in the range is now manufactured, gauged and certified against the 2023 revision of the standard.",
    body: "The 2023 revision tightened the requirements around thread form and residual slip. Our entire range — Ø12 through Ø40, in both Class L and Class H — is now produced and independently tested against it, with the certificate shipping on every batch.",
  },
  {
    slug: "slim-wall-geometry-released",
    title: "25% slimmer wall geometry released across the range",
    category: "Product",
    event_date: "2026-05-14",
    location: "Nagpur",
    excerpt:
      "A 7.5 mm wall on a 32 mm bar, against a conventional 10–12 mm — engineered clearance, built to pour.",
    body: "Congested column cages are where splices fail on site, not in the lab. Reducing the coupler outside diameter from 58–62 mm down to 53 mm on a 32 mm bar restores vibrator access and clear cover at exactly the location where both are scarcest.",
  },
  {
    slug: "nabl-testing-every-batch",
    title: "NABL certificate now ships with every consignment",
    category: "Quality",
    event_date: "2026-04-08",
    location: "Nagpur",
    excerpt:
      "Independent laboratory testing on every production lot, with the signed certificate travelling with the order.",
    body: "Sampling regimes leave gaps. Every lot we release is tested at a NABL-accredited independent laboratory and the signed certificate is packed with the consignment, tied back to the heat number of the steel it was forged from.",
  },
  {
    slug: "batch-traceability-portal-live",
    title: "Batch traceability portal goes live",
    category: "Announcement",
    event_date: "2026-03-21",
    location: "agbacorp.com",
    excerpt:
      "Enter the number stamped on any AGBA coupler to trace its heat number, grade, size and test certificate.",
    body: "Every coupler is stamped at manufacture. The number on that stamp now resolves, on our website, to the steel heat it came from and the test certificate that was issued for it — mill to pour, verifiable by anyone holding the part.",
  },
  {
    slug: "capacity-expansion-butibori",
    title: "Capacity expansion at the Butibori works",
    category: "Announcement",
    event_date: "2026-02-11",
    location: "Butibori MIDC, Nagpur",
    excerpt:
      "Additional threading and gauge-inspection capacity commissioned to shorten lead times on large orders.",
    body: "New threading capacity has been commissioned at the works, with matching go/no-go inspection stations so that 100% checking keeps pace with output rather than becoming a bottleneck behind it.",
  },
  {
    slug: "engineer-sessions-mechanical-splicing",
    title: "Technical sessions on mechanical splicing for consultants",
    category: "Event",
    event_date: "2026-01-29",
    location: "Nagpur",
    excerpt:
      "Sessions for structural consultants on specifying couplers under IS 16172:2023.",
    body: "A short technical session covering when a mechanical splice is the right call, how to write it into a specification, and what to look for on the test certificate when it arrives. Contact us to arrange a session for your team.",
  },
];

const insertNews = db.prepare(
  `INSERT INTO news (slug, title, category, event_date, location, excerpt, body, published)
   VALUES (?, ?, ?, ?, ?, ?, ?, 1)`,
);
NEWS.forEach((n) =>
  insertNews.run(n.slug, n.title, n.category, n.event_date, n.location, n.excerpt, n.body),
);
console.log(`· ${NEWS.length} news items seeded`);

/* ------------------------------------------------------------------ leads -- */

db.prepare(
  `INSERT INTO leads (type, name, email, phone, company, spec, message)
   VALUES ('enquiry', 'Sample Enquiry', 'sample@example.com', '+91 00000 00000',
           'Sample Constructions', 'Fe 500D, 20-32 mm',
           'Sample row so the Leads screen is not empty. Delete it.')`,
).run();

console.log("· 1 sample lead seeded");

console.log("\nSeed complete. Start the site with `npm run dev`.");
console.log("Try batch number AGB-2504-0187 on /find-your-coupler.");
console.log("Downloads start empty — upload the real documents in /admin.\n");
