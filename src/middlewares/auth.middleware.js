import prisma from "../config/prisma.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export default function verifyToken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Token missing", code: 401 });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name == "TokenExpiredError") {
      return res
        .status(403)
        .json({ message: "Your session expired, please re-login!", code: 403 });
    }
    res.status(403).json({ message: "Invalid token", code: 403 });
  }
};