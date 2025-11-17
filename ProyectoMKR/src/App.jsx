import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/publicas/HomePage';
import LoginPage from './pages/publicas/LoginPage';
import RegisterPage from './pages/publicas/RegisterPage';
import AdminCreateUser from './pages/admin/AdminCreateUser';
import AdminLoginPage from './pages/publicas/AdminLoginPage';
import Dashboard from './pages/client/Dashboard';
import UsersList from './pages/admin/UsersList';



function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admin" element={<UsersList />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/admin-login" element={<AdminLoginPage />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
