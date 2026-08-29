import { ArrowRight } from "lucide-react";
import { DiagramFrame } from "@/components/illustrations/DiagramFrame";
import { GrainFlow } from "@/components/illustrations/GrainFlow";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { FORGED } from "@/lib/data";
import { ROUTES } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * One of the three dark bands on the home page. The forged-vs-machined
 * comparison is the most dramatic moment on the page, so it carries the
 * inversion — and it breaks up what would otherwise be six light sections
 * in a row.
 */
export function ForgedSection() {
  return (
    <Section id="forged-before-threaded" className="on-dark bg-deep">
      <div className="container-x">
        <SectionHeading
          eyebrow={FORGED.eyebrow}
          title={FORGED.title}
          lede={FORGED.lede}
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {FORGED.cards.map((c, i) => {
            const good = c.variant === "forged";
            return (
              <Reveal
                key={c.title}
                delay={i * 0.12}
                direction={i === 0 ? "right" : "left"}
              >
                <div
                  className={cn(
                    "panel panel-hover h-full p-6 sm:p-8",
                    good && "border-ok/30",
                  )}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={cn(
                        "h-2 w-2 rounded-full",
                        good ? "bg-ok" : "bg-red",
                      )}
                      aria-hidden="true"
                    />
                    <h3
                      className={cn(
                        "data text-sm font-medium uppercase tracking-[0.1em]",
                        good ? "text-ok" : "text-red",
                      )}
                    >
                      {c.title}
                    </h3>
                  </div>

                  <DiagramFrame minWidth={340} className="mt-6" caption={c.title}>
                    <GrainFlow variant={c.variant} className="h-auto w-full" />
                  </DiagramFrame>

                  <p className="mt-6 border-t border-line pt-5 text-sm leading-relaxed text-muted">
                    {c.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.2} className="mt-10">
          <ButtonLink href={`${ROUTES.contact}#enquiry`} variant="ghost">
            Talk to our team
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </ButtonLink>
        </Reveal>
      </div>
    </Section>
  );
}
