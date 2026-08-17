"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProject = exports.updateProject = exports.returnProjects = exports.newProject = void 0;
const appError_1 = require("../utils/appError");
const uploadToCloudinary_1 = require("../utils/uploadToCloudinary");
const cloudinaryDelete_1 = require("../utils/cloudinaryDelete");
const project_1 = require("../db/project");
// a method to create a new project.
const newProject = async (req, res, next) => {
    try {
        const { title, description, liveUrl, codeUrl, } = req.body;
        const techStack = typeof req.body.techStack === "string"
            ? req.body.techStack.split(",")
            : req.body.techStack;
        // throws an error if a field is missing.
        if (!title || !description || !techStack || !liveUrl || !codeUrl) {
            throw new appError_1.AppError("Misssing some data", 400);
        }
        // throws an error if image is missing
        if (!req.file) {
            console.log("File", req.file);
            throw new appError_1.AppError("Image file is required", 400);
        }
        //uploads image to cloudinary servers.
        const uploadResult = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "project-image");
        //creates a project data model
        const project = await (0, project_1.createProject)({
            title,
            description,
            techStack,
            liveUrl,
            codeUrl,
            image: uploadResult.secure_url, //public https url for displaying the image.
            imagePublicId: uploadResult.public_id // public id for managing the image.
        });
        res.status(201).json({
            status: "success",
            data: project
        });
    }
    catch (error) {
        next(error);
    }
};
exports.newProject = newProject;
// method that returns all projects.
const returnProjects = async (req, res, next) => {
    try {
        const project = await (0, project_1.getProjects)();
        res.status(200).json({
            status: "success",
            data: project,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.returnProjects = returnProjects;
// updates a project by id.
const updateProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        // fetch the project from the database
        const existingProject = await (0, project_1.getProjectById)(id);
        if (!existingProject) {
            throw new appError_1.AppError("Project not found", 404);
        }
        const { title, description, techStack, liveUrl, codeUrl } = req.body;
        const updateProject = {
            title,
            description,
            techStack,
            liveUrl,
            codeUrl
        };
        //checks and updates image in the cloudinary server. 
        if (req.file) {
            //delete old image if it exists
            if (existingProject.imagePublicId) {
                await (0, cloudinaryDelete_1.deleteFromCloudinary)(existingProject.imagePublicId);
            }
            //upload new image
            const uploadResult = await (0, uploadToCloudinary_1.uploadToCloudinary)(req.file.buffer, "project-image");
            updateProject.image = uploadResult.secure_url;
            updateProject.imagePublicId = uploadResult.public_id;
        }
        const updatedProject = await (0, project_1.updateProjectById)(id, updateProject);
        if (!updatedProject) {
            throw new appError_1.AppError("Project not found", 404);
        }
        res.status(200).json({
            status: "success",
            message: "Project updated successfully"
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProject = updateProject;
// method to delete a project by id
const deleteProject = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        const deletedProject = await (0, project_1.deleteProjectById)(id);
        if (!deletedProject) {
            throw new appError_1.AppError("Project not found", 404);
        }
        // delete and remove image from cloudinary servers.
        if (deletedProject.imagePublicId) {
            await (0, cloudinaryDelete_1.deleteFromCloudinary)(deletedProject.imagePublicId);
        }
        res.status(200).json({
            status: "success",
            message: "Project deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProject = deleteProject;
