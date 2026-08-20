"use client";

import Link from "next/link";
import { useRef, type ReactNode } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * Magnetic button — the cursor tugs the label a few pixels toward it on
 * hover, then it springs back on leave. Purely decorative, disabled entirely
 * under prefers-reduced-motion and on touch (where there is no hover).
 */
function useMagnetic(strength = 0.28) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();

  const onMove = (e: React.MouseEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - (r.left + r.width / 2)) * strength;
    const y = (e.clientY - (r.top + r.height / 2)) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0px, 0px)";
  };

  return { ref, onMove, onLeave };
}

type Variant = "primary" | "ghost";

const base = "btn";
const variants: Record<Variant, string> = {
  primary: "btn-primary",
  ghost: "btn-ghost",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  size,
  external,
  ...rest
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
  size?: "sm";
  external?: boolean;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  const { ref: magnetRef, onMove, onLeave } = useMagnetic();

  const inner = (
    <span
      ref={magnetRef}
      className="inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {children}
    </span>
  );

  const cls = cn(base, variants[variant], size === "sm" && "btn-sm", className);

  // Off-site links (WhatsApp, Google Maps) and protocol links (tel:, mailto:)
  // must be plain anchors — next/link would try to client-route them.
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        {...(href.startsWith("http")
          ? { target: "_blank", rel: "noopener noreferrer" }
          : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cls}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      {inner}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  size,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  size?: "sm";
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const { ref: magnetRef, onMove, onLeave } = useMagnetic();

  return (
    <button
      className={cn(base, variants[variant], size === "sm" && "btn-sm", className)}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      {...rest}
    >
      <span
        ref={magnetRef}
        className="inline-flex items-center gap-2 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {children}
      </span>
    </button>
  );
}
