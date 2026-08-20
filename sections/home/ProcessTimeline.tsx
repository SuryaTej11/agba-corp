"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Section, SectionHeading } from "@/components/ui/Section";
import { PROCESS } from "@/lib/data";

/**
 * Six manufacturing stages on a vertical rail.
 *
 * The rail fills as you scroll the section, so progress through the process
 * is the scroll itself. Each stage slides in from its side on desktop and
 * stacks left-aligned on mobile.
 */
export function ProcessTimeline() {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 60%"],
  });
  const fill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section id="process" className="on-dark bg-deep">
      <div className="container-x">
        <SectionHeading
          eyebrow={PROCESS.eyebrow}
          title={PROCESS.title}
          lede={PROCESS.lede}
        />

        <div ref={ref} className="relative mt-16">
          {/* rail — left on mobile, centred on desktop */}
          <div
            className="absolute bottom-0 left-[19px] top-0 w-px bg-line md:left-1/2 md:-translate-x-1/2"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full origin-top bg-red"
              style={reduce ? { scaleY: 1 } : { scaleY: fill }}
            />
          </div>

          <ol className="space-y-8 md:space-y-0">
            {PROCESS.stages.map((s, i) => {
              const right = i % 2 === 1;
              return (
                <li
                  key={s.no}
                  className="relative pl-14 md:grid md:grid-cols-2 md:gap-14 md:pl-0"
                >
                  {/* node */}
                  <span
                    className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-full border border-red bg-base md:left-1/2 md:top-8 md:-translate-x-1/2"
                    aria-hidden="true"
                  >
                    <span className="data text-xs font-medium text-red">
                      {s.no}
                    </span>
                  </span>

                  {/* card */}
                  <motion.div
                    initial={reduce ? { opacity: 0 } : { opacity: 0, x: right ? 40 : -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: reduce ? 0.25 : 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={
                      right
                        ? "md:col-start-2 md:py-8 md:pl-4"
                        : "md:col-start-1 md:py-8 md:pr-4 md:text-right"
                    }
                  >
                    <span className="data text-[0.68rem] font-medium uppercase tracking-[0.16em] text-red">
                      {s.tag}
                    </span>
                    <h3 className="mt-2 font-display text-xl font-semibold text-heading">
                      {s.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted md:max-w-sm md:inline-block">
                      {s.body}
                    </p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </Section>
  );
}
