import { cn } from "@/lib/utils";

/**
 * Technical data table.
 *
 * Reads entirely from tokens, so the same component works on a white band and
 * inside `.on-dark` without a variant. Scrolls horizontally on narrow screens
 * rather than shrinking the figures to illegibility — the numbers are the
 * point of these tables.
 *
 * `emphasis` marks the columns carrying the comparison (the "% of bar"
 * columns), so the eye lands on them rather than on the thread designations.
 */
export function SpecTable({
  head,
  rows,
  emphasis = [],
  className,
}: {
  head: readonly string[];
  rows: readonly (readonly string[])[];
  /** Zero-based column indexes to render in the brand red. */
  emphasis?: readonly number[];
  className?: string;
}) {
  return (
    <div className={cn("overflow-x-auto", className)}>
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
        <thead>
          <tr className="border-b border-line">
            {/* Index-keyed on purpose: the cold-forging table has two columns
                both labelled "% of bar", so the text is not unique. */}
            {head.map((h, i) => (
              <th
                key={`${i}-${h}`}
                scope="col"
                className="data whitespace-nowrap px-4 py-3 text-[0.6rem] font-medium uppercase tracking-[0.14em] text-muted-2"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {rows.map((row, r) => (
            <tr key={`${r}-${row[0]}`} className="align-top">
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={cn(
                    "px-4 py-3.5",
                    i === 0 && "data font-medium text-heading",
                    i !== 0 && "text-muted",
                    emphasis.includes(i) && "data font-medium text-red",
                  )}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
