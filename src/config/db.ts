import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

function getMongoUri(): string {
    const uri = process.env.DB_URI;

    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env");
    }

    return uri;
}

export async function startDataBase() {
    const mongoUri = getMongoUri();

    try {
        await mongoose.connect(mongoUri);
        console.log("DataBase connection successful.");
    } catch (error) {
        console.log("DataBase connection failed: ", error);
        process.exit(1);
    }  
}
