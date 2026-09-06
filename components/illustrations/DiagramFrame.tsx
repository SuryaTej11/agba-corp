"use client";

import { useEffect, useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Frame for the wide technical drawings.
 *
 * These diagrams are landscape and label-heavy. Scaling one down to fit a
 * phone makes its callouts unreadable, so below a floor width the frame
 * scrolls horizontally instead — but a plain `overflow-x-auto` gives no clue
 * that there is anything to the right, which reads as "the image is cut off".
 *
 * So the frame measures itself and, only when the drawing actually overflows,
 * shows a fade at the right edge and a one-line hint. Both disappear once the
 * visitor has scrolled, and neither renders at all on a screen wide enough to
 * show the whole drawing.
 */
export function DiagramFrame({
  children,
  minWidth,
  className,
  caption,
}: {
  children: React.ReactNode;
  /** Floor width in px below which the drawing scrolls rather than shrinks. */
  minWidth: number;
  className?: string;
  caption?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [overflows, setOverflows] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measure = () => setOverflows(el.scrollWidth > el.clientWidth + 4);
    measure();

    const ro = new ResizeObserver(measure);
    ro.observe(el);

    const onScroll = () => setScrolled(el.scrollLeft > 8);
    el.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div
        ref={ref}
        className="overflow-x-auto overscroll-x-contain"
        // A scrollable region needs to be reachable and describable without a
        // mouse, so it takes focus and announces itself.
        tabIndex={overflows ? 0 : -1}
        role={overflows ? "region" : undefined}
        aria-label={overflows && caption ? `${caption} — scrolls sideways` : undefined}
      >
        <div style={{ minWidth }}>{children}</div>
      </div>

      {/* Right-edge fade, so it reads as "continues" rather than "cropped". */}
      {overflows && !scrolled && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[var(--color-page)] to-transparent"
        />
      )}

      {overflows && !scrolled && (
        <span className="data pointer-events-none absolute bottom-2 right-3 flex items-center gap-1.5 rounded-sm bg-page/90 px-2 py-1 text-[0.6rem] uppercase tracking-[0.12em] text-muted-2 shadow-[var(--shadow-card)]">
          <MoveHorizontal className="h-3 w-3" strokeWidth={2} />
          Scroll
        </span>
      )}
    </div>
  );
}
