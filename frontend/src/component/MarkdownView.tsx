import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type MarkdownViewProps = { content: string };

const MarkdownView = ({ content }: MarkdownViewProps) => (
  <div className="space-y-4 p-5 text-sm leading-7 text-slate-700 sm:text-base">
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
      h1: ({ children }) => <h1 className="text-2xl font-bold text-slate-950">{children}</h1>,
      h2: ({ children }) => <h2 className="mt-5 text-xl font-bold text-slate-950">{children}</h2>,
      h3: ({ children }) => <h3 className="mt-4 text-lg font-semibold text-slate-900">{children}</h3>,
      p: ({ children }) => <p>{children}</p>,
      ul: ({ children }) => <ul className="list-disc space-y-1 pl-6">{children}</ul>,
      ol: ({ children }) => <ol className="list-decimal space-y-1 pl-6">{children}</ol>,
      blockquote: ({ children }) => <blockquote className="border-l-4 border-teal-300 pl-4 text-slate-600">{children}</blockquote>,
      table: ({ children }) => <table className="w-full min-w-max border-collapse text-left">{children}</table>,
      th: ({ children }) => <th className="border-b border-slate-300 bg-slate-50 px-3 py-2 font-semibold text-slate-900">{children}</th>,
      td: ({ children }) => <td className="border-b border-slate-200 px-3 py-2 align-top">{children}</td>,
      pre: ({ children }) => <pre className="overflow-x-auto rounded-lg bg-slate-100 p-3 text-sm">{children}</pre>,
      code: ({ children }) => <code className="rounded bg-slate-100 px-1 text-sm">{children}</code>,
      a: ({ children, href }) => <a className="font-medium text-teal-700 underline" href={href}>{children}</a>,
      hr: () => <hr className="border-slate-200" />,
    }}>
      {content}
    </ReactMarkdown>
  </div>
);

export default MarkdownView;
