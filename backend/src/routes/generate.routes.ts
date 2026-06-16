import { authMiddleware } from "../middleware/authMiddleware";
import { Router } from "express";

const router = Router();

router.post("/" , authMiddleware,async(req,res) => {
    const { topic , format} = req.body;

    if(!topic || !format){
        return res.status(400).json({
            message: "Topic and format are required",
        });
    }

    res.json({
        title:`${format} on ${topic}`,
        format,
        content: `This is a simple generated ${format} for the topic: ${topic}.`
    });
});

export default router;
