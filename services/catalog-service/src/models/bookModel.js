import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, default: "/images/default.jpg" },
  author: { type: String, required: true },
  description: { type: String },
  countInStock: { type: Number, default: 0 },
  price: { type: Number, default: 0 }
}, {
  timestamps: true
});

const Book = mongoose.model("Book", bookSchema);
export default Book;
