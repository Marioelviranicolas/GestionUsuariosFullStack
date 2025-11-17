// src/pages/publicas/RegisterPage.jsx
import React from "react";
import RegisterForm from "../../components/autentication/RegisterForm";
import "./RegisterPage.css"; // si luego quieres estilos globales

export default function RegisterPage() {
  return (
    <div className="register-page">
      <div className="register-container">
        <RegisterForm />
      </div>
    </div>
  );
}
