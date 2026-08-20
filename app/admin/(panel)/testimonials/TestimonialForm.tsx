"use client";

import Link from "next/link";
import {
  ActionForm,
  Field,
  Select,
  SubmitButton,
  TextArea,
  Toggle,
} from "@/components/admin/AdminUI";
import type { Testimonial } from "@/lib/db/types";
import { saveTestimonialAction } from "../../actions";

export function TestimonialForm({ item }: { item?: Testimonial }) {
  return (
    <ActionForm action={saveTestimonialAction} className="panel mt-8 p-6">
      {item && <input type="hidden" name="id" value={item.id} />}

      <div className="flex items-center justify-between gap-4">
        <h2 className="font-display text-lg font-semibold text-heading">
          {item ? `Edit ${item.name}` : "Add a testimonial"}
        </h2>
        {item && (
          <Link
            href="/admin/testimonials"
            className="text-xs text-muted underline-offset-4 hover:text-heading hover:underline"
          >
            Cancel edit
          </Link>
        )}
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Name" name="name" required defaultValue={item?.name} />
        <Field
          label="Role"
          name="role"
          defaultValue={item?.role}
          placeholder="Project Manager"
        />
        <Field label="Company" name="company" defaultValue={item?.company} />
        <Field
          label="Project"
          name="project"
          defaultValue={item?.project}
          placeholder="Residential tower, Nagpur"
        />
      </div>

      <TextArea
        label="Quote"
        name="quote"
        required
        rows={4}
        defaultValue={item?.quote}
        className="mt-5"
      />

      <div className="mt-5 grid gap-5 sm:grid-cols-3">
        <Select
          label="Rating"
          name="rating"
          options={["5", "4", "3", "2", "1"]}
          defaultValue={String(item?.rating ?? 5)}
        />
        <Field
          label="Sort order"
          name="sort"
          type="number"
          defaultValue={item?.sort ?? 0}
        />
        <div className="flex items-end pb-2">
          <Toggle
            label="Published"
            name="published"
            defaultChecked={item ? item.published === 1 : true}
          />
        </div>
      </div>

      <div className="mt-7">
        <SubmitButton>{item ? "Update" : "Add testimonial"}</SubmitButton>
      </div>
    </ActionForm>
  );
}
