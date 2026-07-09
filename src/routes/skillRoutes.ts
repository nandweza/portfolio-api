import { Router } from "express";

import {
    newSkill,
    returnSkills,
    returnSkillByCategory,
    updateSkill,
    deleteSkill
} from '../controllers/skillController';
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router
    .route("/")
    .post(requireAuth, newSkill)
    .get(returnSkills);

router
    .route("/:category")
    .get(returnSkillByCategory);

router
    .route("/:id")
    .patch(requireAuth, updateSkill)
    .delete(requireAuth, deleteSkill);

export default router;