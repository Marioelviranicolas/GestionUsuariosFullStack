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

//Funcion del login 
export const loginUser = async (username, password) => {
  try {
    
    //construimos el header basic y lo guardamos
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);
    localStorage.setItem('auth', basicAuth);

    //llamada al backend
    const response = await api.post('/api/usuarios/login');

    return response.data;//devuelve info del usuario
  } catch (error) {
    localStorage.removeItem('auth');
    throw error;
    
  }
}
export default api;
