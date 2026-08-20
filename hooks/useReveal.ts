"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Fires once when the element scrolls into view.
 *
 * `fallbackMs` is a deliberate safety net: if IntersectionObserver never fires
 * — headless browsers, print, an element that starts off-screen and is never
 * scrolled to — the content reveals itself anyway rather than staying
 * permanently invisible.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  { rootMargin = "0px 0px -12% 0px", fallbackMs = 900 } = {},
) {
  const ref = useRef<T>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown) return;

    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin, threshold: 0.05 },
    );
    io.observe(el);

    const timer = window.setTimeout(() => setShown(true), fallbackMs);

    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, [shown, rootMargin, fallbackMs]);

  return { ref, shown };
}
