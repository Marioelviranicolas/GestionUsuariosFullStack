import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { loginUser } from '../../api/api';
import { useNavigate, Link } from 'react-router-dom';
import "../autentication/LoginForm.css"; // Usa el mismo CSS

export default function AdminLoginForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();
  const [errorMsg, setErrorMsg] = useState('');

  const onSubmit = async (data) => {
    try {
          setErrorMsg('');
          const usuario = await loginUser(data.username, data.password);
          console.log('Usuario autenticado: ', usuario);
    
          alert(`Bienvenido ${usuario?.username || data.username}`);
    
          if (usuario.perfil?.idPerfil == 1) {
            navigate('/admin'); //te mande a administrador
          } else {
            navigate('/dashboard'); //te manda a cliente
          }
    
        } catch (error) {
          console.error('Error al iniciar sesion:', error);
          alert('Credenciales incorrectas');
        }
      }
    
  return (
    <div className="login-box">
      <div className="login-header">
        <span className="admin-badge">Admin</span>
        <h2>Panel de Administración</h2>
        <p>Acceso exclusivo para administradores</p>
      </div>

      {errorMsg && (
        <div className="error-message">
          {errorMsg}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-group">
          <label>Usuario Administrador</label>
          <input 
            {...register('username', { required: 'El usuario es requerido' })} 
            placeholder="admin"
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
          {isSubmitting ? 'Verificando acceso...' : 'Acceder como Admin'}
        </button>
      </form>

      <div className="divider">
        <span>o</span>
      </div>

      <div className="alternative-link">
        <p>¿Eres cliente? <Link to="/login">Volver al login normal</Link></p>
      </div>
    </div>
  );
}