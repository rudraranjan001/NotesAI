import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getNoteById } from "../services/notesApi";

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

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      const data = await getNoteById(id);
      setNote(data);
    };

    fetchNote();
  }, [id]);

  if (!note) {
    return <p>Loading note...</p>;
  }

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      {note.subject && <p>{note.subject}</p>}
    </div>
  );
};

export default NoteDetailPage;