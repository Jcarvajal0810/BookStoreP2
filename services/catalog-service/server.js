import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bookRoutes from "./src/routes/bookRoutes.js";

dotenv.config();

const app = express();
app.use(express.json());

// Routes
app.use("/api/books", bookRoutes);

// Health
app.get("/health", (req, res) => res.status(200).json({ status: "ok" }));

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI is not defined. Set it in .env or environment variables.");
  process.exit(1);
}

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("✅ Connected to MongoDB");
  app.listen(PORT, () => console.log(`🚀 catalog-service running on port ${PORT}`));
})
.catch(err => {
  console.error("❌ Mongo connection error:", err);
  process.exit(1);
});
