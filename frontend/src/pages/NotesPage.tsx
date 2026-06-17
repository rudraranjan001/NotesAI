
import { useEffect,useState } from 'react';
import { getNotes ,  deleteNote } from '../services/notesApi';
import { Link } from 'react-router-dom';

type Note = {
  _id: string;
  title: string;
  content: string;
  subject?: string;
  tags: string[];
};


const NotesPage = () => {
  
  const[notes,setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);  
  const [searchTerm , setSearchTerm] = useState("");

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

    const filteredNotes = notes.filter((note) => {
    const query = searchTerm.toLowerCase();

    return (
      note.title.toLowerCase().includes(query) ||
      note.content.toLowerCase().includes(query) ||
      note.subject?.toLowerCase().includes(query) ||
      note.tags?.some((tag) => tag.toLowerCase().includes(query))
    );
  });

    if(loading){
      <p>Loading notes...</p>
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


        {filteredNotes.length === 0 ? (
        <p>No saved notes yet. Generate notes first, then save them here.</p>
        ) : (
        filteredNotes.map((note) => (
          <div key={note._id}>
            <Link to={`/notes/${note._id}`}>
              <h2>{note.title}</h2>
            </Link>

            <p>{note.content}</p>

            {note.subject && <p>{note.subject}</p>}

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