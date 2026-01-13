import dotenv from 'dotenv';
import express, { Application, Request, Response } from 'express';
import path from 'path';

const app = express();

dotenv.config();

import cors from 'cors';
import mongoose from 'mongoose';


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    res.locals.path = req.path;
    next();
});

function getMongoUri(): string {
    const uri = process.env.DB_URI;

    if (!uri) {
        throw new Error("MONGO_URI is not defined in .env");
    }

    return uri;
}



async function startDataBase() {
    const mongoUri = getMongoUri();

    try {
        await mongoose.connect(mongoUri);
        console.log("DB connected...");
    } catch (error) {
        console.log("MongDB connection failed: ", error);
        process.exit(1);
    }  
}

startDataBase();


app.get('/', (req: Request, res: Response) => {
    res.send('Hello, world!').status(200);
});

export default app;
