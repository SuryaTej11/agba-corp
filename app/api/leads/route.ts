import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  DOWNLOAD_COOKIE,
  DOWNLOAD_MAX_AGE,
  DOWNLOAD_SUBJECT,
  createSignedToken,
} from "@/lib/auth";
import { insertLead } from "@/lib/db/queries";
import {
  assistanceSchema,
  downloadGateSchema,
  enquirySchema,
} from "@/lib/validation";

/**
 * Every lead the site captures lands here and becomes a row the team can read
 * in the control panel under Leads.
 *
 * `kind`:
 *   enquiry     — the contact-page form
 *   assistance  — "Can't find your batch?"
 *   download    — the Downloads access form; also mints the gate cookie
 */
export async function POST(req: Request) {
  let payload: { kind?: string; data?: unknown };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { kind, data } = payload;

  if (kind === "enquiry") {
    const parsed = enquirySchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the form." },
        { status: 400 },
      );
    }
    const v = parsed.data;
    insertLead({
      type: "enquiry",
      name: v.name,
      email: v.email,
      phone: v.phone,
      company: v.company,
      spec: v.spec,
      message: v.message,
    });
    return NextResponse.json({ ok: true });
  }

  if (kind === "assistance") {
    const parsed = assistanceSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the form." },
        { status: 400 },
      );
    }
    const v = parsed.data;
    insertLead({
      type: "assistance",
      name: v.name,
      email: v.email,
      phone: v.phone,
      batch_no: v.batchNo,
      message: v.message,
    });
    return NextResponse.json({ ok: true });
  }

  if (kind === "download") {
    const parsed = downloadGateSchema.safeParse(data);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Please check the form." },
        { status: 400 },
      );
    }
    const v = parsed.data;
    insertLead({
      type: "download",
      name: v.name,
      email: v.email,
      company: v.company,
      document_id: v.documentId ?? null,
    });

    // Unlock the document library for this visitor.
    const jar = await cookies();
    jar.set(DOWNLOAD_COOKIE, createSignedToken(DOWNLOAD_SUBJECT, DOWNLOAD_MAX_AGE), {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: DOWNLOAD_MAX_AGE,
    });

    return NextResponse.json({ ok: true, unlocked: true });
  }

  return NextResponse.json({ error: "Unknown request type." }, { status: 400 });
}
