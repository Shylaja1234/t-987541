
const express = require('express');
const router = express.Router();
const { categories } = require('../data/products');

// Simple in-memory cache for categories
let categoriesCache = null;
let cacheExpiry = 0;
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

// GET all categories
router.get('/', (req, res) => {
  try {
    const now = Date.now();
    
    // Return cached categories if valid
    if (categoriesCache && cacheExpiry > now) {
      return res.json(categoriesCache);
    }
    
    // Update cache
    categoriesCache = categories;
    cacheExpiry = now + CACHE_TTL;
    
    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: 'Failed to fetch categories' });
  }
});

// GET a single category by ID
router.get('/:id', (req, res) => {
  try {
    const id = req.params.id;
    const category = categories.find(c => c.id === id);
    
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    
    res.json(category);
  } catch (error) {
    console.error(`Error fetching category with ID ${req.params.id}:`, error);
    res.status(500).json({ error: 'Failed to fetch category' });
  }
});

module.exports = router;
