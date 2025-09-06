const express = require('express');
const { createPurchase, getPurchaseHistory } = require('../controllers/purchases.controller');
const auth = require('../middlewares/auth.middleware');

const router = express.Router();

// @route   POST /api/purchases

router.post('/', auth, createPurchase);

// @route   GET /api/purchases/:userId

router.get('/:userId', auth, getPurchaseHistory);

module.exports = router;