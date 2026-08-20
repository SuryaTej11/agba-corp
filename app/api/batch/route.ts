import { NextResponse } from "next/server";
import { findBatch } from "@/lib/db/queries";
import { batchLookupSchema } from "@/lib/validation";

/**
 * Public batch lookup for "Verify Your Batch".
 * Returns the batch, its certificate and any related documents the team has
 * attached to it in the control panel.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const parsed = batchLookupSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Invalid batch number." },
      { status: 400 },
    );
  }

  const batch = findBatch(parsed.data.batchNo);

  if (!batch) {
    return NextResponse.json({ found: false }, { status: 200 });
  }

  return NextResponse.json({
    found: true,
    batch: {
      batchNo: batch.batch_no,
      heatNo: batch.heat_no,
      grade: batch.grade,
      size: batch.size_mm,
      class: batch.class,
      mfgDate: batch.mfg_date,
      testDate: batch.test_date,
      status: batch.status,
      certificate: batch.certificate
        ? {
            fileId: batch.certificate.id,
            name: batch.certificate.original_name,
            size: batch.certificate.size,
          }
        : null,
      documents: batch.documents.map((d) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        fileId: d.file_id,
        size: d.size ?? null,
      })),
    },
  });
}
