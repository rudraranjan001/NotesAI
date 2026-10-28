import test from "node:test";
import assert from "node:assert/strict";
import { createNotesPdfDefinition, pdfFilename } from "../src/services/exportPdf.ts";

test("filename is based on title and safe for downloads", () => {
  assert.equal(pdfFilename(" Biology: Cells / Tissues "), "Biology Cells Tissues.pdf");
  assert.equal(pdfFilename("   "), "Study Notes.pdf");
});

test("empty content is rejected", () => {
  assert.throws(() => createNotesPdfDefinition({ title: "Empty", format: "summary", content: "  " }), /no notes to export/i);
});

test("Markdown structure is preserved in the PDF definition", () => {
  const definition = createNotesPdfDefinition({
    title: "Biology",
    format: "comparison chart",
    content: "## Cells\n\nA **bold** term and *emphasis*.\n\n- First\n- Second\n\n1. Step one\n2. Step two\n\n| Part | Function |\n| --- | --- |\n| Nucleus | Control |",
  });
  const content = definition.content;
  assert.ok(Array.isArray(content));
  assert.ok(content.some((item) => item.style === "heading2"));
  assert.ok(content.some((item) => "ul" in item));
  assert.ok(content.some((item) => "ol" in item));
  assert.ok(content.some((item) => "table" in item));
  assert.match(JSON.stringify(content), /Nucleus/);
  assert.match(JSON.stringify(content), /bold/);
});
