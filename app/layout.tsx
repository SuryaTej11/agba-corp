import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { SITE } from "@/lib/site";
import "./globals.css";

/**
 * Root layout — document shell only.
 *
 * Site chrome (header, footer, WhatsApp button, cookie banner) lives in
 * app/(site)/layout.tsx so the control panel under /admin can have its own,
 * without a marketing nav bar sitting on top of it.
 */

/* Type stack carried over from the live site: Archivo for display, Space
   Grotesk for UI and body, JetBrains Mono for eyebrows and technical data. */
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? SITE.url),
  title: {
    default:
      "AGBA Corporation | IS 16172:2023 Parallel-Thread Rebar Couplers, Nagpur",
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [...SITE.keywords],
  applicationName: SITE.name,
  authors: [{ name: SITE.legalName }],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName: SITE.name,
    title: "AGBA Corporation — Build with trust. Build with AGBA.",
    description: SITE.description,
    url: SITE.url,
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "AGBA Corporation — Build with trust. Build with AGBA.",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en-IN"
      data-scroll-behavior="smooth"
      className={`${archivo.variable} ${spaceGrotesk.variable} ${jetbrains.variable} antialiased`}
    >
      <body className="bg-base">{children}</body>
    </html>
  );
}
