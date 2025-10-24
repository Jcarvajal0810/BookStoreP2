require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Config
const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://bs2_mongo:27017/orderdb';

// Modelo
const OrderSchema = new mongoose.Schema({
  book_id: { type: String, required: true },
  customer: { type: String },
  quantity: { type: Number, default: 1 },
  status: { type: String, default: 'CREATED' },
  created_at: { type: Date, default: Date.now }
});
const Order = mongoose.model('Order', OrderSchema);

// Conexión a Mongo
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ Order: connected to Mongo'))
  .catch(err => {
    console.error('❌ Order: mongo connection error', err);
    process.exit(1);
  });

// Rutas
app.get('/api/orders', async (req, res) => {
  const orders = await Order.find().lean();
  res.json(orders);
});

app.get('/api/orders/:id', async (req, res) => {
  try {
    const o = await Order.findById(req.params.id).lean();
    if (!o) return res.status(404).json({ message: 'Order not found' });
    res.json(o);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

app.post('/api/orders', async (req, res) => {
  try {
    const { book_id, customer, quantity } = req.body;
    if (!book_id) return res.status(400).json({ message: 'book_id is required' });
    const order = new Order({ book_id, customer, quantity });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.patch('/api/orders/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) return res.status(400).json({ message: 'status is required' });
    const updated = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Order not found' });
    res.json({ message: `Order updated to ${status}`, order: updated });

  } catch (err) {
    res.status(400).json({ message: 'Invalid id' });
  }
});

app.listen(PORT, () => console.log(`🚀 Order service running on port ${PORT}`));
