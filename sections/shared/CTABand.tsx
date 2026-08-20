import { ArrowRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CTA_BAND } from "@/lib/data";
import { ROUTES, waLink } from "@/lib/site";

export function CTABand() {
  return (
    <section className="on-dark relative overflow-hidden border-t border-line bg-deep">
      {/* hazard rule — the industrial cue used sparingly, only here */}
      <div className="hazard h-1.5 opacity-25" aria-hidden="true" />

      <div
        className="pointer-events-none absolute -left-32 top-1/2 h-[28rem] w-[28rem] -translate-y-1/2 rounded-full opacity-20 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(212,16,0,0.6) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative flex flex-col items-start gap-8 py-16 md:flex-row md:items-center md:justify-between md:py-20">
        <Reveal className="max-w-2xl">
          <h2 className="font-display text-3xl font-semibold uppercase sm:text-4xl">
            {CTA_BAND.title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            {CTA_BAND.body}
          </p>
        </Reveal>

        <Reveal delay={0.12} className="flex shrink-0 flex-wrap gap-3">
          <ButtonLink href={`${ROUTES.contact}#enquiry`}>
            Request a Quote
            <ArrowRight className="h-4 w-4" strokeWidth={2} />
          </ButtonLink>
          <ButtonLink href={waLink()} variant="ghost">
            <MessageCircle className="h-4 w-4" strokeWidth={2} />
            Chat on WhatsApp
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
