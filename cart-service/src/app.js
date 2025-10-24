const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();  //  Esto DEBE ir antes de usar process.env

const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/cart', cartRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log(" Conectado a MongoDB - Cart Service"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Cart Service ejecutándose en el puerto ${PORT}`));
