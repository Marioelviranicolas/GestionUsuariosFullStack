import React from 'react'
import { useForm } from 'react-hook-form'
import api from '../api/api'

export default function AdminCreateUser() {
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data) => {
    const payload = {
      username: data.username,
      password: data.password,
      nombre: data.nombre,
      apellidos: data.apellidos,
      enabled: 1,
      perfil: { idPerfil: Number(data.idPerfil) }
    }
    await api.post('/api/usuarios/create', payload)
    alert('Usuario creado correctamente')
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Crear usuario (Admin)</h2>
      <input {...register('nombre')} placeholder="Nombre" />
      <input {...register('apellidos')} placeholder="Apellidos" />
      <input {...register('username')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Contraseña" />
      <select {...register('idPerfil')}>
        <option value="1">Administrador</option>
        <option value="2">Cliente</option>
      </select>
      <button type="submit">Crear</button>
    </form>
  )
}
