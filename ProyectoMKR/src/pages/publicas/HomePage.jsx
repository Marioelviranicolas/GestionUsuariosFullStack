import React from "react";
import { Link } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const scrollToInfo = () => {
    document.getElementById('info')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="homepage-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="homepage-text">
          <h1 className="homepage-title">Página de gestión de usuarios </h1>
          <p className="homepage-subtitle">
            Proyecto de FullStack para las asignaturas Cliente/Servidor.
          </p>
        </div>

        <div className="homepage-buttons">
          <div className="card">
            <h2>Acceder</h2>
            <p>¿Ya tienes una cuenta? Inicia sesión para acceder al panel de control</p>
            <Link to="/login" className="btn btn-login">
              Iniciar Sesión
            </Link>
          </div>

          <div className="card">
            <h2>Registrarse</h2>
            <p>Crea tu cuenta y gestiona tu perfil: revisa tus datos y cambia tu avatar cuando quieras.</p>
            <Link to="/register" className="btn btn-register">
              Comenzar Ahora
            </Link>
          </div>
        </div>

        <div className="scroll-indicator" onClick={scrollToInfo}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Info Section */}
      <section className="info-section" id="info">
        <div className="info-content">
          <div className="info-header">
            <h2>¿Qué hace nuestra plataforma?</h2>
            <p className="info-subtitle">
              Una solución completa para la gestión de usuarios, control de accesos e identidades digitales
            </p>
          </div>

          <div className="info-text-container">
            <div className="info-sidebar"></div>
            <div className="info-text">
              <p>
                Es una web para <strong>gestionar usuarios</strong> donde puedes registrarte, 
                iniciar sesión y acceder a diferentes páginas según tus <strong>permisos</strong>. 
                Cada usuario tiene un rango que determina a qué puede acceder.
              </p>
            </div>
          </div>
        </div>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
        <div className="info-content-permisos">
          <div className="info-header-permisos">
            <h2>Sistema de permisos</h2>
          </div>

          <div className="info-text-container-permisos">
            <div className="info-sidebar-permisos"></div>
            <div className="info-text-permisos">
              <p>
                Cuando te registras, <strong>no tienes permisos especiales</strong> por defecto. 
                Solo los <strong>administradores</strong> pueden crear nuevos usuarios y asignarles 
                los permisos que necesiten para acceder a las diferentes secciones.
              </p>
            </div>
          </div>
        </div>
            <div className="scroll-indicator2" onClick={() => {
      document.getElementById('funcionalidades')?.scrollIntoView({ 
        behavior: 'smooth' 
      });
    }}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
      </svg>
    </div>
 
        {/* Feature Card */}

        <div className="info-content-funcionalidades" id="funcionalidades">
          <div className="info-header-funcionalidades">
            <h2>Funcionalidades Principales</h2>
          </div>
          </div>
        <div className="main-feature-card">
          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Control de Accesos</h3>
              <p>Sistema de permisos por rangos que controla qué páginas puede ver cada usuario</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Gestión de Usuarios</h3>
              <p>Registra usuarios, gestiona sus datos y asigna permisos de forma sencilla</p>
            </div>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
              </svg>
            </div>
            <div className="feature-content">
              <h3>Panel Admin</h3>
              <p>Los administradores pueden crear usuarios y asignar permisos directamente</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;