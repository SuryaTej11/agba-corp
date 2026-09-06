/**
 * Single source of truth for company facts, routes and contact details.
 * Nav, footer, metadata, sitemap and JSON-LD all read from here — change a
 * phone number once and it updates everywhere.
 *
 * Every fact below is taken from the live agbacorp.com build.
 */

export const SITE = {
  name: "AGBA Corporation",
  shortName: "AGBA",
  legalName: "AGBA Corporation",
  tagline: "Build with trust. Build with AGBA.",
  /**
   * The line that sits under the name in the brand lockup. Distinct from
   * `tagline` above: that one closes the CTAs and the footer copy, this one
   * belongs to the mark, and both come from AGBA's own material.
   */
  lockupTagline: "Integrity in every connection",
  url: "https://agbacorp.com",
  description:
    "IS 16172:2023 certified parallel-thread rebar couplers — forged before threaded, 100% gauge-checked, NABL tested. Manufactured at Butibori MIDC, Nagpur and dispatched direct to site across India.",
  keywords: [
    "rebar coupler",
    "parallel thread coupler",
    "mechanical splicing",
    "IS 16172:2023",
    "cold forged rebar",
    "rebar coupler manufacturer India",
    "Nagpur rebar coupler",
    "NABL tested coupler",
    "Fe 500D coupler",
  ],
  gstin: "27ACHFA9560G1Z6",
  foundingLocation: "Nagpur, Maharashtra, India",
} as const;

export const ROUTES = {
  home: "/",
  ats: "/ats",
  machines: "/machine-services",
  about: "/about-us",
  trace: "/find-your-coupler",
  contact: "/contact",
} as const;

/**
 * Six public pages. ATS System and Machine Services were added from the
 * client's reference build; the original four are unchanged. "Find Your Join" is
 * renamed to "Find Your Coupler" — the page itself leads with the
 * "Batch Traceability" eyebrow and a "Verify Your Batch" action, so all
 * three of the client's suggested names land in their natural slot.
 */
export const NAV = [
  { label: "Home", href: ROUTES.home },
  { label: "ATS System", href: ROUTES.ats },
  { label: "Machine Services", href: ROUTES.machines },
  { label: "About Us", href: ROUTES.about },
  { label: "Find Your Coupler", href: ROUTES.trace },
  { label: "Contact", href: ROUTES.contact },
] as const;

export const CONTACT = {
  phones: [
    { display: "+91 99750 43605", tel: "+919975043605" },
    { display: "+91 98225 67751", tel: "+919822567751" },
  ],
  email: "info@agbacorp.com",
  /** WhatsApp uses the primary line, in wa.me's country-code-no-plus format. */
  whatsapp: {
    number: "919975043605",
    display: "+91 99750 43605",
    prefill:
      "Hello AGBA — I'd like an enquiry about your IS 16172:2023 rebar couplers.",
  },
  offices: [
    {
      kind: "Registered Office",
      lines: ["7, Jagat Regency, Old Bhandara Road", "Nagpur 440008, Maharashtra, India"],
      maps: "https://www.google.com/maps/search/?api=1&query=Jagat+Regency+Old+Bhandara+Road+Nagpur+440008",
    },
    {
      kind: "Manufacturing Works",
      lines: ["Plot C-94, MIDC Butibori", "Nagpur 441123, Maharashtra, India"],
      maps: "https://www.google.com/maps/search/?api=1&query=Plot+C-94+MIDC+Butibori+Nagpur+441123",
    },
  ],
  hours: "Mon – Sat · 9:30 AM – 6:30 PM IST",
} as const;

/**
 * The public origin, resolved at runtime.
 *
 * Order matters:
 *   1. NEXT_PUBLIC_SITE_URL — set this on the real domain, it always wins.
 *   2. RENDER_EXTERNAL_URL  — Render injects this automatically, so a preview
 *      deploy gets correct canonical URLs, sitemap and robots with no config.
 *   3. SITE.url             — the production domain, as a last resort.
 *
 * Any trailing slash is stripped, because everything downstream concatenates
 * paths onto this and `https://host//about-us` is a different URL to crawlers.
 */
export function siteUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.RENDER_EXTERNAL_URL?.trim() ||
    SITE.url;
  return raw.replace(/\/+$/, "");
}

/** Convenience helpers so components never hand-build these URLs. */
export const waLink = (message: string = CONTACT.whatsapp.prefill) =>
  `https://wa.me/${CONTACT.whatsapp.number}?text=${encodeURIComponent(message)}`;

export const telLink = (tel: string) => `tel:${tel}`;
export const mailLink = (subject?: string) =>
  `mailto:${CONTACT.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
