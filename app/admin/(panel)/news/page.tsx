import Link from "next/link";
import { DeleteButton } from "@/components/admin/AdminUI";
import { getNews, listNews } from "@/lib/db/queries";
import { deleteNewsAction } from "../../actions";
import { formatDate } from "@/lib/utils";
import { NewsForm } from "./NewsForm";

export const dynamic = "force-dynamic";

export default async function NewsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const editing = edit ? getNews(Number(edit)) : undefined;
  const items = listNews(false);

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-heading">
        News &amp; Events
      </h1>
      <p className="mt-2 text-sm text-muted">
        The latest three appear on the home page; the full list is on About Us.
        Sorted by event date, newest first.
      </p>

      <NewsForm key={editing?.id ?? "new"} item={editing} />

      <h2 className="mt-12 font-display text-lg font-semibold text-heading">
        All entries ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="panel mt-4 p-6 text-sm text-muted">
          Nothing yet. Add the first entry above.
        </p>
      ) : (
        <div className="panel mt-4 overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead>
              <tr className="border-b border-line">
                {["Title", "Category", "Date", "Status", ""].map((h) => (
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
              {items.map((n) => (
                <tr key={n.id}>
                  <td className="px-4 py-3 text-heading">{n.title}</td>
                  <td className="px-4 py-3">
                    <span className="data rounded-sm border border-line px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-muted">
                      {n.category}
                    </span>
                  </td>
                  <td className="data px-4 py-3 text-xs text-muted-2">
                    {formatDate(n.event_date)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={
                        n.published
                          ? "data text-[0.62rem] uppercase tracking-wider text-ok"
                          : "data text-[0.62rem] uppercase tracking-wider text-muted-2"
                      }
                    >
                      {n.published ? "Live" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Link
                      href={`/admin/news?edit=${n.id}`}
                      className="mr-4 text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
                    >
                      Edit
                    </Link>
                    <DeleteButton action={deleteNewsAction} id={n.id} />
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
