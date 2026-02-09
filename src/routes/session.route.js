import express from "express";
const router = express.Router();
import * as sessionController from "../controllers/session.controller.js";
import verifyToken from '../middlewares/auth.middleware.js';

router.post("/", verifyToken, sessionController.createSession);
router.get("/", verifyToken, sessionController.getSessions);
router.delete("/:id", sessionController.deleteSession);

export default router;