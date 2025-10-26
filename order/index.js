const express = require('express');
const app = express();
app.use(express.json());

const orders = [];

app.get('/api/orders', (req, res) => res.json(orders));
app.get('/api/orders/:id', (req, res) => res.json({ orderId: req.params.id }));
app.get('/api/orders/user/:userId', (req, res) => res.json({ userId: req.params.userId }));
app.get('/api/orders/status/:status', (req, res) => res.json({ status: req.params.status }));
app.post('/api/orders', (req, res) => { orders.push(req.body); res.status(201).json(req.body); });
app.put('/api/orders/:id/status', (req, res) => res.json({ statusUpdated: req.params.id }));
app.delete('/api/orders/:id', (req, res) => res.json({ deleted: req.params.id }));

app.listen(8000, () => console.log('Order service running on port 8000'));
