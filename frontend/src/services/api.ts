import axios from "axios";
import { onAuthStateChanged } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "../config/firebase";

const apiBaseUrl = (import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/$/, "");

const api = axios.create({
    baseURL : apiBaseUrl,
    timeout: 60000,
});

const waitForAuthUser = (): Promise<User | null> => {
    if (auth.currentUser) {
        return Promise.resolve(auth.currentUser);
    }

    return new Promise<User | null>((resolve) => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            unsubscribe();
            resolve(user);
        });
    });
};

api.interceptors.request.use(async(config) => {
    const user = await waitForAuthUser();

    if(user){
        const token = await user.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})

export default api;
