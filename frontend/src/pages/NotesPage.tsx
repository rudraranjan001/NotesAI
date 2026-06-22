
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

    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
      setLoading(false);
    };  
    useEffect(() => {
      fetchNotes();
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
    }catch(error){
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
      return <p>Loading notes...</p>
    }


  return (
    <div className="page-shell">
      <div className="library-header">
        <div>
          <h1>Saved Study Materials</h1>
          <p className="muted-text">Search and manage your generated notes.</p>
        </div>
        <Link to="/generate">Generate New</Link>
      </div>
      {deleteError && <p>{deleteError}</p>}

      <input
        type="text"
        placeholder="Search saved notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="tag-row">
        <button
          onClick={() => setSelectedTag("")}
          style={{ fontWeight: selectedTag === "" ? "bold" : "normal" }}
          >
          All
        </button>

        {availableTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            style={{ fontWeight: selectedTag === tag ? "bold" : "normal" }}
          >
            {tag}
          </button>
        ))}
      </div>

    {filteredNotes.length === 0 ? (
      <div>
        {notes.length === 0 ? (
          <>
            <p>No saved notes yet. Generate notes first, then save them here.</p>
            <Link to="/generate">Generate your first note</Link>
          </>
        ) : (
          <p>No matching notes found.</p>
        )}
      </div>
    ) : (
      filteredNotes.map((note) => (
        <article className="note-card" key={note._id}>
          <Link to={`/notes/${note._id}`}>
            <h2>{note.title}</h2>
          </Link>

          {note.subject && <p className="muted-text">{note.subject}</p>}

          {note.createdAt && (
          <p className="muted-text">Created: {new Date(note.createdAt).toLocaleDateString()}</p>
        )}

          {note.tags && note.tags.length > 0 && (
            <div className="tag-row">
              {note.tags.map((tag) => (
                <span className="tag" key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <button
          onClick={() => handleDeleteNote(note._id)}
          disabled={deletingNoteId === note._id}
        >
          {deletingNoteId === note._id ? "Deleting..." : "Delete"}
        </button>
        </article>
      ))
    )}
    </div>
  )
}

export default NotesPage;
