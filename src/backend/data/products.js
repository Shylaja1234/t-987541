
// Import the product data from the frontend source
const { products, categories } = require('../../data/products');

// Convert the imported data to a CommonJS module format
module.exports = {
  products: JSON.parse(JSON.stringify(products)),
  categories: JSON.parse(JSON.stringify(categories))
};
