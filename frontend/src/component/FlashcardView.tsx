import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

type Flashcard = {
  question: string;
  answer: string;
};

const cleanMarkdown = (value: string) =>
  value
    .replace(/\*\*/g, "")
    .replace(/^[-*]\s*/, "")
    .trim();

const parseFlashcards = (content: string): Flashcard[] => {
  const sections = content
    .split(/###\s*Flashcard\s*\d+/i)
    .map((section) => section.trim())
    .filter(Boolean);

  return sections
    .map((section) => {
      const match = section.match(
        /\*?\*?Q:\*?\*?\s*([\s\S]*?)\n+\*?\*?A:\*?\*?\s*([\s\S]*)/i
      );

      if (!match) {
        return null;
      }

      return {
        question: cleanMarkdown(match[1]),
        answer: cleanMarkdown(match[2]),
      };
    })
    .filter((card): card is Flashcard => Boolean(card));
};

type FlashcardViewProps = {
  content: string;
};

const FlashcardView = ({ content }: FlashcardViewProps) => {
  const cards = parseFlashcards(content);

  if (cards.length === 0) {
    return (
      <div className="max-w-none leading-7 text-slate-700 [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-slate-950 [&_h2]:mt-6 [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-slate-950 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-slate-950 [&_li]:my-1 [&_ol]:ml-6 [&_ol]:list-decimal [&_p]:my-3 [&_strong]:text-slate-950 [&_table]:my-5 [&_table]:block [&_table]:w-full [&_table]:overflow-x-auto [&_td]:border [&_td]:border-slate-200 [&_td]:p-3 [&_th]:border [&_th]:border-slate-200 [&_th]:bg-slate-50 [&_th]:p-3 [&_th]:text-left [&_ul]:ml-6 [&_ul]:list-disc">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {cards.map((card, index) => (
        <article
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          key={`${card.question}-${index}`}
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-bold uppercase tracking-wide text-teal-700">
              Flashcard {index + 1}
            </p>
            <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
              Active recall
            </span>
          </div>

          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-slate-500">
              Question
            </p>
            <p className="mt-2 text-base font-semibold leading-7 text-slate-950">
              {card.question}
            </p>
          </div>

          <div className="mt-3 rounded-lg border border-teal-100 bg-teal-50 p-4">
            <p className="text-xs font-bold uppercase tracking-wide text-teal-700">
              Answer
            </p>
            <p className="mt-2 whitespace-pre-line text-sm leading-7 text-slate-700">
              {card.answer}
            </p>
          </div>
        </article>
      ))}
    </div>
  );
};

export default FlashcardView;
