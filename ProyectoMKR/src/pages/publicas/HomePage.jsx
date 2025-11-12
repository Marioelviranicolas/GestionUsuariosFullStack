import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="homepage-container">
      {/* Botones arriba */}
      <div className="homepage-buttons">
        <Link to="/login" className="btn btn-login">
          Iniciar Sesión
        </Link>
        <Link to="/register" className="btn btn-register">
          Registrarse
        </Link>
      </div>

      {/* Texto debajo */}
      <div className="homepage-text">
        <h1 className="homepage-title">Proyecto de Gestión de Usuarios</h1>
        <p className="homepage-subtitle">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Integer nec odio. Praesent libero. Sed cursus ante dapibus diam.
        </p>
      </div>
    </div>
  );
}

export default HomePage;
