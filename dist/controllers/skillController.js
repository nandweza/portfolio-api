"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteSkill = exports.updateSkill = exports.returnSkillByCategory = exports.returnSkills = exports.newSkill = void 0;
const appError_1 = require("../utils/appError");
const skill_1 = require("../db/skill");
const newSkill = async (req, res, next) => {
    try {
        const { name, category, iconKey, iconColor } = req.body ?? {};
        if (!name || !category || !iconKey) {
            console.log("Body:", req.body);
            throw new appError_1.AppError("Missing some data", 400);
        }
        const skill = await (0, skill_1.createSkill)({
            name,
            category,
            iconKey,
            iconColor,
        });
        res.status(201).json({
            status: "success",
            data: skill
        });
    }
    catch (error) {
        next(error);
    }
};
exports.newSkill = newSkill;
const returnSkills = async (req, res, next) => {
    try {
        const skill = await (0, skill_1.getSkills)();
        res.status(200).json({
            status: "success",
            data: skill
        });
    }
    catch (error) {
        next(error);
    }
};
exports.returnSkills = returnSkills;
const returnSkillByCategory = async (req, res, next) => {
    try {
        const { category } = req.params;
        if (!category) {
            throw new appError_1.AppError("Category is require!", 400);
        }
        const skills = await (0, skill_1.getSkill)(category);
        res.status(200).json({
            status: "success",
            result: skills.length,
            data: skills
        });
    }
    catch (error) {
        next(error);
    }
};
exports.returnSkillByCategory = returnSkillByCategory;
const updateSkill = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        const { name, category, iconKey, iconColor } = req.body;
        const updateSkill = { name, category, iconKey, iconColor };
        const updated = await (0, skill_1.updateSkillById)(id, updateSkill);
        if (!updated) {
            throw new appError_1.AppError("Skill not found", 404);
        }
        res.status(200).json({
            status: "success",
            message: "Skill updated successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateSkill = updateSkill;
const deleteSkill = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (Array.isArray(id)) {
            throw new appError_1.AppError("Invalid id", 400);
        }
        const deleted = await (0, skill_1.deleteSkillById)(id);
        if (!deleted) {
            throw new appError_1.AppError("Skill not found", 404);
        }
        res.status(200).json({
            status: "success",
            message: "Skill deleted successfully."
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteSkill = deleteSkill;
