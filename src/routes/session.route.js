import express from "express";
const router = express.Router();
import * as sessionController from "../controllers/session.controller.js";

router.post("/", sessionController.createSession);
router.get("/", sessionController.getSessions);

export default router;