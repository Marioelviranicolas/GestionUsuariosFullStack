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

export const uploadProfilePhoto = async (file, username) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    // ✅ Usar el endpoint correcto: /usuarios/{username}/foto
    const response = await api.post(`/usuarios/${username}/foto`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    // ✅ Actualizar localStorage automáticamente
    const perfilGuardado = localStorage.getItem('perfil');
    if (perfilGuardado) {
      const perfil = JSON.parse(perfilGuardado);
      perfil.foto = response.data.foto;
      localStorage.setItem('perfil', JSON.stringify(perfil));
    }

    return response.data; // { message, foto, username }
  } catch (error) {
    console.error('Error al subir foto:', error);
    throw error;
  }
}
export default api;
