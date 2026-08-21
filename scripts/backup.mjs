#!/usr/bin/env node
/**
 * Backs up everything that cannot be rebuilt from the repo: the SQLite
 * database and every file uploaded through the control panel.
 *
 *   npm run backup                  → ./backups/agba-YYYY-MM-DD-HHmm.tar.gz
 *   npm run backup -- /some/where   → writes there instead
 *
 * Uses SQLite's online backup API rather than copying the file, so a backup
 * taken while the site is serving traffic is still consistent (a plain `cp`
 * of a WAL-mode database can capture a torn state).
 *
 * Put it on a cron:
 *   0 2 * * *  cd /path/to/agba-corp && /usr/bin/npm run backup >> logs/backup.log 2>&1
 */
import Database from "better-sqlite3";
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const dataDir = process.env.DATA_DIR?.trim() || path.join(root, "data");
const dbPath = path.join(dataDir, "agba.db");
const outDir = process.argv[2] || path.join(root, "backups");

if (!fs.existsSync(dbPath)) {
  console.error(`No database at ${dbPath} — nothing to back up.`);
  process.exit(1);
}

fs.mkdirSync(outDir, { recursive: true });

const stamp = new Date()
  .toISOString()
  .replace(/[:T]/g, "-")
  .slice(0, 16);
const staging = fs.mkdtempSync(path.join(outDir, ".staging-"));

try {
  // Consistent snapshot of the database, even under live writes.
  const db = new Database(dbPath, { readonly: true });
  await db.backup(path.join(staging, "agba.db"));
  db.close();

  // Uploaded files.
  const uploads = path.join(dataDir, "uploads");
  if (fs.existsSync(uploads)) {
    fs.cpSync(uploads, path.join(staging, "uploads"), { recursive: true });
  }

  const archive = path.join(outDir, `agba-${stamp}.tar.gz`);
  execFileSync("tar", ["-czf", archive, "-C", staging, "."]);

  const mb = (fs.statSync(archive).size / 1024 / 1024).toFixed(2);
  console.log(`Backup written: ${archive} (${mb} MB)`);
} finally {
  fs.rmSync(staging, { recursive: true, force: true });
}
