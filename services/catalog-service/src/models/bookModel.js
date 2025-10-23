import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: String,
  author: String,
  description: String,
  countInStock: { type: Number, default: 0 },
  price: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Book", bookSchema);
