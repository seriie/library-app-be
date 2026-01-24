import User from "../models/user.model.js";

export const getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({
      where: { id: req.user.id },
      attributes: ["id", "name", "email", "role", "createdAt"],
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