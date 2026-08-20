import "server-only";

import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";
import { SCHEMA } from "./schema";

/**
 * SQLite connection singleton.
 *
 * Next's dev server re-evaluates modules on every hot reload, which would
 * otherwise open a new file handle each time — so the instance is parked on
 * globalThis, the same trick the Prisma docs use.
 */

// These are runtime data locations, not modules. The turbopackIgnore hints stop
// the bundler tracing the whole project into the deploy manifest because it
// sees a dynamic path.join.
export const DATA_DIR = path.join(/* turbopackIgnore: true */ process.cwd(), "data");
export const UPLOAD_DIR = path.join(/* turbopackIgnore: true */ DATA_DIR, "uploads");
const DB_PATH = path.join(/* turbopackIgnore: true */ DATA_DIR, "agba.db");

declare global {
  var __agbaDb: Database.Database | undefined;
}

function connect(): Database.Database {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  db.exec(SCHEMA);
  return db;
}

export const db: Database.Database = globalThis.__agbaDb ?? connect();

if (process.env.NODE_ENV !== "production") globalThis.__agbaDb = db;
