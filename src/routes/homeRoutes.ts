import { Router } from "express";
import { 
    newHomeData, 
    getAllHomeData, 
    updatedHomeData, 
    deletedHomeData 
} from "../controllers/homeControllers";
import { upload } from "../middleware/upload";

const router = Router();

router
    .route("/")
    .get(getAllHomeData)
    .post(upload({ fieldName: "image", maxSizeMB: 5 }) , newHomeData);

router
    .route("/:id")
    .patch(upload({ fieldName: "image", maxSizeMB: 5 }), updatedHomeData)
    .delete(deletedHomeData);

export default router;
