import { useEffect, useMemo, useState } from "react";
import mermaid from "mermaid";
import MarkdownView from "./MarkdownView";

type MermaidViewProps = {
  chart: string;
};

const mermaidStartWords = ["mindmap", "graph", "flowchart", "sequenceDiagram", "classDiagram", "stateDiagram"];

mermaid.initialize({
  startOnLoad: false,
  securityLevel: "strict",
  theme: "base",
  themeVariables: {
    primaryColor: "#ccfbf1",
    primaryBorderColor: "#0f766e",
    primaryTextColor: "#0f172a",
    lineColor: "#334155",
    secondaryColor: "#f8fafc",
    tertiaryColor: "#ffffff",
    fontFamily: "Inter, ui-sans-serif, system-ui, sans-serif",
  },
});

const extractMermaidChart = (content: string) => {
  const fencedChart = content.match(/```mermaid\s*([\s\S]*?)```/i);
  return (fencedChart?.[1] || content).trim();
};

const looksLikeMermaid = (chart: string) => {
  return mermaidStartWords.some((word) => chart.startsWith(word));
};

const MermaidView = ({ chart }: MermaidViewProps) => {
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  const cleanChart = useMemo(() => extractMermaidChart(chart), [chart]);
  const canRender = looksLikeMermaid(cleanChart);

  useEffect(() => {
    let ignore = false;

    const renderChart = async () => {
      if (!canRender) {
        setSvg("");
        setError("");
        return;
      }

      try {
        const chartId = `notesai-mermaid-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const rendered = await mermaid.render(chartId, cleanChart);

        if (!ignore) {
          setSvg(rendered.svg);
          setError("");
        }
      } catch {
        if (!ignore) {
          setSvg("");
          setError("Mind map could not be rendered as a Mermaid diagram.");
        }
      }
    };

    renderChart();

    return () => {
      ignore = true;
    };
  }, [canRender, cleanChart]);

  if (!canRender || error) {
    return (
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        {error && <p className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm font-medium text-amber-800">{error}</p>}
        <MarkdownView content={chart} />
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white p-4">
      <div className="min-w-[640px]" dangerouslySetInnerHTML={{ __html: svg }} />
    </div>
  );
};

export default MermaidView;
