module.exports = {
  getCart: (req, res) => {
    const userId = req.params.user_id;
    return res.json({ userId, items: [] });
  },
  getTotal: (req, res) => {
    const userId = req.params.user_id;
    return res.json({ userId, total: 0 });
  },
  addItem: (req, res) => {
    return res.status(201).json({ added: req.body });
  },
  updateItem: (req, res) => {
    return res.json({ updated: req.body });
  },
  removeItem: (req, res) => {
    return res.json({ removed: req.params.book_id });
  },
  clearCart: (req, res) => {
    return res.json({ clearedFor: req.params.user_id });
  }
};
