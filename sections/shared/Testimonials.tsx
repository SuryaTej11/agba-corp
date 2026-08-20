import { Quote, Star } from "lucide-react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { listTestimonials } from "@/lib/db/queries";

/**
 * Customer testimonials — uploaded and reordered from /admin.
 * Renders nothing at all when the team has none published, rather than
 * leaving an empty band on the page.
 */
export function Testimonials() {
  const items = listTestimonials();
  if (items.length === 0) return null;

  return (
    <Section id="testimonials">
      <div className="container-x">
        <SectionHeading
          eyebrow="Customer Testimonials"
          title="WHAT SITE TEAMS TELL US"
          lede="Feedback from the contractors, consultants and distributors who specify and install AGBA couplers."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {items.map((t) => (
            <RevealItem key={t.id}>
              <figure className="panel panel-hover flex h-full flex-col p-7">
                <Quote
                  className="h-7 w-7 shrink-0 text-red/70"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />

                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-muted">
                  {t.quote}
                </blockquote>

                <div
                  className="mt-6 flex gap-0.5"
                  aria-label={`Rated ${t.rating} out of 5`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < t.rating
                          ? "h-3.5 w-3.5 fill-red text-red"
                          : "h-3.5 w-3.5 text-line-2"
                      }
                      strokeWidth={1.5}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                <figcaption className="mt-4 border-t border-line pt-4">
                  <p className="font-display text-sm font-semibold text-heading">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-2">
                    {[t.role, t.company].filter(Boolean).join(" · ")}
                  </p>
                  {t.project && (
                    <p className="data mt-2 text-[0.68rem] uppercase tracking-wider text-red/80">
                      {t.project}
                    </p>
                  )}
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </Section>
  );
}
