import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/layout/WhatsAppButton";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { JsonLd } from "@/components/seo/JsonLd";

/** Public site chrome. The control panel deliberately does not use this. */
export default function SiteLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-sm focus:bg-red focus:px-4 focus:py-2 focus:text-white"
      >
        Skip to content
      </a>
      <Header />
      {/* pt matches the 76px fixed header */}
      <main id="main" className="flex-1 pt-[76px]">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <CookieConsent />
      <JsonLd />
    </div>
  );
}
