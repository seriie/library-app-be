import { nanoIdFormat } from "../utils/nanoIdFormat.js";

import Loan from "../models/loan.model.js";
import Book from "../models/book.model.js";
import User from "../models/user.model.js";

export const getLoans = async (req, res) => {
  try {
    const loans = await Loan.findAll({
      include: [User, Book],
    });

    res.status(200).json({
      message: "Successfully retrieving loan data",
      code: 200,
      data: loans,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const getLoanById = async (req, res) => {
  try {
    const { id } = req.params;
    const loan = await Loan.findByPk(id, {
      include: [User, Book],
    });
    if (!loan) {
      return res.status(404).json({ message: "Loan not found", code: 404 });
    }
    res.status(200).json({
      message: "Successfully retrieving loan data",
      code: 200,
      data: loan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const createLoan = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    const id = nanoIdFormat("luid-");

    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    const book = await Book.findByPk(bookId);
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    if (book.stock <= 0) {
      return res.status(400).json({
        message: "Book is out of stock",
        code: 400,
      });
    }

    const loan = await Loan.create({
      id,
      userId,
      bookId,
      status: "borrowed",
    });

    book.stock -= 1;
    await book.save();

    res.status(201).json({
      message: "Book borrowed successfully",
      code: 201,
      data: loan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const returnBook = async (req, res) => {
  try {
    const { id } = req.params;

    const loan = await Loan.findByPk(id);
    if (!loan) {
      return res.status(404).json({ message: "Loan not found", code: 404 });
    }

    if (loan.status === "returned") {
      return res.status(400).json({
        message: "Book already returned",
        code: 400,
      });
    }

    const book = await Book.findByPk(loan.bookId);

    loan.status = "returned";
    loan.returnDate = new Date();
    await loan.save();

    book.stock += 1;
    await book.save();

    res.status(200).json({
      message: "Book returned successfully",
      code: 200,
      data: loan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};