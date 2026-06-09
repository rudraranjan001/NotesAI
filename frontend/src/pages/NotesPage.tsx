
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
  const[loading,setLoading] = useState(true);
  const[title,setTitle] = useState("");
  const[subject,setSubject] = useState("");
  const[content,setContent] = useState("");

    useEffect(() => {
      const fetchNotes = async() => {
        try{
          const data = await getNotes();
          setNotes(data);
        }catch(error){
            console.error("Failed to fetch notes");
        }finally{
          setLoading(false);
        }
      }
      fetchNotes();
    },[]);


  const handleCreateNote = async (e: React.FormEvent) => {
  e.preventDefault();

    const newNote = await createNote({
      title,
      content,
      subject,
      tags: [],
    });

    setNotes((prevNotes) => [newNote, ...prevNotes]);
    setTitle("");
    setContent("");
    setSubject("");
  };

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id);
    setNotes((prevNotes) => prevNotes.filter((note) => note._id !== id));
  };    

    if(loading){
      <p>Loading notes...</p>
    }


  return (
    <div>
        <h1>Notes</h1>

          <form onSubmit={handleCreateNote}>
          <input
            type="text"
            placeholder="Title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />

          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />

          <button type="submit">Create Note</button>
        </form>

        {notes.length === 0 ? (
          <p>No notes yet.</p>
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