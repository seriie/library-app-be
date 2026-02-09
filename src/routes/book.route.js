import express from "express";
const router = express.Router();
import * as bookController from "../controllers/book.controller.js";

router.get("/", bookController.getBooks);
router.get("/:id", bookController.getBookById);
router.post("/", bookController.createBook);
router.patch("/:id", bookController.patchBook);
router.delete("/:id", bookController.deleteBook);

export default router;