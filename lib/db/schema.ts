/**
 * AGBA Corporation — control-panel schema.
 *
 * Kept as a TS string rather than a .sql file on purpose: it is then part of
 * the compiled server bundle and cannot go missing in a standalone deploy.
 * Applied idempotently on the first DB connection (see ./index.ts).
 */
export const SCHEMA = /* sql */ `
PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

-- Every physical upload lands here first; content tables reference it.
-- \`filename\` is the on-disk name inside data/uploads — a random token, so an
-- uploaded name can never traverse the filesystem or be guessed by a visitor.
CREATE TABLE IF NOT EXISTS files (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  filename      TEXT NOT NULL UNIQUE,
  original_name TEXT NOT NULL,
  mime          TEXT NOT NULL,
  size          INTEGER NOT NULL DEFAULT 0,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Batch traceability. One row per production lot; the certificate PDF the
-- team uploads is the proof a site engineer sees after a lookup.
CREATE TABLE IF NOT EXISTS batches (
  id                  INTEGER PRIMARY KEY AUTOINCREMENT,
  batch_no            TEXT NOT NULL UNIQUE COLLATE NOCASE,
  heat_no             TEXT,
  grade               TEXT,
  size_mm             TEXT,
  class               TEXT,
  mfg_date            TEXT,
  test_date           TEXT,
  status              TEXT NOT NULL DEFAULT 'released',
  notes               TEXT,
  certificate_file_id INTEGER REFERENCES files(id) ON DELETE SET NULL,
  created_at          TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Downloadable documents. The public listing is gated behind a name+email form.
CREATE TABLE IF NOT EXISTS documents (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  title          TEXT NOT NULL,
  description    TEXT,
  category       TEXT NOT NULL DEFAULT 'General',
  file_id        INTEGER REFERENCES files(id) ON DELETE SET NULL,
  download_count INTEGER NOT NULL DEFAULT 0,
  published      INTEGER NOT NULL DEFAULT 1,
  sort           INTEGER NOT NULL DEFAULT 0,
  created_at     TEXT NOT NULL DEFAULT (datetime('now'))
);

-- "Related documents should be visible in the control panel" — a batch can
-- carry any number of extra documents beyond its certificate.
CREATE TABLE IF NOT EXISTS batch_documents (
  batch_id    INTEGER NOT NULL REFERENCES batches(id) ON DELETE CASCADE,
  document_id INTEGER NOT NULL REFERENCES documents(id) ON DELETE CASCADE,
  PRIMARY KEY (batch_id, document_id)
);

CREATE TABLE IF NOT EXISTS testimonials (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  name       TEXT NOT NULL,
  role       TEXT,
  company    TEXT,
  project    TEXT,
  quote      TEXT NOT NULL,
  rating     INTEGER NOT NULL DEFAULT 5,
  published  INTEGER NOT NULL DEFAULT 1,
  sort       INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- News & events shown on the home page and in full on About Us.
CREATE TABLE IF NOT EXISTS news (
  id            INTEGER PRIMARY KEY AUTOINCREMENT,
  slug          TEXT NOT NULL UNIQUE,
  title         TEXT NOT NULL,
  category      TEXT NOT NULL DEFAULT 'News',
  event_date    TEXT,
  location      TEXT,
  excerpt       TEXT,
  body          TEXT,
  cover_file_id INTEGER REFERENCES files(id) ON DELETE SET NULL,
  published     INTEGER NOT NULL DEFAULT 1,
  created_at    TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Every captured lead, whatever the source.
-- \`type\` is 'download' | 'enquiry' | 'assistance' | 'quote'.
CREATE TABLE IF NOT EXISTS leads (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  type        TEXT NOT NULL,
  name        TEXT,
  email       TEXT,
  phone       TEXT,
  company     TEXT,
  spec        TEXT,
  message     TEXT,
  document_id INTEGER REFERENCES documents(id) ON DELETE SET NULL,
  batch_no    TEXT,
  created_at  TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_documents_pub ON documents(published, sort);
CREATE INDEX IF NOT EXISTS idx_news_pub      ON news(published, event_date DESC);
CREATE INDEX IF NOT EXISTS idx_testi_pub     ON testimonials(published, sort);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at DESC);
`;
