"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.loginUser = exports.registerUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const appError_1 = require("../utils/appError");
const user_1 = require("../db/user");
const jwtSecret = process.env.JWT_SECRET;
const registerUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new appError_1.AppError("Missing username or password", 400);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const user = await (0, user_1.createUser)({
            username,
            password: hashedPassword
        });
        res.status(201).json({
            status: "success",
            data: {
                id: user._id,
                username: user.username
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.registerUser = registerUser;
const loginUser = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new appError_1.AppError("Missing username or password", 400);
        }
        const user = await (0, user_1.getUserByUsername)(username);
        if (!user) {
            throw new appError_1.AppError("User not found", 404);
        }
        const comparePassword = await bcrypt_1.default.compare(password, user.password);
        if (!comparePassword) {
            throw new appError_1.AppError("Incorrect password", 401);
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id }, jwtSecret, { expiresIn: '1hr' });
        res.status(200).json({
            status: "success",
            data: {
                message: "Login successfully",
                token
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.loginUser = loginUser;
const resetPassword = async (req, res, next) => {
    try {
        const { username, newPassword } = req.body;
        const user = await (0, user_1.getUserByUsername)(username);
        if (!user) {
            throw new appError_1.AppError("User not found", 404);
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(newPassword, salt);
        user.password = hashedPassword;
        await user.save();
        res.status(201).json({
            status: "success",
            data: {
                message: "Password reset successfully"
            }
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPassword = resetPassword;
