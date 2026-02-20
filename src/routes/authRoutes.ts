import { Router } from "express";
import { registerUser, loginUser, resetPassword } from "../controllers/authControllers";

const router = Router();

router
    .route('/register')
    .post(registerUser);

router
    .route('/login')
    .post(loginUser);

router
    .route('/reset-password')
    .post(resetPassword);

export default router;
