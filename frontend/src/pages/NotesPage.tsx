
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

    const fetchNotes = async () => {
      const data = await getNotes();
      setNotes(data);
      setLoading(false);
    };  
    useEffect(() => {
      fetchNotes();
    },[]);


  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
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
    <div>
        <h1>Saved Study Materials</h1>

      <input
        type="text"
        placeholder="Search saved notes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div>
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
        <div key={note._id}>
          <Link to={`/notes/${note._id}`}>
            <h2>{note.title}</h2>
          </Link>

          {note.subject && <p>{note.subject}</p>}

          {note.createdAt && (
          <p>Created: {new Date(note.createdAt).toLocaleDateString()}</p>
        )}

          {note.tags && note.tags.length > 0 && (
            <div>
              {note.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          )}

          <button onClick={() => handleDeleteNote(note._id)}>
            Delete
          </button>
        </div>
      ))
    )}
    </div>
  )
}

export default NotesPage;