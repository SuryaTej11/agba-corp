"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useReveal } from "@/hooks/useReveal";

/**
 * Counts a number up when it scrolls into view.
 *
 * Only the numeric part animates — `prefix`/`suffix` stay put, so "Ø12–40"
 * and "100%" keep their shape while the digits run. Under reduced motion the
 * final value renders immediately.
 */
export function Counter({
  to,
  from = 0,
  duration = 1400,
  prefix = "",
  suffix = "",
  decimals = 0,
  className,
}: {
  to: number;
  from?: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const { ref, shown } = useReveal<HTMLSpanElement>();
  const reduce = useReducedMotion();
  const [value, setValue] = useState(from);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    // Under reduced motion the final value is derived below rather than set
    // here — setting state straight from an effect causes a cascading render.
    if (!shown || reduce) return;

    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo — fast off the line, long settle
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setValue(from + (to - from) * eased);
      if (t < 1) raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [shown, to, from, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {(reduce ? to : value).toFixed(decimals)}
      {suffix}
    </span>
  );
}
