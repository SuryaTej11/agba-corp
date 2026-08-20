import { z } from "zod";

/** Shared form schemas. Used by react-hook-form on the client and re-validated
 *  on the server in every route handler — never trust the client copy. */

const name = z.string().trim().min(2, "Please enter your name.");
const email = z
  .string()
  .trim()
  .min(1, "Email is required.")
  .email("Enter a valid email address.");
const phone = z
  .string()
  .trim()
  .optional()
  .refine((v) => !v || /^[+()\d\s-]{6,20}$/.test(v), "Enter a valid phone number.");

/** Contact page — the main enquiry form. */
export const enquirySchema = z.object({
  name,
  company: z.string().trim().optional(),
  email,
  phone,
  spec: z.string().trim().optional(),
  message: z.string().trim().min(4, "Tell us a little about what you need."),
});
export type EnquiryValues = z.infer<typeof enquirySchema>;

/** Downloads gate — name and email before any document is released. */
export const downloadGateSchema = z.object({
  name,
  email,
  company: z.string().trim().optional(),
  documentId: z.number().int().positive().optional(),
});
export type DownloadGateValues = z.infer<typeof downloadGateSchema>;

/** "Can't find your batch?" — request assistance from the QC team. */
export const assistanceSchema = z.object({
  name,
  email,
  phone,
  batchNo: z.string().trim().optional(),
  message: z.string().trim().optional(),
});
export type AssistanceValues = z.infer<typeof assistanceSchema>;

/** Batch lookup. */
export const batchLookupSchema = z.object({
  batchNo: z.string().trim().min(3, "Enter the batch number stamped on the coupler."),
});
export type BatchLookupValues = z.infer<typeof batchLookupSchema>;
