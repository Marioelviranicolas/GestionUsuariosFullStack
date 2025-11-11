// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AdminCreateUser from './pages/AdminCreateUser';
import ProtectedRoute from './components/ProtectedRoute';
import RoleGuard from './components/RoleGuard';
import NavBar from './components/NavBar';
import UsersList from './pages/UsersList';

export default function App(){
  return (
    <AuthProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<h2>Home público</h2>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute><UsersList /></ProtectedRoute>} />

          <Route path="/admin/create" element={
            <RoleGuard expectedRole="ROLE_ADMON">
              <AdminCreateUser />
            </RoleGuard>
          } />

          <Route path="*" element={<h2>404 - Not found</h2>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
