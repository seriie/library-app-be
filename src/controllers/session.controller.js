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

export const deleteSession = async (req, res) => {
  const { id } = req.params;

  try {
    await prisma.session.delete({ where: { userId: id } });

    res.status(204).json({ message: "User session deleted", code: 204 });
  } catch (e) {
    res.status(500).json({ message: `Internal server error: ${e.message}`, code: 500 });
  }
}