"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown, Download } from "lucide-react";
import { ThreadProfile } from "@/components/illustrations/ThreadProfile";
import { ButtonLink } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { KNOWLEDGE } from "@/lib/data";
import { ROUTES } from "@/lib/site";
import { cn } from "@/lib/utils";

/**
 * Knowledge Center — the section the client asked to have renamed from
 * "Understanding the Code". Two tabs, each an accordion of technical blocks
 * so the page stays scannable rather than becoming a wall of text.
 */
export function KnowledgeCenter() {
  const reduce = useReducedMotion();
  const [tab, setTab] = useState<string>(KNOWLEDGE.tabs[0].id);
  const [open, setOpen] = useState<string | null>(
    KNOWLEDGE.tabs[0].blocks[0].title,
  );

  const current = KNOWLEDGE.tabs.find((t) => t.id === tab) ?? KNOWLEDGE.tabs[0];

  const switchTab = (id: string) => {
    setTab(id);
    const next = KNOWLEDGE.tabs.find((t) => t.id === id);
    setOpen(next?.blocks[0].title ?? null);
  };

  return (
    <Section id="knowledge-center" className="bg-surface">
      <div className="container-x">
        <SectionHeading
          eyebrow={KNOWLEDGE.eyebrow}
          title={KNOWLEDGE.title}
          lede={KNOWLEDGE.lede}
        />

        {/* ---- tabs ---- */}
        <div
          role="tablist"
          aria-label="Knowledge Center topics"
          className="mt-12 grid gap-2 sm:grid-cols-2"
        >
          {KNOWLEDGE.tabs.map((t, i) => {
            const on = t.id === tab;
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={on}
                aria-controls={`kc-panel-${t.id}`}
                id={`kc-tab-${t.id}`}
                onClick={() => switchTab(t.id)}
                className={cn(
                  "group relative overflow-hidden border p-5 text-left transition-colors duration-300",
                  on
                    ? "border-red bg-red/8"
                    : "border-line hover:border-line-2 hover:bg-surface-2",
                )}
              >
                <span
                  className={cn(
                    "data text-[0.65rem] uppercase tracking-[0.16em]",
                    on ? "text-red" : "text-muted-2",
                  )}
                >
                  Tab 0{i + 1}
                </span>
                <span
                  className={cn(
                    "mt-2 block font-display text-lg font-semibold",
                    on ? "text-heading" : "text-muted group-hover:text-heading",
                  )}
                >
                  {t.label}
                </span>
                {on && (
                  <motion.span
                    layoutId="kc-underline"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-red"
                    transition={
                      reduce
                        ? { duration: 0 }
                        : { type: "spring", stiffness: 400, damping: 34 }
                    }
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* ---- panel ---- */}
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            id={`kc-panel-${current.id}`}
            role="tabpanel"
            aria-labelledby={`kc-tab-${current.id}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-start"
          >
            <div>
              <p className="border-l-2 border-red pl-5 text-sm leading-relaxed text-muted md:text-base">
                {current.intro}
              </p>

              <div className="mt-8 divide-y divide-line border-y border-line">
                {current.blocks.map((b) => {
                  const on = open === b.title;
                  return (
                    <div key={b.title}>
                      <h3>
                        <button
                          type="button"
                          onClick={() => setOpen(on ? null : b.title)}
                          aria-expanded={on}
                          className="flex w-full items-center justify-between gap-5 py-5 text-left transition-colors hover:text-heading"
                        >
                          <span
                            className={cn(
                              "font-display text-base font-semibold transition-colors sm:text-lg",
                              on ? "text-red" : "text-heading",
                            )}
                          >
                            {b.title}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-5 w-5 shrink-0 text-muted-2 transition-transform duration-300",
                              on && "rotate-180 text-red",
                            )}
                            strokeWidth={1.75}
                          />
                        </button>
                      </h3>
                      <AnimatePresence initial={false}>
                        {on && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{
                              duration: reduce ? 0 : 0.35,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden"
                          >
                            <p className="pb-6 pr-10 text-sm leading-relaxed text-muted">
                              {b.body}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              <div className="mt-8">
                <ButtonLink href={`${ROUTES.trace}#downloads`} variant="ghost">
                  <Download className="h-4 w-4" strokeWidth={2} />
                  Get the full technical documents
                </ButtonLink>
              </div>
            </div>

            {/* side illustration — the thread form the standard specifies */}
            <div className="panel p-5 lg:sticky lg:top-28">
              <span className="data text-[0.62rem] uppercase tracking-[0.16em] text-muted-2">
                IS 16172:2023 · Annex G
              </span>
              <div className="mt-4 overflow-x-auto">
                <ThreadProfile className="h-auto w-full min-w-[20rem]" />
              </div>
              <p className="mt-4 border-t border-line pt-4 text-xs leading-relaxed text-muted-2">
                The parallel thread form. Pitch, flank angle and depth are all
                gauge-verified on every coupler — not measured by sample.
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Section>
  );
}
