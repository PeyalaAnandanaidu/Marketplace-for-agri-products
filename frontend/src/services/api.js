// marketplace/frontend/src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://marketplace-for-agri-products-backend.onrender.com/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Named exports for all API functions
export const fetchProducts = () => api.get('/products');
export const fetchProductById = (id) => api.get(`/products/${id}`);
export const createProduct = (productData) => api.post('/products', productData);
export const updateProduct = (id, productData) => api.patch(`/products/${id}`, productData);
export const deleteProduct = (id) => api.delete(`/products/${id}`);

// Default export still available if needed
export default api;
