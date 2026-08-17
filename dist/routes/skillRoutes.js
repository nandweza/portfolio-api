"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const skillController_1 = require("../controllers/skillController");
const requireAuth_1 = require("../middleware/requireAuth");
const router = (0, express_1.Router)();
router
    .route("/")
    .post(requireAuth_1.requireAuth, skillController_1.newSkill)
    .get(skillController_1.returnSkills);
router
    .route("/:category")
    .get(skillController_1.returnSkillByCategory);
router
    .route("/:id")
    .patch(requireAuth_1.requireAuth, skillController_1.updateSkill)
    .delete(requireAuth_1.requireAuth, skillController_1.deleteSkill);
exports.default = router;
