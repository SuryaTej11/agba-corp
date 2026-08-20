"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Shared inner-page hero: eyebrow, display heading, lede, plus an optional
 * slot for a page-specific element (the batch lookup form, an illustration).
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  children,
  wide = false,
}: {
  eyebrow: string;
  title: ReactNode;
  lede?: ReactNode;
  children?: ReactNode;
  wide?: boolean;
}) {
  const reduce = useReducedMotion();

  const rise = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: reduce ? 0.3 : 0.8,
      delay,
      ease: [0.16, 1, 0.3, 1] as const,
    },
  });

  return (
    <section className="relative overflow-hidden border-b border-line">
      <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-32 -top-24 h-[32rem] w-[32rem] rounded-full opacity-20 blur-[110px]"
        style={{
          background: "radial-gradient(circle, rgba(212,16,0,0.55) 0%, transparent 65%)",
        }}
        aria-hidden="true"
      />

      <div className="container-x relative py-14 md:py-28">
        <motion.span className="eyebrow" {...rise(0)}>
          {eyebrow}
        </motion.span>

        <motion.h1
          className={`mt-6 font-display text-[2rem] font-semibold uppercase leading-[1.02] xs:text-[2.4rem] sm:text-5xl lg:text-6xl ${
            wide ? "max-w-5xl" : "max-w-3xl"
          }`}
          {...rise(0.08)}
        >
          {title}
        </motion.h1>

        {lede && (
          <motion.p
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
            {...rise(0.18)}
          >
            {lede}
          </motion.p>
        )}

        {children && (
          <motion.div className="mt-10" {...rise(0.26)}>
            {children}
          </motion.div>
        )}
      </div>
    </section>
  );
}
