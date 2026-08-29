import type { Variants } from "framer-motion";

/**
 * Shared entry animations for the technical illustrations.
 *
 * These are **variants driven by the parent `<motion.svg>`**, not per-element
 * `whileInView`, and that distinction is the whole point of this file.
 *
 * The diagrams are wide and live inside `overflow-x-auto` frames. An element
 * scrolled out of that frame is genuinely not intersecting the viewport, so a
 * per-element `whileInView` never fires for it — and because the initial state
 * is `opacity: 0` / `pathLength: 0`, it stays permanently invisible. Swiping
 * across to it shows blank space, because the trigger already passed.
 *
 * Driving everything from one `whileInView` on the root means the whole
 * drawing animates together the moment the diagram enters view, whatever is
 * currently scrolled into the frame.
 */

const EASE = [0.16, 1, 0.3, 1] as const;

/** Put on the root `<motion.svg>`; children inherit these states. */
export const diagramRoot = {
  initial: "hidden",
  whileInView: "shown",
  viewport: { once: true, margin: "-10%" },
} as const;

/** A stroked path that draws itself on. */
export const drawIn = (delay = 0, reduce = false): Variants => ({
  hidden: reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 },
  shown: {
    pathLength: 1,
    opacity: 1,
    transition: reduce ? { duration: 0 } : { duration: 1.1, delay, ease: EASE },
  },
});

/** A filled shape or a group that simply fades up. */
export const fadeIn = (delay = 0, reduce = false): Variants => ({
  hidden: { opacity: 0 },
  shown: {
    opacity: 1,
    transition: reduce ? { duration: 0 } : { duration: 0.5, delay },
  },
});

/** A shape that scales up from its centre — used for the section cutaways. */
export const growIn = (delay = 0, reduce = false): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, scale: 0.82 },
  shown: {
    opacity: 1,
    scale: 1,
    transition: reduce ? { duration: 0 } : { duration: 0.8, delay, ease: EASE },
  },
});

/** A shape that slides in horizontally. */
export const slideIn = (from: number, delay = 0, reduce = false): Variants => ({
  hidden: reduce ? { opacity: 0 } : { opacity: 0, x: from },
  shown: {
    opacity: 1,
    x: 0,
    transition: reduce ? { duration: 0 } : { duration: 0.8, delay, ease: EASE },
  },
});
