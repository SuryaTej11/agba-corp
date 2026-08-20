"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * "What is a Coupler?" — annotated cutaway of a completed splice.
 *
 * Two rebar ends, cold-upset and parallel-threaded, meeting inside the coupler
 * body. Callout leaders point at the four things that matter: the upset, the
 * thread, the engagement length and the wall.
 */
export function CouplerAnatomy({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    whileInView: { pathLength: 1, opacity: 1 },
    viewport: { once: true, margin: "-15%" },
    transition: reduce
      ? { duration: 0 }
      : { duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  const fade = (delay: number) => ({
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true, margin: "-15%" },
    transition: reduce ? { duration: 0 } : { duration: 0.5, delay },
  });

  return (
    <svg
      viewBox="0 0 760 340"
      className={className}
      role="img"
      aria-label="Cutaway of a parallel-thread rebar coupler: two cold-upset, threaded bar ends meeting inside the coupler body, with the engagement length and wall thickness marked."
    >
      {/* ---- ribbed rebar, left ------------------------------------------ */}
      <g stroke="var(--ill-stroke)" strokeWidth="1.5" fill="none">
        <rect x="20" y="150" width="150" height="40" rx="2" />
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.path
            key={`rib-l-${i}`}
            d={`M${34 + i * 16} 150 l10 40`}
            {...draw(0.02 * i)}
          />
        ))}
      </g>

      {/* ---- cold-upset transition, left --------------------------------- */}
      <motion.path
        d="M170 150 q16 -6 26 -13 h10 v106 h-10 q-10 -7 -26 -13 Z"
        fill="var(--ill-fill)"
        stroke="#d41000"
        strokeWidth="2"
        {...draw(0.25)}
      />

      {/* ---- coupler body ------------------------------------------------
           Drawn before the threads so the cutaway reads correctly: the
           threaded bar ends sit *inside* the body, not behind it. */}
      <motion.g {...fade(0.55)}>
        <rect
          x="196"
          y="112"
          width="368"
          height="116"
          rx="3"
          fill="url(#body)"
          stroke="#d41000"
          strokeWidth="2"
        />
        {/* wall hatching, top and bottom — the 7.5 mm section */}
        <rect x="196" y="112" width="368" height="25" fill="var(--ill-deep)" opacity="0.85" />
        <rect x="196" y="203" width="368" height="25" fill="var(--ill-deep)" opacity="0.85" />
        {Array.from({ length: 30 }).map((_, i) => (
          <path
            key={`hatch-${i}`}
            d={`M${200 + i * 12} 112 l12 25 M${200 + i * 12} 203 l12 25`}
            stroke="var(--ill-mid)"
            strokeWidth="1"
          />
        ))}
        {/* centre joint line — where the two bar ends meet */}
        <path
          d="M380 112 v116"
          stroke="var(--ill-stroke)"
          strokeWidth="1"
          strokeDasharray="4 5"
        />
      </motion.g>

      {/* ---- parallel threads, both bar ends, inside the body ------------ */}
      {[206, 422].map((x0, side) => (
        <g key={x0} stroke="var(--ill-bright)" strokeWidth="1.4" fill="none" opacity="0.9">
          <rect x={x0} y="137" width="132" height="66" fill="var(--ill-deep)" />
          {Array.from({ length: 11 }).map((_, i) => (
            <motion.path
              key={`th-${side}-${i}`}
              d={`M${x0 + 6 + i * 12} 137 l6 12 M${x0 + 6 + i * 12} 203 l6 -12`}
              {...draw(0.35 + 0.02 * i)}
            />
          ))}
        </g>
      ))}

      {/* ---- cold-upset transition, right -------------------------------- */}
      <motion.path
        d="M590 150 q-16 -6 -26 -13 h-10 v106 h10 q10 -7 26 -13 Z"
        fill="var(--ill-fill)"
        stroke="#d41000"
        strokeWidth="2"
        {...draw(0.25)}
      />

      {/* ---- ribbed rebar, right ----------------------------------------- */}
      <g stroke="var(--ill-stroke)" strokeWidth="1.5" fill="none">
        <rect x="590" y="150" width="150" height="40" rx="2" />
        {Array.from({ length: 9 }).map((_, i) => (
          <motion.path
            key={`rib-r-${i}`}
            d={`M${604 + i * 16} 150 l10 40`}
            {...draw(0.02 * i)}
          />
        ))}
      </g>

      {/* ---- annotations -------------------------------------------------- */}
      <motion.g {...fade(0.9)}>
        <g
          stroke="#d41000"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
        >
          <path d="M186 168 v-78 h-70" />
          <path d="M272 137 v-60 h-40" />
          <path d="M380 228 v52 h-70" />
          <path d="M520 228 v34 h96" />
          <path d="M660 150 v-78 h20" />
        </g>

        <g
          fill="var(--ill-bright)"
          fontSize="12"
          fontFamily="var(--font-jetbrains-mono), monospace"
          letterSpacing="0.06em"
        >
          <text x="18" y="86" fill="#d41000">
            01
          </text>
          <text x="40" y="86">
            COLD-UPSET BAR END
          </text>
          <text x="150" y="73" fill="#d41000">
            02
          </text>
          <text x="172" y="73">
            PARALLEL THREAD
          </text>
          <text x="238" y="296" fill="#d41000">
            03
          </text>
          <text x="260" y="296">
            BAR ENDS MEET
          </text>
          <text x="618" y="266" fill="#d41000">
            04
          </text>
          <text x="640" y="266">
            7.5 mm WALL
          </text>
          <text x="662" y="68" fill="#d41000">
            05
          </text>
          <text x="684" y="68">
            REBAR
          </text>
        </g>

        {/* engagement-length dimension line */}
        <g stroke="var(--ill-stroke)" strokeWidth="1">
          <path d="M206 320 h348" />
          <path d="M206 314 v12 M554 314 v12" />
        </g>
        <text
          x="380"
          y="312"
          fill="var(--ill-label)"
          fontSize="11"
          textAnchor="middle"
          fontFamily="var(--font-jetbrains-mono), monospace"
        >
          FULL THREAD ENGAGEMENT
        </text>
      </motion.g>

      <defs>
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--ill-fill-2)" />
          <stop offset="50%" stopColor="var(--ill-mid)" />
          <stop offset="100%" stopColor="var(--ill-fill)" />
        </linearGradient>
      </defs>
    </svg>
  );
}
