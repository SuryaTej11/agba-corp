"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { enquirySchema, type EnquiryValues } from "@/lib/validation";
import { cn } from "@/lib/utils";

/**
 * The main enquiry form. Unlike a mailto: link, this persists to SQLite, so
 * every enquiry is visible in the control panel under Leads even if an email
 * is missed.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<EnquiryValues>({
    resolver: zodResolver(enquirySchema),
    mode: "onBlur",
  });

  const onSubmit = async (values: EnquiryValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "enquiry", data: values }),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      setSent(true);
      reset();
    } catch {
      setServerError("Could not reach the server. Please try again.");
    }
  };

  if (sent) {
    return (
      <div className="panel p-8 text-center sm:p-12">
        <CheckCircle2
          className="mx-auto h-12 w-12 text-ok"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <h3 className="mt-6 font-display text-2xl font-semibold uppercase text-heading">
          Enquiry received
        </h3>
        <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-muted">
          Our technical team will come back with sizing, test certificates and a
          quote — usually within one working day.
        </p>
        <button
          type="button"
          onClick={() => setSent(false)}
          className="mt-8 text-sm text-red underline underline-offset-4 hover:text-red-bright"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  const field =
    "w-full rounded-sm border bg-surface px-4 py-3.5 text-base sm:text-sm text-heading placeholder:text-muted-2 focus:outline-none transition-colors";

  const fields = [
    { name: "name", label: "Name *", type: "text", half: true },
    { name: "company", label: "Company", type: "text", half: true },
    { name: "email", label: "Email *", type: "email", half: true },
    { name: "phone", label: "Phone", type: "tel", half: true },
    {
      name: "spec",
      label: "Bar grade & diameter — e.g. Fe 500D, Ø16–32 mm",
      type: "text",
      half: false,
    },
  ] as const;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="panel p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((f) => {
          const err = errors[f.name];
          return (
            <div key={f.name} className={f.half ? "" : "sm:col-span-2"}>
              <label htmlFor={`c-${f.name}`} className="sr-only">
                {f.label}
              </label>
              <input
                id={`c-${f.name}`}
                type={f.type}
                placeholder={f.label}
                aria-invalid={!!err}
                className={cn(
                  field,
                  err ? "border-red" : "border-line focus:border-red",
                )}
                {...register(f.name)}
              />
              {err && (
                <p role="alert" className="mt-1.5 text-xs text-red">
                  {err.message}
                </p>
              )}
            </div>
          );
        })}

        <div className="sm:col-span-2">
          <label htmlFor="c-message" className="sr-only">
            Message
          </label>
          <textarea
            id="c-message"
            rows={5}
            placeholder="Message — quantity, project, delivery location, timeline *"
            aria-invalid={!!errors.message}
            className={cn(
              field,
              "resize-y",
              errors.message ? "border-red" : "border-line focus:border-red",
            )}
            {...register("message")}
          />
          {errors.message && (
            <p role="alert" className="mt-1.5 text-xs text-red">
              {errors.message.message}
            </p>
          )}
        </div>
      </div>

      {serverError && (
        <p role="alert" className="mt-5 text-sm text-red">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="mt-6 w-full sm:w-auto">
        {isSubmitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={2} />
            Send Enquiry
          </>
        )}
      </Button>

      <p className="mt-4 text-xs leading-relaxed text-muted-2">
        We use your details only to answer this enquiry. Fields marked * are
        required.
      </p>
    </form>
  );
}
