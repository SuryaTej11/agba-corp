/** Row shapes returned by the queries in ./queries.ts. */

export type FileRow = {
  id: number;
  filename: string;
  original_name: string;
  mime: string;
  size: number;
  created_at: string;
};

export type Batch = {
  id: number;
  batch_no: string;
  heat_no: string | null;
  grade: string | null;
  size_mm: string | null;
  class: string | null;
  mfg_date: string | null;
  test_date: string | null;
  status: string;
  notes: string | null;
  certificate_file_id: number | null;
  created_at: string;
};

/** A batch joined with its certificate metadata and related documents. */
export type BatchWithDocs = Batch & {
  certificate: FileRow | null;
  documents: DocumentRow[];
};

export type DocumentRow = {
  id: number;
  title: string;
  description: string | null;
  category: string;
  file_id: number | null;
  download_count: number;
  published: number;
  sort: number;
  created_at: string;
  /** Joined from files — present on public listings. */
  original_name?: string | null;
  mime?: string | null;
  size?: number | null;
};

export type Testimonial = {
  id: number;
  name: string;
  role: string | null;
  company: string | null;
  project: string | null;
  quote: string;
  rating: number;
  published: number;
  sort: number;
  created_at: string;
};

export type NewsItem = {
  id: number;
  slug: string;
  title: string;
  category: string;
  event_date: string | null;
  location: string | null;
  excerpt: string | null;
  body: string | null;
  cover_file_id: number | null;
  published: number;
  created_at: string;
};

export type LeadType = "download" | "enquiry" | "assistance" | "quote";

export type Lead = {
  id: number;
  type: LeadType;
  name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  spec: string | null;
  message: string | null;
  document_id: number | null;
  batch_no: string | null;
  created_at: string;
};
