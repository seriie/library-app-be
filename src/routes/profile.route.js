import express from "express";
const router = express.Router();
import * as profileController from '../controllers/profile.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.get('/', verifyToken, profileController.getUserProfile);
router.put('/:id', verifyToken, profileController.editProfile);

export default router;