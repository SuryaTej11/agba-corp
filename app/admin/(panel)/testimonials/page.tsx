import Link from "next/link";
import { Star } from "lucide-react";
import { DeleteButton } from "@/components/admin/AdminUI";
import { getTestimonial, listTestimonials } from "@/lib/db/queries";
import { deleteTestimonialAction } from "../../actions";
import { TestimonialForm } from "./TestimonialForm";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const { edit } = await searchParams;
  const editing = edit ? getTestimonial(Number(edit)) : undefined;
  const items = listTestimonials(false);

  return (
    <div className="max-w-5xl">
      <h1 className="font-display text-2xl font-semibold text-heading">
        Testimonials
      </h1>
      <p className="mt-2 text-sm text-muted">
        Shown on the home page. Reorder with the sort field, or untick Published
        to pull one without deleting it.
      </p>

      <TestimonialForm key={editing?.id ?? "new"} item={editing} />

      <h2 className="mt-12 font-display text-lg font-semibold text-heading">
        All testimonials ({items.length})
      </h2>

      {items.length === 0 ? (
        <p className="panel mt-4 p-6 text-sm text-muted">
          None yet. Add the first one above.
        </p>
      ) : (
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {items.map((t) => (
            <li key={t.id} className="panel p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-display text-sm font-semibold text-heading">
                    {t.name}
                  </p>
                  <p className="mt-1 text-xs text-muted-2">
                    {[t.role, t.company].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <div className="flex shrink-0 gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={
                        i < t.rating
                          ? "h-3 w-3 fill-red text-red"
                          : "h-3 w-3 text-line-2"
                      }
                      strokeWidth={1.5}
                    />
                  ))}
                </div>
              </div>

              <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">
                {t.quote}
              </p>

              <div className="mt-4 flex items-center justify-between gap-4 border-t border-line pt-3">
                <span
                  className={
                    t.published
                      ? "data text-[0.6rem] uppercase tracking-wider text-ok"
                      : "data text-[0.6rem] uppercase tracking-wider text-muted-2"
                  }
                >
                  {t.published ? "Live" : "Hidden"} · sort {t.sort}
                </span>
                <span>
                  <Link
                    href={`/admin/testimonials?edit=${t.id}`}
                    className="mr-4 text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
                  >
                    Edit
                  </Link>
                  <DeleteButton action={deleteTestimonialAction} id={t.id} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
