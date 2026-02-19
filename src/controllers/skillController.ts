import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

import {
    getSkills,
    getSkill,
    createSkill,
    updateSkillById,
    deleteSkillById
} from '../db/skill';

export const newSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { name, category, iconKey } = req.body;

        if (!name || !category || !iconKey) {
            throw new AppError("Missing some data", 400);
        }

        const skill = await createSkill({
            name,
            category,
            iconKey,
        });

        res.status(201).json({
            status: "success",
            data: skill
        });
    } catch (error) {
        next(error);
    }
};

export const returnSkills = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const skill = await getSkills();

        res.status(200).json({
            status: "success",
            data: skill
        });
    } catch (error) {
        next(error);
    }
};

export const returnSkillByCategory = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { category } = req.params;

        if (!category) {
            throw new AppError("Category is require!", 400);
        }

        const skills = await getSkill(category as string);

        res.status(200).json({
            status: "success",
            result: skills.length,
            data: skills
        });
    } catch (error) {
        next(error);
    }
}

export const updateSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id }  = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const { name, category, iconKey } = req.body;

        const updateSkill: any = { name, category, iconKey };

        const updated = await updateSkillById(id, updateSkill);

        if (!updated) {
            throw new AppError("Skill not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Skill updated successfully",
        })
    } catch (error) {
        next(error);
    }
}

export const deleteSkill = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id } = req.params;

        if (Array.isArray(id)) {
            throw new AppError("Invalid id", 400);
        }

        const deleted = await deleteSkillById(id);

        if (!deleted) {
            throw new AppError("Skill not found", 404);
        }

        res.status(200).json({
            status: "success",
            message: "Skill deleted successfully."
        })
    } catch (error) {
        next(error);
    }
}