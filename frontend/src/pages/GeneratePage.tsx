import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { generateNotes } from "../services/generateApi";
import { createNote } from "../services/notesApi";
import FlashcardView from "../component/FlashcardView";
import MarkdownView from "../component/MarkdownView";

const formatDescriptions: Record<string, string> = {
  summary: "Quick overview of the most important ideas.",
  "short notes": "Fast revision bullets for exam prep.",
  "full notes": "Detailed study notes with sections and examples.",
  flashcards: "Question-answer cards for active recall.",
  "mind map": "A structured topic map with branches and sub-points.",
  "comparison chart": "A table for comparing concepts side by side.",
};

function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("summary");
  const [result, setResult] = useState<any>(null);
  const [savedMessage , setSavedMessage] = useState("");
  const [isGenerating , setIsGenerating] = useState(false);
  const [error , setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [hasSaved, setHasSaved ] = useState(false);
  const [savedNoteId, setSavedNoteId] = useState("");
  const [copyMessage, setCopyMessage] = useState("");
  const savingRef = useRef(false);
  const trimmedTopic = topic.trim();
  const topicTooShort = trimmedTopic.length > 0 && trimmedTopic.length < 2;
  const topicTooLong = topic.length > 120;
  const canGenerate = trimmedTopic.length >= 2 && !topicTooLong && !isGenerating;

  const handleGenerate = async () => {
  if (!trimmedTopic) {
    setError("Please enter a topic.");
    return;
  }

    if (topicTooShort) {
      setError("Topic is too short.");
      return;
    }

    if (topicTooLong) {
      setError("Topic is too long. Keep it under 120 characters.");
      return;
    }

  try {
    setIsGenerating(true);
    setError("");
    setSavedMessage("");
    setSaveError("");
    setSavedNoteId("");
    setCopyMessage("");
    setHasSaved(false);

    const data = await generateNotes({ topic, format });
    setResult(data);
  } catch {
    setError("Failed to generate notes. Please try again.");
  } finally {
    setIsGenerating(false);
  }
};

const handleClear = () => {
  setTopic("");
  setFormat("summary");
  setResult(null);
  setError("");
  setSavedMessage("");
  setSaveError("");
  setSavedNoteId("");
  setCopyMessage("");
  setHasSaved(false);
};

const handleCopy = async () => {
  if (!result?.content) return;

  try {
    await navigator.clipboard.writeText(result.content);
    setCopyMessage("Copied notes to clipboard.");
  } catch {
    setCopyMessage("Copy failed. Select the text and copy it manually.");
  }
};

  const handleSave = async () => {
        if(!result || savingRef.current || hasSaved) return;
       
        try{
            savingRef.current = true;
            setIsSaving(true);
            setSaveError("");
            setSavedMessage("");
            

            const savedNote = await createNote({
                title: result.title,
                content: result.content,
                subject: topic,
                tags: [format],
            });
            setHasSaved(true);
            setSavedNoteId(savedNote?._id || "");

            setSavedMessage("Saved to your notes.");
        }catch{
            setSaveError("Failed to save note. Please try again.");
        }finally{
            savingRef.current = false;
            setIsSaving(false);
        }
    }

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[380px_1fr] lg:px-8">
      <section className="h-fit rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Create</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Generate Study Material</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Enter a topic, choose a format, then save the result to your study library.
          </p>
        </div>

        <label className="mt-6 grid gap-2 text-sm font-semibold text-slate-800">
          <span>Topic</span>
          <input
            className="rounded-lg border border-slate-300 px-3 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
            value={topic}
            onChange={(e) => {
              setTopic(e.target.value);
              setError("");
            }}
            placeholder="Example: Human nervous system"
          />
        </label>
        <div className="mt-2 flex items-center justify-between gap-3 text-xs">
          <p className={topicTooShort || topicTooLong ? "font-medium text-red-600" : "text-slate-500"}>
            {topicTooLong ? "Keep the topic under 120 characters." : topicTooShort ? "Use at least 2 characters." : "Be specific for better output."}
          </p>
          <span className={topicTooLong ? "font-semibold text-red-600" : "text-slate-500"}>{topic.length}/120</span>
        </div>

        <label className="mt-4 grid gap-2 text-sm font-semibold text-slate-800">
          <span>Format</span>
          <select className="rounded-lg border border-slate-300 px-3 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100" value={format} onChange={(e) => {
            setFormat(e.target.value);
            setSavedMessage("");
            setSaveError("");
            setSavedNoteId("");
            setCopyMessage("");
            setHasSaved(false);
          }}>
            <option value="summary">Summary</option>
            <option value="short notes">Short / Revision Notes</option>
            <option value="full notes">Full Notes</option>
            <option value="flashcards">Flashcards</option>
            <option value="mind map">Mind Map</option>
            <option value="comparison chart">Comparison Chart</option>
          </select>
        </label>

        <p className="mt-3 rounded-lg bg-slate-50 px-3 py-3 text-sm leading-6 text-slate-600">{formatDescriptions[format]}</p>

        <div className="mt-5 flex flex-wrap gap-3">
          <button className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300" onClick={handleGenerate} disabled={!canGenerate}>
            {isGenerating ? `Generating ${format}...` : "Generate"}
          </button>
          <button className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100" onClick={handleClear}>Clear</button>
        </div>
        {error && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{error}</p>}
      </section>

      {result && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-5 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950">{result.title}</h2>
                <p className="mt-2 inline-flex rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-800">Format: {result.format}</p>
              </div>
              <div className="flex flex-wrap gap-3">
              <button className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100" onClick={handleCopy}>
                  Copy
              </button>
              <button className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400" onClick={handleGenerate} disabled={!canGenerate}>
                  Regenerate
              </button>
              <button className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white shadow-sm hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300" onClick={handleSave} disabled={isSaving || hasSaved}>
                  {isSaving ? "Saving..." : hasSaved ? "Saved" : "Save Note"}
              </button>
              </div>
            </div>

            <div className="mt-6">
              {result.format === "flashcards" ? (
                <FlashcardView content={result.content} />
              ) : (
                <div className="overflow-x-auto rounded-xl border border-slate-200">
                  <MarkdownView content={result.content} />
                </div>
              )}
            </div>

            {savedMessage && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{savedMessage}</p>}
            {savedNoteId && (
              <div className="mt-3 flex flex-wrap gap-3">
                <Link className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700" to={`/notes/${savedNoteId}`}>
                  Open saved note
                </Link>
                <Link className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-100" to="/notes">
                  Go to library
                </Link>
              </div>
            )}
            {copyMessage && <p className="mt-4 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700">{copyMessage}</p>}
            {saveError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{saveError}</p>}
        </section>
        )}
    </main>
  );
}

export default GeneratePage;
