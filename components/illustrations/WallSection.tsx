"use client";

import { motion, useReducedMotion } from "framer-motion";
import { diagramRoot, fadeIn, growIn } from "./motion";

/**
 * "Slimmer Wall, Stronger Outcome" — cross-section comparison.
 *
 * Both couplers are drawn on the same 32 mm bar at the same scale, inside the
 * same clear-cover envelope, so the difference in concrete flow path is the
 * thing you actually see rather than a number you have to trust.
 */
export function WallSection({
  variant,
  className,
}: {
  variant: "agba" | "conventional";
  className?: string;
}) {
  const reduce = useReducedMotion();
  const agba = variant === "agba";

  // Scale: 1 mm ≈ 1.9 px. Bar Ø32. AGBA OD 53 (wall 7.75), conventional OD 60.
  const cx = 150;
  const cy = 150;
  const rBar = 30;
  const rOuter = agba ? 50 : 57;
  const accent = agba ? "var(--color-red)" : "var(--ill-stroke)";

  // Variants driven by the root <motion.svg> — see ./motion.ts.
  const grow = { variants: growIn(0, !!reduce) };

  return (
    <motion.svg
      viewBox="0 0 300 300"
      {...diagramRoot}
      className={className}
      role="img"
      aria-label={
        agba
          ? "Cross-section of the AGBA coupler on a 32 mm bar: 53 mm outside diameter, 7.75 mm wall, leaving clear space for concrete to flow around it."
          : "Cross-section of a conventional coupler on the same 32 mm bar: 58 to 62 mm outside diameter with a 10 to 12 mm wall, crowding the clear cover."
      }
    >
      {/* clear-cover envelope — identical in both drawings */}
      <circle
        cx={cx}
        cy={cy}
        r="76"
        fill="none"
        stroke="var(--ill-grid)"
        strokeWidth="1"
        strokeDasharray="4 6"
      />
      <text
        x={cx}
        y="52"
        fill="var(--ill-stroke)"
        fontSize="10"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.1em"
      >
        CLEAR COVER ENVELOPE
      </text>

      {/* concrete aggregate trying to pass — sparse when there is room,
          jammed against the body when there is not */}
      <motion.g fill="var(--ill-mid)">
        {[
          [cx, cy - 68],
          [cx + 48, cy - 48],
          [cx + 68, cy],
          [cx + 48, cy + 48],
          [cx, cy + 68],
          [cx - 48, cy + 48],
          [cx - 68, cy],
          [cx - 48, cy - 48],
        ].map(([x, y], i) => (
          <motion.circle
            key={i}
            cx={x}
            cy={y}
            r={agba ? 7 : 9}
            fill={agba ? "var(--ill-mid)" : "var(--ill-warn)"}
            variants={fadeIn(0.5 + i * 0.05, !!reduce)}
          />
        ))}
      </motion.g>

      <motion.g {...grow} style={{ transformOrigin: `${cx}px ${cy}px` }}>
        {/* coupler body wall */}
        <circle
          cx={cx}
          cy={cy}
          r={rOuter}
          fill="var(--ill-fill)"
          stroke={accent}
          strokeWidth="2.5"
        />
        {/* wall hatching */}
        <mask id={`wall-${variant}`}>
          <circle cx={cx} cy={cy} r={rOuter} fill="#fff" />
          <circle cx={cx} cy={cy} r={rBar} fill="#000" />
        </mask>
        <g mask={`url(#wall-${variant})`}>
          {Array.from({ length: 26 }).map((_, i) => (
            <path
              key={i}
              d={`M${cx - 70 + i * 6} ${cy - 70} l70 70`}
              stroke="var(--ill-mid)"
              strokeWidth="1"
            />
          ))}
        </g>

        {/* the bar itself, ribbed */}
        <circle cx={cx} cy={cy} r={rBar} fill="var(--ill-deep)" stroke="var(--ill-stroke)" strokeWidth="1.5" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          return (
            <path
              key={i}
              d={`M${cx + Math.cos(a) * (rBar - 6)} ${cy + Math.sin(a) * (rBar - 6)}
                  L${cx + Math.cos(a) * rBar} ${cy + Math.sin(a) * rBar}`}
              stroke="var(--ill-stroke)"
              strokeWidth="1.5"
            />
          );
        })}
      </motion.g>

      {/* wall dimension arrow */}
      <g stroke={accent} strokeWidth="1.25">
        <path d={`M${cx} ${cy - rBar} V${cy - rOuter}`} />
        <path d={`M${cx - 4} ${cy - rBar} h8 M${cx - 4} ${cy - rOuter} h8`} />
      </g>
      <text
        x={cx + 10}
        y={cy - (rBar + rOuter) / 2 + 4}
        fill={accent}
        fontSize="12"
        fontFamily="var(--font-jetbrains-mono), monospace"
        fontWeight="500"
      >
        {agba ? "7.75" : "10–12"}
      </text>

      {/* OD label */}
      <text
        x={cx}
        y="272"
        fill="var(--ill-bright)"
        fontSize="13"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.08em"
      >
        OD {agba ? "53 mm" : "58–62 mm"}
      </text>
      <text
        x={cx}
        y="290"
        fill="var(--ill-stroke)"
        fontSize="10"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), monospace"
        letterSpacing="0.1em"
      >
        ON A Ø32 BAR
      </text>
    </motion.svg>
  );
}
