// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from 'react';
import api from '../api/api';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  const login = async (username, password) => {
    const token = 'Basic ' + btoa(`${username}:${password}`);
    try {
      const resp = await api.post('/api/usuarios/login', {}, {
        headers: { Authorization: token }
      });
      const userData = resp.data;
      localStorage.setItem('auth', token);
      setUser(userData);
      return { ok: true, data: userData };
    } catch (err) {
      // limpiar auto si hay fallo
      localStorage.removeItem('auth');
      setUser(null);
      const message = err?.response?.data || err.message;
      return { ok: false, error: message };
    }
  };

  const logout = () => {
    localStorage.removeItem('auth');
    setUser(null);
  };

  const register = async (payload) => {
    try {
      const resp = await api.post('/registro', payload);
      return { ok: true, data: resp.data };
    } catch (err) {
      return { ok: false, error: err?.response?.data || err.message };
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};
