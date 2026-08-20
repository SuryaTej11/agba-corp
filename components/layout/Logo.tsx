import { cn } from "@/lib/utils";

/**
 * AGBA brandmark — vector reconstruction of the supplied artwork.
 *
 * Mark: a thin-stroked outer triangle with a second, smaller triangle nested
 * inside it; the inner triangle's right leg is the brand red, which is the
 * same grey/red rhythm the wordmark repeats (A grey, G red, B grey, A red).
 *
 * Colours come from the design tokens, so one component serves both the
 * white pages and the dark bands — the white-background and black-background
 * lockups in the brand sheet are the same file here, not two assets.
 *
 * ── If AGBA supply the original vector (.ai / .svg / .eps) ──────────────────
 * That file is always preferable to a reconstruction for a registered mark.
 * Drop it at `public/logo.svg` and replace the <svg> bodies below with an
 * <Image>; every other file reads from these components, so nothing else
 * needs touching.
 */

/* Stroke weights are expressed in the glyph's own units so the mark stays
   optically consistent whatever size it renders at. */
const MARK_STROKE = 11;

/** The triangle mark on its own — header, footer, admin, favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 320 286"
      fill="none"
      aria-hidden="true"
      className={cn("h-9 w-9", className)}
    >
      {/* Outer triangle — thin outline, closed at the base */}
      <path
        d="M160 14 306 272H14L160 14Z"
        stroke="currentColor"
        strokeWidth={MARK_STROKE}
        strokeLinejoin="round"
        className="text-graphite"
      />

      {/* Inner triangle, nested and lower: left leg, base, then a short step
          back up at the right. With the red leg it reads as an "A". */}
      <path
        d="M158 76 74 226h92v-22"
        stroke="currentColor"
        strokeWidth={MARK_STROKE}
        strokeLinejoin="miter"
        strokeLinecap="square"
        className="text-graphite"
      />

      {/* The inner "A" right leg, in brand red — detached from the apex, as
          in the artwork, and running down to the inner base line. */}
      <path
        d="M180 118 216 226"
        stroke="currentColor"
        strokeWidth={MARK_STROKE + 6}
        strokeLinecap="butt"
        className="text-red"
      />
    </svg>
  );
}

/** The "AGBA" wordmark — A and B graphite, G and the final A red. */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 424 108"
      fill="none"
      aria-hidden="true"
      className={cn("h-6", className)}
    >
      {/* Each glyph is drawn at the origin then translated into place, so
          letter-spacing is one number per letter rather than baked into
          every coordinate. */}

      {/* A — triangle ring, echoing the mark above */}
      <g transform="translate(0 0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 2 100 102H0L50 2Zm0 38L28 84h44L50 40Z"
          className="fill-graphite"
        />
      </g>

      {/* G — bold, drawn as a heavy arc plus the bar into the counter */}
      <g transform="translate(116 0)">
        <path
          d="M84.6 22A42 42 0 1 0 88 74"
          stroke="currentColor"
          strokeWidth="26"
          fill="none"
          className="text-red"
        />
        <path d="M56 39h44v26H56z" className="fill-red" />
      </g>

      {/* B — bold, flat spine with two geometric bowls */}
      <g transform="translate(236 0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 2h46a25 25 0 0 1 17 44 26 26 0 0 1-15 56H0V2Zm26 20v20h18a10 10 0 0 0 0-20H26Zm0 40v22h20a11 11 0 0 0 0-22H26Z"
          className="fill-graphite"
        />
      </g>

      {/* A — the red accent that closes the wordmark */}
      <g transform="translate(324 0)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M50 2 100 102H0L50 2Zm0 38L28 84h44L50 40Z"
          className="fill-red"
        />
      </g>
    </svg>
  );
}

/**
 * Horizontal lockup for the header: mark on the left, wordmark on the right.
 * The stacked lockup from the brand sheet is too tall for a 76px header, so
 * the footer uses `LogoStacked` instead.
 */
export function Logo({
  className,
  compact = false,
}: {
  className?: string;
  compact?: boolean;
}) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <LogoMark className="h-10 w-10 shrink-0" />
      <span className="flex flex-col leading-none">
        <LogoWordmark className="h-[1.2rem]" />
        {!compact && (
          <span className="data mt-1.5 text-[0.5rem] font-medium uppercase tracking-[0.26em] text-muted-2">
            Corporation
          </span>
        )}
      </span>
    </span>
  );
}

/** Stacked lockup, as supplied in the brand sheet — used in the footer. */
export function LogoStacked({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex flex-col items-center", className)}>
      <LogoMark className="h-28 w-28" />
      {/* the wordmark tucks up under the triangle's base, as in the artwork */}
      <LogoWordmark className="-mt-3 h-9" />
      <span className="data mt-2.5 text-[0.5rem] font-medium uppercase tracking-[0.34em] text-muted-2">
        Corporation
      </span>
    </span>
  );
}
