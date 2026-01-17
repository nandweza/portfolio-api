import { Router } from "express";
import { registerUser } from "../controllers/authControllers";

const router = Router();

router
    .route("/register")
    .post(registerUser);

export default router;
