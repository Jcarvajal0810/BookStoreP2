import express from "express";
import Book from "../models/bookModel.js";

const router = express.Router();

// 📚 Obtener todos los libros
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los libros", error: err });
  }
});

// 🔍 Obtener un libro por ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(book);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener el libro", error: err });
  }
});

// ➕ Agregar un nuevo libro
router.post("/", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (err) {
    res.status(400).json({ message: "Error al agregar el libro", error: err });
  }
});

// ✏️ Actualizar un libro
router.put("/:id", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) return res.status(404).json({ message: "Libro no encontrado" });
    res.json(updatedBook);
  } catch (err) {
    res.status(400).json({ message: "Error al actualizar el libro", error: err });
  }
});

// 🗑️ Eliminar un libro
router.delete("/:id", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) return res.status(404).json({ message: "Libro no encontrado" });
    res.json({ message: "Libro eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ message: "Error al eliminar el libro", error: err });
  }
});

export default router;
