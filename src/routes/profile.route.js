import express from "express";
const router = express.Router();
import * as profileController from '../controllers/profile.controller.js';
import verifyToken from '../middlewares/auth.middleware.js';

router.get('/', verifyToken, profileController.getUserProfile);

export default router;