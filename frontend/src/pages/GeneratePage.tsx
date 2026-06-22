import { useState, useRef } from "react";
import { generateNotes } from "../services/generateApi";
import { createNote } from "../services/notesApi";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

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
  const savingRef = useRef(false);

  const handleGenerate = async () => {
  if (!topic.trim()) {
    setError("Please enter a topic.");
    return;
  }

    if (topic.trim().length < 2) {
      setError("Topic is too short.");
      return;
    }

    if (topic.length > 120) {
      setError("Topic is too long. Keep it under 120 characters.");
      return;
    }

  try {
    setIsGenerating(true);
    setError("");
    setSavedMessage("");
    setHasSaved(false);

    const data = await generateNotes({ topic, format });
    setResult(data);
  } catch (error) {
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
  setHasSaved(false);
};

  const handleSave = async () => {
        if(!result || savingRef.current || hasSaved) return;
       
        try{
            savingRef.current = true;
            setIsSaving(true);
            setSaveError("");
            setSavedMessage("");
            

            await createNote({
                title: result.title,
                content: result.content,
                subject: topic,
                tags: [format],
            });
            setHasSaved(true);

            setSavedMessage("Saved to your notes.");
        }catch(error){
            setSaveError("failed to save note. Please try again");
        }finally{
            savingRef.current = false;
            setIsSaving(false);
        }
    }

  return (
    <div className="page-shell">
      <section className="generate-panel">
        <div>
          <h1>Generate Study Material</h1>
          <p className="muted-text">
            Enter a topic, choose a format, then save the result to your study library.
          </p>
        </div>

        <label>
          Topic
          <input
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter a topic"
          />
        </label>

        <label>
          Format
          <select value={format} onChange={(e) => setFormat(e.target.value)}>
            <option value="summary">Summary</option>
            <option value="short notes">Short / Revision Notes</option>
            <option value="full notes">Full Notes</option>
            <option value="flashcards">Flashcards</option>
            <option value="mind map">Mind Map</option>
            <option value="comparison chart">Comparison Chart</option>
          </select>
        </label>

        <p className="format-help">{formatDescriptions[format]}</p>

        <div className="actions-row">
          <button onClick={handleGenerate} disabled={isGenerating}>
            {isGenerating ? `Generating ${format}...` : "Generate"}
          </button>
          <button onClick={handleClear}>Clear</button>
        </div>
        {error && <p>{error}</p>}
      </section>

      {result && (
        <section className="result-panel">
            <h2>{result.title}</h2>
            <p className="tag">Format: {result.format}</p>
            <div className="markdown-content">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {result.content}
              </ReactMarkdown>
            </div>

            <button onClick={handleSave} disabled={isSaving || hasSaved}>
                {isSaving ? "Saving..." : hasSaved ? "Saved" : "Save Note"}
            </button>

            {savedMessage && <p>{savedMessage}</p>}
            {saveError && <p>{saveError}</p>}
        </section>
        )}
    </div>
  );
}

export default GeneratePage;
