import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB - DB: Librería"))
  .catch((err) => console.error("Error de conexion:", err));

// Schema que coincide EXACTAMENTE con los datos en MongoDB
const BookSchema = new mongoose.Schema({
  _identificación: String,
  nombre: String,
  imagen: String,
  autor: String,
  descripción: String,
  contarEnStock: Number,
  precio: Number,
  creadoEn: Date,
  actualizadoEn: Date
}, { 
  collection: 'books',
  strict: false
});

const Book = mongoose.model("Book", BookSchema);

// GET - Obtener todos los libros
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    console.log("[v0] Libros encontrados:", books.length);
    res.json(books);
  } catch (err) {
    console.error("[v0] Error:", err);
    res.status(500).json({ error: "Error obteniendo libros" });
  }
});

// GET - Obtener un libro por ID
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(book);
  } catch (err) {
    console.error("[v0] Error:", err);
    res.status(500).json({ error: "Error obteniendo libro" });
  }
});

// POST - Crear un nuevo libro
app.post("/api/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const saved = await newBook.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("[v0] Error:", err);
    res.status(500).json({ error: "Error creando libro" });
  }
});

// PUT - Actualizar un libro
app.put("/api/books/:id", async (req, res) => {
  try {
    req.body.actualizadoEn = new Date();
    const updated = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ error: "Libro no encontrado" });
    res.json(updated);
  } catch (err) {
    console.error("[v0] Error:", err);
    res.status(500).json({ error: "Error actualizando libro" });
  }
});

// DELETE - Eliminar un libro
app.delete("/api/books/:id", async (req, res) => {
  try {
    const deleted = await Book.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: "Libro no encontrado" });
    res.json({ message: "Libro eliminado" });
  } catch (err) {
    console.error("[v0] Error:", err);
    res.status(500).json({ error: "Error eliminando libro" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Catalog service running on port " + PORT);
});