import { Router } from 'express';
import {
    newProject,
    returnProjects,
    updateProject,
    deleteProject
} from '../controllers/projectControllers';
import { upload } from '../middleware/upload';
import { requireAuth } from '../middleware/requireAuth';

const router = Router();

router
    .route('/')
    .get(returnProjects)
    .post(upload({ fieldName: "image", maxSizeMB: 5 }), requireAuth, newProject);

router
    .route('/:id')
    .patch(upload({ fieldName: "image", maxSizeMB: 5 }), requireAuth, updateProject)
    .delete(requireAuth, deleteProject);

export default router;
