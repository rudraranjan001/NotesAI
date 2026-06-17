
import { useEffect,useState } from 'react';
import { getNotes , createNote , deleteNote } from '../services/notesApi';
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

    if(loading){
      <p>Loading notes...</p>
    }


  return (
    <div>
        <h1>Saved Notes</h1>

        {notes.length === 0 ? (
        <p>No saved notes yet. Generate notes first, then save them here.</p>
        ) : (
        notes.map((note) => (
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