import { CouplerAnatomy } from "@/components/illustrations/CouplerAnatomy";
import { DiagramFrame } from "@/components/illustrations/DiagramFrame";
import { SpliceCompare } from "@/components/illustrations/SpliceCompare";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WHAT_IS } from "@/lib/data";

/**
 * "What is a Coupler?" — the explainer the client asked for. Deliberately the
 * first technical section, so a visitor who has never specified a mechanical
 * splice can follow everything that comes after it.
 */
export function WhatIsCoupler() {
  return (
    <Section id="what-is-a-coupler" className="bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow={WHAT_IS.eyebrow}
          title={WHAT_IS.title}
          lede={WHAT_IS.lede}
        />

        {/* annotated cutaway */}
        <Reveal delay={0.1} className="mt-14">
          <div className="panel overflow-hidden p-5 sm:p-8">
            <DiagramFrame minWidth={560} caption="Coupler cutaway">
              <CouplerAnatomy className="h-auto w-full" />
            </DiagramFrame>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <RevealGroup className="grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-1">
            {WHAT_IS.points.map((p) => (
              <RevealItem key={p.title} className="bg-base">
                <div className="group h-full px-6 py-6 transition-colors hover:bg-surface-2">
                  <h3 className="font-display text-lg font-semibold text-heading">
                    {p.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal direction="left">
            <div className="panel p-5 sm:p-7">
              <DiagramFrame minWidth={440} caption="Lap splice vs mechanical splice">
                <SpliceCompare className="h-auto w-full" />
              </DiagramFrame>
              <p className="mt-5 border-t border-line pt-4 text-xs leading-relaxed text-muted-2">
                {WHAT_IS.spliceCaption}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
