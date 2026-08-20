import { CONTACT, SITE } from "@/lib/site";

/**
 * Structured data for the organisation, its two locations and the product.
 * Emitted once from the root layout.
 */
export function JsonLd() {
  const org = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE.url}#organization`,
    name: SITE.legalName,
    url: SITE.url,
    description: SITE.description,
    telephone: CONTACT.phones.map((p) => p.display),
    email: CONTACT.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "7, Jagat Regency, Old Bhandara Road",
      addressLocality: "Nagpur",
      postalCode: "440008",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    location: CONTACT.offices.map((o) => ({
      "@type": "Place",
      name: o.kind,
      address: o.lines.join(", "),
    })),
    hasCredential: [
      "IS 16172:2023",
      "ISO 9001:2015",
      "ISO 45001:2018",
      "NABL tested",
    ],
  };

  const product = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Parallel-Thread Rebar Coupler",
    brand: { "@type": "Brand", name: SITE.shortName },
    manufacturer: { "@id": `${SITE.url}#organization` },
    description:
      "IS 16172:2023 Class L and Class H parallel-thread rebar couplers for Fe 500D and Fe 550D rebar, Ø12–40 mm. Cold-forged bar ends, 100% go/no-go gauge inspection, NABL test certificate on every batch.",
    material: "Steel",
    audience: {
      "@type": "Audience",
      audienceType: "Structural engineers, contractors and distributors",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(product) }}
      />
    </>
  );
}
