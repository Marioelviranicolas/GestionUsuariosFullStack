// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = data => {
    console.log('Datos del formulario:', data);
    alert(`Login simulado: ${data.username}`);
  };

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
