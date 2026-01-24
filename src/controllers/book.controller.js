import Book from "../models/book.model.js";
import { nanoIdFormat } from "../utils/nanoIdFormat.js";
import { isbnFormat } from "../utils/isbnFormat.js";

export const getBooks = async (req, res) => {
  try {
    const books = await Book.findAll();
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
    const book = await Book.findByPk(id);

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

    const id = nanoIdFormat("buid-");

    let isbn;
    let existingBook;

    do {
      isbn = isbnFormat();
      existingBook = await Book.findOne({ where: { isbn } });
    } while (existingBook);

    const book = await Book.create({
      id,
      isbn,
      title,
      author,
      description,
      stock,
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

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    if (title) book.title = title;
    if (author) book.author = author;
    if (description) book.description = description;
    if (stock !== undefined) book.stock = stock;

    await book.save();

    res.status(200).json({
      message: "Book updated successfully",
      code: 200,
      data: book,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};

export const deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found", code: 404 });
    }

    await book.destroy();

    res.status(204).json({
      message: "Book deleted successfully",
      code: 204,
    });
  } catch (err) {
    res.status(500).json({ message: err.message, code: 500 });
  }
};