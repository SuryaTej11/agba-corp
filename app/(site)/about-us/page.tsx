import type { Metadata } from "next";
import { Camera, MapPin } from "lucide-react";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SpecTable } from "@/components/ui/SpecTable";
import { KnowledgeCenter } from "@/sections/about/KnowledgeCenter";
import { NewsSection } from "@/sections/shared/NewsSection";
import { CTABand } from "@/sections/shared/CTABand";
import { ABOUT, COMPANY } from "@/lib/data";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us — Made at source, tested at every step",
  description:
    "AGBA Corporation manufactures precision parallel-thread rebar couplers at Butibori MIDC, Nagpur. Gauge-checked and certified in-house, dispatched direct to site across India.",
  alternates: { canonical: "/about-us" },
};

/** News is read from SQLite per request. */
export const dynamic = "force-dynamic";

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow={ABOUT.hero.eyebrow}
        title={ABOUT.hero.title}
        lede={ABOUT.hero.lede}
      />

      {/* --- story + stats --- */}
      <Section bordered={false}>
        <div className="container-x grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <Reveal>
            <p className="border-l-2 border-red pl-6 text-base leading-relaxed text-muted md:text-lg">
              {ABOUT.hero.body}
            </p>
          </Reveal>

          <RevealGroup className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2">
            {ABOUT.stats.map((s) => (
              <RevealItem key={s.value} className="bg-base">
                <div className="group h-full px-6 py-7 transition-colors hover:bg-surface-2">
                  <p className="font-display text-2xl font-semibold text-heading">
                    {s.value}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {s.label}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --- principles --- */}
      <Section id="principles">
        <div className="container-x">
          <SectionHeading
            eyebrow={ABOUT.principles.eyebrow}
            title={ABOUT.principles.title}
          />
          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {ABOUT.principles.items.map((p, i) => (
              <RevealItem key={p.title}>
                <article className="panel panel-hover group relative h-full p-7">
                  <span
                    className="data absolute right-6 top-6 text-xs text-line-2 transition-colors duration-500 group-hover:text-red"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
                  <h3 className="font-display text-xl font-semibold text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --- company: made in Nagpur --- */}
      <Section id="company">
        <div className="container-x">
          <SectionHeading
            eyebrow={COMPANY.intro.eyebrow}
            title={COMPANY.intro.title}
            lede={COMPANY.intro.lede}
          />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {COMPANY.intro.cards.map((c) => (
              <RevealItem key={c.title}>
                <article className="panel panel-hover h-full p-7">
                  <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
                    {c.kicker}
                  </p>
                  <h3 className="mt-4 font-display text-xl font-semibold uppercase leading-snug text-heading">
                    {c.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --- credentials (dark band, as in the reference) --- */}
      <Section id="credentials" className="on-dark bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow={COMPANY.credentials.eyebrow}
            title={COMPANY.credentials.title}
          />

          <Reveal delay={0.1} className="mt-12">
            <div className="panel p-1">
              <SpecTable
                head={["Credential", "Reference"]}
                rows={COMPANY.credentials.rows}
              />
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mt-10">
            <h3 className="data text-xs font-medium uppercase tracking-[0.16em] text-muted-2">
              {COMPANY.credentials.affiliations.title}
            </h3>
            <div className="panel mt-4 p-1">
              <SpecTable
                head={["Body", "Status"]}
                rows={COMPANY.credentials.affiliations.rows}
              />
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-2">
              {COMPANY.credentials.note}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* --- the works --- */}
      <Section id="works">
        <div className="container-x">
          <SectionHeading
            eyebrow={COMPANY.works.eyebrow}
            title={COMPANY.works.title}
            lede={COMPANY.works.body}
          />
          {/* Reserved slot — AGBA are still to supply these photographs. */}
          <Reveal delay={0.12} className="mt-12">
            <div className="flex items-center justify-center gap-3 rounded-sm border border-dashed border-line-2 bg-surface px-6 py-12 text-center">
              <Camera className="h-5 w-5 shrink-0 text-muted-2" strokeWidth={1.5} />
              <p className="data text-[0.66rem] uppercase tracking-[0.16em] text-muted-2">
                {COMPANY.works.photoSlot}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- Knowledge Center (2 tabs) --- */}
      <KnowledgeCenter />

      {/* --- News & Events (full list) --- */}
      <NewsSection />

      {/* --- locations --- */}
      <Section id="locations">
        <div className="container-x">
          <SectionHeading eyebrow="Where we are" title="NAGPUR, MAHARASHTRA" />
          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
            {CONTACT.offices.map((o) => (
              <RevealItem key={o.kind}>
                <a
                  href={o.maps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="panel panel-hover group flex h-full items-start gap-5 p-7"
                >
                  <MapPin
                    className="mt-1 h-6 w-6 shrink-0 text-red transition-transform duration-300 group-hover:-translate-y-1"
                    strokeWidth={1.75}
                  />
                  <span>
                    <span className="data block text-[0.68rem] uppercase tracking-[0.16em] text-red">
                      {o.kind}
                    </span>
                    <span className="mt-3 block font-display text-lg font-semibold leading-snug text-heading">
                      {o.lines.map((l) => (
                        <span key={l} className="block">
                          {l}
                        </span>
                      ))}
                    </span>
                    <span className="mt-4 block text-xs text-muted-2 underline-offset-4 group-hover:underline">
                      Open in Google Maps
                    </span>
                  </span>
                </a>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
