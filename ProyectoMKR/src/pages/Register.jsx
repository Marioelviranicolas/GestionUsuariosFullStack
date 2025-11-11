
import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const { register: registerUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
      nombre: data.nombre,
      apellidos: data.apellidos,
      enabled: 1,
      perfil: { idPerfil: 2 } 
    };
    const res = await registerUser(payload);
    if (res.ok) {
      alert('Registrado correctamente. Haz login.');
      navigate('/login');
    } else {
      alert('Error: ' + JSON.stringify(res.error));
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Usuario (email)</label>
          <input {...register('username', { required: 'Requerido', pattern: { value: /^\S+@\S+$/i, message: 'Email inválido' }})} />
          {errors.username && <p>{errors.username.message}</p>}
        </div>

        <div>
          <label>Contraseña</label>
          <input type="password" {...register('password', { required: 'Requerido', minLength: { value: 8, message: 'Mín 8 caracteres' } })} />
          {errors.password && <p>{errors.password.message}</p>}
        </div>

        <div>
          <label>Nombre</label>
          <input {...register('nombre',{ required: 'Requerido' })} />
          {errors.nombre && <p>{errors.nombre.message}</p>}
        </div>

        <button type="submit" disabled={isSubmitting}>Registrarse</button>
      </form>
    </div>
  );
}
