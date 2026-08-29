"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * "Forged Before Threaded" — the grain-flow comparison.
 *
 * `variant="machined"`: threads cut straight into the bar. Grain lines are
 * severed at every thread root and the net section is reduced.
 * `variant="forged"`: the bar end is cold-upset first, so grain flows around
 * the thread form and the original section is preserved.
 */
export function GrainFlow({
  variant,
  className,
}: {
  variant: "machined" | "forged";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const machined = variant === "machined";
  const accent = machined ? "var(--color-red)" : "var(--color-ok)";

  const anim = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-15%" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <svg
      viewBox="0 0 420 220"
      className={className}
      role="img"
      aria-label={
        machined
          ? "Threads machined directly into the bar: the grain lines are cut through at every thread root and the load-bearing section is reduced."
          : "The bar end is cold-upset before threading: grain lines flow around the thread form and the full original section is preserved."
      }
    >
      {/* bar body */}
      <rect
        x="12"
        y="76"
        width="140"
        height="68"
        fill="var(--ill-fill)"
        stroke="var(--ill-mid)"
        strokeWidth="1.5"
      />

      {/* upset shoulder — only on the forged variant */}
      {!machined && (
        <motion.path
          d="M152 76 q22 -10 34 -18 h6 v104 h-6 q-12 -8 -34 -18 Z"
          fill="var(--ill-fill-2)"
          stroke={accent}
          strokeWidth="2"
          {...anim(0.1)}
        />
      )}

      {/* threaded zone */}
      <rect
        x={machined ? 152 : 192}
        y={machined ? 88 : 58}
        width={machined ? 216 : 176}
        height={machined ? 44 : 104}
        fill="var(--ill-deep)"
        stroke="var(--ill-mid)"
        strokeWidth="1.5"
      />

      {/* thread teeth */}
      <g stroke="var(--ill-label)" strokeWidth="1.4" fill="none">
        {Array.from({ length: machined ? 13 : 11 }).map((_, i) =>
          machined ? (
            <motion.path
              key={i}
              d={`M${160 + i * 16} 88 l8 14 M${160 + i * 16} 132 l8 -14`}
              {...anim(0.2 + i * 0.02)}
            />
          ) : (
            <motion.path
              key={i}
              d={`M${200 + i * 15} 58 l7 14 M${200 + i * 15} 162 l7 -14`}
              {...anim(0.3 + i * 0.02)}
            />
          ),
        )}
      </g>

      {/* --- grain lines: the whole point of the diagram --- */}
      <g fill="none" strokeWidth="1.2">
        {Array.from({ length: 7 }).map((_, i) => {
          const y = 84 + i * 9;
          return machined ? (
            /* cut clean through at the thread boundary, then stop dead */
            <motion.path
              key={i}
              d={`M16 ${y} H150 M${152} ${y} H${360}`}
              stroke="var(--color-red)"
              strokeDasharray="9 7"
              opacity={0.75}
              {...anim(0.45 + i * 0.05)}
            />
          ) : (
            /* swept up and over the upset, continuous end to end */
            <motion.path
              key={i}
              d={`M16 ${y} H146 Q176 ${y} 192 ${68 + i * 13} H364`}
              stroke="var(--color-ok)"
              opacity={0.75}
              {...anim(0.45 + i * 0.05)}
            />
          );
        })}
      </g>

      {/* section callout */}
      <g stroke={accent} strokeWidth="1" strokeDasharray="3 3">
        <path d={machined ? "M300 88 v-30" : "M320 58 v-24"} />
      </g>
      <text
        x={machined ? 296 : 316}
        y={machined ? 50 : 46}
        fill={accent}
        fontSize="11"
        textAnchor="end"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.05em"
      >
        {machined ? "SECTION REDUCED" : "SECTION PRESERVED"}
      </text>

      <text
        x="16"
        y="196"
        fill="var(--ill-stroke)"
        fontSize="11"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.08em"
      >
        {machined ? "GRAIN SEVERED AT EVERY ROOT" : "GRAIN FLOWS THROUGH THE THREAD"}
      </text>
    </svg>
  );
}
