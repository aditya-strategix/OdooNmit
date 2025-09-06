const express = require('express');
const router = express.Router();

// Import AI services
const { suggestPrice } = require('../services/priceSuggestService');
const { getRecommendations } = require('../services/recommendationService');
const { getImpact, updateImpact } = require('../services/impactService');


// Price Suggestion
router.post('/price-suggest', (req, res) => {
  const { category, title } = req.body;
  const result = suggestPrice(category, title);
  res.json(result);
});

// 2Recommendations
router.get('/recommendations', (req, res) => {
  const { productId } = req.query;
  const result = getRecommendations(productId);
  res.json(result);
});

// 3️⃣ Sustainability Impact Summary
router.get('/impact-summary', (req, res) => {
  const result = getImpact();
  res.json(result);
});

// 4️⃣ Update Impact
router.post('/impact-update', (req, res) => {
  const { product } = req.body;
  const result = updateImpact(product);
  res.json(result);
});

module.exports = router;
