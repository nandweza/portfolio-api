import { Request, Response, NextFunction} from 'express';
import { AppError } from '../utils/appError';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { deleteFromCloudinary } from '../utils/cloudinaryDelete';

import {
    HomeModel,
    getHomeData,
    updateHomeData,
    createHomeData,
    deleteHomeDataById
} from '../db/home';

export const newHomeData = async (
    req: Request, 
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, title, description, resume } = req.body;

        if (!name || !title || !description || !resume) {
            throw new AppError( "Missing some data", 400);
        }

        if (!req.file) {
            throw new AppError("Image file is required", 400);
        }

        const uploadResult = await uploadToCloudinary(
            req.file.buffer, 
            "hero-image"
        );

        const homeData = await HomeModel.create({
            name,
            title,
            description,
            resume,
            image: uploadResult.secure_url,
            imagePublicId: uploadResult.public_id
        });

        res.status(201).json({
            status: "success",
            data: homeData
        });
    } catch (error) {
        next(error);
    }
};

export const getAllHomeData = async (
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const homeData = await getHomeData();

        res.status(200).json({
            status: "success",
            data: homeData,
        })
    } catch (error) {
        next(error);
    }
};

export const updatedHomeData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }
        const { name, title, description, resume } = req.body;

        const updateData: any = { name, title, description, resume };

        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                "hero-image"
            );

            updateData.image = uploadResult.secure_url;
            updateData.imagePublicId = uploadResult.public_id;
        }

        const updated = await updateHomeData(id, updateData);

        if (!updated) {
            throw new AppError("Home Data not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Home Data updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

export const deletedHomeData = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const deleted = await deleteHomeDataById(id);

        if (!deleted) {
            throw new AppError("Data not found", 404);
        }

        if (deleted.imagePublicId) {
            await deleteFromCloudinary(deleted.imagePublicId);
        }

        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
        });
    } catch (error) {
        next(error);
    }
}
