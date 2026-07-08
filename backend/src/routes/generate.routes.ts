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

    const allowedFormats = [
        "summary",
        "short notes",
        "full notes",
        "flashcards",
        "mind map",
        "comparison chart",
    ];

    if (!allowedFormats.includes(format)) {
    return res.status(400).json({
        message: "Invalid note format",
    });
    }

    if (topic.trim().length < 2) {
    return res.status(400).json({
        message: "Topic is too short",
    });
    }

    if (topic.length > 120) {
    return res.status(400).json({
        message: "Topic is too long",
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

            Markdown formatting rules:
            - Use Markdown formatting in the response.
            - Use ## for main section headings.
            - Use ### for smaller subheadings.
            - Use bullet points for lists.
            - Use numbered lists only for step-by-step sequences.
            - Use Markdown tables for comparison charts.
            - Put blank lines between sections.
            - For flashcards, use this format:
            ### Flashcard 1
            **Q:** question
            **A:** answer

            Format instructions:

            If format is "full notes":
            - Write detailed textbook-style study notes.
            - Use clear section headings.
            - Under each heading, explain the topic in complete paragraphs.
            - Avoid using bullet points as the main structure.
            - Use bullet points only for examples, formulas, key terms, or short lists.
            - Include introduction, definitions, key concepts, explanation, examples, and conclusion.
            - Make it feel like complete classroom notes.   

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

            If the selected format is "mind map", return ONLY valid Mermaid mindmap syntax.
            Rules:
            - Start exactly with: mindmap
            - Do not use Markdown headings.
            - Do not wrap the output in triple backticks.
            - Do not add explanation before or after.
            - Keep each node short.
            - Avoid special characters like (), [], {}, :, ;, quotes, and arrows inside node text.
            - Use indentation with two spaces per level.

            Example:
            mindmap
            root((Photosynthesis))
                Definition
                Process plants use to make food
                Requirements
                Sunlight
                Carbon dioxide
                Water
                Products
                Glucose
                Oxygen

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
        title: `${topic} - ${format}`,
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
