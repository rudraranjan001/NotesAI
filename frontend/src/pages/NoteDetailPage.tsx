import { useEffect, useState } from "react";
import { Link,useParams } from "react-router-dom";
import { getNoteById, updateNote } from "../services/notesApi";
import FlashcardView from "../component/FlashcardView";
import MarkdownView from "../component/MarkdownView";

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
  const [loadError, setLoadError] = useState("");

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      const data = await getNoteById(id);

      if (!data) {
        setLoadError("Note not found.");
        return;
      }

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
      catch{
        setUpdateError("Failed to update note. Please try again.")
      }
      finally{
        setIsUpdating(false);
      }
  };

  if (!note) {
    if (loadError) {
      return (
        <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <Link className="text-sm font-semibold text-teal-700 hover:text-teal-800" to="/notes">Back to saved notes</Link>
          <p className="mt-5 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{loadError}</p>
        </main>
      );
    }

    return <p className="mx-auto w-full max-w-6xl px-4 py-10 text-slate-600 sm:px-6 lg:px-8">Loading note...</p>;
  }

  const handleCancelEdit = () => {
    setTitle(note.title);
    setContent(note.content);
    setSubject(note.subject || "");
    setUpdateError("");
    setIsEditing(false);
  };

  return (
  <main className="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
    <Link className="text-sm font-semibold text-teal-700 hover:text-teal-800" to="/notes">Back to saved notes</Link>

    <div className="mt-5 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-start sm:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Saved note</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">{note.title}</h1>
        {note.subject && <p className="mt-2 text-slate-600">{note.subject}</p>}
      </div>

      {!isEditing && (
        <button className="rounded-lg bg-slate-950 px-5 py-3 font-semibold text-white shadow-sm hover:bg-slate-800" onClick={() => setIsEditing(true)}>Edit Note</button>
      )}
    </div>

    {updateMessage && <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700">{updateMessage}</p>}

    {note.tags && note.tags.length > 0 && (
      <div className="mt-5 flex flex-wrap gap-2">
        {note.tags.map((tag) => (
          <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-700" key={tag}>{tag}</span>
        ))}
      </div>
    )}

    <article className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      {note.tags?.includes("flashcards") ? (
        <FlashcardView content={note.content} />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <MarkdownView content={note.content} />
        </div>
      )}
    </article>

    {isEditing && (
    <form className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm" onSubmit={handleUpdateNote}>

      <h2 className="text-2xl font-bold text-slate-950">Edit saved note</h2>

      <input
        className="mt-5 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      <textarea
        className="mt-4 min-h-80 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        rows={15}
      />

      <input
        className="mt-4 rounded-lg border border-slate-300 px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
      />
      <div className="mt-5 flex flex-wrap gap-3">
        <button className="rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700 disabled:cursor-not-allowed disabled:bg-slate-300" type="submit" disabled={isUpdating}>
          {isUpdating ? "Updating..." : "Update Note"}
        </button>
        <button className="rounded-lg border border-slate-300 px-5 py-3 font-semibold text-slate-800 hover:bg-slate-100" type="button" onClick={handleCancelEdit}>
          Cancel
        </button>
      </div>
      {updateError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{updateError}</p>}
    </form>
    )}
  </main>
);
};

export default NoteDetailPage;
