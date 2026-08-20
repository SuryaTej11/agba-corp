/**
 * Hand-drawn stroke icons for the Products & Services grid.
 *
 * Deliberately not from an icon set — each one draws the actual thing
 * (a coupler, an upset die, a plug gauge) rather than a generic glyph.
 * Inline SVG only; never a unicode or emoji symbol.
 */

const common = {
  viewBox: "0 0 40 40",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true as const,
};

export type ProductIconName =
  | "coupler"
  | "forge"
  | "range"
  | "lab"
  | "dispatch"
  | "gauge";

export function ProductIcon({
  name,
  className,
}: {
  name: ProductIconName;
  className?: string;
}) {
  const icons: Record<ProductIconName, React.ReactNode> = {
    // coupler body with rebar entering both ends
    coupler: (
      <>
        <rect x="11" y="13" width="18" height="14" rx="1.5" />
        <path d="M14 13v14M17.5 13v14M22.5 13v14M26 13v14" opacity="0.5" />
        <path d="M11 17H3M11 23H3M37 17h-8M37 23h-8" />
      </>
    ),
    // upsetting die closing on a bar end
    forge: (
      <>
        <path d="M4 20h13" />
        <path d="M17 14h6v12h-6z" />
        <path d="M27 9v8M27 23v8" />
        <path d="M23 17h9M23 23h9" />
        <path d="M36 20h-4" opacity="0.5" />
      </>
    ),
    // three couplers, ascending diameters
    range: (
      <>
        <circle cx="9" cy="24" r="5" />
        <circle cx="20" cy="21" r="7.5" />
        <circle cx="32" cy="18" r="4" opacity="0.6" />
        <path d="M4 33h32" opacity="0.4" />
      </>
    ),
    // certificate with a seal
    lab: (
      <>
        <path d="M8 5h18l6 6v18a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Z" />
        <path d="M26 5v6h6" />
        <path d="M11 17h11M11 22h8" opacity="0.6" />
        <circle cx="27" cy="29" r="5" />
        <path d="M27 26.5v2.5l1.8 1.2" />
      </>
    ),
    // truck against a route line
    dispatch: (
      <>
        <path d="M3 12h17v14H3z" />
        <path d="M20 17h6l5 5v4h-11z" />
        <circle cx="10" cy="29" r="3" />
        <circle cx="27" cy="29" r="3" />
        <path d="M13 29h11" opacity="0.5" />
        <path d="M34 12h4M34 17h4" opacity="0.5" />
      </>
    ),
    // plug gauge entering a thread, with a pass/fail tick
    gauge: (
      <>
        <rect x="5" y="14" width="14" height="12" rx="1" />
        <path d="M8 14v12M11.5 14v12M15 14v12" opacity="0.5" />
        <path d="M19 20h6" />
        <circle cx="30" cy="20" r="7" />
        <path d="m27 20 2.2 2.2L34 17.5" />
      </>
    ),
  };

  return (
    <svg {...common} className={className}>
      {icons[name]}
    </svg>
  );
}
