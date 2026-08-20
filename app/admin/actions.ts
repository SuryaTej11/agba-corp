"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  SESSION_COOKIE,
  configuredHash,
  createSessionToken,
  isAuthed,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/auth";
import {
  deleteBatch,
  deleteDocument,
  deleteLead,
  deleteNews,
  deleteTestimonial,
  setBatchDocuments,
  upsertBatch,
  upsertDocument,
  upsertNews,
  upsertTestimonial,
} from "@/lib/db/queries";
import { UploadError, saveUpload } from "@/lib/storage";
import { slugify } from "@/lib/utils";

/**
 * Server actions backing the control panel.
 *
 * Every mutating action calls `guard()` first — the panel layout also redirects
 * unauthenticated visitors, but a Server Action is a POST endpoint in its own
 * right and must not rely on the page around it for authorisation.
 */

async function guard() {
  if (!(await isAuthed())) throw new Error("Unauthorised");
}

type State = { error?: string; ok?: string };

const str = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" && v.trim() ? v.trim() : undefined;
};
const num = (fd: FormData, k: string) => {
  const v = str(fd, k);
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
};
const bool = (fd: FormData, k: string) => (fd.get(k) ? 1 : 0);

/** Public pages read the DB per request, but revalidate anyway so any route
 *  that later opts into caching still updates the moment content changes. */
function refreshPublic() {
  revalidatePath("/");
  revalidatePath("/about-us");
  revalidatePath("/find-your-coupler");
}

/* ---------------------------------------------------------------- auth -- */

export async function loginAction(
  _prev: State,
  formData: FormData,
): Promise<State> {
  const password = formData.get("password");
  if (typeof password !== "string" || !password) {
    return { error: "Enter the control-panel password." };
  }

  const hash = configuredHash();
  if (!hash) {
    return {
      error:
        "No password is configured. Run `npm run hash-password -- \"…\"` and put ADMIN_PASSWORD_HASH in .env.local.",
    };
  }

  if (!verifyPassword(password, hash)) {
    return { error: "Incorrect password." };
  }

  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(), sessionCookieOptions);
  redirect("/admin");
}

export async function logoutAction() {
  const jar = await cookies();
  jar.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

/* ------------------------------------------------------------- batches -- */

export async function saveBatchAction(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await guard();

  const batchNo = str(formData, "batch_no");
  if (!batchNo) return { error: "Batch number is required." };

  try {
    const certificateFileId = await saveUpload(formData.get("certificate"));

    const id = upsertBatch({
      id: num(formData, "id"),
      batch_no: batchNo,
      heat_no: str(formData, "heat_no"),
      grade: str(formData, "grade"),
      size_mm: str(formData, "size_mm"),
      class: str(formData, "class"),
      mfg_date: str(formData, "mfg_date"),
      test_date: str(formData, "test_date"),
      status: str(formData, "status") ?? "released",
      notes: str(formData, "notes"),
      certificate_file_id: certificateFileId,
    });

    // Related documents — the multi-select on the batch form.
    const related = formData
      .getAll("documents")
      .map((v) => Number(v))
      .filter((n) => Number.isInteger(n) && n > 0);
    setBatchDocuments(id, related);

    refreshPublic();
    return { ok: `Batch ${batchNo} saved.` };
  } catch (e) {
    if (e instanceof UploadError) return { error: e.message };
    if (String(e).includes("UNIQUE")) {
      return { error: `Batch number ${batchNo} already exists.` };
    }
    return { error: "Could not save the batch." };
  }
}

export async function deleteBatchAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) deleteBatch(id);
  refreshPublic();
  redirect("/admin/batches");
}

/* ----------------------------------------------------------- documents -- */

export async function saveDocumentAction(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await guard();

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  const editing = num(formData, "id");

  try {
    const fileId = await saveUpload(formData.get("file"));
    if (!editing && !fileId) {
      return { error: "Attach a file — a document with nothing to download is not useful." };
    }

    upsertDocument({
      id: editing,
      title,
      description: str(formData, "description"),
      category: str(formData, "category"),
      file_id: fileId,
      published: bool(formData, "published"),
      sort: num(formData, "sort") ?? 0,
    });

    refreshPublic();
    return { ok: `"${title}" saved.` };
  } catch (e) {
    if (e instanceof UploadError) return { error: e.message };
    return { error: "Could not save the document." };
  }
}

export async function deleteDocumentAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) deleteDocument(id);
  refreshPublic();
  redirect("/admin/documents");
}

/* -------------------------------------------------------- testimonials -- */

export async function saveTestimonialAction(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await guard();

  const name = str(formData, "name");
  const quote = str(formData, "quote");
  if (!name || !quote) return { error: "Name and quote are both required." };

  upsertTestimonial({
    id: num(formData, "id"),
    name,
    role: str(formData, "role"),
    company: str(formData, "company"),
    project: str(formData, "project"),
    quote,
    rating: num(formData, "rating") ?? 5,
    published: bool(formData, "published"),
    sort: num(formData, "sort") ?? 0,
  });

  refreshPublic();
  return { ok: `Testimonial from ${name} saved.` };
}

export async function deleteTestimonialAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) deleteTestimonial(id);
  refreshPublic();
  redirect("/admin/testimonials");
}

/* ---------------------------------------------------------------- news -- */

export async function saveNewsAction(
  _prev: State,
  formData: FormData,
): Promise<State> {
  await guard();

  const title = str(formData, "title");
  if (!title) return { error: "Title is required." };

  try {
    const coverFileId = await saveUpload(formData.get("cover"));

    upsertNews({
      id: num(formData, "id"),
      slug: str(formData, "slug") ?? slugify(title),
      title,
      category: str(formData, "category"),
      event_date: str(formData, "event_date"),
      location: str(formData, "location"),
      excerpt: str(formData, "excerpt"),
      body: str(formData, "body"),
      cover_file_id: coverFileId,
      published: bool(formData, "published"),
    });

    refreshPublic();
    return { ok: `"${title}" saved.` };
  } catch (e) {
    if (e instanceof UploadError) return { error: e.message };
    if (String(e).includes("UNIQUE")) {
      return { error: "Another entry already uses that URL slug." };
    }
    return { error: "Could not save the entry." };
  }
}

export async function deleteNewsAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) deleteNews(id);
  refreshPublic();
  redirect("/admin/news");
}

/* --------------------------------------------------------------- leads -- */

export async function deleteLeadAction(formData: FormData) {
  await guard();
  const id = num(formData, "id");
  if (id) deleteLead(id);
  redirect("/admin/leads");
}
