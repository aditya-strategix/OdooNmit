const express = require('express');
const { 
  createProduct, 
  getProducts, 
  getProductById, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/products.controller');
const auth = require('../middlewares/auth.middleware');
const { validateProduct } = require('../middlewares/validation');

const router = express.Router();

// @route   POST /api/products
router.post('/', auth, validateProduct, createProduct);

// @route   GET /api/products
router.get('/', getProducts);

// @route   GET /api/products/:id

router.get('/:id', getProductById);

// @route   PUT /api/products/:id

router.put('/:id', auth, validateProduct, updateProduct);

// @route   DELETE /api/products/:id
router.delete('/:id', auth, deleteProduct);

module.exports = router;