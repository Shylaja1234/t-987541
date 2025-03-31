
import axios from 'axios';
import { Category } from '@/data/products';

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

// Function to fetch all categories
export const fetchCategories = async () => {
  try {
    const response = await apiClient.get('/api/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

// Function to fetch a single category by ID
export const fetchCategoryById = async (id: string) => {
  try {
    const response = await apiClient.get(`/api/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, error);
    throw error;
  }
};

// Mock implementation that uses local data
export const fetchCategoriesMock = async () => {
  // Import the categories data
  const { categories } = await import('@/data/products');
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return categories;
};
