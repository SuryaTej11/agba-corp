import "server-only";

import { db } from "./index";
import type {
  Batch,
  BatchWithDocs,
  DocumentRow,
  FileRow,
  Lead,
  LeadType,
  NewsItem,
  Testimonial,
} from "./types";

/* ---------------------------------------------------------------- files -- */

export function insertFile(f: Omit<FileRow, "id" | "created_at">): number {
  const r = db
    .prepare(
      `INSERT INTO files (filename, original_name, mime, size)
       VALUES (@filename, @original_name, @mime, @size)`,
    )
    .run(f);
  return Number(r.lastInsertRowid);
}

export function getFile(id: number): FileRow | undefined {
  return db.prepare(`SELECT * FROM files WHERE id = ?`).get(id) as
    | FileRow
    | undefined;
}

/* -------------------------------------------------------------- batches -- */

/**
 * Batch lookup for the public "Verify Your Batch" form.
 * `batch_no` is declared COLLATE NOCASE, so this matches case-insensitively.
 */
export function findBatch(batchNo: string): BatchWithDocs | null {
  const batch = db
    .prepare(`SELECT * FROM batches WHERE batch_no = ?`)
    .get(batchNo.trim()) as Batch | undefined;
  if (!batch) return null;

  const certificate = batch.certificate_file_id
    ? (getFile(batch.certificate_file_id) ?? null)
    : null;

  const documents = db
    .prepare(
      `SELECT d.*, f.original_name, f.mime, f.size
         FROM batch_documents bd
         JOIN documents d ON d.id = bd.document_id
         LEFT JOIN files f ON f.id = d.file_id
        WHERE bd.batch_id = ? AND d.published = 1
        ORDER BY d.sort, d.title`,
    )
    .all(batch.id) as DocumentRow[];

  return { ...batch, certificate, documents };
}

export function listBatches(): Batch[] {
  return db
    .prepare(`SELECT * FROM batches ORDER BY created_at DESC, id DESC`)
    .all() as Batch[];
}

export function getBatch(id: number): Batch | undefined {
  return db.prepare(`SELECT * FROM batches WHERE id = ?`).get(id) as
    | Batch
    | undefined;
}

export function upsertBatch(input: {
  id?: number;
  batch_no: string;
  heat_no?: string;
  grade?: string;
  size_mm?: string;
  class?: string;
  mfg_date?: string;
  test_date?: string;
  status?: string;
  notes?: string;
  certificate_file_id?: number | null;
}): number {
  const row = {
    batch_no: input.batch_no.trim(),
    heat_no: input.heat_no ?? null,
    grade: input.grade ?? null,
    size_mm: input.size_mm ?? null,
    class: input.class ?? null,
    mfg_date: input.mfg_date ?? null,
    test_date: input.test_date ?? null,
    status: input.status ?? "released",
    notes: input.notes ?? null,
    certificate_file_id: input.certificate_file_id ?? null,
  };

  if (input.id) {
    // A blank certificate on edit means "keep the existing one".
    db.prepare(
      `UPDATE batches SET
         batch_no=@batch_no, heat_no=@heat_no, grade=@grade, size_mm=@size_mm,
         class=@class, mfg_date=@mfg_date, test_date=@test_date,
         status=@status, notes=@notes,
         certificate_file_id = COALESCE(@certificate_file_id, certificate_file_id)
       WHERE id=@id`,
    ).run({ ...row, id: input.id });
    return input.id;
  }

  const r = db
    .prepare(
      `INSERT INTO batches
         (batch_no, heat_no, grade, size_mm, class, mfg_date, test_date,
          status, notes, certificate_file_id)
       VALUES
         (@batch_no, @heat_no, @grade, @size_mm, @class, @mfg_date, @test_date,
          @status, @notes, @certificate_file_id)`,
    )
    .run(row);
  return Number(r.lastInsertRowid);
}

export function deleteBatch(id: number) {
  db.prepare(`DELETE FROM batches WHERE id = ?`).run(id);
}

export function setBatchDocuments(batchId: number, documentIds: number[]) {
  const tx = db.transaction((ids: number[]) => {
    db.prepare(`DELETE FROM batch_documents WHERE batch_id = ?`).run(batchId);
    const ins = db.prepare(
      `INSERT OR IGNORE INTO batch_documents (batch_id, document_id) VALUES (?, ?)`,
    );
    for (const id of ids) ins.run(batchId, id);
  });
  tx(documentIds);
}

export function getBatchDocumentIds(batchId: number): number[] {
  return (
    db
      .prepare(`SELECT document_id FROM batch_documents WHERE batch_id = ?`)
      .all(batchId) as { document_id: number }[]
  ).map((r) => r.document_id);
}

/* ------------------------------------------------------------ documents -- */

export function listDocuments(publishedOnly = true): DocumentRow[] {
  return db
    .prepare(
      `SELECT d.*, f.original_name, f.mime, f.size
         FROM documents d
         LEFT JOIN files f ON f.id = d.file_id
        ${publishedOnly ? "WHERE d.published = 1" : ""}
        ORDER BY d.sort, d.id`,
    )
    .all() as DocumentRow[];
}

export function getDocument(id: number): DocumentRow | undefined {
  return db
    .prepare(
      `SELECT d.*, f.original_name, f.mime, f.size
         FROM documents d LEFT JOIN files f ON f.id = d.file_id
        WHERE d.id = ?`,
    )
    .get(id) as DocumentRow | undefined;
}

export function upsertDocument(input: {
  id?: number;
  title: string;
  description?: string;
  category?: string;
  file_id?: number | null;
  published?: number;
  sort?: number;
}): number {
  const row = {
    title: input.title.trim(),
    description: input.description ?? null,
    category: input.category?.trim() || "General",
    file_id: input.file_id ?? null,
    published: input.published ?? 1,
    sort: input.sort ?? 0,
  };

  if (input.id) {
    db.prepare(
      `UPDATE documents SET
         title=@title, description=@description, category=@category,
         file_id = COALESCE(@file_id, file_id),
         published=@published, sort=@sort
       WHERE id=@id`,
    ).run({ ...row, id: input.id });
    return input.id;
  }

  const r = db
    .prepare(
      `INSERT INTO documents (title, description, category, file_id, published, sort)
       VALUES (@title, @description, @category, @file_id, @published, @sort)`,
    )
    .run(row);
  return Number(r.lastInsertRowid);
}

export function deleteDocument(id: number) {
  db.prepare(`DELETE FROM documents WHERE id = ?`).run(id);
}

export function incrementDownload(id: number) {
  db.prepare(
    `UPDATE documents SET download_count = download_count + 1 WHERE id = ?`,
  ).run(id);
}

/* --------------------------------------------------------- testimonials -- */

export function listTestimonials(publishedOnly = true): Testimonial[] {
  return db
    .prepare(
      `SELECT * FROM testimonials
        ${publishedOnly ? "WHERE published = 1" : ""}
        ORDER BY sort, id DESC`,
    )
    .all() as Testimonial[];
}

export function getTestimonial(id: number): Testimonial | undefined {
  return db.prepare(`SELECT * FROM testimonials WHERE id = ?`).get(id) as
    | Testimonial
    | undefined;
}

export function upsertTestimonial(input: {
  id?: number;
  name: string;
  role?: string;
  company?: string;
  project?: string;
  quote: string;
  rating?: number;
  published?: number;
  sort?: number;
}): number {
  const row = {
    name: input.name.trim(),
    role: input.role ?? null,
    company: input.company ?? null,
    project: input.project ?? null,
    quote: input.quote.trim(),
    rating: input.rating ?? 5,
    published: input.published ?? 1,
    sort: input.sort ?? 0,
  };

  if (input.id) {
    db.prepare(
      `UPDATE testimonials SET
         name=@name, role=@role, company=@company, project=@project,
         quote=@quote, rating=@rating, published=@published, sort=@sort
       WHERE id=@id`,
    ).run({ ...row, id: input.id });
    return input.id;
  }

  const r = db
    .prepare(
      `INSERT INTO testimonials (name, role, company, project, quote, rating, published, sort)
       VALUES (@name, @role, @company, @project, @quote, @rating, @published, @sort)`,
    )
    .run(row);
  return Number(r.lastInsertRowid);
}

export function deleteTestimonial(id: number) {
  db.prepare(`DELETE FROM testimonials WHERE id = ?`).run(id);
}

/* ----------------------------------------------------------------- news -- */

export function listNews(publishedOnly = true, limit?: number): NewsItem[] {
  return db
    .prepare(
      `SELECT * FROM news
        ${publishedOnly ? "WHERE published = 1" : ""}
        ORDER BY COALESCE(event_date, created_at) DESC, id DESC
        ${limit ? `LIMIT ${Number(limit)}` : ""}`,
    )
    .all() as NewsItem[];
}

export function getNews(id: number): NewsItem | undefined {
  return db.prepare(`SELECT * FROM news WHERE id = ?`).get(id) as
    | NewsItem
    | undefined;
}

export function upsertNews(input: {
  id?: number;
  slug: string;
  title: string;
  category?: string;
  event_date?: string;
  location?: string;
  excerpt?: string;
  body?: string;
  cover_file_id?: number | null;
  published?: number;
}): number {
  const row = {
    slug: input.slug,
    title: input.title.trim(),
    category: input.category?.trim() || "News",
    event_date: input.event_date ?? null,
    location: input.location ?? null,
    excerpt: input.excerpt ?? null,
    body: input.body ?? null,
    cover_file_id: input.cover_file_id ?? null,
    published: input.published ?? 1,
  };

  if (input.id) {
    db.prepare(
      `UPDATE news SET
         slug=@slug, title=@title, category=@category, event_date=@event_date,
         location=@location, excerpt=@excerpt, body=@body,
         cover_file_id = COALESCE(@cover_file_id, cover_file_id),
         published=@published
       WHERE id=@id`,
    ).run({ ...row, id: input.id });
    return input.id;
  }

  const r = db
    .prepare(
      `INSERT INTO news
         (slug, title, category, event_date, location, excerpt, body, cover_file_id, published)
       VALUES
         (@slug, @title, @category, @event_date, @location, @excerpt, @body, @cover_file_id, @published)`,
    )
    .run(row);
  return Number(r.lastInsertRowid);
}

export function deleteNews(id: number) {
  db.prepare(`DELETE FROM news WHERE id = ?`).run(id);
}

/* ---------------------------------------------------------------- leads -- */

export function insertLead(input: {
  type: LeadType;
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  spec?: string;
  message?: string;
  document_id?: number | null;
  batch_no?: string;
}): number {
  const r = db
    .prepare(
      `INSERT INTO leads (type, name, email, phone, company, spec, message, document_id, batch_no)
       VALUES (@type, @name, @email, @phone, @company, @spec, @message, @document_id, @batch_no)`,
    )
    .run({
      type: input.type,
      name: input.name ?? null,
      email: input.email ?? null,
      phone: input.phone ?? null,
      company: input.company ?? null,
      spec: input.spec ?? null,
      message: input.message ?? null,
      document_id: input.document_id ?? null,
      batch_no: input.batch_no ?? null,
    });
  return Number(r.lastInsertRowid);
}

export function listLeads(type?: string): (Lead & { doc_title?: string })[] {
  return db
    .prepare(
      `SELECT l.*, d.title AS doc_title
         FROM leads l LEFT JOIN documents d ON d.id = l.document_id
        ${type ? "WHERE l.type = ?" : ""}
        ORDER BY l.created_at DESC, l.id DESC`,
    )
    .all(...(type ? [type] : [])) as (Lead & { doc_title?: string })[];
}

export function deleteLead(id: number) {
  db.prepare(`DELETE FROM leads WHERE id = ?`).run(id);
}

export function countsByTable() {
  const one = (sql: string) =>
    (db.prepare(sql).get() as { c: number }).c ?? 0;
  return {
    batches: one(`SELECT COUNT(*) c FROM batches`),
    documents: one(`SELECT COUNT(*) c FROM documents`),
    testimonials: one(`SELECT COUNT(*) c FROM testimonials`),
    news: one(`SELECT COUNT(*) c FROM news`),
    leads: one(`SELECT COUNT(*) c FROM leads`),
  };
}
