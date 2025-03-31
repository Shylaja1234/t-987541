
const express = require('express');
const router = express.Router();
const { products } = require('../data/products');

// Cache for product filtering results to avoid recomputation
const productCache = {
  key: null,
  data: null,
  expiry: 0
};

// Cache TTL in milliseconds (5 minutes)
const CACHE_TTL = 5 * 60 * 1000;

// Helper to generate cache key from request query
const generateCacheKey = (query) => {
  return JSON.stringify(query);
};

// Get all products with optional filtering
router.get('/', (req, res) => {
  try {
    const {
      category,
      search,
      sortBy,
      priceRange,
      ratings,
      brands
    } = req.query;
    
    // Generate cache key from query parameters
    const cacheKey = generateCacheKey(req.query);
    
    // Check if we have a valid cache entry
    const now = Date.now();
    if (productCache.key === cacheKey && productCache.expiry > now) {
      return res.json(productCache.data);
    }
    
    let filteredProducts = [...products];
    
    // Filter by category
    if (category && category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product.category.toLowerCase() === category.toLowerCase()
      );
    }
    
    // Filter by search term
    if (search) {
      const searchTerm = search.toLowerCase();
      filteredProducts = filteredProducts.filter(product => {
        return (
          product.title.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)))
        );
      });
    }
    
    // Filter by price range
    if (priceRange) {
      const [min, max] = priceRange.split(',').map(Number);
      filteredProducts = filteredProducts.filter(product => {
        const price = parseInt(product.price.replace(/[^\d]/g, ''));
        return price >= min * 1000 && price <= max * 1000;
      });
    }
    
    // Sort products
    if (sortBy) {
      filteredProducts.sort((a, b) => {
        switch (sortBy) {
          case 'price-low':
            return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
          case 'price-high':
            return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
          case 'newest':
            return b.id - a.id;
          case 'rating':
            return b.rating - a.rating;
          case 'featured':
          default:
            return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
      });
    }
    
    const result = { products: filteredProducts, total: filteredProducts.length };
    
    // Update cache
    productCache.key = cacheKey;
    productCache.data = result;
    productCache.expiry = now + CACHE_TTL;
    
    res.json(result);
  } catch (error) {
    console.error('Error getting products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get a single product by ID
router.get('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error getting product by ID:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Add other product CRUD routes as needed
router.post('/', (req, res) => {
  try {
    // Create a new product
    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      ...req.body,
    };
    
    products.push(newProduct);
    
    // Invalidate cache
    productCache.key = null;
    
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const updatedProduct = { ...products[index], ...req.body };
    products[index] = updatedProduct;
    
    // Invalidate cache
    productCache.key = null;
    
    res.json(updatedProduct);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/:id', (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const index = products.findIndex(p => p.id === id);
    
    if (index === -1) {
      return res.status(404).json({ message: 'Product not found' });
    }
    
    const deletedProduct = products.splice(index, 1)[0];
    
    // Invalidate cache
    productCache.key = null;
    
    res.json(deletedProduct);
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
