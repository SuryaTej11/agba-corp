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
import type { NewsItem } from "@/lib/db/types";
import { saveNewsAction } from "../../actions";

export function NewsForm({ item }: { item?: NewsItem }) {
  return (
    <ActionForm action={saveNewsAction} className="panel mt-8 p-6">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold text-heading">
          {item ? `Edit "${item.title}"` : "Add news or an event"}
        </h2>
        {item && (
          <Link
            href="/admin/news"
            className="text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
          >
            Cancel edit
          </Link>
        )}
      </div>

      <div className="mt-6 space-y-5">
        <Field label="Title" name="title" required defaultValue={item?.title} />

        <div className="grid gap-5 sm:grid-cols-3">
          <Field
            label="Category"
            name="category"
            defaultValue={item?.category ?? "News"}
            placeholder="News / Event / Certification"
          />
          <Field
            label="Date"
            name="event_date"
            type="date"
            defaultValue={item?.event_date}
          />
          <Field
            label="Location"
            name="location"
            defaultValue={item?.location}
            placeholder="Butibori MIDC, Nagpur"
          />
        </div>

        <TextArea
          label="Excerpt"
          name="excerpt"
          rows={2}
          defaultValue={item?.excerpt}
          placeholder="One or two lines — this is what shows on the cards."
        />

        <TextArea
          label="Full text"
          name="body"
          rows={6}
          defaultValue={item?.body}
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="URL slug"
            name="slug"
            defaultValue={item?.slug}
            hint="Leave empty to generate it from the title."
          />
          <FileField
            label="Cover image"
            name="cover"
            accept="image/*"
            hint={item?.cover_file_id ? "Leave empty to keep the current image." : "Optional."}
          />
        </div>

        <Toggle
          label="Published"
          name="published"
          defaultChecked={item ? item.published === 1 : true}
        />
      </div>

      <div className="mt-7">
        <SubmitButton>{item ? "Update entry" : "Add entry"}</SubmitButton>
      </div>
    </ActionForm>
  );
}
