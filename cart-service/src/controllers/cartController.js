const Cart = require('../models/cart');

// Obtener carrito por usuario
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user_id: req.params.user_id });
    res.json(cart || { user_id: req.params.user_id, items: [] });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Agregar libro al carrito
exports.addItem = async (req, res) => {
  try {
    const { user_id, book_id, title, price, quantity } = req.body;
    let cart = await Cart.findOne({ user_id });

    if (!cart) {
      cart = new Cart({ user_id, items: [] });
    }

    const item = cart.items.find(i => i.book_id === book_id);
    if (item) {
      item.quantity += quantity;
    } else {
      cart.items.push({ book_id, title, price, quantity });
    }

    cart.updated_at = Date.now();
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Eliminar libro del carrito
exports.removeItem = async (req, res) => {
  try {
    const { user_id, book_id } = req.params;
    const cart = await Cart.findOne({ user_id });

    if (!cart) return res.status(404).json({ message: "Carrito no encontrado" });

    cart.items = cart.items.filter(item => item.book_id !== book_id);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
