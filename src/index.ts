import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import homeRoutes from './routes/homeRoutes';
import skillRoutes from './routes/skillRoutes';
import projectRoutes from './routes/projectRoutes';
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';

const app = express();


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/home', homeRoutes);
app.use('/api/skill', skillRoutes);
app.use('/api/project', projectRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);


app.use(errorHandler);

export default app;
