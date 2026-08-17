"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const homeControllers_1 = require("../controllers/homeControllers");
const upload_1 = require("../middleware/upload");
const requireAuth_1 = require("../middleware/requireAuth");
const router = (0, express_1.Router)();
router
    .route("/")
    .get(homeControllers_1.getAllHomeData)
    .post((0, upload_1.upload)({ fieldName: "image", maxSizeMB: 5 }), requireAuth_1.requireAuth, homeControllers_1.newHomeData);
router
    .route("/:id")
    .patch((0, upload_1.upload)({ fieldName: "image", maxSizeMB: 5 }), requireAuth_1.requireAuth, homeControllers_1.updatedHomeData)
    .delete(requireAuth_1.requireAuth, homeControllers_1.deletedHomeData);
exports.default = router;
