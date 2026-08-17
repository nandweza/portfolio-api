"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const appError_1 = require("../utils/appError");
const storage = multer_1.default.memoryStorage();
const fileFilter = (_req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
        return cb(new appError_1.AppError("Only images are allowed", 400));
    }
    cb(null, true);
};
const upload = ({ maxSizeMB = 5, multiple = false, fieldName = "image", }) => {
    const multerUpload = (0, multer_1.default)({
        storage,
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
        fileFilter,
    });
    return multiple
        ? multerUpload.array(fieldName)
        : multerUpload.single(fieldName);
};
exports.upload = upload;
