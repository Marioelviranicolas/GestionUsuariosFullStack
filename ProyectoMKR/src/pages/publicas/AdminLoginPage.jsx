import React, { useState } from 'react'; // <-- Añade esto
import AdminLoginForm from "../../components/autentication/AdminLoginForm";
import "./LoginPage.css"; // Usa el mismo CSS

export default function AdminLoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <AdminLoginForm />
      </div>
    </div>
  );
}