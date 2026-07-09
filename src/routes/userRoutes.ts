import { Router } from "express";
import { getUserData, deletedUser } from "../controllers/userController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router
    .route("/")
    .get(getUserData);

router
    .route("/:id")
    .delete(requireAuth, deletedUser);

export default router;
