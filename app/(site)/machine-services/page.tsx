import type { Metadata } from "next";
import { ArrowRight, Check } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { CTABand } from "@/sections/shared/CTABand";
import { MACHINE_SERVICES } from "@/lib/data";
import { ROUTES } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cold Forging & Threading Machine Services",
  description:
    "AGBA deploys the cold forging and threading machines, tooling, gauges and technicians, so one quality system covers the whole connection. On-site deployment, mobile van service or machine rental.",
  alternates: { canonical: ROUTES.machines },
};

export default function MachineServicesPage() {
  const { deploy, models, onSite } = MACHINE_SERVICES;

  return (
    <>
      <PageHero
        eyebrow={MACHINE_SERVICES.hero.eyebrow}
        title={MACHINE_SERVICES.hero.title}
        lede={MACHINE_SERVICES.hero.lede}
        wide
      />

      {/* ---- what we deploy ---- */}
      <Section id="deploy">
        <div className="container-x">
          <SectionHeading eyebrow={deploy.eyebrow} title={deploy.title} />

          <RevealGroup className="mt-14 grid gap-5 md:grid-cols-3">
            {deploy.cards.map((c, i) => (
              <RevealItem key={c.title}>
                <article className="panel panel-hover group relative h-full p-7">
                  <span
                    className="data absolute right-6 top-6 text-xs text-line-2 transition-colors duration-500 group-hover:text-red"
                    aria-hidden="true"
                  >
                    0{i + 1}
                  </span>
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

      {/* ---- service models (dark band, as in the reference) ---- */}
      <Section id="models" className="on-dark bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow={models.eyebrow}
            title={models.title}
            lede={models.lede}
          />

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-3">
            {models.options.map((o) => (
              <RevealItem key={o.title}>
                <article className="panel panel-hover flex h-full flex-col p-7">
                  <h3 className="font-display text-lg font-semibold uppercase leading-snug text-heading">
                    {o.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {o.body}
                  </p>
                  <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                    {o.points.map((pt) => (
                      <li key={pt} className="flex items-start gap-2.5">
                        <Check
                          className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red"
                          strokeWidth={2.5}
                        />
                        <span className="text-sm text-muted">{pt}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-3xl border-l-2 border-red pl-5 text-sm leading-relaxed text-muted">
              {models.note}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- the five site steps ---- */}
      <Section id="on-site">
        <div className="container-x">
          <SectionHeading
            eyebrow={onSite.eyebrow}
            title={onSite.title}
            lede={onSite.lede}
          />

          <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-5">
            {onSite.steps.map((s) => (
              <RevealItem key={s.no} className="bg-page">
                <div className="group flex h-full flex-col px-6 py-7 transition-colors hover:bg-surface">
                  <span className="data text-xs font-medium text-red">
                    {s.no}
                  </span>
                  <h3 className="mt-4 font-display text-base font-semibold uppercase text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15}>
            <p className="mt-8 max-w-3xl text-sm leading-relaxed text-muted">
              {onSite.note}
            </p>
          </Reveal>

          <Reveal delay={0.2} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={`${ROUTES.contact}#enquiry`}>
              Request a Quote
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
            <ButtonLink href={ROUTES.ats} variant="ghost">
              The AGBA Thread System
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
