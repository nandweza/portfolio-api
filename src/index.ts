import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import homeRoutes from '../src/routes/homeRoutes';
import skillRoutes from '../src/routes/skillRoutes';
import projectRoutes from '../src/routes/projectRoutes';
import authRoutes from '../src/routes/authRoutes';
import userRoutes from '../src/routes/userRoutes';

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
