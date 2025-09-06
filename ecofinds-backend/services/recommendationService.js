// Dummy products until real DB is connected
const products = [
  { id: "p1", title: "iPhone 12", price: 30000, category: "Electronics", image_url: "/img/iphone.jpg" },
  { id: "p2", title: "Samsung S20", price: 25000, category: "Electronics", image_url: "/img/samsung.jpg" },
  { id: "p3", title: "MacBook Pro", price: 90000, category: "Electronics", image_url: "/img/macbook.jpg" },
];

function getRecommendations(productId) {
  const p = products.find(x => x.id === productId);
  if (!p) return [];

  return products.filter(x => x.id !== p.id && x.category === p.category);
}

module.exports = { getRecommendations };
