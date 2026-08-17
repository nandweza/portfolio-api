"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProjectById = exports.updateProjectById = exports.createProject = exports.getProjectById = exports.getProjects = exports.ProjectModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const ProjectSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
    },
    techStack: {
        type: [String],
        required: true,
    },
    liveUrl: {
        type: String,
        required: true,
    },
    codeUrl: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    imagePublicId: {
        type: String,
    },
}, { timestamps: true });
exports.ProjectModel = mongoose_1.default.model('Project', ProjectSchema);
const getProjects = () => exports.ProjectModel.find();
exports.getProjects = getProjects;
const getProjectById = (id) => exports.ProjectModel.findById(id);
exports.getProjectById = getProjectById;
const createProject = (values) => new exports.ProjectModel(values)
    .save().then((project) => project.toJSON());
exports.createProject = createProject;
const updateProjectById = (id, values) => exports.ProjectModel.findByIdAndUpdate(id, values);
exports.updateProjectById = updateProjectById;
const deleteProjectById = (id) => exports.ProjectModel.findByIdAndDelete(id);
exports.deleteProjectById = deleteProjectById;
