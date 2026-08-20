"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Certification brandmark — the trust strip on the landing page.
 *
 * Each mark is drawn, not photographed, so the strip stays crisp and there is
 * no licensing question over borrowed certification artwork.
 *
 * NOTE FOR THE ISI MARK:
 * `reserved` renders an explicitly empty, labelled slot. AGBA's ISI (BIS)
 * licence artwork and CM/L number are not yet confirmed, and a certification
 * mark must never be drawn speculatively — swap `reserved` for a real
 * `<IsiMark />` and the licence number the moment the licence is in hand.
 */

export type CertKind = "standard" | "iso" | "safety" | "lab" | "reserved";

const glyphs: Record<CertKind, React.ReactNode> = {
  // shield + tick — conformity to a governing standard
  standard: (
    <>
      <path
        d="M24 5 40 11v13c0 10-7 16.5-16 19-9-2.5-16-9-16-19V11L24 5Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="m16.5 23.5 5 5 10-10"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </>
  ),
  // rosette — a certified management system
  iso: (
    <>
      <circle cx="24" cy="19" r="12" stroke="currentColor" strokeWidth="2" fill="none" />
      <circle cx="24" cy="19" r="6" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.55" />
      <path
        d="M17 29.5 13.5 43l10.5-5.5L34.5 43 31 29.5"
        stroke="currentColor"
        strokeWidth="2"
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
  // flask + certificate rule — independent laboratory testing
  lab: (
    <>
      <path
        d="M19 6v11L9.5 35a3 3 0 0 0 2.6 4.5h23.8A3 3 0 0 0 38.5 35L29 17V6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
        fill="none"
      />
      <path d="M16.5 6h15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 28h19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.55" />
    </>
  ),
  // dashed outline — the deliberately empty ISI slot
  reserved: (
    <>
      <rect
        x="8"
        y="8"
        width="32"
        height="32"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeDasharray="5 5"
        fill="none"
      />
      <path
        d="M24 18v12M18 24h12"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        opacity="0.6"
      />
    </>
  ),
};

export function CertBadge({
  kind,
  title,
  subtitle,
  note,
  index = 0,
  className,
}: {
  kind: CertKind;
  title: string;
  subtitle: string;
  note?: string;
  index?: number;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const muted = kind === "reserved";

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
        muted && "border-dashed opacity-70",
        className,
      )}
    >
      <svg
        viewBox="0 0 48 48"
        className={cn(
          "h-11 w-11 transition-colors duration-500",
          muted ? "text-muted-2" : "text-red group-hover:text-red-bright",
        )}
        aria-hidden="true"
      >
        {glyphs[kind]}
      </svg>

      <p className="data mt-5 text-[0.8rem] font-medium tracking-[0.1em] text-heading uppercase">
        {title}
      </p>
      <p className="mt-2 text-xs leading-relaxed text-muted">{subtitle}</p>
      {note && <p className="mt-3 text-[0.68rem] leading-relaxed text-muted-2">{note}</p>}
    </motion.div>
  );
}
