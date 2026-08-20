import Link from "next/link";
import {
  FileText,
  Inbox,
  Newspaper,
  Package,
  Quote,
} from "lucide-react";
import { countsByTable, listLeads } from "@/lib/db/queries";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default function DashboardPage() {
  const counts = countsByTable();
  const recent = listLeads().slice(0, 6);

  const cards = [
    { href: "/admin/batches", label: "Batches", value: counts.batches, icon: Package },
    { href: "/admin/documents", label: "Documents", value: counts.documents, icon: FileText },
    { href: "/admin/testimonials", label: "Testimonials", value: counts.testimonials, icon: Quote },
    { href: "/admin/news", label: "News & Events", value: counts.news, icon: Newspaper },
    { href: "/admin/leads", label: "Leads", value: counts.leads, icon: Inbox },
  ];

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-heading">
        Control Panel
      </h1>
      <p className="mt-2 text-sm text-muted">
        Everything published here appears on the live site immediately — no
        rebuild, no developer.
      </p>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link
              key={c.href}
              href={c.href}
              className="panel panel-hover group flex items-center gap-4 p-5"
            >
              <Icon
                className="h-6 w-6 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-0.5"
                strokeWidth={1.75}
              />
              <span>
                <span className="block font-display text-2xl font-semibold text-heading">
                  {c.value}
                </span>
                <span className="data mt-0.5 block text-[0.62rem] uppercase tracking-[0.14em] text-muted-2">
                  {c.label}
                </span>
              </span>
            </Link>
          );
        })}
      </div>

      <section className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <h2 className="font-display text-lg font-semibold text-heading">
            Latest leads
          </h2>
          <Link
            href="/admin/leads"
            className="text-xs text-muted underline-offset-4 hover:text-red hover:underline"
          >
            View all
          </Link>
        </div>

        {recent.length === 0 ? (
          <p className="panel mt-4 p-6 text-sm text-muted">
            No leads yet. Enquiries, download requests and assistance requests
            all land here.
          </p>
        ) : (
          <div className="panel mt-4 overflow-x-auto">
            <table className="w-full min-w-[38rem] text-left text-sm">
              <thead>
                <tr className="border-b border-line">
                  {["Type", "Name", "Email", "Received"].map((h) => (
                    <th
                      key={h}
                      className="data px-5 py-3 text-[0.6rem] uppercase tracking-[0.14em] text-muted-2"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {recent.map((l) => (
                  <tr key={l.id}>
                    <td className="px-5 py-3">
                      <span className="data rounded-sm border border-red/40 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-red">
                        {l.type}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-heading">{l.name ?? "—"}</td>
                    <td className="px-5 py-3 text-muted">{l.email ?? "—"}</td>
                    <td className="data px-5 py-3 text-xs text-muted-2">
                      {formatDate(l.created_at)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="panel mt-10 p-6">
        <h2 className="font-display text-base font-semibold text-heading">
          Before you go live
        </h2>
        <ul className="mt-4 space-y-2.5 text-sm text-muted">
          <li>
            · Change the control-panel password:{" "}
            <code className="data rounded-sm bg-base px-1.5 py-0.5 text-xs text-heading">
              npm run hash-password -- &quot;your-password&quot;
            </code>
            , then paste both lines into <code className="data text-xs">.env.local</code>.
          </li>
          <li>· Delete the sample rows in each section and upload the real files.</li>
          <li>
            · Paste the real ISI mark and CM/L licence number once BIS confirms
            it — the slot on the home page is reserved and clearly marked.
          </li>
          <li>· Send the factory photographs so the reserved image slots can be filled.</li>
        </ul>
      </section>
    </div>
  );
}
