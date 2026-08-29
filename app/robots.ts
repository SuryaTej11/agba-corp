import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";

// Resolved per request — see app/sitemap.ts.
export const dynamic = "force-dynamic";

export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // The control panel and the gated file endpoint are never crawled.
      disallow: ["/admin", "/admin/", "/api/"],
    },
    sitemap: `${base}/sitemap.xml`,
  };
}
