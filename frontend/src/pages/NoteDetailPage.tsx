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
  const [title,setTitle] = useState("");
  const [content,setContent] = useState("");
  const [subject,setSubject] = useState("");
  const [updateMessage , setUpdateMessage] = useState("");
  const [updateError,setUpdateError] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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
      setUpdateError("");

        if (!title.trim() || !content.trim()) {
          setUpdateError("Title and content are required.");
          return;
        }
      try{
          setIsUpdating(true);
          const updatedNote = await updateNote(id, {
          title,
          content,
          subject,
          tags: note?.tags || [],
        });
      
      setNote(updatedNote);
      setUpdateMessage("Note updated successfully");
      setIsEditing(false);
      }
      catch(error){
        setUpdateError("Failed to update note. Please try again.")
      }
      finally{
        setIsUpdating(false);
      }
  };

  if (!note) {
    return <p>Loading note...</p>;
  }

  const handleCancelEdit = () => {
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject || "");
    setUpdateError("");
    setIsEditing(false);
  };

  return (
  <div className="page-shell">
    <Link to="/notes">Back to saved notes</Link>

    <div className="detail-header">
      <div>
        <h1>{note.title}</h1>
        {note.subject && <p className="muted-text">{note.subject}</p>}
      </div>

      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Edit Note</button>
      )}
    </div>

    {updateMessage && <p>{updateMessage}</p>}

    {note.tags && note.tags.length > 0 && (
      <div className="tag-row">
        {note.tags.map((tag) => (
          <span className="tag" key={tag}>{tag}</span>
        ))}
      </div>
    )}

    <div className="markdown-content">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {note.content}
      </ReactMarkdown>
    </div>

    {isEditing && (
    <form className="edit-form" onSubmit={handleUpdateNote}>

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
      <button type="submit" disabled={isUpdating}>
        {isUpdating ? "Updating..." : "Update Note"}
      </button>
      <button type="button" onClick={handleCancelEdit}>
        Cancel
      </button>
      {updateError && <p>{updateError}</p>}
    </form>
    )}
  </div>
);
};

export default NoteDetailPage;
