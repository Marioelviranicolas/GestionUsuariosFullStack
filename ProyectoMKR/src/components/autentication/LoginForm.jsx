// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import api from '../../api/api';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    try {
      // construimos el header Basic base64(user:pass)
      const basicAuth = 'Basic ' + btoa(`${data.username}:${data.password}`);
      localStorage.setItem('auth', basicAuth); // lo guardamos

      // llamamos al backend
      const response = await api.post('/api/usuarios/login');
      console.log('Usuario autenticado:', response.data);

      alert(`Bienvenido ${response.data.username || data.username}`);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Credenciales incorrectas');
      localStorage.removeItem('auth'); // limpiar si falla
    }
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario</label>
          <input {...register('username', { required: 'Requerido' })} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" {...register('password', { required: 'Requerido' })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <button type="submit" disabled={isSubmitting}>Acceder</button>
      </form>
    </div>
  );
}
