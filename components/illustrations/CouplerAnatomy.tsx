"use client";

import { motion, useReducedMotion } from "framer-motion";
import { diagramRoot, drawIn, fadeIn } from "./motion";

/**
 * "What is a Coupler?" — annotated cutaway of a completed splice.
 *
 * Two rebar ends, cold-upset and parallel-threaded, meeting inside the coupler
 * body. Callout leaders point at the four things that matter: the upset, the
 * thread, the engagement length and the wall.
 *
 * Drawn to true proportion for a 32 mm bar in the AGBA coupler, so the splice
 * reads as one continuous member rather than a bar that balloons on entry:
 *
 *   coupler OD 53 mm → 116 units   (2.189 units/mm)
 *   bore / threaded end 37.5 mm → 82
 *   bar 32 mm → 70, drawn 68 so the upset step stays visible
 *   wall 7.75 mm → 17 each side    (116 − 82) / 2 ✓
 *
 * Everything is symmetric about the y = 170 axis. If you change one height,
 * recompute the rest from the table above — the wall must stay (OD − bore) / 2
 * or the 7.75 mm callout stops being true.
 */
export function CouplerAnatomy({ className }: { className?: string }) {
  const reduce = useReducedMotion();

  // Variants, driven by the root <motion.svg> — see ./motion.ts for why this
  // must not be a per-element whileInView.
  const draw = (delay: number) => ({ variants: drawIn(delay, !!reduce) });
  const fade = (delay: number) => ({ variants: fadeIn(delay, !!reduce) });

  return (
    <motion.svg
      viewBox="0 0 760 340"
      className={className}
      role="img"
      {...diagramRoot}
      aria-label="Cutaway of a parallel-thread rebar coupler, drawn to scale for a 32 mm bar: two cold-upset, threaded bar ends meeting inside a 53 mm coupler body, with the engagement length and the 7.75 mm wall marked."
    >
      {/* ---- ribbed rebar, left ------------------------------------------ */}
      <motion.g stroke="var(--ill-stroke)" strokeWidth="1.5" fill="none">
        <rect x="20" y="136" width="150" height="68" rx="2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={`rib-l-${i}`}
            d={`M${26 + i * 18} 136 l14 68`}
            {...draw(0.02 * i)}
          />
        ))}
      </motion.g>

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
          stroke="var(--color-red)"
          strokeWidth="2"
        />
        {/* wall hatching, top and bottom — the 7.75 mm section */}
        <rect x="196" y="112" width="368" height="17" fill="var(--ill-deep)" opacity="0.85" />
        <rect x="196" y="211" width="368" height="17" fill="var(--ill-deep)" opacity="0.85" />
        {Array.from({ length: 31 }).map((_, i) => (
          <path
            key={`hatch-${i}`}
            d={`M${197 + i * 12} 112 l8 17 M${197 + i * 12} 211 l8 17`}
            stroke="var(--ill-mid)"
            strokeWidth="1"
          />
        ))}
      </motion.g>

      {/* ---- parallel threads, both bar ends, inside the body ------------
           The two threaded ends run all the way to the centre and butt
           together, so the drawing shows a splice that is actually made up
           rather than two halves waiting to be joined. */}
      {[206, 380].map((x0, side) => (
        <motion.g key={x0} stroke="var(--ill-bright)" strokeWidth="1.4" fill="none" opacity="0.9">
          <rect x={x0} y="129" width="174" height="82" fill="var(--ill-deep)" />
          {Array.from({ length: 14 }).map((_, i) => (
            <motion.path
              key={`th-${side}-${i}`}
              d={`M${x0 + 6 + i * 12} 129 l6 13 M${x0 + 6 + i * 12} 211 l6 -13`}
              {...draw(0.35 + 0.02 * i)}
            />
          ))}
        </motion.g>
      ))}

      {/* centre joint line — drawn over the threads, marking where the two
          bar ends meet. This is what callout 03 points at. */}
      <motion.path
        d="M380 129 v82"
        stroke="var(--color-red)"
        strokeWidth="1.5"
        strokeDasharray="4 5"
        {...fade(0.75)}
      />

      {/* ---- cold-upset transitions --------------------------------------
           The bar is forged up from 68 to 82 before threading — a real ~17%
           upset, not the balloon this used to draw. Both flares are symmetric
           about y=170 and both sit after the body, so the bar mouth reads the
           same on each side. */}
      <motion.path
        d="M170 136 q16 -4 26 -7 h10 v82 h-10 q-10 3 -26 -7 Z"
        fill="var(--ill-fill)"
        stroke="var(--color-red)"
        strokeWidth="2"
        {...draw(0.25)}
      />
      <motion.path
        d="M590 136 q-16 -4 -26 -7 h-10 v82 h10 q10 3 26 -7 Z"
        fill="var(--ill-fill)"
        stroke="var(--color-red)"
        strokeWidth="2"
        {...draw(0.25)}
      />

      {/* ---- ribbed rebar, right ----------------------------------------- */}
      <motion.g stroke="var(--ill-stroke)" strokeWidth="1.5" fill="none">
        <rect x="590" y="136" width="150" height="68" rx="2" />
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.path
            key={`rib-r-${i}`}
            d={`M${596 + i * 18} 136 l14 68`}
            {...draw(0.02 * i)}
          />
        ))}
      </motion.g>

      {/* ---- annotations -------------------------------------------------- */}
      <motion.g {...fade(0.9)}>
        <g
          stroke="var(--color-red)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="3 3"
        >
          <path d="M186 168 v-78 h-70" />
          <path d="M272 129 v-52 h-40" />
          <path d="M380 228 v52 h-70" />
          <path d="M520 228 v34 h96" />
          <path d="M660 136 v-64 h20" />
        </g>

        <g
          fill="var(--ill-bright)"
          fontSize="12"
          fontFamily="var(--font-jetbrains-mono), monospace"
          letterSpacing="0.06em"
        >
          <text x="18" y="86" fill="var(--color-red)">
            01
          </text>
          <text x="40" y="86">
            COLD-UPSET BAR END
          </text>
          <text x="150" y="73" fill="var(--color-red)">
            02
          </text>
          <text x="172" y="73">
            PARALLEL THREAD
          </text>
          <text x="238" y="296" fill="var(--color-red)">
            03
          </text>
          <text x="260" y="296">
            BAR ENDS MEET
          </text>
          <text x="618" y="266" fill="var(--color-red)">
            04
          </text>
          <text x="640" y="266">
            7.75 mm WALL
          </text>
          <text x="662" y="68" fill="var(--color-red)">
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
    </motion.svg>
  );
}
