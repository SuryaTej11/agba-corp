import type { Metadata } from "next";
import { HeroHome } from "@/sections/home/HeroHome";
import { CertStrip } from "@/sections/home/CertStrip";
import { WhatIsCoupler } from "@/sections/home/WhatIsCoupler";
import { ForgedSection } from "@/sections/home/ForgedSection";
import { SlimWall } from "@/sections/home/SlimWall";
import { ProductsGrid } from "@/sections/home/ProductsGrid";
import { ProcessTimeline } from "@/sections/home/ProcessTimeline";
import { Testimonials } from "@/sections/shared/Testimonials";
import { NewsSection } from "@/sections/shared/NewsSection";
import { CTABand } from "@/sections/shared/CTABand";

export const metadata: Metadata = {
  // `absolute` opts out of the root layout's "%s | AGBA Corporation" template —
  // the brand name is already in this title.
  title: {
    absolute:
      "AGBA Corporation | IS 16172:2023 Parallel-Thread Rebar Couplers, Nagpur",
  },
  description:
    "Precision parallel-thread rebar couplers — forged before threaded, 100% gauge-checked and NABL tested. Class L & H to IS 16172:2023, Ø12–40 mm, dispatched pan-India from Nagpur.",
  alternates: { canonical: "/" },
};

/**
 * Testimonials and news are read from SQLite on every request, so
 * anything published in the control panel appears without a rebuild.
 */
export const dynamic = "force-dynamic";

export default function HomePage() {
  return (
    <>
      <HeroHome />
      <CertStrip />
      <WhatIsCoupler />
      <ForgedSection />
      <SlimWall />
      <ProductsGrid />
      <ProcessTimeline />
      <Testimonials />
      <NewsSection limit={3} showAllLink />
      <CTABand />
    </>
  );
}
