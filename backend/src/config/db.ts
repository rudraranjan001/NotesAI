import mongoose from "mongoose";


const connectDB = async () => {
    const allowLocalRetry = process.env.ALLOW_DB_STARTUP_FAILURE === "true";
    try{
       const mongoUri = process.env.MONGODB_URI
       if(!mongoUri){
            throw new Error("MONGODB_URI is missing");
       }
       await mongoose.connect(mongoUri, allowLocalRetry ? { serverSelectionTimeoutMS: 10000 } : undefined);
       console.log("Connection sucessfull");
    }catch(error){
        console.error("MongoDB connection failed:",error);
        if (!allowLocalRetry) {
            process.exit(1);
        }
        // Keep local generation available while the development database is offline.
        setTimeout(() => { void connectDB(); }, 30000).unref();
    }
}

export default connectDB;
