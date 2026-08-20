import type { MetadataRoute } from "next";
import { SITE } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

export default function robots(): MetadataRoute.Robots {
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
