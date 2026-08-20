import { requireAdminApi } from "@/lib/auth";
import { listLeads } from "@/lib/db/queries";

/** CSV export of the leads table, for the team's own follow-up. */
export async function GET(req: Request) {
  const denied = await requireAdminApi();
  if (denied) return denied;

  const type = new URL(req.url).searchParams.get("type") ?? undefined;
  const leads = listLeads(type || undefined);

  const headers = [
    "id",
    "type",
    "name",
    "email",
    "phone",
    "company",
    "spec",
    "message",
    "document",
    "batch_no",
    "received",
  ];

  // Excel treats a leading =, +, - or @ as a formula, so those cells are
  // prefixed with a quote before quoting.
  const cell = (v: unknown) => {
    let s = v == null ? "" : String(v);
    if (/^[=+\-@]/.test(s)) s = `'${s}`;
    return `"${s.replace(/"/g, '""')}"`;
  };

  const rows = leads.map((l) =>
    [
      l.id,
      l.type,
      l.name,
      l.email,
      l.phone,
      l.company,
      l.spec,
      l.message,
      l.doc_title,
      l.batch_no,
      l.created_at,
    ]
      .map(cell)
      .join(","),
  );

  const csv = [headers.join(","), ...rows].join("\r\n");
  const stamp = new Date().toISOString().slice(0, 10);

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agba-leads-${type || "all"}-${stamp}.csv"`,
    },
  });
}
