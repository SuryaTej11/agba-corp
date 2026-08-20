import Link from "next/link";
import { ExternalLink, LogOut } from "lucide-react";
import { LogoMark } from "@/components/layout/Logo";
import { requireAdmin } from "@/lib/auth";
import { logoutAction } from "../actions";
import { AdminNav } from "./AdminNav";

/**
 * Guarded panel shell. `requireAdmin()` redirects to /admin/login when the
 * session cookie is missing or expired — one check covering every panel route.
 * Server actions re-check independently; a page guard is not authorisation for
 * a POST endpoint.
 */
export default async function PanelLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  await requireAdmin();

  return (
    <div className="on-dark flex min-h-dvh flex-col lg:flex-row">
      <aside className="border-b border-line bg-surface lg:w-60 lg:shrink-0 lg:border-b-0 lg:border-r">
        <div className="flex items-center justify-between gap-3 px-5 py-5 lg:block">
          <Link href="/admin" className="flex items-center gap-3">
            <LogoMark className="h-8 w-8 text-red" />
            <span>
              <span className="block font-display text-base font-extrabold leading-none tracking-tight text-heading">
                AGBA
              </span>
              <span className="data mt-1 block text-[0.5rem] uppercase tracking-[0.22em] text-muted-2">
                Control Panel
              </span>
            </span>
          </Link>
        </div>

        <AdminNav />

        <div className="space-y-2 border-t border-line px-5 py-5">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-heading"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.75} />
            View live site
          </a>
          <form action={logoutAction}>
            <button
              type="submit"
              className="flex items-center gap-2 text-xs text-muted transition-colors hover:text-red"
            >
              <LogOut className="h-3.5 w-3.5" strokeWidth={1.75} />
              Sign out
            </button>
          </form>
        </div>
      </aside>

      <main className="min-w-0 flex-1 px-5 py-8 sm:px-8 lg:py-10">{children}</main>
    </div>
  );
}
