import mongoose from "mongoose";

interface INote {
    userId:string;
    title:string; //ye dono hi required text hai
    content:string;
    subject?:string; //subject?: -> iska mtlb hai optional text
    tags:string[]; // tags: -> ye toh samajh hi gye hoge array of strings   
}

const notesSchema = new mongoose.Schema(
    {
        userId:{
            type:String,
            required:true,
        },
        title:{
            type:String,
            required:true,
        },
        content:{
            type:String,
            required:true,
        },
        subject:{
            type:String,
        },
        tags:{
            type:[String],
            default:[],
        },
    },
    {
        timestamps:true
    }
);

const Note = mongoose.model<INote>("Note",notesSchema);

export default Note;