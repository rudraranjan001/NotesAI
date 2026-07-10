import axios from "axios";

export const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (axios.isAxiosError(error)) {
    const serverMessage = error.response?.data?.message;

    if (typeof serverMessage === "string" && serverMessage.trim()) {
      return serverMessage;
    }

    if (error.code === "ECONNABORTED") {
      return "The server took too long to respond. Please try again.";
    }

    if (!error.response) {
      return "Could not reach the server. Check the backend URL and CORS settings.";
    }
  }

  return fallback;
};
