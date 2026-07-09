import { Router } from "express";
import { 
    newHomeData, 
    getAllHomeData, 
    updatedHomeData, 
    deletedHomeData 
} from "../controllers/homeControllers";
import { upload } from "../middleware/upload";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router
    .route("/")
    .get(getAllHomeData)
    .post(upload({ fieldName: "image", maxSizeMB: 5 }), requireAuth, newHomeData);

router
    .route("/:id")
    .patch(upload({ fieldName: "image", maxSizeMB: 5 }), requireAuth, updatedHomeData)
    .delete(requireAuth, deletedHomeData);

export default router;
