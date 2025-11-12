// src/pages/Login.jsx
import React from 'react';
import { useForm } from 'react-hook-form';
import api,{loginUser} from '../../api/api';
import {useNavigate} from 'react-router-dom';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {

        const usuario = await loginUser(data.username, data.password);
        console.log('Usuario autenticado: ',usuario);

        alert(`Bienvenido ${usuario?.username || data.username}`);

        if(usuario.perfil?.idPerfil==1){
          navigate('/admin');//te mande a administrador
        }else{
          navigate('/dashboard');//te manda a cliente
        }

    } catch (error) {
        console.error('Error al iniciar sesion:',error);
        alert('Credenciales incorrectas');
    }
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
