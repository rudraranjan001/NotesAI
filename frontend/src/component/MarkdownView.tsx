import MarkdownView from "./MarkdownView";

type MindMapViewProps = {
  content: string;
};

const cleanLine = (line: string) =>
  line.replace(/^[-*]\s*/, "").replace(/\*\*/g, "").trim();

const MindMapView = ({ content }: MindMapViewProps) => {
  const lines = content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.startsWith("-") || line.startsWith("*"));

  if (lines.length === 0) {
    return <MarkdownView content={content} />;
  }

  const mainTopic = cleanLine(lines[0]);
  const branches = lines.slice(1).map(cleanLine).filter(Boolean);

  return (
    <div className="space-y-5">
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-5 text-center">
        <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
          Main Topic
        </p>
        <h2 className="mt-2 text-2xl font-bold text-slate-950">{mainTopic}</h2>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {branches.map((branch, index) => (
          <div
            key={`${branch}-${index}`}
            className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
          >
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Branch {index + 1}
            </p>
            <p className="mt-2 font-semibold text-slate-800">{branch}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindMapView;