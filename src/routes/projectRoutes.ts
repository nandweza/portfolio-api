import { Router } from 'express';
import {
    newProject,
    returnProjects,
    updateProject,
    deleteProject
} from '../controllers/projectControllers';
import { upload } from '../middleware/upload';

const router = Router();

router
    .route('/')
    .get(returnProjects)
    .post(upload({ fieldName: "image", maxSizeMB: 5 }), newProject);

router
    .route('/:id')
    .patch(upload({ fieldName: "image", maxSizeMB: 5 }), updateProject)
    .delete(deleteProject);

export default router;
