import mongoose from "mongoose";


const connectDB = async () => {
    try{
       const mongoUri = process.env.MONGODB_URI
       if(!mongoUri){
            throw new Error("MONGODB_URI is missing");
       }
       await mongoose.connect(mongoUri);
       console.log("Connection sucessfull");
    }catch(error){
        console.error("MongoDB connection failed:",error);
        process.exit(1);
    }
}

export default connectDB;