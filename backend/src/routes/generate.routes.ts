import { authMiddleware } from "../middleware/authMiddleware";
import { Router } from "express";
import { GoogleGenAI } from "@google/genai";

const router = Router();

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

router.post("/" , authMiddleware,async(req,res) => {
    const { topic , format} = req.body;

    if(!topic || !format){
        return res.status(400).json({
            message: "Topic and format are required",
        });
    }

    try{
        const prompt = `
            You are NotesAI, an expert study assistant for students.

            Generate study material based on the topic and requested format and use the simple english.

            Topic:
            ${topic}

            Requested format:
            ${format}

            General quality rules:
            - Use clear, simple, student-friendly language.
            - Be accurate and exam-focused.
            - Organize the answer neatly.
            - Avoid filler and repeated points.
            - Do not mention that you are an AI.
            - Do not ask follow-up questions.
            - Return only the final study material.

            Use Markdown formatting:
            - Use ## for main headings
            - Use bullet points for lists
            - Use tables for comparison charts
            - Use Q: and A: format for flashcards
            - Add blank lines between sections

            Format instructions:

            If format is "full notes":
            - Give detailed notes.
            - Include introduction, definitions, key concepts, explanations, examples, and conclusion.
            - Use headings and bullet points.

            If format is "summary":
            - Give a short, clear summary.
            - Focus only on the most important ideas.
            - Keep it concise.

            If format is "short notes":
            - Give quick revision notes.
            - Use bullet points.
            - Include important terms, formulas, dates, or definitions if relevant.

            If format is "flashcards":
            - Create flashcards in this style:
            Q: question
            A: answer
            - Make them useful for revision.

            If format is "mind map":
            - Create a text-based mind map.
            - Use a main topic, branches, and sub-branches.
            - Use indentation and bullet points.

            If format is "comparison chart":
            - Create a comparison table.
            - Include clear columns and rows.
            - Compare the most important differences and similarities.

            Now generate the study material.
            `;
        
        const apiKey = process.env.GEMINI_API_KEY;

        if(!apiKey){
            return res.status(500).json({
                message: "Gemini Api Key is missing",
            })
        }

        const ai = new GoogleGenAI({
            apiKey,
        });

        const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        });

        res.json({
        title: `${format} on ${topic}`,
        format,
        content: response.text,
        });
    }catch(error){
        console.error("Gemini generate error:",error);

        res.status(500).json({
            message: "Failed to generate notes",
        });
    }
    
});

export default router;
