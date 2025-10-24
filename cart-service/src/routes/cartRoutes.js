const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:user_id', cartController.getCart);
router.post('/add', cartController.addItem);
router.delete('/:user_id/:book_id', cartController.removeItem);

module.exports = router;
