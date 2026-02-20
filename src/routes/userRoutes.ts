import { Router } from "express";
import { getUserData, deletedUser } from "../controllers/userController";

const router = Router();

router
    .route("/")
    .get(getUserData);

router
    .route("/:id")
    .delete(deletedUser);

export default router;
