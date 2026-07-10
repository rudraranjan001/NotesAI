import api from "./api";
import { getApiErrorMessage } from "./apiError";

export const getNotes = async () => {
  try {
    const response = await api.get("/notes");
    return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to load notes."), { cause: error });
  }
}

export const createNote = async (noteData: {
  title: string;
  content: string;
  subject?: string;
  tags?: string[];
}) => {
  try {
  const response = await api.post("/notes", noteData);
  return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to save note."), { cause: error });
  }
};

export const getNoteById = async (id:string) => {
  try {
  const response = await api.get(`/notes/${id}`);
  if (Array.isArray(response.data)) {
    return response.data.find((note) => note._id === id) || null;
  }

  return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to load note."), { cause: error });
  }
};


export const deleteNote = async (id: string) => {
  try {
  const response = await api.delete(`/notes/${id}`);
  return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to delete note."), { cause: error });
  }
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
  try {
  const response = await api.put(`/notes/${id}`, noteData);
  return response.data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, "Failed to update note."), { cause: error });
  }
};
