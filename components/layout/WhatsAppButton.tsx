"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { CONTACT, waLink } from "@/lib/site";

/**
 * Floating WhatsApp enquiry button, present on every page.
 *
 * Appears after a short delay so it doesn't fight the hero on first paint,
 * and pops a small prompt card the first time — dismissible, and the
 * dismissal sticks for the session.
 */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);
  const [prompt, setPrompt] = useState(false);

  useEffect(() => {
    const show = window.setTimeout(() => setVisible(true), 1200);
    // The prompt card is desktop-only: on a phone it would cover the content
    // it is meant to support, and the button alone is already obvious.
    const roomForPrompt = window.matchMedia("(min-width: 640px)").matches;
    const dismissed = sessionStorage.getItem("agba_wa_dismissed") === "1";
    const tip =
      dismissed || !roomForPrompt
        ? undefined
        : window.setTimeout(() => setPrompt(true), 4500);
    return () => {
      window.clearTimeout(show);
      if (tip) window.clearTimeout(tip);
    };
  }, []);

  const dismiss = () => {
    setPrompt(false);
    sessionStorage.setItem("agba_wa_dismissed", "1");
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 print:hidden">
      <AnimatePresence>
        {visible && prompt && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="panel relative max-w-[15rem] p-4 pr-8 shadow-2xl"
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss WhatsApp prompt"
              className="absolute right-2 top-2 text-muted-2 transition-colors hover:text-heading"
            >
              <X className="h-3.5 w-3.5" />
            </button>
            <p className="text-sm font-medium text-heading">Quick enquiry?</p>
            <p className="mt-1 text-xs leading-relaxed text-muted">
              Message our technical team on WhatsApp — sizing, certificates and
              pricing.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {visible && (
          <motion.a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with AGBA on WhatsApp at ${CONTACT.whatsapp.display}`}
            initial={{ opacity: 0, scale: 0.6, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.6 }}
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
            whileHover={{ scale: 1.07 }}
            whileTap={{ scale: 0.94 }}
            onClick={dismiss}
            className="group relative grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-black shadow-[0_10px_30px_-8px_rgba(37,211,102,0.7)]"
          >
            {/* slow halo */}
            <span
              className="animate-ping-slow absolute inset-0 rounded-full bg-[#25D366] opacity-40"
              aria-hidden="true"
            />
            {/* WhatsApp glyph — inline SVG, never an emoji */}
            <svg
              viewBox="0 0 32 32"
              className="relative h-7 w-7"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M16.04 3.2C8.98 3.2 3.24 8.93 3.24 15.99c0 2.25.59 4.45 1.71 6.39L3.2 28.8l6.6-1.72a12.77 12.77 0 0 0 6.24 1.6h.01c7.05 0 12.79-5.74 12.79-12.8 0-3.41-1.33-6.62-3.75-9.04a12.7 12.7 0 0 0-9.05-3.75Zm0 23.03h-.01c-1.98 0-3.92-.53-5.61-1.54l-.4-.24-4.17 1.09 1.11-4.07-.26-.42a10.6 10.6 0 0 1-1.63-5.66c0-5.87 4.78-10.64 10.65-10.64 2.84 0 5.51 1.11 7.52 3.12a10.57 10.57 0 0 1 3.11 7.53c0 5.87-4.77 10.64-10.64 10.64Zm5.84-7.97c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.89-1.78-2.21-.19-.32-.02-.5.14-.66.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55l-.61-.01c-.21 0-.56.08-.85.4-.29.32-1.11 1.09-1.11 2.66s1.14 3.08 1.3 3.29c.16.21 2.24 3.42 5.43 4.8.76.33 1.35.52 1.81.67.76.24 1.45.21 2 .13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.38.19-1.52-.08-.13-.29-.21-.61-.37Z" />
            </svg>
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}
