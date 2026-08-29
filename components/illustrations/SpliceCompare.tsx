"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * Lap splice vs mechanical splice — used inside "What is a Coupler?".
 *
 * The lap relies on the concrete to carry load between two overlapping bars,
 * so it needs a long overlap and it crowds the cage. The mechanical splice
 * transfers load through the coupler body, so its length is fixed.
 */
export function SpliceCompare({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const slide = (delay: number, from: number) => ({
    initial: { opacity: 0, x: from },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-15%" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const rib = (x: number, y: number, n: number, w = 14) =>
    Array.from({ length: n }).map((_, i) => (
      <path
        key={`${x}-${y}-${i}`}
        d={`M${x + i * w} ${y} l7 22`}
        stroke="var(--ill-stroke)"
        strokeWidth="1.2"
      />
    ));

  return (
    <svg
      viewBox="0 0 620 300"
      className={className}
      role="img"
      aria-label="A lap splice needs a long overlap of two bars carrying load through the concrete, while a mechanical splice transfers load through the coupler body over a short fixed length."
    >
      {/* ================= LAP SPLICE ================= */}
      <text
        x="0"
        y="22"
        fill="var(--ill-stroke)"
        fontSize="11"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.12em"
      >
        LAP SPLICE
      </text>

      <motion.g {...slide(0, -30)}>
        <rect x="0" y="46" width="330" height="22" fill="var(--ill-fill)" stroke="var(--ill-mid)" strokeWidth="1.2" />
        {rib(6, 46, 23)}
      </motion.g>
      <motion.g {...slide(0.12, 30)}>
        <rect x="180" y="74" width="440" height="22" fill="var(--ill-fill)" stroke="var(--ill-mid)" strokeWidth="1.2" />
        {rib(186, 74, 30)}
      </motion.g>

      {/* overlap dimension */}
      <g stroke="var(--color-red)" strokeWidth="1.2">
        <path d="M180 116 h150" />
        <path d="M180 110 v12 M330 110 v12" />
      </g>
      <text
        x="255"
        y="136"
        fill="var(--color-red)"
        fontSize="11"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        LONG OVERLAP · 40–60 Ø
      </text>
      <text
        x="348"
        y="60"
        fill="var(--ill-stroke)"
        fontSize="10"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        LOAD PASSES THROUGH THE CONCRETE
      </text>

      {/* ================= MECHANICAL SPLICE ================= */}
      <text
        x="0"
        y="192"
        fill="var(--color-red)"
        fontSize="11"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.12em"
      >
        MECHANICAL SPLICE
      </text>

      <motion.g {...slide(0.25, -30)}>
        <rect x="0" y="216" width="248" height="22" fill="var(--ill-fill)" stroke="var(--ill-mid)" strokeWidth="1.2" />
        {rib(6, 216, 17)}
      </motion.g>
      <motion.g {...slide(0.25, 30)}>
        <rect x="372" y="216" width="248" height="22" fill="var(--ill-fill)" stroke="var(--ill-mid)" strokeWidth="1.2" />
        {rib(378, 216, 17)}
      </motion.g>

      {/* coupler body */}
      <motion.g
        initial={{ opacity: 0, scale: 0.7 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={reduce ? { duration: 0 } : { duration: 0.6, delay: 0.5 }}
        style={{ transformOrigin: "310px 227px" }}
      >
        <rect
          x="248"
          y="204"
          width="124"
          height="46"
          rx="2"
          fill="url(#coupler-g)"
          stroke="var(--color-red)"
          strokeWidth="2"
        />
        {Array.from({ length: 9 }).map((_, i) => (
          <path
            key={i}
            d={`M${256 + i * 13} 204 v46`}
            stroke="var(--ill-deep)"
            strokeWidth="1.5"
            opacity="0.6"
          />
        ))}
      </motion.g>

      {/* fixed-length dimension */}
      <g stroke="var(--color-ok)" strokeWidth="1.2">
        <path d="M248 268 h124" />
        <path d="M248 262 v12 M372 262 v12" />
      </g>
      <text
        x="310"
        y="288"
        fill="var(--color-ok)"
        fontSize="11"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
      >
        FIXED LENGTH · INDEPENDENT OF CONCRETE
      </text>

      <defs>
        <linearGradient id="coupler-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ill-mid)" />
          <stop offset="100%" stopColor="var(--ill-fill)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
