import express from "express";
const app = express();
app.use(express.json());

const books = [];

app.get("/api/books", (req, res) => res.json(books));
app.get("/api/books/:id", (req, res) => {
  const b = books.find(b => b.id == req.params.id);
  if (!b) return res.status(404).json({ error: "not found" });
  res.json(b);
});
app.get("/api/books/search", (req, res) => {
  const q = req.query.title || "";
  res.json(books.filter(b => (b.title || "").includes(q)));
});
app.get("/api/books/category/:category", (req, res) => res.json(books.filter(b => b.category == req.params.category)));
app.get("/api/books/author/:author", (req, res) => res.json(books.filter(b => b.author == req.params.author)));
app.post("/api/books", (req, res) => { books.push(req.body); res.status(201).json(req.body); });
app.put("/api/books/:id", (req, res) => res.json({ updated: req.params.id }));
app.patch("/api/books/:id/stock", (req, res) => res.json({ stockUpdated: req.params.id }));
app.delete("/api/books/:id", (req, res) => res.json({ deleted: req.params.id }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Catalog service running on port " + PORT));
