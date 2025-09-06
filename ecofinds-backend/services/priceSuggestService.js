function suggestPrice(category, title='') {
  let base = category === "Electronics" ? 5000 : 1000;
  let price = base * 0.7;

  // Keyword adjustments
  if (/iphone|macbook/i.test(title)) price *= 1.2;
  if (/samsung/i.test(title)) price *= 1.1;

  return {
    suggestedPrice: Math.round(price),
    range: { 
      min: Math.round(price * 0.8), 
      max: Math.round(price * 1.3) 
    }
  };
}
module.exports = { suggestPrice };
