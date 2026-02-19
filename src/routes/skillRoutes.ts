import { Router } from "express";

import {
    newSkill,
    returnSkills,
    returnSkillByCategory,
    updateSkill,
    deleteSkill
} from '../controllers/skillController';

const router = Router();

router
    .route("/")
    .post(newSkill)
    .get(returnSkills);

router
    .route("/:category")
    .get(returnSkillByCategory);

router
    .route("/:id")
    .patch(updateSkill)
    .delete(deleteSkill);

export default router;