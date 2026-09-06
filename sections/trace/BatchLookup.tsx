"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  FileText,
  Loader2,
  Search,
} from "lucide-react";
import { Button, ButtonLink } from "@/components/ui/Button";
import { TRACE } from "@/lib/data";
import { formatBytes, formatDate } from "@/lib/utils";
import { AssistanceForm } from "./AssistanceForm";

type Result =
  | { state: "idle" }
  | { state: "loading" }
  | { state: "error"; message: string }
  | { state: "missing"; batchNo: string }
  | { state: "found"; batch: FoundBatch };

type FoundBatch = {
  batchNo: string;
  heatNo: string | null;
  grade: string | null;
  size: string | null;
  class: string | null;
  mfgDate: string | null;
  testDate: string | null;
  status: string;
  certificate: { fileId: number; name: string; size: number } | null;
  documents: {
    id: number;
    title: string;
    category: string;
    fileId: number | null;
    size: number | null;
  }[];
};

export function BatchLookup() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState("");
  const [result, setResult] = useState<Result>({ state: "idle" });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const batchNo = value.trim();
    if (batchNo.length < 3) {
      setResult({
        state: "error",
        message: "Enter the batch number stamped on the coupler.",
      });
      return;
    }

    setResult({ state: "loading" });
    try {
      const res = await fetch("/api/batch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ batchNo }),
      });
      const json = await res.json();

      if (!res.ok) {
        setResult({ state: "error", message: json.error ?? "Lookup failed." });
        return;
      }
      setResult(
        json.found
          ? { state: "found", batch: json.batch }
          : { state: "missing", batchNo },
      );
    } catch {
      setResult({
        state: "error",
        message: "Could not reach the server. Please try again.",
      });
    }
  };

  return (
    <div>
      {/* ---------------------------------------------------- form ---- */}
      <form onSubmit={submit} className="flex flex-col gap-3 sm:flex-row">
        <label htmlFor="batch" className="sr-only">
          Batch number
        </label>
        <div className="relative flex-1">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-2"
            strokeWidth={2}
            aria-hidden="true"
          />
          <input
            id="batch"
            name="batch"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={`e.g. ${TRACE.sampleHint}`}
            autoComplete="off"
            spellCheck={false}
            className="data w-full rounded-sm border border-line bg-surface py-4 pl-11 pr-4 text-base sm:text-sm uppercase tracking-wider text-heading placeholder:normal-case placeholder:tracking-normal placeholder:text-muted-2 focus:border-red focus:outline-none"
          />
        </div>
        <Button type="submit" disabled={result.state === "loading"} className="sm:w-auto">
          {result.state === "loading" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" /> Tracing
            </>
          ) : (
            <>Verify Your Batch</>
          )}
        </Button>
      </form>

      <p className="mt-3 text-xs text-muted-2">
        The batch number is laser-stamped on the coupler body. Try{" "}
        <button
          type="button"
          onClick={() => setValue(TRACE.sampleHint)}
          className="data text-red underline underline-offset-4 hover:text-red-bright"
        >
          {TRACE.sampleHint}
        </button>{" "}
        to see a sample record.
      </p>

      {/* -------------------------------------------------- result ---- */}
      <AnimatePresence mode="wait">
        {result.state === "error" && (
          <Panel key="error" reduce={reduce}>
            <div className="flex items-start gap-3 p-6">
              <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red" strokeWidth={2} />
              <p className="text-sm text-muted">{result.message}</p>
            </div>
          </Panel>
        )}

        {result.state === "found" && (
          <Panel key="found" reduce={reduce}>
            <FoundPanel batch={result.batch} />
          </Panel>
        )}

        {result.state === "missing" && (
          <Panel key="missing" reduce={reduce}>
            <MissingPanel batchNo={result.batchNo} />
          </Panel>
        )}
      </AnimatePresence>
    </div>
  );
}

function Panel({
  children,
  reduce,
}: {
  children: React.ReactNode;
  reduce: boolean | null;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
      className="panel mt-8 overflow-hidden"
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------- found ---- */

function FoundPanel({ batch }: { batch: FoundBatch }) {
  const fields = [
    { label: "Batch Number", value: batch.batchNo },
    { label: "Heat Number", value: batch.heatNo },
    { label: "Bar Grade", value: batch.grade },
    { label: "Bar Diameter", value: batch.size ? `${batch.size} mm` : null },
    { label: "Coupler Class", value: batch.class },
    { label: "Date of Manufacture", value: formatDate(batch.mfgDate) },
    { label: "Date of Test", value: formatDate(batch.testDate) },
    { label: "Status", value: batch.status },
  ];

  return (
    <div>
      <div className="flex items-center gap-3 border-b border-line bg-ok/8 px-6 py-4">
        <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
          <span className="animate-ping-slow absolute inline-flex h-full w-full rounded-full bg-ok opacity-60" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-ok" />
        </span>
        <p className="data text-xs font-medium uppercase tracking-[0.14em] text-ok">
          Batch verified · Traced to source
        </p>
      </div>

      <dl className="grid gap-px bg-line sm:grid-cols-2 lg:grid-cols-4">
        {fields.map((f) => (
          <div key={f.label} className="bg-page px-6 py-5">
            <dt className="data text-[0.62rem] uppercase tracking-[0.14em] text-muted-2">
              {f.label}
            </dt>
            <dd className="data mt-2 text-sm font-medium uppercase text-heading">
              {f.value ?? "—"}
            </dd>
          </div>
        ))}
      </dl>

      {/* certificate */}
      <div className="border-t border-line p-6">
        <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
          Test Certificate
        </p>
        {batch.certificate ? (
          <a
            href={`/api/files/${batch.certificate.fileId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-4 flex items-center gap-4 rounded-sm border border-line p-4 transition-colors hover:border-red hover:bg-surface-2"
          >
            <FileText className="h-6 w-6 shrink-0 text-red" strokeWidth={1.75} />
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-medium text-heading">
                NABL test certificate for {batch.batchNo}
              </span>
              <span className="data mt-1 block text-xs text-muted-2">
                PDF · {formatBytes(batch.certificate.size)}
              </span>
            </span>
            <CheckCircle2
              className="h-5 w-5 shrink-0 text-ok transition-transform duration-300 group-hover:scale-110"
              strokeWidth={1.75}
            />
          </a>
        ) : (
          <p className="mt-3 text-sm text-muted">
            No certificate has been attached to this batch yet. Request it below
            and our QC team will send it across.
          </p>
        )}
      </div>

      {/* related documents attached in the control panel */}
      {batch.documents.length > 0 && (
        <div className="border-t border-line p-6">
          <p className="data text-[0.62rem] uppercase tracking-[0.16em] text-red">
            Related Documents
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {batch.documents.map((d) => (
              <li key={d.id}>
                <a
                  href={`/api/files/${d.fileId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-sm border border-line px-4 py-3 transition-colors hover:border-red hover:bg-surface-2"
                >
                  <FileText className="h-4 w-4 shrink-0 text-muted-2" strokeWidth={1.75} />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm text-heading">
                      {d.title}
                    </span>
                    <span className="data mt-0.5 block text-[0.65rem] uppercase tracking-wider text-muted-2">
                      {d.category}
                      {d.size ? ` · ${formatBytes(d.size)}` : ""}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs text-muted-2">
            Related documents need the one-time access form below — it unlocks
            every document on this page.
          </p>
        </div>
      )}
    </div>
  );
}

/* ----------------------------------------------------------- missing ---- */

function MissingPanel({ batchNo }: { batchNo: string }) {
  return (
    <div className="p-6 sm:p-8">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red" strokeWidth={2} />
        <div>
          <h3 className="font-display text-xl font-semibold text-heading">
            {TRACE.cantFind.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            We have no record for{" "}
            <span className="data uppercase text-heading">{batchNo}</span>.{" "}
            {TRACE.cantFind.body}
          </p>
        </div>
      </div>

      {/* The two CTAs the client asked for, side by side. */}
      <div className="mt-7 flex flex-wrap gap-3">
        <ButtonLink href="/contact#enquiry">Request Your Quote</ButtonLink>
        <ButtonLink href="#request-assistance" variant="ghost">
          Request Assistance
        </ButtonLink>
      </div>

      <div id="request-assistance" className="mt-8 border-t border-line pt-8">
        <AssistanceForm batchNo={batchNo} />
      </div>
    </div>
  );
}
