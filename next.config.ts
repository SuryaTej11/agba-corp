import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * The CSP is deliberately explicit rather than clever. The only third parties
 * the site talks to are Google Fonts (self-hosted by next/font at build time,
 * so no runtime connection) and the Google Maps embed on /contact. Anything
 * else is same-origin.
 */
const securityHeaders = [
  // Stop the browser guessing content types — the file route already sets
  // this, but it belongs on every response.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // No one should be able to frame the site (clickjacking, fake "login" overlays).
  { key: "X-Frame-Options", value: "DENY" },
  // Send the origin only, and never leak a full URL to a third party.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // The site needs none of these.
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  },
  // Force HTTPS for two years once the certificate is live.
  // NOTE: only takes effect over HTTPS; harmless on http://localhost.
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next injects inline bootstrap scripts; 'unsafe-inline' is required for
      // the App Router's hydration payload.
      "script-src 'self' 'unsafe-inline'",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "font-src 'self' data:",
      // The Maps embed on /contact.
      "frame-src 'self' https://www.google.com https://maps.google.com",
      "connect-src 'self'",
      "form-action 'self'",
      "base-uri 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "upgrade-insecure-requests",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // better-sqlite3 is a native addon — it must stay external so Turbopack
  // never tries to bundle the .node binding into the server output.
  serverExternalPackages: ["better-sqlite3"],

  // Don't advertise the framework version to scanners.
  poweredByHeader: false,

  // Trailing-slash-free canonical URLs, matching the sitemap.
  trailingSlash: false,

  async headers() {
    return [
      { source: "/:path*", headers: securityHeaders },
      {
        // Uploaded files are private by nature — never let a proxy or CDN
        // hold a copy of a gated document.
        source: "/api/:path*",
        headers: [
          { key: "Cache-Control", value: "no-store, max-age=0" },
          { key: "X-Robots-Tag", value: "noindex, nofollow" },
        ],
      },
      {
        source: "/admin/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
