import { nanoIdFormat } from "../utils/nanoIdFormat.js";
import prisma from "../config/prisma.js";


export const getLoans = async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
          },
        },
        book: true,
      },
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
    const loan = await prisma.loan.findUnique({
      where: { id },
      include: {
        user: true,
        book: true,
      },
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

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found", code: 404 });
    }

    const book = await prisma.book.findUnique({ where: { id: bookId } });
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    if (book.stock <= 0) {
      return res.status(400).json({
        message: "Book is out of stock",
        code: 400,
      });
    }

    // Use transaction to ensure both loan creation and stock update happen or neither
    const [loan, updatedBook] = await prisma.$transaction([
      prisma.loan.create({
        data: {
          id,
          userId,
          bookId,
          status: "borrowed",
        },
      }),
      prisma.book.update({
        where: { id: bookId },
        data: { stock: { decrement: 1 } },
      }),
    ]);

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

    const loan = await prisma.loan.findUnique({ where: { id } });
    if (!loan) {
      return res.status(404).json({ message: "Loan not found", code: 404 });
    }

    if (loan.status === "returned") {
      return res.status(400).json({
        message: "Book already returned",
        code: 400,
      });
    }

    const [updatedLoan, updatedBook] = await prisma.$transaction([
      prisma.loan.update({
        where: { id },
        data: {
          status: "returned",
          returnDate: new Date(),
        },
      }),
      prisma.book.update({
        where: { id: loan.bookId },
        data: { stock: { increment: 1 } },
      }),
    ]);

    res.status(200).json({
      message: "Book returned successfully",
      code: 200,
      data: updatedLoan,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};