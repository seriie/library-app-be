import prisma from "../config/prisma.js";
import bcrypt from "bcryptjs";


export const getUsers = async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json({ message: "Successfully retrieving user data", code: 200, data: users });
  } catch (err) { 
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
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

    if (!name && !email && !password && !role) {
      return res.status(400).json({ message: "No data to update", code: 400 });
    }

    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (password) {
      const hashedPw = await bcrypt.hash(password, 10);
      updateData.password = hashedPw;
    }
    if (role) updateData.role = role;

    const updatedUser = await prisma.user.update({ 
      where: { id }, 
      data: updateData 
    });
    
    // Don't return the password in the response
    const { password: _, ...userWithoutPassword } = updatedUser;

    res.status(200).json({ message: "User updated successfully", code: 200, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await prisma.user.findUnique({ where: { id } });
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }
    await prisma.user.delete({ where: { id } });
    res.status(204).json({ message: "User deleted successfully", code: 204 });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};