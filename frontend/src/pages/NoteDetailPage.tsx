import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
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
  const [updateMessage , setUpdateMessage] = useState("");
  const [updateError,setUpdateError] = useState("");

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
      setUpdateMessage("");

        if (!title.trim() || !content.trim()) {
          setUpdateError("Title and content are required.");
          return;
        }
      try{
          const updatedNote = await updateNote(id, {
          title,
          content,
          subject,
          tags: note?.tags,
        });
      
      setNote(updatedNote);
      setUpdateMessage("Note updated successfully");
      }
      catch(error){
        setUpdateError("Failed to update note. Please try again.")
      }
  };
  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
  <div>
    <Link to="/notes">Back to saved notes</Link>

    <h1>{note.title}</h1>

    {note.subject && <p>{note.subject}</p>}

    {note.tags && note.tags.length > 0 && (
      <div>
        {note.tags.map((tag) => (
          <span key={tag}>{tag}</span>
        ))}
      </div>
    )}

    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {note.content}
    </ReactMarkdown>

    <form onSubmit={handleUpdateNote}>

      <h2>Edit saved note</h2><br /><br />

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={15}
        style={{ width: "100%" }}
      />

      <input
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <button type="submit">Update Note</button>
      {updateMessage && <p>{updateMessage}</p>}
      {updateError && <p>{updateError}</p>}
    </form>
  </div>
);
};

export default NoteDetailPage;