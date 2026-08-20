"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, FileText, Loader2, Lock, LockOpen, X } from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ROUTES, waLink } from "@/lib/site";
import type { DocumentRow } from "@/lib/db/types";
import { downloadGateSchema, type DownloadGateValues } from "@/lib/validation";
import { cn, formatBytes } from "@/lib/utils";

/**
 * The Downloads library.
 *
 * Documents are grouped by the `category` the team sets in the control panel,
 * so adding a new section of the library is just typing a new category name.
 *
 * Access is gated once per visitor: name + email unlocks every document, and
 * the lead lands in the control panel. The gate is enforced server-side in
 * app/api/files/[id] — the files are not reachable by URL, so hiding the
 * button is not the security boundary.
 */
const DOC_REQUEST_MESSAGE =
  "Hello AGBA — could you send me the technical documents (drawings / data sheet / certificates) for your couplers?";

export function Downloads({
  documents,
  unlocked: initiallyUnlocked,
}: {
  documents: DocumentRow[];
  unlocked: boolean;
}) {
  const reduce = useReducedMotion();
  const [unlocked, setUnlocked] = useState(initiallyUnlocked);
  const [pending, setPending] = useState<DocumentRow | null>(null);

  const groups = useMemo(() => {
    const map = new Map<string, DocumentRow[]>();
    for (const d of documents) {
      const list = map.get(d.category) ?? [];
      list.push(d);
      map.set(d.category, list);
    }
    return [...map.entries()];
  }, [documents]);

  const request = (doc: DocumentRow) => {
    if (unlocked) {
      window.open(`/api/files/${doc.file_id}`, "_blank", "noopener");
      return;
    }
    setPending(doc);
  };

  const onUnlocked = () => {
    setUnlocked(true);
    const doc = pending;
    setPending(null);
    if (doc) window.open(`/api/files/${doc.file_id}`, "_blank", "noopener");
  };

  // Nothing published yet — say so plainly and point at the people who can
  // help, rather than rendering an empty library with a lock notice.
  if (documents.length === 0) {
    return (
      <Reveal className="mt-10">
        <div className="panel flex flex-col items-start gap-5 p-7 sm:p-9">
          <FileText className="h-8 w-8 shrink-0 text-red" strokeWidth={1.5} />
          <div>
            <h3 className="font-display text-xl font-semibold text-heading">
              Documents are being prepared
            </h3>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Drawings, data sheets, the engineer&apos;s guide and our
              certifications are being finalised for publication. In the
              meantime our technical team will send any document you need
              directly — tell us what you&apos;re specifying.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href={`${ROUTES.contact}#enquiry`}>
              Request Documents
            </ButtonLink>
            <ButtonLink href={waLink(DOC_REQUEST_MESSAGE)} variant="ghost">
              Ask on WhatsApp
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    );
  }

  return (
    <>
      {/* status strip */}
      <Reveal className="mt-10">
        <div
          className={cn(
            "flex flex-wrap items-center gap-3 rounded-sm border px-5 py-4",
            unlocked ? "border-ok/40 bg-ok/6" : "border-line bg-surface",
          )}
        >
          {unlocked ? (
            <>
              <LockOpen className="h-4 w-4 shrink-0 text-ok" strokeWidth={2} />
              <p className="text-sm text-muted">
                <span className="text-heading">Library unlocked.</span> Every
                document below is now one click away.
              </p>
            </>
          ) : (
            <>
              <Lock className="h-4 w-4 shrink-0 text-red" strokeWidth={2} />
              <p className="text-sm text-muted">
                Tell us your <span className="text-heading">name and email</span>{" "}
                once — it unlocks all {documents.length} documents on this page.
              </p>
            </>
          )}
        </div>
      </Reveal>

      {/* library */}
      <div className="mt-10 space-y-12">
        {groups.map(([category, docs], gi) => (
          <Reveal key={category} delay={gi * 0.05}>
            <h3 className="data flex items-center gap-4 text-[0.68rem] font-medium uppercase tracking-[0.16em] text-red">
              {category}
              <span className="h-px flex-1 bg-line" aria-hidden="true" />
              <span className="text-muted-2">
                {docs.length} {docs.length === 1 ? "file" : "files"}
              </span>
            </h3>

            <ul className="mt-5 grid gap-3 md:grid-cols-2">
              {docs.map((d) => (
                <li key={d.id}>
                  <button
                    type="button"
                    onClick={() => request(d)}
                    className="panel panel-hover group flex w-full items-start gap-4 p-5 text-left"
                  >
                    <FileText
                      className="mt-0.5 h-5 w-5 shrink-0 text-red"
                      strokeWidth={1.75}
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block font-display text-base font-semibold text-heading">
                        {d.title}
                      </span>
                      {d.description && (
                        <span className="mt-1.5 block text-sm leading-relaxed text-muted">
                          {d.description}
                        </span>
                      )}
                      <span className="data mt-3 block text-[0.65rem] uppercase tracking-wider text-muted-2">
                        {(d.mime === "application/pdf" ? "PDF" : "FILE") +
                          (d.size ? ` · ${formatBytes(d.size)}` : "")}
                      </span>
                    </span>
                    <span
                      className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-line text-muted-2 transition-colors group-hover:border-red group-hover:text-red"
                      aria-hidden="true"
                    >
                      {unlocked ? (
                        <Download className="h-4 w-4" strokeWidth={2} />
                      ) : (
                        <Lock className="h-3.5 w-3.5" strokeWidth={2} />
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>

      {/* gate */}
      <AnimatePresence>
        {pending && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Document access"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPending(null)}
            className="fixed inset-0 z-[60] grid place-items-center bg-deep/70 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.3, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="panel w-full max-w-lg"
            >
              <GateForm
                doc={pending}
                onClose={() => setPending(null)}
                onSuccess={onUnlocked}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function GateForm({
  doc,
  onClose,
  onSuccess,
}: {
  doc: DocumentRow;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DownloadGateValues>({
    resolver: zodResolver(downloadGateSchema),
    mode: "onBlur",
    defaultValues: { documentId: doc.id },
  });

  const onSubmit = async (values: DownloadGateValues) => {
    setServerError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          kind: "download",
          data: { ...values, documentId: doc.id },
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      onSuccess();
    } catch {
      setServerError("Could not reach the server. Please try again.");
    }
  };

  const field =
    "w-full rounded-sm border bg-surface px-4 py-3 text-base sm:text-sm text-heading placeholder:text-muted-2 focus:outline-none";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="flex items-start justify-between gap-4 border-b border-line p-6">
        <div>
          <span className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
            Document access
          </span>
          <h3 className="mt-2 font-display text-lg font-semibold leading-snug text-heading">
            {doc.title}
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="grid h-9 w-9 shrink-0 place-items-center rounded-sm border border-line text-muted transition-colors hover:border-red hover:text-heading"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 p-6">
        <p className="text-sm leading-relaxed text-muted">
          One form unlocks every document on this page. We use it to send you
          the right technical support — nothing else.
        </p>

        <div>
          <label htmlFor="g-name" className="sr-only">
            Your name
          </label>
          <input
            id="g-name"
            placeholder="Your name *"
            autoFocus
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
          <label htmlFor="g-email" className="sr-only">
            Work email
          </label>
          <input
            id="g-email"
            type="email"
            placeholder="Work email *"
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
          <label htmlFor="g-company" className="sr-only">
            Company
          </label>
          <input
            id="g-company"
            placeholder="Company"
            className={cn(field, "border-line focus:border-red")}
            {...register("company")}
          />
        </div>

        {serverError && (
          <p role="alert" className="text-sm text-red">
            {serverError}
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Unlocking
            </>
          ) : (
            <>
              <Download className="h-4 w-4" strokeWidth={2} />
              Unlock &amp; Download
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
