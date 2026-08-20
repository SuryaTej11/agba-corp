import "server-only";

import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { UPLOAD_DIR } from "./db";
import { insertFile } from "./db/queries";
import type { FileRow } from "./db/types";

/**
 * Uploads live in data/uploads — deliberately OUTSIDE public/, so the only way
 * to reach a file is through app/api/files/[id], which enforces the download
 * gate. Nothing here is guessable from the browser.
 */

const MAX_BYTES = 50 * 1024 * 1024; // 50 MB

const ALLOWED = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/svg+xml",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
  "application/acad",
  "image/vnd.dwg",
  "application/octet-stream", // DWG/DXF often arrive as this
]);

export class UploadError extends Error {}

/**
 * Persists an uploaded File to disk and records it in the files table.
 * Returns the new file id, or null when no file was actually attached
 * (an empty file input posts a zero-byte File rather than nothing).
 */
export async function saveUpload(file: unknown): Promise<number | null> {
  if (!(file instanceof File) || file.size === 0) return null;

  if (file.size > MAX_BYTES) {
    throw new UploadError(
      `"${file.name}" is ${(file.size / 1024 / 1024).toFixed(1)} MB — the limit is 50 MB.`,
    );
  }

  const mime = file.type || "application/octet-stream";
  if (!ALLOWED.has(mime)) {
    throw new UploadError(`File type "${mime}" is not allowed.`);
  }

  // The stored name is a random token plus the original extension. The user's
  // filename is never used on disk, so "../../etc/passwd" is a non-issue.
  const ext = path.extname(file.name).toLowerCase().slice(0, 10);
  const safeExt = /^\.[a-z0-9]+$/.test(ext) ? ext : "";
  const filename = `${crypto.randomBytes(16).toString("hex")}${safeExt}`;

  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const buffer = Buffer.from(await file.arrayBuffer());
  // turbopackIgnore: the path is runtime data, not a module to trace
  fs.writeFileSync(path.join(/* turbopackIgnore: true */ UPLOAD_DIR, filename), buffer);

  return insertFile({
    filename,
    original_name: file.name,
    mime,
    size: file.size,
  });
}

/** Absolute path of a stored file, or null when it has gone missing on disk. */
export function resolveStoredPath(row: FileRow): string | null {
  // Defence in depth: reject anything that isn't the flat token we wrote.
  if (!/^[a-f0-9]{32}(\.[a-z0-9]+)?$/.test(row.filename)) return null;
  const full = path.join(/* turbopackIgnore: true */ UPLOAD_DIR, row.filename);
  if (!full.startsWith(UPLOAD_DIR)) return null;
  return fs.existsSync(full) ? full : null;
}

export function readStoredFile(row: FileRow): Buffer | null {
  const p = resolveStoredPath(row);
  return p ? fs.readFileSync(p) : null;
}
