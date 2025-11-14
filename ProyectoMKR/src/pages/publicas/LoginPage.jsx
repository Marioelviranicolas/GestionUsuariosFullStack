import React from "react";
import LoginForm from "../../components/autentication/LoginForm";
import "./LoginPage.css"; // si quieres aplicarle un CSS

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-container">
        <LoginForm />
      </div>
    </div>
  );
}