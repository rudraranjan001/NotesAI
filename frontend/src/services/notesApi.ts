import api from "./api";

export const getNotes = async () => {
    const response = await api.get("/notes");
    return response.data;
}

export const createNote = async (noteData: {
  title: string;
  content: string;
  subject?: string;
  tags?: string[];
}) => {
  const response = await api.post("/notes", noteData);
  return response.data;
};

export const getNoteById = async (id:string) => {
  const response = await api.get(`/notes/${id}`);
  if (Array.isArray(response.data)) {
    return response.data.find((note) => note._id === id) || null;
  }

  return response.data;
};


export const deleteNote = async (id: string) => {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
};

export const updateNote = async (
  id: string,
  noteData: {
    title?: string;
    content?: string;
    subject?: string;
    tags?: string[];
  }
) => {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
};
