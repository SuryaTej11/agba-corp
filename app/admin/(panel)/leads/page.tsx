import Link from "next/link";
import { Download } from "lucide-react";
import { DeleteButton } from "@/components/admin/AdminUI";
import { listLeads } from "@/lib/db/queries";
import { deleteLeadAction } from "../../actions";
import { cn, formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

const FILTERS = [
  { key: "", label: "All" },
  { key: "enquiry", label: "Enquiries" },
  { key: "download", label: "Downloads" },
  { key: "assistance", label: "Assistance" },
] as const;

export default async function LeadsPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const { type } = await searchParams;
  const leads = listLeads(type || undefined);

  return (
    <div className="max-w-6xl">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-2xl font-semibold text-heading">
            Leads
          </h1>
          <p className="mt-2 text-sm text-muted">
            Contact enquiries, document downloads and batch-assistance requests,
            newest first.
          </p>
        </div>
        <a
          href={`/admin/leads/export${type ? `?type=${type}` : ""}`}
          className="btn btn-ghost btn-sm"
        >
          <Download className="h-3.5 w-3.5" strokeWidth={2} />
          Export CSV
        </a>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {FILTERS.map((f) => {
          const on = (type ?? "") === f.key;
          return (
            <Link
              key={f.key}
              href={f.key ? `/admin/leads?type=${f.key}` : "/admin/leads"}
              className={cn(
                "data rounded-sm border px-3 py-1.5 text-[0.62rem] uppercase tracking-[0.12em] transition-colors",
                on
                  ? "border-red bg-red/12 text-heading"
                  : "border-line text-muted hover:border-line-2 hover:text-heading",
              )}
            >
              {f.label}
            </Link>
          );
        })}
      </div>

      {leads.length === 0 ? (
        <p className="panel mt-6 p-6 text-sm text-muted">
          Nothing here yet.
        </p>
      ) : (
        <div className="panel mt-6 overflow-x-auto">
          <table className="w-full min-w-[60rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {[
                  "Type",
                  "Name",
                  "Email",
                  "Phone",
                  "Company",
                  "Detail",
                  "Received",
                  "",
                ].map((h) => (
                  <th
                    key={h}
                    className="data px-4 py-3 text-[0.6rem] uppercase tracking-[0.14em] text-muted-2"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {leads.map((l) => (
                <tr key={l.id} className="align-top">
                  <td className="px-4 py-3">
                    <span className="data rounded-sm border border-red/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-red">
                      {l.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-heading">{l.name ?? "—"}</td>
                  <td className="px-4 py-3">
                    {l.email ? (
                      <a
                        href={`mailto:${l.email}`}
                        className="text-muted underline-offset-4 hover:text-red hover:underline"
                      >
                        {l.email}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    {l.phone ? (
                      <a
                        href={`tel:${l.phone.replace(/\s/g, "")}`}
                        className="data text-muted underline-offset-4 hover:text-red hover:underline"
                      >
                        {l.phone}
                      </a>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted">{l.company ?? "—"}</td>
                  <td className="max-w-sm px-4 py-3 text-muted">
                    {l.doc_title && (
                      <span className="block text-heading">{l.doc_title}</span>
                    )}
                    {l.batch_no && (
                      <span className="data block uppercase text-heading">
                        {l.batch_no}
                      </span>
                    )}
                    {l.spec && <span className="block">{l.spec}</span>}
                    {l.message && (
                      <span className="mt-1 block text-xs leading-relaxed">
                        {l.message}
                      </span>
                    )}
                    {!l.doc_title && !l.batch_no && !l.spec && !l.message && "—"}
                  </td>
                  <td className="data whitespace-nowrap px-4 py-3 text-xs text-muted-2">
                    {formatDate(l.created_at)}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <DeleteButton action={deleteLeadAction} id={l.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
