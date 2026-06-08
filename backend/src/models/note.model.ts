import mongoose from "mongoose";

interface INote {
    title:string, //ye dono hi required text hai
    course:string,
    subject?:string, //subject?: -> iska mtlb hai optional text
    tags:string[]; // tags: -> ye toh samajh hi gye hoge array of strings   
}

const notesSchema = new mongoose.Schema(
    {
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