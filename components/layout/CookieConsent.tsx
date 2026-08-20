"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Cookie } from "lucide-react";

const KEY = "agba_cookie_consent";

/**
 * Cookie consent.
 *
 * Nothing beyond the strictly-necessary session cookie runs before a choice is
 * made, and "Reject non-essential" is a first-class button rather than a
 * buried link — declining must be exactly as easy as accepting.
 *
 * When analytics are added later, gate them on:
 *     localStorage.getItem("agba_cookie_consent") === "accepted"
 * and listen for the "agba-consent" event dispatched below.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay slightly so it doesn't slam in over the hero animation.
    const t = window.setTimeout(() => {
      if (!localStorage.getItem(KEY)) setVisible(true);
    }, 1600);
    return () => window.clearTimeout(t);
  }, []);

  const choose = (choice: "accepted" | "rejected") => {
    localStorage.setItem(KEY, choice);
    window.dispatchEvent(new CustomEvent("agba-consent", { detail: choice }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          role="dialog"
          aria-live="polite"
          aria-label="Cookie preferences"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-x-0 bottom-0 z-50 print:hidden"
        >
          <div className="container-x pb-5 sm:pb-6">
            <div className="panel mx-auto flex max-w-4xl flex-col gap-5 p-5 shadow-2xl sm:flex-row sm:items-center sm:gap-6 sm:p-6">
              <Cookie
                className="hidden h-8 w-8 shrink-0 text-red sm:block"
                strokeWidth={1.5}
                aria-hidden="true"
              />
              <div className="flex-1">
                <p className="font-display text-base font-semibold uppercase tracking-tight text-heading">
                  Cookies on this site
                </p>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">
                  We use strictly-necessary cookies to keep the site working.
                  With your consent we&apos;d also use analytics cookies to
                  understand which technical pages are most useful. You can
                  decline without losing any functionality.
                </p>
              </div>
              <div className="flex shrink-0 flex-col gap-2.5 sm:flex-row">
                <button
                  type="button"
                  onClick={() => choose("rejected")}
                  className="btn btn-ghost btn-sm"
                >
                  Reject non-essential
                </button>
                <button
                  type="button"
                  onClick={() => choose("accepted")}
                  className="btn btn-primary btn-sm"
                >
                  Accept all
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
