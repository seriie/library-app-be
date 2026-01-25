import express from "express";
const router = express.Router();
import * as sessionController from "../controllers/session.controller.js";

router.post("/", sessionController.createSession);

export default router;