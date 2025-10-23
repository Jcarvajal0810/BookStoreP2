import Book from "../models/bookModel.js";

// GET /api/books
export const getBooks = async (req, res) => {
  try {
    const q = req.query.q;
    const filter = {};
    if (q) {
      filter.$or = [
        { name: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } }
      ];
    }
    const books = await Book.find(filter).limit(200);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching books" });
  }
};

// GET /api/books/:id
export const getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: "Book not found" });
    res.json(book);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching book" });
  }
};
