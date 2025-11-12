import { Link } from 'react-router-dom';
import './HomePage.css'; // 👈 Import del CSS local

function HomePage() {
  return (
    <div className="homepage-container">
      <h1 className="homepage-title">Proyecto de Gestión de Usuarios</h1>
      <p className="homepage-subtitle">
        Administra usuarios y roles de manera fácil y segura
      </p>

      <div className="homepage-buttons">
        <Link to="/login" className="btn btn-login">
          Iniciar Sesión
        </Link>

        <Link to="/register" className="btn btn-register">
          Registrarse
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
