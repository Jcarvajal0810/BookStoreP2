require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const BookSchema = new mongoose.Schema({
  name: String,
  author: String,
  description: String,
  image: String,
  countInStock: Number,
  price: String
});
const Book = mongoose.model('Book', BookSchema);
app.get('/api/books', async (req, res) => {
  const books = await Book.find().lean();
  res.json(books);
});
app.get('/api/books/:id', async (req, res) => {
  try {
    const b = await Book.findById(req.params.id).lean();
    if (!b) return res.status(404).json({ message: 'Not found' });
    res.json(b);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id' });
  }
});
app.post('/api/books', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.status(201).json(book);
});
app.get('/health', (req, res) => res.json({ status: 'ok' }));
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://mongo:27017/bookstore';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Mongo connected');
    app.listen(PORT, () => console.log(Catalog running on ));
  })
  .catch(err => {
    console.error('Mongo connect error', err);
    process.exit(1);
  });
