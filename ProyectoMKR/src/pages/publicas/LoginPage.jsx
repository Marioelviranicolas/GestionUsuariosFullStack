import React from "react";
import LoginForm from "../../components/autentication/LoginForm";
//import "../../styles/login.css"; // si quieres aplicarle un CSS

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <h1>Sistema de Gestión de Usuarios</h1>
        <LoginForm />
      </div>
    </div>
  );
}