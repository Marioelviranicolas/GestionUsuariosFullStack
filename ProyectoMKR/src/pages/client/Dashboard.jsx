import React from 'react'
import { useAuth } from '../../Context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div>
      <h2>Dashboard</h2>
      <p>Bienvenido {user?.nombre}</p>
      <p>Correo: {user?.username}</p>
      <p>Rol: {user?.perfil?.nombre}</p>
    </div>
  )
}
