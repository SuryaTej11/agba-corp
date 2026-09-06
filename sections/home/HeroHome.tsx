"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ScanLine } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { Counter } from "@/components/ui/Counter";
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
 * Hero product illustration — a three-quarter view of the coupler with the
 * AGBA mark debossed on the body, drawn rather than photographed.
 *
 * PHOTO SLOT: when the client sends factory/product photography, this is the
 * element to replace with a next/image fill.
 */
function HeroCoupler() {
  const reduce = useReducedMotion();

  return (
    <div className="panel relative aspect-[4/3.4] overflow-hidden">
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

      <svg
        viewBox="0 0 460 380"
        className="h-full w-full"
        role="img"
        aria-label="Three-quarter view of an AGBA parallel-thread rebar coupler with threaded rebar entering each end."
      >
        <defs>
          <linearGradient id="steel" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--steel-1)" />
            <stop offset="38%" stopColor="var(--steel-2)" />
            <stop offset="62%" stopColor="var(--steel-3)" />
            <stop offset="100%" stopColor="var(--steel-4)" />
          </linearGradient>
          <linearGradient id="bar" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--bar-1)" />
            <stop offset="50%" stopColor="var(--bar-2)" />
            <stop offset="100%" stopColor="var(--ill-deep)" />
          </linearGradient>
        </defs>

        {/* rebar, left and right */}
        {[
          { x: 10, w: 120 },
          { x: 330, w: 120 },
        ].map((b) => (
          <g key={b.x}>
            <rect x={b.x} y="163" width={b.w} height="54" rx="6" fill="url(#bar)" />
            {Array.from({ length: 7 }).map((_, i) => (
              <path
                key={i}
                d={`M${b.x + 10 + i * 16} 163 l12 54`}
                stroke="var(--steel-1)"
                strokeWidth="3"
                opacity="0.65"
              />
            ))}
          </g>
        ))}

        {/* coupler body */}
        <g>
          <rect x="118" y="128" width="224" height="124" rx="10" fill="url(#steel)" />
          {/* knurl bands */}
          {Array.from({ length: 26 }).map((_, i) => (
            <path
              key={i}
              d={`M${126 + i * 8.4} 128 v124`}
              stroke="var(--ill-deep)"
              strokeWidth="1.6"
              opacity="0.4"
            />
          ))}
          {/* chamfered ends */}
          <rect x="118" y="128" width="12" height="124" fill="var(--ill-deep)" opacity="0.55" />
          <rect x="330" y="128" width="12" height="124" fill="var(--ill-deep)" opacity="0.55" />
          {/* top highlight */}
          <rect x="118" y="132" width="224" height="12" rx="6" fill="var(--steel-1)" opacity="0.35" />
        </g>

        {/* debossed AGBA mark */}
        <g transform="translate(230 190)" opacity="0.85">
          <path
            d="M0 -34 L30 20 H-30 Z"
            fill="none"
            stroke="var(--ill-deep)"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <path
            d="M0 -34 L30 20 H-30 Z"
            fill="none"
            stroke="var(--ill-stroke)"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <path d="M0 -12 L14 14 H-14 Z" fill="none" stroke="var(--ill-stroke)" strokeWidth="1.4" opacity="0.7" />
        </g>

        {/* laser batch stamp — the number that resolves on Find Your Coupler */}
        <text
          x="230"
          y="238"
          fill="var(--ill-stroke)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          letterSpacing="0.14em"
        >
          AGB-2504-0187
        </text>

        {/* sweeping specular highlight */}
        {!reduce && (
          <motion.rect
            x="118"
            y="128"
            width="46"
            height="124"
            fill="var(--ill-bright)"
            opacity="0.07"
            initial={{ x: 100 }}
            animate={{ x: [100, 320, 100] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          />
        )}

        {/* dimension line under the assembly */}
        <g stroke="var(--ill-mid)" strokeWidth="1">
          <path d="M118 300 H342" />
          <path d="M118 294 v12 M342 294 v12" />
        </g>
        <text
          x="230"
          y="322"
          fill="var(--ill-stroke)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
          letterSpacing="0.1em"
        >
          OD 48 mm · WALL 7.75 mm
        </text>
      </svg>

      <span className="data absolute left-5 top-5 text-[0.62rem] tracking-[0.2em] text-muted-2">
        PARALLEL-THREAD COUPLER
      </span>
    </div>
  );
}
