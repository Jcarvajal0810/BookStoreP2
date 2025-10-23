
// index.js - Microservicio Catalog (actualizado)

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB"))
  .catch((err) => console.error(" Error de conexión:", err));

// Modelo de libro
const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  price: String,
  description: String,
});

const Book = mongoose.model("Book", BookSchema);

// Ruta con prefijo /api
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error obteniendo libros" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(` Catalog service running on port ${PORT}`));
