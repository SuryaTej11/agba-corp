"use client";

import Link from "next/link";
import {
  ActionForm,
  Field,
  FileField,
  Select,
  SubmitButton,
  TextArea,
} from "@/components/admin/AdminUI";
import type { Batch, DocumentRow } from "@/lib/db/types";
import { saveBatchAction } from "../../actions";

export function BatchForm({
  batch,
  documents,
  relatedIds,
}: {
  batch?: Batch;
  documents: DocumentRow[];
  relatedIds: number[];
}) {
  return (
    <ActionForm action={saveBatchAction} className="panel mt-8 p-6">
      {batch && <input type="hidden" name="id" value={batch.id} />}

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold text-heading">
          {batch ? `Edit ${batch.batch_no}` : "Add a batch"}
        </h2>
        {batch && (
          <Link
            href="/admin/batches"
            className="text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
          >
            Cancel edit
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <Field
          label="Batch number"
          name="batch_no"
          required
          defaultValue={batch?.batch_no}
          placeholder="AGB-2504-0187"
          hint="Exactly as stamped on the coupler."
        />
        <Field
          label="Heat number"
          name="heat_no"
          defaultValue={batch?.heat_no}
          placeholder="H-24203-A"
        />
        <Field
          label="Bar grade"
          name="grade"
          defaultValue={batch?.grade}
          placeholder="Fe 500D"
        />
        <Field
          label="Bar diameter (mm)"
          name="size_mm"
          defaultValue={batch?.size_mm}
          placeholder="32"
        />
        <Select
          label="Coupler class"
          name="class"
          options={["Class H", "Class L"]}
          defaultValue={batch?.class}
        />
        <Select
          label="Status"
          name="status"
          options={["released", "on hold", "withdrawn"]}
          defaultValue={batch?.status}
        />
        <Field
          label="Date of manufacture"
          name="mfg_date"
          type="date"
          defaultValue={batch?.mfg_date}
        />
        <Field
          label="Date of test"
          name="test_date"
          type="date"
          defaultValue={batch?.test_date}
        />
        <FileField
          label="NABL certificate (PDF)"
          name="certificate"
          accept="application/pdf"
          hint={
            batch?.certificate_file_id
              ? "Leave empty to keep the current certificate."
              : "Max 50 MB."
          }
        />
      </div>

      <TextArea
        label="Internal notes"
        name="notes"
        rows={2}
        defaultValue={batch?.notes}
        className="mt-5"
      />

      {documents.length > 0 && (
        <fieldset className="mt-6">
          <legend className="data text-[0.62rem] uppercase tracking-[0.14em] text-muted-2">
            Related documents shown with this batch
          </legend>
          <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((d) => (
              <label
                key={d.id}
                className="flex cursor-pointer items-start gap-2.5 rounded-sm border border-line p-3 text-sm transition-colors hover:border-line-2"
              >
                <input
                  type="checkbox"
                  name="documents"
                  value={d.id}
                  defaultChecked={relatedIds.includes(d.id)}
                  className="mt-0.5 h-3.5 w-3.5 shrink-0 accent-[#d41000]"
                />
                <span>
                  <span className="block text-heading">{d.title}</span>
                  <span className="data mt-0.5 block text-[0.6rem] uppercase tracking-wider text-muted-2">
                    {d.category}
                    {d.published ? "" : " · unpublished"}
                  </span>
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="mt-7">
        <SubmitButton>{batch ? "Update batch" : "Add batch"}</SubmitButton>
      </div>
    </ActionForm>
  );
}
