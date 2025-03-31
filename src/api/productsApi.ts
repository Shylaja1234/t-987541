
import axios from 'axios';
import { Product } from '@/data/products';

// This would be set based on environment variables in a real app
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.yourdomain.com' 
  : 'http://localhost:5000';

// Create axios instance with base URL
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Function to fetch products with filters
export const fetchProducts = async (
  filters: {
    category?: string;
    search?: string;
    sortBy?: string;
    priceRange?: [number, number];
    ratings?: string[];
    brands?: string[];
  } = {}
) => {
  try {
    const response = await apiClient.get('/api/products', { params: filters });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Function to fetch a single product by ID
export const fetchProductById = async (id: number) => {
  try {
    // Import products data only when needed
    const { products } = await import('@/data/products');
    
    // Try to find the product with the matching ID in our local data
    const product = products.find(p => p.id === id);
    
    if (product) {
      // If we found a product, return it immediately (mock behavior)
      // This helps when the backend isn't running
      return product;
    }
    
    // If not found locally or we want to use the real API, continue with API call
    const response = await apiClient.get(`/api/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Function to create a product
export const createProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const response = await apiClient.post('/api/products', product);
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Function to update a product
export const updateProduct = async (id: number, product: Partial<Product>) => {
  try {
    const response = await apiClient.put(`/api/products/${id}`, product);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Function to delete a product
export const deleteProduct = async (id: number) => {
  try {
    await apiClient.delete(`/api/products/${id}`);
    return true;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

// Mock implementation that uses local data instead of an API call
// This can be used during development before the backend is ready
export const fetchProductsMock = async (
  filters: {
    category?: string;
    search?: string;
    sortBy?: string;
    priceRange?: [number, number];
    ratings?: string[];
    brands?: string[];
  } = {}
) => {
  // Import the products data
  const { products } = await import('@/data/products');
  
  // Apply filters (simplified version of what would happen on the backend)
  let filtered = [...products];
  
  // Filter by category
  if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Filter by search term
  if (filters.search) {
    const searchLower = filters.search.toLowerCase();
    filtered = filtered.filter(product => {
      return (
        product.title.toLowerCase().includes(searchLower) ||
        product.description.toLowerCase().includes(searchLower) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchLower)))
      );
    });
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => {
      const price = parseInt(product.price.replace(/[^\d]/g, ''));
      return price >= min * 1000 && price <= max * 1000;
    });
  }
  
  // Sort products
  if (filters.sortBy) {
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price-low':
          return parseInt(a.price.replace(/[^\d]/g, '')) - parseInt(b.price.replace(/[^\d]/g, ''));
        case 'price-high':
          return parseInt(b.price.replace(/[^\d]/g, '')) - parseInt(a.price.replace(/[^\d]/g, ''));
        case 'newest':
          return b.id - a.id;
        case 'rating':
          return b.featured ? 1 : -1;
        case 'featured':
        default:
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      }
    });
  }
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { products: filtered, total: filtered.length };
};
