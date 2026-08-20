import type { Metadata } from "next";
import { TraceChain } from "@/components/illustrations/TraceChain";
import { PageHero } from "@/components/ui/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";
import { Section, SectionHeading } from "@/components/ui/Section";
import { BatchLookup } from "@/sections/trace/BatchLookup";
import { AssistanceForm } from "@/sections/trace/AssistanceForm";
import { Downloads } from "@/sections/trace/Downloads";
import { CTABand } from "@/sections/shared/CTABand";
import { ButtonLink } from "@/components/ui/Button";
import { hasDownloadAccess } from "@/lib/auth";
import { listDocuments } from "@/lib/db/queries";
import { TRACE } from "@/lib/data";
import { CONTACT, ROUTES, telLink } from "@/lib/site";

export const metadata: Metadata = {
  title: "Find Your Coupler — Batch Traceability",
  description:
    "Enter the batch number stamped on your AGBA coupler to trace the steel heat number, bar grade, size and NABL test certificate. Plus drawings, data sheets and technical downloads.",
  alternates: { canonical: "/find-your-coupler" },
};

/** Batch records and documents are read from SQLite per request. */
export const dynamic = "force-dynamic";

export default async function FindYourCouplerPage() {
  const documents = listDocuments();
  const unlocked = await hasDownloadAccess();

  return (
    <>
      <PageHero
        eyebrow={TRACE.eyebrow}
        title={TRACE.title}
        lede={TRACE.lede}
        wide
      >
        <div className="max-w-2xl">
          <BatchLookup />
        </div>
      </PageHero>

      {/* --- how traceability works --- */}
      <Section id="traceability">
        <div className="container-x">
          <SectionHeading
            eyebrow={TRACE.steps.eyebrow}
            title={TRACE.steps.title}
          />

          <Reveal delay={0.1} className="mt-12">
            <div className="panel overflow-x-auto p-6 sm:p-8">
              <TraceChain className="h-auto w-full min-w-[46rem]" />
            </div>
          </Reveal>

          <RevealGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {TRACE.steps.items.map((s, i) => (
              <RevealItem key={s.title}>
                <article className="panel panel-hover group h-full p-7">
                  <span className="data text-xs text-red">0{i + 1}</span>
                  <h3 className="mt-4 font-display text-lg font-semibold text-heading">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {s.body}
                  </p>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </Section>

      {/* --- can't find your batch: the two CTAs + assistance form --- */}
      <Section id="cant-find" className="bg-surface">
        <div className="container-x grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <span className="eyebrow">Support</span>
            <h2 className="mt-5 font-display text-3xl font-semibold uppercase sm:text-4xl">
              {TRACE.cantFind.title}
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted">
              {TRACE.cantFind.body}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href={`${ROUTES.contact}#enquiry`}>
                Request Your Quote
              </ButtonLink>
              <ButtonLink href="#assistance-form" variant="ghost">
                Request Assistance
              </ButtonLink>
            </div>

            <p className="mt-6 text-sm text-muted">
              Or call our QC team directly on{" "}
              <a
                href={telLink(CONTACT.phones[0].tel)}
                className="data text-red underline underline-offset-4 hover:text-red-bright"
              >
                {CONTACT.phones[0].display}
              </a>
              .
            </p>
          </Reveal>

          <Reveal delay={0.12} direction="left">
            <div id="assistance-form" className="panel p-6 sm:p-8">
              <AssistanceForm />
            </div>
          </Reveal>
        </div>
      </Section>

      {/* --- downloads --- */}
      <Section id="downloads">
        <div className="container-x">
          <SectionHeading
            eyebrow={TRACE.downloads.eyebrow}
            title={TRACE.downloads.title}
            lede={TRACE.downloads.lede}
          />
          <Downloads documents={documents} unlocked={unlocked} />
        </div>
      </Section>

      <CTABand />
    </>
  );
}
