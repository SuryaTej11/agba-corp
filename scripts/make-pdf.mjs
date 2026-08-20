/**
 * Minimal single-page PDF writer.
 *
 * Used only by the seed script, to generate placeholder test certificates and
 * datasheets so the download and batch-verification flows are clickable the
 * moment the site starts. Real files replace these through the control panel.
 */

const esc = (s) => String(s).replace(/([\\()])/g, "\\$1");

/**
 * @param {string} title
 * @param {string[]} lines
 * @returns {Buffer}
 */
export function makePdf(title, lines) {
  const content = [
    "BT",
    "/F1 20 Tf",
    "56 780 Td",
    `(${esc(title)}) Tj`,
    "/F1 10 Tf",
    "0 -14 Td",
    "(AGBA CORPORATION  .  SAMPLE DOCUMENT  .  REPLACE VIA CONTROL PANEL) Tj",
    "/F1 11 Tf",
    "0 -30 Td",
    "14 TL",
    ...lines.flatMap((l) => [`(${esc(l)}) Tj`, "T*"]),
    "ET",
  ].join("\n");

  const objects = [
    "<< /Type /Catalog /Pages 2 0 R >>",
    "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
    "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] " +
      "/Resources << /Font << /F1 4 0 R >> >> /Contents 5 0 R >>",
    "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
    `<< /Length ${Buffer.byteLength(content, "latin1")} >>\nstream\n${content}\nendstream`,
  ];

  let pdf = "%PDF-1.4\n";
  const offsets = [];

  objects.forEach((body, i) => {
    offsets.push(Buffer.byteLength(pdf, "latin1"));
    pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
  });

  const xrefStart = Buffer.byteLength(pdf, "latin1");
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (const off of offsets) {
    pdf += `${String(off).padStart(10, "0")} 00000 n \n`;
  }
  pdf +=
    `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\n` +
    `startxref\n${xrefStart}\n%%EOF\n`;

  return Buffer.from(pdf, "latin1");
}
