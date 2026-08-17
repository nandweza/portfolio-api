"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const projectControllers_1 = require("../controllers/projectControllers");
const upload_1 = require("../middleware/upload");
const requireAuth_1 = require("../middleware/requireAuth");
const router = (0, express_1.Router)();
router
    .route('/')
    .get(projectControllers_1.returnProjects)
    .post((0, upload_1.upload)({ fieldName: "image", maxSizeMB: 5 }), requireAuth_1.requireAuth, projectControllers_1.newProject);
router
    .route('/:id')
    .patch((0, upload_1.upload)({ fieldName: "image", maxSizeMB: 5 }), requireAuth_1.requireAuth, projectControllers_1.updateProject)
    .delete(requireAuth_1.requireAuth, projectControllers_1.deleteProject);
exports.default = router;
