import type { MetadataRoute } from "next";
import { ROUTES, SITE } from "@/lib/site";

const base = process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url;

/** Four public pages. /admin is deliberately absent. */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${base}${ROUTES.home}`, lastModified: now, priority: 1, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.about}`, lastModified: now, priority: 0.8, changeFrequency: "monthly" },
    { url: `${base}${ROUTES.trace}`, lastModified: now, priority: 0.9, changeFrequency: "weekly" },
    { url: `${base}${ROUTES.contact}`, lastModified: now, priority: 0.7, changeFrequency: "yearly" },
  ];
}
