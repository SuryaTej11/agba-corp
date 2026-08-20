import Link from "next/link";
import { FileText, Paperclip } from "lucide-react";
import { DeleteButton } from "@/components/admin/AdminUI";
import {
  getBatch,
  getBatchDocumentIds,
  listBatches,
  listDocuments,
} from "@/lib/db/queries";
import { deleteBatchAction } from "../../actions";
import { formatDate } from "@/lib/utils";
import { BatchForm } from "./BatchForm";

export const dynamic = "force-dynamic";

export default async function BatchesPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const editing = edit ? getBatch(Number(edit)) : undefined;
  const relatedIds = editing ? getBatchDocumentIds(editing.id) : [];

  const batches = listBatches();
  const documents = listDocuments(false);

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-heading">Batches</h1>
      <p className="mt-2 text-sm text-muted">
        Each batch is what a site engineer finds when they enter the number
        stamped on a coupler. Upload the NABL certificate as a PDF and attach any
        related documents.
      </p>

      <BatchForm
        key={editing?.id ?? "new"}
        batch={editing}
        documents={documents}
        relatedIds={relatedIds}
      />

      <h2 className="mt-12 font-display text-lg font-semibold text-heading">
        All batches ({batches.length})
      </h2>

      {batches.length === 0 ? (
        <p className="panel mt-4 p-6 text-sm text-muted">
          No batches yet. Add the first one above.
        </p>
      ) : (
        <div className="panel mt-4 overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Batch", "Heat", "Grade / Size", "Class", "Tested", "Cert", ""].map(
                  (h) => (
                    <th
                      key={h}
                      className="data px-4 py-3 text-[0.6rem] uppercase tracking-[0.14em] text-muted-2"
                    >
                      {h}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {batches.map((b) => (
                <tr key={b.id}>
                  <td className="data px-4 py-3 font-medium uppercase text-heading">
                    {b.batch_no}
                  </td>
                  <td className="data px-4 py-3 text-muted">{b.heat_no ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">
                    {[b.grade, b.size_mm ? `Ø${b.size_mm}` : null]
                      .filter(Boolean)
                      .join(" · ") || "—"}
                  </td>
                  <td className="px-4 py-3 text-muted">{b.class ?? "—"}</td>
                  <td className="data px-4 py-3 text-xs text-muted-2">
                    {formatDate(b.test_date)}
                  </td>
                  <td className="px-4 py-3">
                    {b.certificate_file_id ? (
                      <a
                        href={`/api/files/${b.certificate_file_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-ok underline-offset-4 hover:underline"
                      >
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                        PDF
                      </a>
                    ) : (
                      <span className="text-xs text-muted-2">none</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/batches?edit=${b.id}`}
                      className="mr-4 text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteBatchAction} id={b.id} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <p className="mt-6 flex items-start gap-2 text-xs text-muted-2">
        <Paperclip className="mt-0.5 h-3.5 w-3.5 shrink-0" strokeWidth={1.75} />
        Batch certificates are public once a visitor knows the batch number —
        that is the point of traceability. Documents in the library stay behind
        the name-and-email form.
      </p>
    </div>
  );
}
