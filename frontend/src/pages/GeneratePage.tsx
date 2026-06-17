import { useState, useRef } from "react";
import { generateNotes } from "../services/generateApi";
import { createNote } from "../services/notesApi";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

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
    <div>
      <h1>Generate Notes</h1>

      <input
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter a topic"
      />

      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="summary">Summary</option>
        <option value="full notes">Full Notes</option>
        <option value="flashcards">Flashcards</option>
        <option value="mind map">Mind Map</option>
        <option value="comparison chart">Comparison Chart</option>
      </select>

      <button onClick={handleGenerate} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Generate"}
        </button>
        {error && <p>{error}</p>}

      {result && (
        <div>
            <h2>{result.title}</h2>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {result.content}
            </ReactMarkdown>

            <button onClick={handleSave} disabled={isSaving}>
                {isSaving ? "Saving..." : hasSaved ? "Saved" : "Save Note"}
            </button>

            {savedMessage && <p>{savedMessage}</p>}
            {saveError && <p>{saveError}</p>}
        </div>
        )}
    </div>
  );
}

export default GeneratePage;