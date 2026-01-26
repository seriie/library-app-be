import express from "express";
const router = express.Router();
import userRoutes from "./user.route.js";
import profileRoutes from "./profile.route.js"
import bookRoutes from "./book.route.js";
import loanRoutes from "./loan.route.js";
import sessionRoutes from "./session.route.js";

router.use("/users", userRoutes);
router.use("/profile", profileRoutes);
router.use("/books", bookRoutes);
router.use("/loans", loanRoutes);
router.use("/sessions", sessionRoutes);

export default router;