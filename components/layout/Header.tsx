"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X, Phone } from "lucide-react";
import { CONTACT, NAV, ROUTES, telLink } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const reduce = useReducedMotion();

  // Solidify the bar once the hero is behind it, and drive the thin red
  // scroll-progress rule along the bottom edge.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? Math.min(y / max, 1) : 0);
    };
    // Sync the initial position on the next frame rather than during the
    // effect, which would set state synchronously and cascade a re-render.
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // Close the drawer when the route changes. Adjusting state during render is
  // React's documented pattern for reacting to a changed prop — an effect here
  // would set state after paint and cascade an extra render.
  const [routeAtOpen, setRouteAtOpen] = useState(pathname);
  if (routeAtOpen !== pathname) {
    setRouteAtOpen(pathname);
    setOpen(false);
  }

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "border-b border-line bg-base/85 backdrop-blur-xl"
          : "border-b border-transparent bg-base/70",
      )}
    >
      <div className="container-x flex h-[76px] items-center justify-between gap-4">
        <Link
          href={ROUTES.home}
          className="shrink-0"
          aria-label="AGBA Corporation — home"
        >
          <Logo />
        </Link>

        {/* --- desktop nav --- */}
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {NAV.map((item) => {
            const active =
              item.href === ROUTES.home
                ? pathname === "/"
                : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative px-4 py-2 text-[0.95rem] font-medium transition-colors duration-300",
                  active ? "text-red" : "text-muted hover:text-heading",
                )}
              >
                {item.label}
                {active && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute inset-x-4 -bottom-0.5 h-px bg-red"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 420, damping: 34 }
                    }
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={telLink(CONTACT.phones[0].tel)}
            className="hidden items-center gap-2 px-3 py-2 text-sm text-muted transition-colors hover:text-heading xl:flex"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />
            <span className="data">{CONTACT.phones[0].display}</span>
          </a>

          <Link href={`${ROUTES.contact}#enquiry`} className="btn btn-primary btn-sm hidden sm:inline-flex">
            Get A Quote
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid h-11 w-11 place-items-center rounded-sm border border-line text-heading transition-colors hover:border-red lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* scroll progress rule */}
      <div
        className="h-px origin-left bg-red transition-transform duration-150"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />

      {/* --- mobile drawer --- */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="border-t border-line bg-base lg:hidden"
          >
            <nav className="container-x flex flex-col py-4" aria-label="Mobile">
              {NAV.map((item, i) => {
                const active =
                  item.href === ROUTES.home
                    ? pathname === "/"
                    : pathname.startsWith(item.href);
                return (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between border-b border-line py-4 font-display text-lg font-medium uppercase tracking-tight",
                        active ? "text-red" : "text-heading",
                      )}
                    >
                      {item.label}
                      <span className="data text-xs text-muted-2">
                        0{i + 1}
                      </span>
                    </Link>
                  </motion.div>
                );
              })}

              <div className="mt-6 flex flex-col gap-3 pb-4">
                <Link href={`${ROUTES.contact}#enquiry`} className="btn btn-primary w-full">
                  Get A Quote
                </Link>
                <a
                  href={telLink(CONTACT.phones[0].tel)}
                  className="btn btn-ghost w-full"
                >
                  <Phone className="h-4 w-4" strokeWidth={1.75} />
                  {CONTACT.phones[0].display}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
