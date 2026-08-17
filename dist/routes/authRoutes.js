"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authControllers_1 = require("../controllers/authControllers");
const router = (0, express_1.Router)();
router
    .route('/register')
    .post(authControllers_1.registerUser);
router
    .route('/login')
    .post(authControllers_1.loginUser);
router
    .route('/reset-password')
    .post(authControllers_1.resetPassword);
exports.default = router;
