import mongoose from "mongoose";
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string, {
        });

        console.log("MongoDB Connected successfullyy...");
    } catch (error) {
        console.error("mongodb connection failed", error);
        process.exit(1);
    }
}

export default connectDB;