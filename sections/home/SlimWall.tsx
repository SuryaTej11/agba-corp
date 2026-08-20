import { Check } from "lucide-react";
import { WallSection } from "@/components/illustrations/WallSection";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { SLIM_WALL } from "@/lib/data";

export function SlimWall() {
  return (
    <Section id="slim-wall" className="relative bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow={SLIM_WALL.eyebrow}
          title={SLIM_WALL.title}
          lede={SLIM_WALL.lede}
        />

        {/* the two sections, drawn at the same scale on the same bar */}
        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {(
            [
              {
                variant: "agba" as const,
                label: "AGBA Slim Wall",
                value: "7.5 mm",
                note: "OD 53 mm · free concrete flow",
                good: true,
              },
              {
                variant: "conventional" as const,
                label: "Conventional",
                value: "10–12 mm",
                note: "OD 58–62 mm · high pour risk",
                good: false,
              },
            ]
          ).map((c, i) => (
            <Reveal key={c.variant} delay={i * 0.12} direction={i ? "left" : "right"}>
              <div className="panel panel-hover flex h-full flex-col items-center p-6 text-center sm:p-8">
                <span
                  className={`data text-xs font-medium uppercase tracking-[0.14em] ${
                    c.good ? "text-red" : "text-muted-2"
                  }`}
                >
                  {c.label}
                </span>
                <p className="mt-2 font-display text-4xl font-semibold text-heading">
                  {c.value}
                </p>
                <WallSection
                  variant={c.variant}
                  className="mt-4 h-auto w-full max-w-[19rem]"
                />
                <p className="mt-2 text-xs text-muted-2">{c.note}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* benefit chips */}
        <RevealGroup className="mt-6 grid gap-px overflow-hidden border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SLIM_WALL.benefits.map((b) => (
            <RevealItem key={b} className="bg-base">
              <div className="group flex h-full items-center gap-3 px-5 py-4 transition-colors hover:bg-surface-2">
                <Check
                  className="h-4 w-4 shrink-0 text-red transition-transform duration-300 group-hover:scale-125"
                  strokeWidth={2.5}
                />
                <span className="text-sm text-muted transition-colors group-hover:text-heading">
                  {b}
                </span>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
