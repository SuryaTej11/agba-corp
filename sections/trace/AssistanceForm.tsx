"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { assistanceSchema, type AssistanceValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * "Request Assistance" — the second CTA under "Can't find your batch?".
 * Pre-fills whatever batch number the visitor typed, so the QC team gets the
 * number without asking for it twice. Saves as an `assistance` lead.
 */
export function AssistanceForm({ batchNo }: { batchNo?: string }) {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AssistanceValues>({
    resolver: zodResolver(assistanceSchema),
    mode: "onBlur",
    defaultValues: { batchNo: batchNo ?? "" },
  });

  const onSubmit = async (values: AssistanceValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "assistance", data: values }),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
    } catch {
      setServerError("Could not reach the server. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="flex items-start gap-3">
        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ok" strokeWidth={1.75} />
        <div>
          <p className="font-display text-lg font-semibold text-heading">
            Request received
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Our QC team will trace the heat number and certificate for this
            batch and come back to you, usually within one working day.
          </p>
        </div>
      </div>
    );
  }

  const field =
    "w-full rounded-sm border bg-surface px-4 py-3 text-base sm:text-sm text-heading placeholder:text-muted-2 focus:outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
        Request Assistance
      </p>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="a-name" className="sr-only">
            Your name
          </label>
          <input
            id="a-name"
            placeholder="Your name *"
            aria-invalid={!!errors.name}
            className={cn(field, errors.name ? "border-red" : "border-line focus:border-red")}
            {...register("name")}
          />
          {errors.name && (
            <p role="alert" className="mt-1.5 text-xs text-red">
              {errors.name.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="a-email" className="sr-only">
            Email
          </label>
          <input
            id="a-email"
            type="email"
            placeholder="Email *"
            aria-invalid={!!errors.email}
            className={cn(field, errors.email ? "border-red" : "border-line focus:border-red")}
            {...register("email")}
          />
          {errors.email && (
            <p role="alert" className="mt-1.5 text-xs text-red">
              {errors.email.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="a-phone" className="sr-only">
            Phone
          </label>
          <input
            id="a-phone"
            placeholder="Phone"
            className={cn(field, "border-line focus:border-red")}
            {...register("phone")}
          />
        </div>

        <div>
          <label htmlFor="a-batch" className="sr-only">
            Batch number
          </label>
          <input
            id="a-batch"
            placeholder="Batch number"
            className={cn(field, "data border-line uppercase focus:border-red")}
            {...register("batchNo")}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="a-message" className="sr-only">
            Anything else
          </label>
          <textarea
            id="a-message"
            rows={3}
            placeholder="Anything else we should know — project, quantity, where the coupler came from"
            className={cn(field, "resize-y border-line focus:border-red")}
            {...register("message")}
          />
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-4 text-sm text-red">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-5">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          "Send Request"
        )}
      </Button>
    </form>
  );
}
