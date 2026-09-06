"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Certification brandmark — the trust strip on the landing page.
 *
 * Each glyph depicts what its certificate actually covers, rather than being a
 * generic badge: the splice that IS 16172 governs, the plan-do-check-act loop
 * that ISO 9001 certifies, the head protection ISO 45001 is about, and the
 * tensile test a NABL lab performs.
 *
 * These are AGBA's own drawings, NOT the official certification marks. The ISI
 * (BIS) Standard Mark, a registrar's ISO mark and the NABL symbol are all
 * controlled artwork, released to the licence holder by the issuing body and
 * governed by its own usage rules — they are never approximated by hand. To
 * show a real mark here, drop in the artwork from AGBA's certificate and the
 * licence number that goes with it.
 */

export type CertKind = "standard" | "iso" | "safety" | "lab";

const glyphs: Record<CertKind, React.ReactNode> = {
  // the splice itself, inside a conformity ring — IS 16172 governs exactly
  // this: two bars joined end to end through a coupler
  standard: (
    <>
      <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M11 24h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <rect
        x="18"
        y="18.5"
        width="12"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M24 18.5v11" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
      <path d="M30 24h7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </>
  ),
  // plan-do-check-act loop with a tick — the continual-improvement cycle a
  // certified ISO 9001 quality management system runs on
  iso: (
    <>
      <path
        d="M39 24a15 15 0 1 1-4.4-10.6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M35.5 5.5v9h-9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="m17 24.5 4.8 4.8L32 19"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  // hard hat — occupational health & safety
  safety: (
    <>
      <path
        d="M8 30a16 16 0 0 1 32 0"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      <path d="M5 30h38" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" />
      <path
        d="M19 15.5V9.5a1.5 1.5 0 0 1 1.5-1.5h7a1.5 1.5 0 0 1 1.5 1.5v6"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
        strokeLinejoin="round"
      />
      <path d="M24 8v-1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </>
  ),
  // a specimen under tension between two grips — the tensile test a NABL
  // accredited lab runs on every batch
  lab: (
    <>
      <path d="M4.5 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M8.5 20 4.5 24l4 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <rect
        x="13.5"
        y="18.5"
        width="21"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M20 18.5v11M28 18.5v11"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.5"
      />
      <path d="M37.5 24h6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      <path
        d="M39.5 20l4 4-4 4"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
};

export function CertBadge({
  kind,
  title,
  subtitle,
  index = 0,
  className,
}: {
  kind: CertKind;
  title: string;
  subtitle: string;
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={
        reduce
          ? { duration: 0 }
          : { duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }
      }
      className={cn(
        "panel panel-hover group flex flex-col items-center px-5 py-7 text-center",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        className={cn(
          "h-11 w-11 text-red transition-colors duration-500 group-hover:text-red-bright",
        )}
        aria-hidden="true"
      >
        {glyphs[kind]}
      </svg>

      <p className="data mt-5 text-[0.8rem] font-medium tracking-[0.1em] text-heading uppercase">
        {title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{subtitle}</p>
    </motion.div>
  );
}
