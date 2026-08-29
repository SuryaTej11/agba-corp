"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Knowledge Center — parallel thread form to IS 16172:2023 Annex G, with the
 * three things a gauge actually checks called out: pitch, flank angle and
 * thread depth.
 */
export function ThreadProfile({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // A repeating trapezoidal thread form.
  const teeth = Array.from({ length: 7 }, (_, i) => {
    const x = 60 + i * 76;
    return `M${x} 150 L${x + 20} 92 L${x + 46} 92 L${x + 66} 150`;
  }).join(" ");

  return (
    <svg
      viewBox="0 0 600 230"
      className={className}
      role="img"
      aria-label="Parallel thread profile to IS 16172:2023 Annex G, with pitch, flank angle and thread depth dimensioned."
    >
      {/* core */}
      <rect x="40" y="150" width="520" height="42" fill="var(--ill-fill)" stroke="var(--ill-mid)" strokeWidth="1.5" />

      {/* thread form */}
      <motion.path
        d={teeth}
        fill="none"
        stroke="var(--color-red)"
        strokeWidth="2"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={reduce ? { duration: 0 } : { duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* crest line — parallel, not tapered. That is the whole point. */}
      <path d="M40 92 H560" stroke="var(--ill-stroke)" strokeWidth="1" strokeDasharray="5 5" />
      <text
        x="564"
        y="88"
        fill="var(--ill-stroke)"
        fontSize="10"
        textAnchor="end"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        PARALLEL CREST — NO TAPER
      </text>

      {/* pitch dimension */}
      <g stroke="var(--ill-bright)" strokeWidth="1">
        <path d="M60 214 H136" />
        <path d="M60 208 v12 M136 208 v12" />
      </g>
      <text
        x="98"
        y="204"
        fill="var(--ill-bright)"
        fontSize="11"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        PITCH
      </text>

      {/* depth dimension */}
      <g stroke="var(--ill-bright)" strokeWidth="1">
        <path d="M290 92 V150" />
        <path d="M284 92 h12 M284 150 h12" />
      </g>
      <text
        x="300"
        y="126"
        fill="var(--ill-bright)"
        fontSize="11"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        DEPTH
      </text>

      {/* flank angle */}
      <path d="M212 150 L232 92" stroke="var(--color-ok)" strokeWidth="2" />
      <path
        d="M212 150 a34 34 0 0 1 12 -22"
        fill="none"
        stroke="var(--color-ok)"
        strokeWidth="1"
      />
      <text
        x="150"
        y="66"
        fill="var(--color-ok)"
        fontSize="11"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        FLANK ANGLE
      </text>
      <path d="M206 72 L214 128" stroke="var(--color-ok)" strokeWidth="1" strokeDasharray="3 3" />
    </svg>
  );
}
