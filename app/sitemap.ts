import type { MetadataRoute } from "next";
import { ROUTES, siteUrl } from "@/lib/site";

/**
 * Six public pages. /admin is deliberately absent.
 *
 * Resolved per request so a preview deploy advertises its own host rather than
 * whatever origin happened to be set at build time.
 */
export const dynamic = "force-dynamic";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();
  return [
    { url: `${base}${ROUTES.home}`, lastModified: now, priority: 1, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.ats}`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.machines}`, lastModified: now, priority: 0.9, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.about}`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.trace}`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}${ROUTES.contact}`, lastModified: now, priority: 0.7, changeFrequency: "yearly" },
  ];
}
