import api from "./api";
import { getApiErrorMessage } from "./apiError";

export const generateNotes = async(data: {
    topic: string;
    format: string;
}) => {
    try {
    const response = await api.post("/generate",data);
    return response.data;
    } catch (error) {
        throw new Error(getApiErrorMessage(error, "Failed to generate notes."), { cause: error });
    }
}
