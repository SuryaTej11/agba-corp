"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  Newspaper,
  Package,
  Quote,
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
  exact?: boolean;
};

const ITEMS: readonly NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/batches", label: "Batches", icon: Package },
  { href: "/admin/documents", label: "Documents", icon: FileText },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/news", label: "News & Events", icon: Newspaper },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
] as const;

export function AdminNav() {
  const pathname = usePathname();

  return (
    <nav className="px-3 pb-4 lg:pb-0" aria-label="Control panel">
      <ul className="flex gap-1 overflow-x-auto lg:flex-col lg:overflow-visible">
        {ITEMS.map((item) => {
          const active = item.exact
            ? pathname === item.href
            : pathname.startsWith(item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="shrink-0 lg:shrink">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-2.5 whitespace-nowrap rounded-sm px-3 py-2.5 text-sm transition-colors",
                  active
                    ? "bg-red/12 text-heading"
                    : "text-muted hover:bg-surface-2 hover:text-heading",
                )}
              >
                <Icon
                  className={cn("h-4 w-4 shrink-0", active && "text-red")}
                  strokeWidth={1.75}
                />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
