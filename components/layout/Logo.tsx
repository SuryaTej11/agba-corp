import Image from "next/image";
import logoRev from "@/public/images/agba-logo-rev.png";
import logoStd from "@/public/images/agba-logo.png";
import { cn } from "@/lib/utils";

/**
 * AGBA Corporation brandmark — the official artwork.
 *
 * Paths are lifted verbatim from the Illustrator file AGBA supplied
 * (`logo.svg`, the first of its two variants). The full lockup is also kept at
 * `public/logo.svg` for print and for anyone who needs the file itself.
 *
 * The one change from the raw artwork is colour handling. The supplied file
 * ships two variants — dark grey `#4e4e4f` for light backgrounds and light grey
 * `#b4b4b5` for dark ones. Rather than shipping both, the grey is
 * `currentColor` here, so the same component reproduces either variant from the
 * surrounding theme: `text-graphite` on white, `text-muted` inside `.on-dark`.
 * The red is the design token, which is now set to the artwork's own red.
 *
 * Coordinates are the artwork's own, so each viewBox is an offset window into
 * the original 841.89 × 595.28 canvas rather than starting at 0,0.
 */

/** The triangle mark on its own — header, footer, admin, favicon. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="332.3 128.08 99.2 84.5"
      aria-hidden="true"
      className={cn("h-9 w-auto", className)}
    >
      <path
        d="M381.89,159.98l-22.5,38c6.01.52,11.25.2,16.69.13l5.71-.06,8.15,14.35-57.64.04,49.47-84.36,49.75,84.28-18.56.1-16.67-28.3-14.4-24.18ZM351.46,202.22l30.46-51.66,34.02,57.59,7.5-.16-41.67-70.54-41.5,70.7,41.73.06-3.27-5.83-27.29-.15Z"
        className="fill-current"
      />
      <path
        d="M395.9,212.67l-7.75-12.36-5.93-10.28,5.87-.49s14.33,22.7,14.13,23.09l-6.32.05Z"
        className="fill-red"
      />
    </svg>
  );
}

/** The "AGBA" wordmark — A and B grey, G and the final A red. */
export function LogoWordmark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="316.05 214.3 133.05 35.05"
      aria-hidden="true"
      className={cn("h-5 w-auto", className)}
    >
      <path
        d="M332.48,227.98l-7.27,14.31,9.35.07,3.04,6.05-21.55-.03,16.45-33.53s16.09,32.88,16.04,33.47h-6.02s-10.04-20.35-10.04-20.35Z"
        className="fill-current"
      />
      <path
        d="M365.4,235.01l-.07-6.47,15.31-.16s-.07,8.97.16,12.49c.16,2.52-4.22,5.73-7.21,7.04-5.54,2.43-13.66,1.7-18.46-1.95-2.02-1.54-3.42-3.03-4.57-5.3-3.27-6.4-2.82-13.88,1.77-19.65,5.9-7.41,16.54-8.81,24.89-3.46.69.44,1.25.8,1.47,1.53-1.12,1.12-2.65,3.6-3.78,4.73-6.42-4.65-14.76-3.4-18.47,3.11-2.72,4.78-1.65,10.69,2.65,13.97,2.27,1.73,4.6,2.45,7.44,2.28s5.4-.72,7.46-2.66l-.15-5.56-8.41.05Z"
        className="fill-red"
      />
      <path
        d="M412.19,233.43c2.64,4.06,1.68,9.36-1.86,12.44-2.46,1.7-5.2,2.55-8.2,2.54l-18.13-.08-.03-33.39,15.37-.16c3.23-.11,6.5.3,9.24,2.2,4.74,3.3,5.25,10.2,1.24,14.21l2.36,2.25ZM403.47,228.48c2.11-.03,3.57-2.1,3.36-3.83-.19-1.6-1.52-3.24-3.51-3.26l-13.36-.14-.14,7.5,13.65-.27ZM407.47,237.03c-.6-1.25-2.2-2.25-3.59-2.25h-13.96s-.09,7.64-.09,7.64h13.71c1.34,0,2.71-.73,3.37-1.56.8-1.01,1.28-2.36.58-3.82Z"
        className="fill-current"
      />
      <path
        d="M432.14,228.06l-4.65,9.53-2.14,4.5h8.66s3.23,6.37,3.23,6.37l-21.62.03s16.05-33.15,16.15-33.36c.26-.55,17.37,33.28,17.37,33.28l-6.49-.03-10.51-20.32Z"
        className="fill-red"
      />
    </svg>
  );
}

/**
 * Horizontal lockup for the header. The supplied artwork is stacked, which is
 * too tall for a 76px header — laying the mark beside the wordmark keeps the
 * letters legible at that height. The footer uses the stacked lockup as drawn.
 */
/**
 * The brand lockup, using the client's own artwork from their reference build
 * (agbaweb.netlify.app/assets/agba-logo.png). Two variants ship: the standard
 * one for light bands and the reversed one for dark, exactly as the reference
 * site pairs them.
 *
 * Both are rendered and CSS picks one — `.logo-rev` is hidden by default and
 * swaps in under `.on-dark` (see globals.css). That keeps the switch purely in
 * the token scope, so a lockup dropped into any dark band is correct without a
 * prop, the same way every other component here inverts.
 */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={logoStd}
        alt="AGBA Corporation — rebar couplers"
        className="logo-std h-11 w-auto"
        priority
      />
      <Image
        src={logoRev}
        alt=""
        aria-hidden="true"
        className="logo-rev h-11 w-auto"
        priority
      />
    </span>
  );
}
