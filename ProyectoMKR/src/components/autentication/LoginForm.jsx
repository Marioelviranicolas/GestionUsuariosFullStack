// src/pages/Login.jsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import api,{loginUser} from '../../api/api';
import {useNavigate} from 'react-router-dom';
import "./LoginForm.css";

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');
  const [userType, setUserType] = useState('cliente');
  
  async function onSubmit(data) {
  try {
    setErrorMsg('');
    const usuario = await loginUser(data.username, data.password);
    console.log('Usuario autenticado: ', usuario);
    console.log('Perfil ID:', usuario.perfil?.idPerfil);

    // ✅ Verificar que NO sea administrador
    if (usuario.perfil?.idPerfil === 1) {
      console.log('Es admin, bloqueando acceso');
      setErrorMsg('Los administradores deben usar el panel de administración');
      return; // Detener la ejecución
    }

    // Solo si es cliente (idPerfil === 2)
    if (usuario.perfil?.idPerfil === 2) {
      localStorage.setItem("user", JSON.stringify(usuario));
      alert(`Bienvenido ${usuario?.username || data.username}`);
      navigate('/dashboard');
    } else {
      setErrorMsg('❌ No tienes permisos para acceder como cliente');
    }

  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    setErrorMsg('❌ Credenciales incorrectas');
  }
}
   return (
    <div className="login-box">
      <div className="login-header">
        <span className="admin-badge">Cliente</span>
        <h2>Login cliente</h2>
      </div>

      {errorMsg && (
        <div className="error-message">
          {errorMsg}
        </div>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Usuario</label>
          <input 
            {...register('username', { required: 'El usuario es requerido' })} 
            placeholder="Tu usuario"
          />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div className="input-group">
          <label>Contraseña</label>
          <input 
            type="password" 
            {...register('password', { required: 'La contraseña es requerida' })} 
            placeholder="••••••••"
          />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Iniciando sesión...' : 'Iniciar Sesión'}
        </button>
      </form>

      <div className="divider">
        <span>o</span>
      </div>

      <div className="alternative-link">
        <p>Eres un administrador? <a href="/admin-login">Entra desde aquí</a></p>
      </div>
    </div>
  );
}


/*
  return (
    <div className="login-box">
      <h2>Iniciar sesión</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Usuario</label>
          <input {...register('username', { required: 'Requerido' })} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div className="input-group">
          <label>Contraseña</label>
          <input type="password" {...register('password', { required: 'Requerido' })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>Acceder</button>
      </form>
    </div>
  );
}
  */
 
