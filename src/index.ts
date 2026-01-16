import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import homeRoutes from '../src/routes/homeRoutes';

import { errorHandler } from './middleware/errorHandler';

const app = express();


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
        console.log("DataBase connection successful.");
    } catch (error) {
        console.log("DataBase connection failed: ", error);
        process.exit(1);
    }  
}

startDataBase();

app.use('/', homeRoutes);


app.use(errorHandler);

export default app;
