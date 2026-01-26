import { nanoIdFormat } from "../utils/nanoIdFormat.js";
import prisma from "../config/prisma.js";

// Get session

export const getSessions = async (req, res) => {
  try {
    const sessions = await prisma.session.findMany();
    res.status(200).json({ message: "Sessions fetched", code: 200, data: sessions });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
}

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

export const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    const userId = await prisma.user.findUnique({ where: { id } });

    await prisma.session.delete({ where: { userId: userId.id } });

    res.status(204).json({ message: "User session deleted", code: 204 });
  } catch (e) {
    res.status(500).json({ message: `Internal server error: ${e.message}`, code: 500 });
  }
}