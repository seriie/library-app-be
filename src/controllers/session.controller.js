import { nanoIdFormat } from "../utils/nanoIdFormat.js";
import prisma from "../config/prisma.js";

export const createSession = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res
        .status(400)
        .json({ message: "userId is required", code: 400 });
    }

    const expiredAt = new Date(Date.now() + 60 * 60 * 1000);

    await prisma.session.deleteMany({
      where: { userId },
    });

    const session = await prisma.session.create({
      data: {
        id: nanoIdFormat("suid-"),
        userId,
        expiredAt,
      },
    });

    res.status(201).json({
      message: "Session created",
      code: 201,
      data: session,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};