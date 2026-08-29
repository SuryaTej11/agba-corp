"use client";

import { motion, useReducedMotion } from "framer-motion";
import { diagramRoot, drawIn, fadeIn } from "./motion";

/**
 * Traceability chain for the Find Your Coupler hero: steel heat → forged and
 * threaded coupler → stamped batch number → signed certificate. The animated
 * pulse travelling the connector line is the "the proof travels with your
 * order" idea, drawn.
 */
export function TraceChain({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const nodes = [
    { label: "STEEL HEAT", sub: "H-24203-A" },
    { label: "FORGED + THREADED", sub: "GAUGE-VERIFIED" },
    { label: "BATCH STAMP", sub: "AGB-2504-0187" },
    { label: "NABL CERTIFICATE", sub: "SIGNED · PER BATCH" },
  ];

  return (
    <motion.svg
      viewBox="0 0 900 170"
      {...diagramRoot}
      className={className}
      role="img"
      aria-label="Traceability chain: the steel heat number carries through forging and threading to the batch number stamped on the coupler, and on to the signed NABL certificate issued for that batch."
    >
      {/* connector rail */}
      <line x1="70" y1="70" x2="830" y2="70" stroke="var(--ill-grid)" strokeWidth="2" />
      <motion.line
        x1="70"
        y1="70"
        x2="830"
        y2="70"
        stroke="var(--color-red)"
        strokeWidth="2"
        variants={drawIn(0, !!reduce)}
      />

      {/* travelling pulse */}
      {!reduce && (
        <motion.circle
          r="5"
          fill="#f5240f"
          cy="70"
          initial={{ cx: 70, opacity: 0 }}
          animate={{ cx: [70, 830], opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 2.6,
            delay: 1.2,
            repeat: Infinity,
            repeatDelay: 1.6,
            ease: "easeInOut",
          }}
        />
      )}

      {nodes.map((n, i) => {
        const x = 70 + i * 253.3;
        return (
          <motion.g
            key={n.label}
            variants={fadeIn(0.35 * i, !!reduce)}
          >
            <circle cx={x} cy="70" r="17" fill="var(--ill-deep)" stroke="var(--color-red)" strokeWidth="2" />
            <text
              x={x}
              y="76"
              fill="var(--color-red)"
              fontSize="13"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains-mono), monospace"
              fontWeight="500"
            >
              0{i + 1}
            </text>
            <text
              x={x}
              y="118"
              fill="var(--ill-bright)"
              fontSize="12"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains-mono), monospace"
              letterSpacing="0.08em"
            >
              {n.label}
            </text>
            <text
              x={x}
              y="138"
              fill="var(--ill-stroke)"
              fontSize="11"
              textAnchor="middle"
              fontFamily="var(--font-jetbrains-mono), monospace"
            >
              {n.sub}
            </text>
          </motion.g>
        );
      })}
    </motion.svg>
  );
}
