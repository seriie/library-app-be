import prisma from "../config/prisma.js";


export const getUserProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user.id },
      select: { id: true, name: true, email: true, role: true, createdAt: true },
    });

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", code: 404 });
    }

    res.status(200).json({
      message: `Successfully retrieving user: ${user.id}`,
      code: 200,
      data: user,
    });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Internal server error", code: 500 });
  }
};