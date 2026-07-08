
import { useEffect,useState } from 'react';
import { getNotes ,  deleteNote } from '../services/notesApi';
import { Link } from 'react-router-dom';

type Note = {
  _id: string;
  title: string;
  content: string;
  subject?: string;
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
};


const NotesPage = () => {
  
  const[notes,setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);  
  const [searchTerm , setSearchTerm] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [deleteError, setDeleteError] = useState("");
  const [deletingNoteId, setDeletingNoteId] = useState("");

    useEffect(() => {
      let ignore = false;

      const fetchNotes = async () => {
        const data = await getNotes();

        if (!ignore) {
          setNotes(data);
          setLoading(false);
        }
      };

      fetchNotes();

      return () => {
        ignore = true;
      };
    },[]);


  const handleDeleteNote = async (id: string) => {
    const confirmDelete = window.confirm("Delete this saved note?");

    if (!confirmDelete) {
      return;
    }

    try{
      setDeleteError("");
      setDeletingNoteId(id);

      await deleteNote(id);
      setNotes(notes.filter((note) => note._id !== id));
    }catch{
      setDeleteError("Failed to delete note. Please try again.");
    }
    finally{
      setDeletingNoteId("");
    }
  };

  const availableTags = Array.from(
    new Set(notes.flatMap((note) => note.tags || []))
  );

    const filteredNotes = notes.filter((note) => {
    const query = searchTerm.toLowerCase();

    const matchesSearch = note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.subject?.toLowerCase().includes(query) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(query));

      const matchesTag = selectedTag
        ? note.tags?.includes(selectedTag)
        :true;
      
        return matchesSearch && matchesTag;
  });

    if(loading){
      return <p className="mx-auto w-full max-w-6xl px-4 py-10 text-slate-600 sm:px-6 lg:px-8">Loading notes...</p>
    }


  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-teal-700">Library</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-950">Saved Study Materials</h1>
          <p className="mt-2 text-slate-600">Search and manage your generated notes.</p>
        </div>
        <Link className="rounded-lg bg-teal-600 px-5 py-3 text-center font-semibold text-white shadow-sm hover:bg-teal-700" to="/generate">Generate New</Link>
      </div>
      {deleteError && <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">{deleteError}</p>}

      <input
        className="mt-6 rounded-lg border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none transition focus:border-teal-500 focus:ring-4 focus:ring-teal-100"
        type="text"
        placeholder="Search saved notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          className={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedTag === "" ? "border-teal-600 bg-teal-50 text-teal-800" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"}`}
          onClick={() => setSelectedTag("")}
          >
          All
        </button>

        {availableTags.map((tag) => (
          <button
            key={tag}
            className={`rounded-full border px-4 py-2 text-sm font-semibold ${selectedTag === tag ? "border-teal-600 bg-teal-50 text-teal-800" : "border-slate-300 bg-white text-slate-700 hover:bg-slate-100"}`}
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </button>
        ))}
      </div>

    {filteredNotes.length === 0 ? (
      <div className="mt-8 rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center">
        {notes.length === 0 ? (
          <>
            <p className="text-slate-600">No saved notes yet. Generate notes first, then save them here.</p>
            <Link className="mt-4 inline-flex rounded-lg bg-teal-600 px-5 py-3 font-semibold text-white shadow-sm hover:bg-teal-700" to="/generate">Generate your first note</Link>
          </>
        ) : (
          <p className="text-slate-600">No matching notes found.</p>
        )}
      </div>
    ) : (
      <section className="mt-6 grid gap-4 md:grid-cols-2">
        {filteredNotes.map((note) => (
        <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md" key={note._id}>
          <Link className="block" to={`/notes/${note._id}`}>
            <h2 className="text-xl font-bold text-slate-950 hover:text-teal-700">{note.title}</h2>
          </Link>

          {note.subject && <p className="mt-2 text-sm font-medium text-slate-600">{note.subject}</p>}

          {note.createdAt && (
          <p className="mt-1 text-sm text-slate-500">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
        )}

          {note.tags && note.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {note.tags.map((tag) => (
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700" key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <button
          className="mt-5 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          onClick={() => handleDeleteNote(note._id)}
          disabled={deletingNoteId === note._id}
        >
          {deletingNoteId === note._id ? "Deleting..." : "Delete"}
        </button>
        </article>
      ))}
      </section>
    )}
    </main>
  )
}

export default NotesPage;
