import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getFile, incrementDownload } from "@/lib/db/queries";
import { hasDownloadAccess, isAuthed } from "@/lib/auth";
import { resolveStoredPath } from "@/lib/storage";
import fs from "node:fs";

/**
 * The ONLY route that serves uploaded files.
 *
 * Uploads live in data/uploads, outside public/, so there is no way to reach
 * one except through here — which means the download gate cannot be sidestepped
 * by guessing a URL.
 *
 * Access rules:
 *   · batch certificates      — open. Traceability is the point; the batch
 *                               number is stamped on the part in the visitor's
 *                               own hand.
 *   · document library files  — require the name+email gate cookie.
 *   · anything else (news cover images) — open, they are page furniture.
 *   · signed-in admins        — everything.
 */
export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;
  const fileId = Number(id);
  if (!Number.isInteger(fileId) || fileId <= 0) {
    return new NextResponse("Not found", { status: 404 });
  }

  const file = getFile(fileId);
  if (!file) return new NextResponse("Not found", { status: 404 });

  const admin = await isAuthed();

  // Is this file the deliverable of a published document?
  const doc = db
    .prepare(
      `SELECT id, published FROM documents WHERE file_id = ? ORDER BY id LIMIT 1`,
    )
    .get(fileId) as { id: number; published: number } | undefined;

  if (doc && !admin) {
    if (!doc.published) return new NextResponse("Not found", { status: 404 });

    if (!(await hasDownloadAccess())) {
      return NextResponse.json(
        { error: "Complete the access form to download this document." },
        { status: 403 },
      );
    }
    incrementDownload(doc.id);
  }

  const path = resolveStoredPath(file);
  if (!path) {
    return new NextResponse("File missing on disk", { status: 410 });
  }

  const stat = fs.statSync(path);
  const body = fs.readFileSync(path);

  // PDFs open inline (a certificate should just appear); everything else
  // downloads. The filename is quoted and stripped of quotes/newlines so it
  // cannot break out of the header.
  const safeName = file.original_name.replace(/["\r\n]/g, "");
  const inline = file.mime === "application/pdf" || file.mime.startsWith("image/");

  return new NextResponse(new Uint8Array(body), {
    headers: {
      "Content-Type": file.mime,
      "Content-Length": String(stat.size),
      "Content-Disposition": `${inline ? "inline" : "attachment"}; filename="${safeName}"`,
      "Cache-Control": "private, max-age=0, must-revalidate",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
