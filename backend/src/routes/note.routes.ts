import { Router } from "express";
import Note from "../models/note.model";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get("/",authMiddleware,async(req,res) => { //it list all notes
    try{
        const notes = await Note.find({ userId: (req as any).uid }); //ye kya karega? ye mongodb mein jaega aur saare notes ko find karega notes collection mein
        res.json(notes);
    }
    catch(error){
        res.status(500).json({
            message:"failed to fetch the notes",
        });
    }
});

router.post("/",authMiddleware, async (req,res) => { // it creates a note
    try{
        const { title , content , subject , tags } = req.body;

        const note = new Note({
            userId: (req as any).uid,
            title,
            content,
            subject,
            tags
        });

        const savedNote = await note.save();

        res.status(201).json(savedNote);

    }catch(error){

            res.status(500).json({
                message : "Failed to create note",
            })
    }
});

router.get("/:id",authMiddleware,async(req,res) => { //it get one specific notes
    try{
        const note = await Note.findOne({
            _id: req.params.id,
            userId: (req as any).uid,
            });//req.param.id it means express read the id  from the url

        if(!note){
            return res.status(404).json({
                message:"Note not found",
            });
        }

        res.json(note);
    }
    catch(error){
        res.status(500).json({
            message:"failed to fetch the notes",
        });
    }
});

router.delete("/:id",authMiddleware,async (req,res) => {
    try{
        const deletedNote = await Note.findOneAndDelete({
        _id: req.params.id,
        userId: (req as any).uid,
        });//this line delete one note  from mongodb using the id from the url

        if(!deletedNote){
            return res.status(404).json({
                message:"Note not found",
            });
        }

        res.json({
            message : "Note deleted successfully",
        });
    }catch(error){
        res.status(500).json({
            message:"Failed to delete note",
        });
    }
});

router.put("/:id",authMiddleware,async(req,res) => {
    try{
        const { title, content, subject, tags } = req.body;
        const updatedNote = await Note.findOneAndUpdate(
            {
                _id: req.params.id,
                userId: (req as any).uid,
            },
            {
                title,
                content,
                subject,
                tags,
            },
            { new: true, runValidators: true }
        );

        if(!updatedNote){
            return res.status(404).json({message : "Note not found"});
        }

        res.json(updatedNote);
    }catch(error){
        res.status(500).json({message: "Failed to update note"});
    }
});

export default router;