"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * The seven-link chain on the ATS page: steel → upset → thread → tooling →
 * coupler → gauging → fitting.
 *
 * Not an SVG, because the point is the words. It is a flex row of labels with
 * chevrons between them, which wraps naturally on narrow screens instead of
 * needing a scroll frame — the sequence still reads top-to-bottom when it does.
 */
export function ProcessChain({
  steps,
  className,
}: {
  steps: readonly string[];
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <ol
      className={cn(
        "flex flex-wrap items-center gap-x-1 gap-y-3",
        className,
      )}
      aria-label="The processes that make up a connection, in order"
    >
      {steps.map((step, i) => (
        <motion.li
          key={step}
          className="flex items-center gap-1"
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }
          }
        >
          <span className="data rounded-sm border border-line px-3 py-2 text-[0.68rem] font-medium uppercase tracking-[0.12em] text-heading">
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="px-1 text-red" aria-hidden="true">
              ›
            </span>
          )}
        </motion.li>
      ))}
    </ol>
  );
}
