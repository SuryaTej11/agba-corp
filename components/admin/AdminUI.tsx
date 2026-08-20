"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Shared control-panel form primitives.
 *
 * The panel is intentionally plain: dense forms, real labels, no animation.
 * It is a tool the AGBA team uses, not a page to impress anyone.
 */

type State = { error?: string; ok?: string };

const inputCls =
  "w-full rounded-sm border border-line bg-base px-3 py-2.5 text-base sm:text-sm text-heading placeholder:text-muted-2 focus:border-red focus:outline-none";

export function Field({
  label,
  name,
  type = "text",
  defaultValue,
  placeholder,
  required,
  hint,
  className,
}: {
  label: string;
  name: string;
  type?: string;
  defaultValue?: string | number | null;
  placeholder?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`f-${name}`}
        className="data block text-[0.62rem] uppercase tracking-[0.14em] text-muted-2"
      >
        {label}
        {required && <span className="ml-1 text-red">*</span>}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type={type}
        required={required}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        className={cn(inputCls, "mt-2")}
      />
      {hint && <p className="mt-1.5 text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

export function TextArea({
  label,
  name,
  defaultValue,
  rows = 4,
  placeholder,
  required,
  className,
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  placeholder?: string;
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`f-${name}`}
        className="data block text-[0.62rem] uppercase tracking-[0.14em] text-muted-2"
      >
        {label}
        {required && <span className="ml-1 text-red">*</span>}
      </label>
      <textarea
        id={`f-${name}`}
        name={name}
        rows={rows}
        required={required}
        defaultValue={defaultValue ?? undefined}
        placeholder={placeholder}
        className={cn(inputCls, "mt-2 resize-y")}
      />
    </div>
  );
}

export function FileField({
  label,
  name,
  accept,
  hint,
  className,
}: {
  label: string;
  name: string;
  accept?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`f-${name}`}
        className="data block text-[0.62rem] uppercase tracking-[0.14em] text-muted-2"
      >
        {label}
      </label>
      <input
        id={`f-${name}`}
        name={name}
        type="file"
        accept={accept}
        className="mt-2 w-full cursor-pointer rounded-sm border border-dashed border-line bg-base px-3 py-2.5 text-sm text-muted file:mr-3 file:cursor-pointer file:rounded-sm file:border-0 file:bg-red file:px-3 file:py-1.5 file:text-xs file:font-semibold file:uppercase file:tracking-wider file:text-white"
      />
      {hint && <p className="mt-1.5 text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

export function Toggle({
  label,
  name,
  defaultChecked = true,
  hint,
}: {
  label: string;
  name: string;
  defaultChecked?: boolean;
  hint?: string;
}) {
  return (
    <div>
      <label className="flex cursor-pointer items-center gap-3">
        <input
          name={name}
          type="checkbox"
          defaultChecked={defaultChecked}
          className="h-4 w-4 accent-[#d41000]"
        />
        <span className="text-sm text-heading">{label}</span>
      </label>
      {hint && <p className="mt-1.5 text-xs text-muted-2">{hint}</p>}
    </div>
  );
}

export function Select({
  label,
  name,
  options,
  defaultValue,
  className,
}: {
  label: string;
  name: string;
  options: readonly string[];
  defaultValue?: string | null;
  className?: string;
}) {
  return (
    <div className={className}>
      <label
        htmlFor={`f-${name}`}
        className="data block text-[0.62rem] uppercase tracking-[0.14em] text-muted-2"
      >
        {label}
      </label>
      <select
        id={`f-${name}`}
        name={name}
        defaultValue={defaultValue ?? undefined}
        className={cn(inputCls, "mt-2")}
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </div>
  );
}

export function SubmitButton({ children = "Save" }: { children?: string }) {
  const { pending } = useFormStatus();
  return (
    <button type="submit" disabled={pending} className="btn btn-primary btn-sm">
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 animate-spin" /> Saving
        </>
      ) : (
        children
      )}
    </button>
  );
}

/**
 * Wraps a server action, surfacing its {error|ok} result above the form.
 * Every manager form in the panel uses this so feedback is consistent.
 */
export function ActionForm({
  action,
  children,
  className,
}: {
  action: (prev: State, fd: FormData) => Promise<State>;
  children: React.ReactNode;
  className?: string;
}) {
  const [state, formAction] = useActionState(action, {});

  return (
    <form action={formAction} className={className}>
      {state.error && (
        <p
          role="alert"
          className="mb-5 flex items-start gap-2 rounded-sm border border-red/40 bg-red/8 px-4 py-3 text-sm text-heading"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red" strokeWidth={2} />
          {state.error}
        </p>
      )}
      {state.ok && (
        <p
          role="status"
          className="mb-5 flex items-start gap-2 rounded-sm border border-ok/40 bg-ok/8 px-4 py-3 text-sm text-heading"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-ok" strokeWidth={2} />
          {state.ok}
        </p>
      )}
      {children}
    </form>
  );
}

/** Delete button with a confirm step — destructive and not undoable. */
export function DeleteButton({
  action,
  id,
  label = "Delete",
}: {
  action: (fd: FormData) => void;
  id: number;
  label?: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!confirm("Delete this permanently? This cannot be undone.")) {
          e.preventDefault();
        }
      }}
      className="inline"
    >
      <input type="hidden" name="id" value={id} />
      <button
        type="submit"
        className="text-xs text-muted-2 underline-offset-4 transition-colors hover:text-red hover:underline"
      >
        {label}
      </button>
    </form>
  );
}
