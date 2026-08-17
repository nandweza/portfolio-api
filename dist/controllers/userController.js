"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedUser = exports.getUserData = void 0;
const appError_1 = require("../utils/appError");
const user_1 = require("../db/user");
const getUserData = async (req, res, next) => {
    try {
        const user = await (0, user_1.getUser)();
        res.status(200).json({
            status: "success",
            data: user
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getUserData = getUserData;
const deletedUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        const deleted = await (0, user_1.deleteUser)(id);
        if (!deleted) {
            throw new appError_1.AppError("User not found", 404);
        }
        res.status(200).json({
            status: "success",
            message: "User deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deletedUser = deletedUser;
