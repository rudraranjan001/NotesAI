import api from "./api";

export const generateNotes = async(data: {
    topic: string;
    format: string;
}) => {
    const response = await api.post("/generate",data);
    return response.data;
}