"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ScanLine } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
import couplerHero from "@/public/images/coupler-hero.jpg";
import { HERO } from "@/lib/data";
import { ROUTES } from "@/lib/site";

export function HeroHome() {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.3 : 0.9,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden">
      {/* engineering-drawing grid + a red bloom behind the product */}
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-0 top-10 h-[42rem] w-[42rem] rounded-full opacity-25 blur-[120px]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,16,0,0.55) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative grid items-center gap-12 py-14 md:py-28 lg:grid-cols-[1.05fr_0.95fr] lg:py-32">
        {/* ---------------------------------------------------- copy ---- */}
        <div>
          <motion.span className="eyebrow" {...rise(0)}>
            {HERO.eyebrow}
          </motion.span>

          <h1 className="mt-6 font-display text-[2.1rem] font-semibold uppercase leading-[0.98] xs:text-[2.5rem] sm:text-6xl lg:text-[4.25rem]">
            <motion.span className="block" {...rise(0.08)}>
              {HERO.titleTop}
            </motion.span>
            <motion.span className="block text-red" {...rise(0.16)}>
              {HERO.titleAccent}
            </motion.span>
            <motion.span className="block" {...rise(0.24)}>
              {HERO.titleBottom}
            </motion.span>
          </h1>

          <motion.p
            className="mt-7 max-w-xl text-base leading-relaxed text-muted md:text-lg"
            {...rise(0.34)}
          >
            {HERO.lede}
          </motion.p>

          <motion.div
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
            {...rise(0.42)}
          >
            <ButtonLink href={`${ROUTES.contact}#enquiry`} className="w-full sm:w-auto">
              Request a Quote
              <ArrowRight className="h-4 w-4" strokeWidth={2} />
            </ButtonLink>
            <ButtonLink href={ROUTES.trace} variant="ghost" className="w-full sm:w-auto">
              <ScanLine className="h-4 w-4" strokeWidth={2} />
              Verify Your Batch
            </ButtonLink>
          </motion.div>

          {/* --- spec stats --- */}
          <motion.dl
            className="mt-10 grid grid-cols-2 gap-px overflow-hidden border border-line bg-line sm:mt-14 sm:grid-cols-4"
            {...rise(0.5)}
          >
            {HERO.stats.map((s) => (
              <div key={s.label} className="group bg-page px-4 py-5 transition-colors hover:bg-surface">
                {/* "Class L & H" is the longest value — sized so it holds one
                    line in the narrowest column. */}
                <dt className="font-display text-lg font-semibold leading-tight text-heading sm:text-xl">
                  {"count" in s && s.count ? (
                    <>
                      <Counter to={s.count} />
                      {s.unit}
                    </>
                  ) : (
                    <>
                      {s.value}
                      {s.unit}
                    </>
                  )}
                </dt>
                <dd className="data mt-1.5 text-[0.7rem] uppercase tracking-wider text-muted-2">
                  {s.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        {/* ------------------------------------------------ product ---- */}
        <motion.div
          className="relative"
          initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.94, x: 30 }}
          animate={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: reduce ? 0.3 : 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <HeroCoupler />
        </motion.div>
      </div>

      {/* --- certification ticker --- */}
      <div className="relative border-y border-line bg-surface/60 py-4">
        <div className="flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
          <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
            {[...Array(2)].flatMap((_, dup) =>
              [
                "IS 16172:2023 · CLASS L & H",
                "ISO 9001:2015",
                "ISO 45001:2018",
                "NABL TESTED · EVERY BATCH",
                "COLD-FORGED BAR ENDS",
                "100% GO / NO-GO GAUGED",
                "Ø12–40 MM · Fe 500D / 550D",
                "PAN-INDIA DISPATCH",
              ].map((t) => (
                <span
                  key={`${dup}-${t}`}
                  className="data flex shrink-0 items-center gap-10 text-xs tracking-[0.14em] text-muted-2"
                >
                  {t}
                  <span className="h-1 w-1 rounded-full bg-red" aria-hidden="true" />
                </span>
              )),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * Hero product plate — the H32 coupler as photographed by AGBA, showing the
 * laser-marked ring (batch, class, BIS licence) and the parallel thread that
 * the rest of the page argues about.
 *
 * This replaces the drawn placeholder that stood here until AGBA supplied
 * product photography. The registration ticks are kept: they framed the
 * drawing and they frame the plate.
 */
function HeroCoupler() {
  return (
    <div className="panel relative aspect-[4/3.4] overflow-hidden bg-deep">
      <Image
        src={couplerHero}
        alt="An AGBA H32 coupler, its ring laser-marked with the batch number, Fe 550D class and BIS licence, the parallel thread visible inside the bore."
        placeholder="blur"
        sizes="(min-width: 1024px) 46vw, 100vw"
        className="h-full w-full object-cover"
        priority
      />

      {/* corner registration ticks */}
      {[
        "left-3 top-3 border-l border-t",
        "right-3 top-3 border-r border-t",
        "left-3 bottom-3 border-b border-l",
        "right-3 bottom-3 border-b border-r",
      ].map((c) => (
        <span
          key={c}
          className={`absolute h-4 w-4 border-red/60 ${c}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}
