import Link from "next/link";
import { Download, FileText } from "lucide-react";
import { DeleteButton } from "@/components/admin/AdminUI";
import { getDocument, listDocuments } from "@/lib/db/queries";
import { deleteDocumentAction } from "../../actions";
import { formatBytes } from "@/lib/utils";
import { DocumentForm } from "./DocumentForm";

export const dynamic = "force-dynamic";

export default async function DocumentsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const editing = edit ? getDocument(Number(edit)) : undefined;

  const documents = listDocuments(false);
  const categories = [...new Set(documents.map((d) => d.category))];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-heading">
        Documents
      </h1>
      <p className="mt-2 text-sm text-muted">
        The Downloads library on Find Your Coupler. Every file here is released
        only after a visitor gives their name and email — which then lands in
        Leads.
      </p>

      <DocumentForm key={editing?.id ?? "new"} doc={editing} categories={categories} />

      <h2 className="mt-12 font-display text-lg font-semibold text-heading">
        Library ({documents.length})
      </h2>

      {documents.length === 0 ? (
        <p className="panel mt-4 p-6 text-sm text-muted">
          No documents yet. Add the first one above.
        </p>
      ) : (
        <div className="panel mt-4 overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Title", "Category", "File", "Downloads", "Status", ""].map((h) => (
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
              {documents.map((d) => (
                <tr key={d.id}>
                  <td className="px-4 py-3 text-heading">{d.title}</td>
                  <td className="px-4 py-3">
                    <span className="data rounded-sm border border-line px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-muted">
                      {d.category}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {d.file_id ? (
                      <a
                        href={`/api/files/${d.file_id}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
                      >
                        <FileText className="h-3.5 w-3.5" strokeWidth={1.75} />
                        {formatBytes(d.size)}
                      </a>
                    ) : (
                      <span className="text-xs text-red">missing</span>
                    )}
                  </td>
                  <td className="data px-4 py-3 text-muted">
                    <span className="inline-flex items-center gap-1.5">
                      <Download className="h-3.5 w-3.5" strokeWidth={1.75} />
                      {d.download_count}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        d.published
                          ? "data text-[0.62rem] uppercase tracking-wider text-ok"
                          : "data text-[0.62rem] uppercase tracking-wider text-muted-2"
                      }
                    >
                      {d.published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/documents?edit=${d.id}`}
                      className="mr-4 text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteDocumentAction} id={d.id} />
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
