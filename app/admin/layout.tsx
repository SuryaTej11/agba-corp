import type { Metadata } from "next";

/**
 * The control panel is never indexed and never appears in the sitemap.
 * Authentication is enforced one level down, in (panel)/layout.tsx, so that
 * /admin/login itself stays reachable.
 */
export const metadata: Metadata = {
  title: "Control Panel",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
