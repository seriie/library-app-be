import express from "express";
const router = express.Router();
import * as loanController from "../controllers/loan.controller.js";

router.get("/", loanController.getLoans);
router.get("/:id", loanController.getLoanById);
router.post("/", loanController.createLoan);
router.patch("/return/:id", loanController.returnBook);

export default router;