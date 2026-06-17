import { useState } from "react";
import { generateNotes } from "../services/generateApi";

function GeneratePage() {
  const [topic, setTopic] = useState("");
  const [format, setFormat] = useState("summary");
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    const data = await generateNotes({ topic, format });
    setResult(data);
  };

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

      <button onClick={handleGenerate}>Generate</button>

      {result && (
        <div>
          <h2>{result.title}</h2>
          <p>{result.content}</p>
        </div>
      )}
    </div>
  );
}

export default GeneratePage;