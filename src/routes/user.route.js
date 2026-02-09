import express from "express";
const router = express.Router();
import * as userController from "../controllers/user.controller.js";

router.get("/", userController.getUsers);
router.get("/:id", userController.getUserById);
router.patch("/:id", userController.patchUser);
router.delete("/:id", userController.deleteUser);

export default router;