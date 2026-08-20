import { Download, ScanLine } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { CertBadge } from "@/components/ui/CertBadge";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { CERTIFICATIONS } from "@/lib/data";
import { ROUTES } from "@/lib/site";

/**
 * The certification brandmark strip — the client's "build trust" ask, placed
 * immediately under the hero so it is the first thing after the headline.
 */
export function CertStrip() {
  return (
    <Section id="certifications" bordered={false} className="bg-base">
      <div className="container-x">
        <SectionHeading
          eyebrow={CERTIFICATIONS.eyebrow}
          title={CERTIFICATIONS.title}
          lede={CERTIFICATIONS.lede}
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CERTIFICATIONS.marks.map((m, i) => (
            <CertBadge
              key={m.title}
              kind={m.kind}
              title={m.title}
              subtitle={m.subtitle}
              note={"note" in m ? m.note : undefined}
              index={i}
            />
          ))}
        </div>

        <Reveal delay={0.15} className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href={`${ROUTES.trace}#downloads`} variant="ghost">
            <Download className="h-4 w-4" strokeWidth={2} />
            Download Sample Test Report
          </ButtonLink>
          <ButtonLink href={ROUTES.trace} variant="ghost">
            <ScanLine className="h-4 w-4" strokeWidth={2} />
            Verify Your Coupler
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
