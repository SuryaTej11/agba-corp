import type { Metadata } from "next";
import { ArrowRight, Wrench } from "lucide-react";
import { CouplerAnatomy } from "@/components/illustrations/CouplerAnatomy";
import { DiagramFrame } from "@/components/illustrations/DiagramFrame";
import { ProcessChain } from "@/components/illustrations/ProcessChain";
import { ButtonLink } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SpecTable } from "@/components/ui/SpecTable";
import { CTABand } from "@/sections/shared/CTABand";
import { ATS } from "@/lib/data";
import { ROUTES } from "@/lib/site";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "The AGBA Thread System (ATS)",
  description:
    "A connection is a system, not a component. Cold forging before threading, a designed thread form, and both halves of the connection from one quality system.",
  alternates: { canonical: ROUTES.ats },
};

export default function AtsPage() {
  const { principle, coldForging, thread, otherHalf } = ATS;

  return (
    <>
      <PageHero
        eyebrow={ATS.hero.eyebrow}
        title={ATS.hero.title}
        lede={ATS.hero.lede}
        wide
      />

      {/* ---- principle one ---- */}
      <Section id="principle">
        <div className="container-x">
          <SectionHeading
            eyebrow={principle.eyebrow}
            title={principle.title}
            lede={principle.lede}
          />

          <Reveal delay={0.1} className="mt-12">
            <ProcessChain steps={principle.chain} />
          </Reveal>

          <RevealGroup className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-2">
            {principle.points.map((p) => (
              <RevealItem key={p.title} className="bg-base">
                <div className="h-full px-7 py-8 transition-colors hover:bg-surface">
                  <h3 className="font-display text-lg font-semibold uppercase leading-snug text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* ---- cold forging (dark band, as in the reference) ---- */}
      <Section id="cold-forging" className="on-dark bg-deep">
        <div className="container-x">
          <SectionHeading
            eyebrow={coldForging.eyebrow}
            title={coldForging.title}
            lede={coldForging.lede}
          />

          <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-2">
            {coldForging.cards.map((c) => (
              <RevealItem key={c.title}>
                <article
                  className={cn(
                    "panel h-full p-7 sm:p-8",
                    c.bad ? "border-red/40" : "border-ok/40",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        c.bad ? "bg-red" : "bg-ok",
                      )}
                      aria-hidden="true"
                    />
                    <h3
                      className={cn(
                        "data text-xs font-medium uppercase tracking-[0.12em]",
                        c.bad ? "text-red" : "text-ok",
                      )}
                    >
                      {c.title}
                    </h3>
                  </div>

                  <p className="data mt-3 text-xs text-muted-2">{c.spec}</p>

                  <p
                    className={cn(
                      "mt-7 font-display text-6xl font-semibold leading-none",
                      c.bad ? "text-red" : "text-ok",
                    )}
                  >
                    {c.figure}
                  </p>
                  <p className="data mt-3 text-[0.68rem] uppercase tracking-[0.14em] text-muted-2">
                    {c.figureLabel}
                  </p>

                  <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal delay={0.15} className="mt-8">
            <div className="panel p-1">
              <SpecTable
                head={coldForging.table.head}
                rows={coldForging.table.rows}
                emphasis={[3, 5]}
              />
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-2">
              {coldForging.note}
            </p>
          </Reveal>
        </div>
      </Section>

      {/* ---- the thread ---- */}
      <Section id="thread">
        <div className="container-x">
          <SectionHeading
            eyebrow={thread.eyebrow}
            title={thread.title}
            lede={thread.lede}
          />

          <Reveal delay={0.1} className="mt-12">
            <div className="panel p-1">
              <SpecTable head={thread.table.head} rows={thread.table.rows} />
            </div>
            <p className="mt-5 max-w-3xl text-xs leading-relaxed text-muted-2">
              {thread.note}
            </p>
          </Reveal>

          <Reveal delay={0.15} className="mt-12">
            <div className="panel p-5 sm:p-8">
              <DiagramFrame minWidth={560} caption="The connection in place">
                <CouplerAnatomy className="h-auto w-full" />
              </DiagramFrame>
              <p className="data mt-5 border-t border-line pt-4 text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
                {thread.caption}
              </p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* ---- the other half ---- */}
      <Section id="other-half" className="bg-surface">
        <div className="container-x">
          <SectionHeading
            eyebrow={otherHalf.eyebrow}
            title={otherHalf.title}
            lede={otherHalf.lede}
          />
          <Reveal delay={0.12} className="mt-9 flex flex-wrap gap-3">
            <ButtonLink href={ROUTES.machines}>
              <Wrench className="h-4 w-4" strokeWidth={2} />
              Machine Services
            </ButtonLink>
            <ButtonLink href={`${ROUTES.machines}#on-site`} variant="ghost">
              The five site steps
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
          </Reveal>
        </div>
      </Section>

      <CTABand />
    </>
  );
}
