import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Standard vertical rhythm + optional hairline top border between bands. */
export function Section({
  children,
  className,
  id,
  bordered = true,
  tight = false,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
  tight?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative",
        tight ? "py-12 md:py-20" : "py-16 md:py-28",
        bordered && "border-t border-line",
        className,
      )}
    >
      {children}
    </section>
  );
}

export function Eyebrow({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <span className={cn("eyebrow", className)}>{children}</span>;
}

/**
 * Eyebrow + heading + optional lede, in the proportions the AGBA brand uses:
 * a mono red overline, a large Archivo display line, then muted body copy.
 */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  align = "left",
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <span
          className={cn("eyebrow", align === "center" && "justify-center")}
        >
          {eyebrow}
        </span>
      )}
      <h2
        className={cn(
          "mt-5 text-[1.6rem] font-semibold uppercase leading-[1.05] sm:text-4xl md:text-[2.75rem]",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
          {lede}
        </p>
      )}
    </Reveal>
  );
}
