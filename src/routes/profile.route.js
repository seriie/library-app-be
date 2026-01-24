import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/auth.middleware.js";
import * as profileController from '../controllers/profile.controller.js';

router.get('/', verifyToken, profileController.getUserProfile);

export default router;