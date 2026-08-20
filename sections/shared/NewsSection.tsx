import Link from "next/link";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { listNews } from "@/lib/db/queries";
import { ROUTES } from "@/lib/site";
import { formatDate } from "@/lib/utils";

/**
 * News & Events, managed from /admin.
 * `limit` shows the latest few as a teaser on the home page; the About page
 * carries the full list.
 */
export function NewsSection({
  limit,
  showAllLink = false,
}: {
  limit?: number;
  showAllLink?: boolean;
}) {
  const items = listNews(true, limit);
  if (items.length === 0) return null;

  return (
    <Section id="news">
      <div className="container-x">
        <SectionHeading
          eyebrow="News & Events"
          title="WHAT'S HAPPENING AT AGBA"
          lede="Certification milestones, product releases and technical sessions from the works at Butibori."
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {items.map((n) => (
            <RevealItem key={n.id}>
              <article className="panel panel-hover flex h-full flex-col p-7">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                  <span className="data rounded-sm border border-red/40 px-2 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-red">
                    {n.category}
                  </span>
                  <span className="data flex items-center gap-1.5 text-[0.7rem] text-muted-2">
                    <CalendarDays className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {formatDate(n.event_date)}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-lg font-semibold leading-snug text-heading">
                  {n.title}
                </h3>

                {n.excerpt && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                    {n.excerpt}
                  </p>
                )}

                {n.location && (
                  <p className="mt-5 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-muted-2">
                    <MapPin className="h-3.5 w-3.5" strokeWidth={1.75} />
                    {n.location}
                  </p>
                )}
              </article>
            </RevealItem>
          ))}
        </RevealGroup>

        {showAllLink && (
          <Reveal delay={0.15} className="mt-10">
            <Link
              href={`${ROUTES.about}#news`}
              className="group inline-flex items-center gap-2 text-sm font-medium text-heading transition-colors hover:text-red"
            >
              All news &amp; events
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                strokeWidth={2}
              />
            </Link>
          </Reveal>
        )}
      </div>
    </Section>
  );
}
