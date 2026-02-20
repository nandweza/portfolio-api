import dotenv from "dotenv"
dotenv.config();

import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppError } from "../utils/appError";
import { createUser, getUserByUsername } from "../db/user";

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
}

export const loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            throw new AppError("Missing username or password", 400);
        }

        const user = await getUserByUsername(username);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const comparePassword = await bcrypt.compare(password, user.password);

        if (!comparePassword) {
            throw new AppError("Incorrect password", 401);
        }

        const token = jwt.sign({userId: user._id}, jwtSecret!, {expiresIn: '1hr'});

        res.status(200).json({
            status: "success",
            data: {
                message: "Login successfully",
                token
            }
        })

    } catch (error) {
        next(error);
    }
}

export const resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const {username, newPassword} = req.body;

        const user = await getUserByUsername(username);

        if (!user) {
            throw new AppError("User not found", 404);
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        user.password = hashedPassword;

        await user.save();

        res.status(201).json({
            status: "success",
            data: {
                message: "Password reset successfully"
            }
        })
    } catch (error) {
        next(error);
    }
}