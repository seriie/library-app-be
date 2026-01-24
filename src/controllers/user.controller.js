import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ message: "Successfully retrieving user data", code: 200, data: users });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const getuserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    res.status(200).json({ message: "Successfully retrieving user data", code: 200, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashedPw = await bcrypt.hash(password, 10);
      user.password = hashedPw;
    }
    if (role) user.role = role;

    await user.save();
    res.status(200).json({ message: "User updated successfully", code: 200, data: user });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    await user.destroy();
    res.status(200).json({ message: "User deleted successfully", code: 200 });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};