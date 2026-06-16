import dotenv from "dotenv";
import express from 'express';
import healthRoutes from './routes/health.routes';
import connectDB from "./config/db";
import noteRoutes from "./routes/note.routes";
import cors from "cors";
import generateRoutes from "./routes/generate.routes";


const app = express();

dotenv.config();

console.log("Mongo URI exists:", Boolean(process.env.MONGODB_URI)); //it shows that mongo url is working or not

connectDB();

const port = process.env.PORT || 8000;

app.use(cors());//we use cors because it helps us to run frontend and backend on different addresses during develeopment
//or CORS = permission for frontend and backend to communicate across different origins.
app.use(express.json());

app.use("/api/generate",generateRoutes);
app.use("/api/health",healthRoutes);    
app.use("/api/notes",noteRoutes);

app.get("/",(req,res) => {
    res.send("NotesAI backend is running");
});

app.post("/post",(req,res) =>{
    res.send("NotesAI");
});

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});