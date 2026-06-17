import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../services/notesApi";
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm";

type Note = {
  _id: string;
  title: string;
  content: string;
  subject?: string;
  tags: string[];
};

const NoteDetailPage = () => {
  const { id } = useParams();
  const [note, setNote] = useState<Note | null>(null);
  const[title,setTitle] = useState("");
  const[content,setContent] = useState("");
  const[subject,setSubject] = useState("");


  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      const data = await getNoteById(id);
      setNote(data);
      setTitle(data.title);
      setContent(data.content);
      setSubject(data.subject || "");
    };

    fetchNote();
  }, [id]);

  const handleUpdateNote = async (e: React.FormEvent) => {
      e.preventDefault();

      if (!id) return;

      const updatedNote = await updateNote(id, {
        title,
        content,
        subject,
      });

      setNote(updatedNote);
  };
  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {note.content}
      </ReactMarkdown>
      {note.subject && <p>{note.subject}</p>}

      <form onSubmit={handleUpdateNote}>
  <input
    value={title}
    onChange={(e) => setTitle(e.target.value)}
  />

  <textarea
    value={content}
    onChange={(e) => setContent(e.target.value)}
  />

  <input
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
  />

  <button type="submit">Update Note</button>
</form>
    </div>
  );
};

export default NoteDetailPage;