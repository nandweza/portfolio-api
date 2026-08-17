"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const appError_1 = require("../utils/appError");
const errorHandler = (err, _req, res, _next) => {
    if (err instanceof appError_1.AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message,
        });
    }
    console.log("UNHANDLED ERROR: ", err);
    return res.status(500).json({
        status: "error",
        message: "Internal Server Error",
    });
};
exports.errorHandler = errorHandler;
