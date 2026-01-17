import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import homeRoutes from '../src/routes/homeRoutes';
import authRoutes from '../src/routes/authRoutes';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/home', homeRoutes);
app.use('/api/auth', authRoutes);


app.use(errorHandler);

export default app;
