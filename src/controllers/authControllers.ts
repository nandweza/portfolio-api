import dotenv from "dotenv"
dotenv.config();

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { createUser } from "../db/user";
// import * as userModule from "../db/user";
// console.log(userModule);

const jwtSecret = process.env.JWT_SECRET;

export const registerUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new AppError("Missing username or password", 400);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await createUser({ 
            username, 
            password: hashedPassword
        });

        res.status(201).json({
            status: "success",
            data: {
                id: user._id,
                username: user.username
            }
        })
    } catch (error) {
        next(error);
    }
};