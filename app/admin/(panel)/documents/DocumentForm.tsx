"use client";

import Link from "next/link";
import {
  ActionForm,
  Field,
  FileField,
  SubmitButton,
  TextArea,
  Toggle,
} from "@/components/admin/AdminUI";
import type { DocumentRow } from "@/lib/db/types";
import { saveDocumentAction } from "../../actions";

export function DocumentForm({
  doc,
  categories,
}: {
  doc?: DocumentRow;
  categories: string[];
}) {
  return (
    <ActionForm action={saveDocumentAction} className="panel mt-8 p-6">
      {doc && <input type="hidden" name="id" value={doc.id} />}

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold text-heading">
          {doc ? `Edit "${doc.title}"` : "Add a document"}
        </h2>
        {doc && (
          <Link
            href="/admin/documents"
            className="text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
          >
            Cancel edit
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Field
          label="Title"
          name="title"
          required
          defaultValue={doc?.title}
          placeholder="Engineer's Guide to Mechanical Splicing"
        />
        <div>
          <Field
            label="Category"
            name="category"
            defaultValue={doc?.category}
            placeholder="Technical"
            hint="Groups the file on the Downloads page. A new name creates a new group."
          />
          {categories.length > 0 && (
            <p className="mt-2 flex flex-wrap gap-1.5">
              {categories.map((c) => (
                <span
                  key={c}
                  className="data rounded-sm border border-line px-1.5 py-0.5 text-[0.58rem] uppercase tracking-wider text-muted-2"
                >
                  {c}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      <TextArea
        label="Description"
        name="description"
        rows={2}
        defaultValue={doc?.description}
        placeholder="One line telling an engineer what is inside."
        className="mt-5"
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-2">
        <FileField
          label="File"
          name="file"
          accept=".pdf,.doc,.docx,.xls,.xlsx,.zip,.dwg,.dxf,image/*"
          hint={
            doc?.file_id
              ? `Currently: ${doc.original_name ?? "attached"}. Leave empty to keep it.`
              : "PDF, Word, Excel, ZIP, DWG or image. Max 50 MB."
          }
        />
        <Field
          label="Sort order"
          name="sort"
          type="number"
          defaultValue={doc?.sort ?? 0}
          hint="Lower numbers appear first."
        />
      </div>

      <div className="mt-6">
        <Toggle
          label="Published"
          name="published"
          defaultChecked={doc ? doc.published === 1 : true}
          hint="Unpublished documents are hidden from the site and cannot be downloaded."
        />
      </div>

      <div className="mt-7">
        <SubmitButton>{doc ? "Update document" : "Add document"}</SubmitButton>
      </div>
    </ActionForm>
  );
}
