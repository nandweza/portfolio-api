import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";

import {
    getUser,
    deleteUser
} from "../db/user";

export const getUserData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const user = await getUser();

        res.status(200).json({
            status: "success",
            data: user
        })
    } catch (error) {
        next(error);
    }
};

export const deletedUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const deleted = await deleteUser(id);

        if (!deleted) {
            throw new AppError("User not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        })
    } catch (error) {
        next(error);
    }
};
