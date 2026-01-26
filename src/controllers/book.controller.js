import prisma from "../config/prisma.js";
import { nanoIdFormat } from "../utils/nanoIdFormat.js";
import { isbnFormat } from "../utils/isbnFormat.js";

export const getBooks = async (req, res) => {
  try {
    const books = await prisma.book.findMany();
    res.status(200).json({
      message: "Successfully retrieving book data",
      code: 200,
      data: books,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await prisma.book.findUnique({ where: { id } });

    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    res.status(200).json({
      message: "Successfully retrieving book data",
      code: 200,
      data: book,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const createBook = async (req, res) => {
  try {
    const { title, author, description, stock } = req.body;
    const parseStock = parseInt(stock);

    const id = nanoIdFormat("buid-");

    let isbn;
    let existingBook;

    do {
      isbn = isbnFormat();
      existingBook = await prisma.book.findUnique({ where: { isbn } });
    } while (existingBook);

    const book = await prisma.book.create({
      data: {
        id,
        isbn,
        title,
        author,
        description,
        stock: parseStock,
      }
    });

    res.status(201).json({
      message: "Book created successfully",
      code: 201,
      data: book,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const patchBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, description, stock } = req.body;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    const updatedBook = await prisma.book.update({
      where: { id },
      data: {
        title: title || undefined,
        author: author || undefined,
        description: description || undefined,
        stock: stock !== undefined ? stock : undefined,
      },
    });

    res.status(200).json({
      message: "Book updated successfully",
      code: 200,
      data: updatedBook,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await prisma.book.findUnique({ where: { id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    await prisma.book.delete({ where: { id } });

    res.status(204).json({
      message: "Book deleted successfully",
      code: 204,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};