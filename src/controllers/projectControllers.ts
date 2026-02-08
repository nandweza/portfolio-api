import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import { deleteFromCloudinary } from '../utils/cloudinaryDelete';

import {
    getProjects,
    createProject,
    updateProjectById,
    deleteProjectById
} from '../db/project';

// a method to create a new project.
export const newProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { 
            title, 
            description, 
            techStack, 
            liveUrl, 
            codeUrl, 
        } = req.body;

        // throws an error if a field is missing.
        if (!title || !description || !techStack || !liveUrl || !codeUrl) {
            throw new AppError("Misssing some data", 400);
        }

        // throws an error if image is missing
        if (!req.file) {
            throw new AppError("Image file is required", 400);
        }

        //uploads image to cloudinary servers.
        const uploadResult = await uploadToCloudinary(
            req.file.buffer,
            "project-image"
        );

        //creates a project data model
        const project = await createProject({
            title,
            description,
            techStack,
            liveUrl,
            codeUrl,
            image: uploadResult.secure_url,  //public https url for displaying the image.
            imagePublicId: uploadResult.public_id  // public id for managing the image.
        });

        res.status(201).json({
            status: "success",
            data: project
        });
    } catch (error) {
        next(error);
    }
};

// method that returns all projects.
export const returnProjects = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const project = await getProjects();
        
        res.status(200).json({
            status: "success",
            data: project,
        })
    } catch (error) {
        next(error);
    }
};

// updates a project by id.
export const updateProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const { 
            title, 
            description,
            techStack,
            liveUrl,
            codeUrl
        } = req.body;

        const updateProject: any = { 
            title, 
            description,
            techStack,
            liveUrl,
            codeUrl
        };

        //checks and updates image in the cloudinary server. 
        if (req.file) {
            const uploadResult = await uploadToCloudinary(
                req.file.buffer,
                "project-image"
            );

            updateProject.image = uploadResult.secure_url;
            updateProject.imagePublicId = uploadResult.public_id;
        }

        const updatedProject = await updateProjectById(id, updateProject);

        if (!updatedProject) {
            throw new AppError("Project not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Project updated successfully"
        });
    } catch (error) {
        next(error);
    }
};

// method to delete a project by id
export const deleteProject = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const deletedProject = await deleteProjectById(id);

        if (!deletedProject) {
            throw new AppError("Project not found", 404);
        }

        // delete and remove image from cloudinary servers.
        if (deletedProject.imagePublicId) {
            await deleteFromCloudinary(deletedProject.imagePublicId);
        }

        res.status(200).json({
            status: "success",
            message: "Project deleted successfully",
        });
    } catch(error) {
        next(error);
    }
};
