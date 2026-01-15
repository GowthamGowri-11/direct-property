// API Service - Axios configuration and API calls
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL
});

// Property API calls
export const propertyAPI = {
  getAll: () => api.get('/properties'),
  getById: (id) => api.get(`/properties/${id}`),
  create: (formData) => api.post('/properties', formData),
  update: (id, formData) => api.put(`/properties/${id}`, formData),
  delete: (id) => api.delete(`/properties/${id}`),
  getStatistics: () => api.get('/properties/statistics')
};

// User API calls
export const userAPI = {
  register: (userData) => api.post('/users/register', userData),
  login: (credentials) => api.post('/users/login', credentials),
  getById: (id) => api.get(`/users/${id}`),
  getAll: () => api.get('/users'),
  delete: (id) => api.delete(`/users/${id}`),
  getDashboard: (id) => api.get(`/users/dashboard/${id}`),
  toggleFavorite: (data) => api.put('/users/favorite', data),
  update: (id, userData) => api.put(`/users/${id}`, userData)
};

// Admin API calls
export const adminAPI = {
  login: (credentials) => api.post('/admin/login', credentials),
  create: (adminData) => api.post('/admin/create', adminData),
  getTotalUsers: () => api.get('/admin/users/count')
};

export default api;
