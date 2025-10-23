import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, ".env") });

import Book from "./src/models/bookModel.js";

const books = [
  {
    name: "Leonardo Davinci: La Biografía",
    image: "/images/img-ld-labiografia.jpeg",
    author: "Walter Isaacson",
    description: "Basándose en las miles de páginas de los cuadernos manuscritos de Leonardo...",
    countInStock: 2,
    price: 50000
  },
  {
    name: "Inteligencia Genial",
    image: "/images/img-ld-inteligenciagenial.jpeg",
    author: "Michael Gelb",
    description: "Ejercicios y lecciones para desarrollar el potencial intelectual y la creatividad.",
    countInStock: 3,
    price: 30000
  },
  {
    name: "Programando en Node.js",
    image: "/images/img-nodejs.jpeg",
    author: "Autor Ejemplo",
    description: "Guía práctica para construir APIs con Node.js y Express.",
    countInStock: 5,
    price: 45000
  },
  {
    name: "Arquitectura de Software",
    image: "/images/img-arq-software.jpeg",
    author: "Autora Ejemplo",
    description: "Patrones y prácticas para diseñar sistemas escalables.",
    countInStock: 4,
    price: 60000
  },
  {
    name: "Bases de Datos NoSQL",
    image: "/images/img-nosql.jpeg",
    author: "Autora BD",
    description: "Conceptos y ejemplos con MongoDB.",
    countInStock: 6,
    price: 42000
  }
];

const runSeeder = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.error("❌ MONGO_URI no está definida en .env");
      process.exit(1);
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("🔌 Conectado a MongoDB Atlas para cargar datos...");

    await Book.deleteMany();
    await Book.insertMany(books);

    console.log("✅ Libros insertados correctamente en Atlas.");
    process.exit(0);
  } catch (err) {
    console.error("❌ Error al ejecutar el seeder:", err);
    process.exit(1);
  }
};

runSeeder();
