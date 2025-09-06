const express = require('express');
const { addToCart, getCart, removeFromCart } = require('../controllers/cart.controller');
const auth = require('../middlewares/auth.middleware');
const { validateAddToCart } = require('../middlewares/validation');

const router = express.Router();

// @route   POST /api/cart
router.post('/', auth, validateAddToCart, addToCart);
// @route   GET /api/cart/:userId
router.get('/:userId', auth, getCart);
// @route   DELETE /api/cart/:userId/:productId
router.delete('/:userId/:productId', auth, removeFromCart);

module.exports = router;