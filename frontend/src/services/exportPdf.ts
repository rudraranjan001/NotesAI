import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import type { Content, TDocumentDefinitions } from "pdfmake/interfaces";

type NoteForPdf = { title: string; content: string; format: string };
type MarkdownNode = {
  type: string;
  value?: string;
  depth?: number;
  ordered?: boolean;
  start?: number;
  url?: string;
  lang?: string;
  children?: MarkdownNode[];
  align?: Array<"left" | "center" | "right" | null>;
};

const parser = unified().use(remarkParse).use(remarkGfm);
const plainText = (node: MarkdownNode): string =>
  node.value ?? node.children?.map(plainText).join("") ?? "";

function inline(nodes: MarkdownNode[] = []): Content[] {
  return nodes.flatMap((node): Content[] => {
    const children = node.children ? inline(node.children) : [];
    switch (node.type) {
      case "text":
      case "inlineCode":
        return [{ text: node.value ?? "", ...(node.type === "inlineCode" ? { font: "Roboto", background: "#f1f5f9" } : {}) }];
      case "strong": return [{ text: children, bold: true }];
      case "emphasis": return [{ text: children, italics: true }];
      case "delete": return [{ text: children, decoration: "lineThrough" }];
      case "link": return [{ text: children, link: node.url, color: "#0f766e", decoration: "underline" }];
      case "break": return [{ text: "\n" }];
      case "image": return [{ text: node.value || node.url || "[Image]", italics: true }];
      default: return children.length ? children : [{ text: plainText(node) }];
    }
  });
}

function blocks(nodes: MarkdownNode[] = []): Content[] {
  return nodes.flatMap((node): Content[] => {
    switch (node.type) {
      case "heading":
        return [{ text: inline(node.children), style: `heading${Math.min(node.depth ?? 2, 3)}`, margin: [0, 12, 0, 5] }];
      case "paragraph":
        return [{ text: inline(node.children), margin: [0, 0, 0, 8] }];
      case "list": {
        const items = (node.children ?? []).map((item) => {
          const contents = blocks(item.children);
          return contents.length === 1 ? contents[0] : { stack: contents };
        });
        return [{ ...(node.ordered ? { ol: items, start: node.start } : { ul: items }), margin: [0, 0, 0, 8] } as Content];
      }
      case "blockquote":
        return [{ stack: blocks(node.children), margin: [16, 0, 0, 8], color: "#475569" }];
      case "code":
        return [{ text: node.value ?? "", fontSize: 9, background: "#f1f5f9", preserveLeadingSpaces: true, margin: [0, 2, 0, 10] }];
      case "table": {
        const rows = (node.children ?? []).map((row) =>
          (row.children ?? []).map((cell) => ({ text: inline(cell.children), margin: [3, 4, 3, 4] }))
        );
        if (!rows.length) return [];
        return [{ table: { headerRows: 1, widths: Array(rows[0].length).fill("*"), body: rows }, layout: "lightHorizontalLines", margin: [0, 3, 0, 10] }];
      }
      case "thematicBreak": return [{ canvas: [{ type: "line", x1: 0, y1: 0, x2: 515, y2: 0, lineColor: "#cbd5e1" }], margin: [0, 4, 0, 10] }];
      case "html": return [{ text: node.value ?? "", margin: [0, 0, 0, 8] }];
      default: return node.children ? blocks(node.children) : node.value ? [{ text: node.value }] : [];
    }
  });
}

export function pdfFilename(title: string): string {
  const safe = Array.from(title.trim()).filter((char) => char.charCodeAt(0) >= 32)
    .join("").replace(/[<>:"/\\|?*]/g, "").replace(/\s+/g, " ").replace(/[. ]+$/, "").slice(0, 100);
  return `${safe || "Study Notes"}.pdf`;
}

export function createNotesPdfDefinition(note: NoteForPdf): TDocumentDefinitions {
  if (!note.content.trim()) throw new Error("There are no notes to export yet.");
  const content = note.format === "mind map"
    ? [{ text: note.content, fontSize: 9, preserveLeadingSpaces: true } as Content]
    : blocks((parser.parse(note.content) as MarkdownNode).children);

  return {
    pageSize: "A4",
    pageMargins: [40, 44, 40, 44],
    info: { title: note.title || "Study Notes" },
    content: [
      { text: note.title || "Study Notes", style: "title", margin: [0, 0, 0, 6] },
      { text: note.format, color: "#0f766e", fontSize: 9, margin: [0, 0, 0, 16] },
      ...content,
    ],
    defaultStyle: { font: "Roboto", fontSize: 10, lineHeight: 1.3, color: "#1e293b" },
    styles: {
      title: { fontSize: 20, bold: true, color: "#0f172a" },
      heading1: { fontSize: 16, bold: true, color: "#0f172a" },
      heading2: { fontSize: 13, bold: true, color: "#0f172a" },
      heading3: { fontSize: 11, bold: true, color: "#0f172a" },
    },
    footer: (currentPage, pageCount) => ({ text: `${currentPage} / ${pageCount}`, alignment: "right", color: "#94a3b8", fontSize: 8, margin: [0, 0, 40, 0] }),
  };
}

export async function downloadNotesPdf(note: NoteForPdf): Promise<void> {
  const definition = createNotesPdfDefinition(note);
  const [{ default: pdfMake }, { default: pdfFonts }] = await Promise.all([
    import("pdfmake/build/pdfmake"),
    import("pdfmake/build/vfs_fonts"),
  ]);
  pdfMake.vfs = pdfFonts as unknown as Record<string, string>;
  const blob = await new Promise<Blob>((resolve, reject) => {
    try { pdfMake.createPdf(definition).getBlob(resolve); }
    catch (error) { reject(error); }
  });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = pdfFilename(note.title);
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 60_000);
}
