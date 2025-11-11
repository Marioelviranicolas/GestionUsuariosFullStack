// src/api/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:9001';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: false
});

// interceptores para agregar Authorization desde localStorage
api.interceptors.request.use(config => {
  const auth = localStorage.getItem('auth'); // guardamos auth header raw
  if (auth) {
    config.headers['Authorization'] = auth; // ya debe incluir 'Basic base64(...)'
  }
  return config;
});

export default api;
