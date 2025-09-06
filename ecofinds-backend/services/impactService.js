let impact = { itemsSold: 0, kgSaved: 0 };

function updateImpact(product) {
  const kg = product.category === "Electronics" ? 4 : 1;
  impact.itemsSold += 1;
  impact.kgSaved += kg;
  return { message: "Impact updated", newImpact: impact };
}

function getImpact() {
  return impact;
}

module.exports = { updateImpact, getImpact };
