"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletedHomeData = exports.updatedHomeData = exports.getAllHomeData = exports.newHomeData = void 0;
const appError_1 = require("../utils/appError");
const uploadToCloudinary_1 = require("../utils/uploadToCloudinary");
const cloudinaryDelete_1 = require("../utils/cloudinaryDelete");
const home_1 = require("../db/home");
const newHomeData = async (req, res, next) => {
    try {
        const { name, title, description, resume } = req.body;
        if (!name || !title || !description || !resume) {
            throw new appError_1.AppError("Missing some data", 400);
        }
        if (!req.file) {
            throw new appError_1.AppError("Image file is required", 400);
        }
        const uploadResult = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "hero-image");
        const homeData = await (0, home_1.createHomeData)({
            name,
            title,
            description,
            resume,
            image: uploadResult.secure_url, //public https url for displaying the image.
            imagePublicId: uploadResult.public_id // public id for managing the image.
        });
        res.status(201).json({
            status: "success",
            data: homeData
        });
    }
    catch (error) {
        next(error);
    }
};
exports.newHomeData = newHomeData;
const getAllHomeData = async (_req, res, next) => {
    try {
        const homeData = await (0, home_1.getHomeData)();
        res.status(200).json({
            status: "success",
            data: homeData,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAllHomeData = getAllHomeData;
const updatedHomeData = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        // fetch the home page data from the database
        const existingData = await (0, home_1.getHomeDataById)(id);
        if (!existingData) {
            throw new appError_1.AppError("Data not found", 404);
        }
        const { name, title, description, resume } = req.body;
        const updateData = { name, title, description, resume };
        if (req.file) {
            //delete image from database if it exists before updating
            if (existingData.imagePublicId) {
                await (0, cloudinaryDelete_1.deleteFromCloudinary)(existingData.imagePublicId);
            }
            // upload new image
            const uploadResult = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "hero-image");
            updateData.image = uploadResult.secure_url;
            updateData.imagePublicId = uploadResult.public_id;
        }
        const updated = await (0, home_1.updateHomeData)(id, updateData);
        if (!updated) {
            throw new appError_1.AppError("Home Data not found", 404);
        }
        res.status(200).json({
            status: "success",
            message: "Home Data updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updatedHomeData = updatedHomeData;
const deletedHomeData = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        const deleted = await (0, home_1.deleteHomeDataById)(id);
        if (!deleted) {
            throw new appError_1.AppError("Data not found", 404);
        }
        if (deleted.imagePublicId) {
            await (0, cloudinaryDelete_1.deleteFromCloudinary)(deleted.imagePublicId);
        }
        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deletedHomeData = deletedHomeData;
