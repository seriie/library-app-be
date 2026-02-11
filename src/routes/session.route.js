import express from "express";
const router = express.Router();
import * as sessionController from "../controllers/session.controller.js";

router.get("/", sessionController.getSessions);
router.delete("/:id", sessionController.deleteSession);

export default router;