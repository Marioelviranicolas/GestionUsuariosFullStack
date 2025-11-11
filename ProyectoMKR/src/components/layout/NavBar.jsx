import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

export default function NavBar() {
  const { user, logout } = useAuth()

  return (
    <nav style={{ background: '#1e3a8a', color: 'white', padding: '10px' }}>
      <Link to="/" style={{ marginRight: '10px', color: 'white' }}>Inicio</Link>
      {!user && <>
        <Link to="/register" style={{ marginRight: '10px', color: 'white' }}>Registro</Link>
        <Link to="/login" style={{ color: 'white' }}>Login</Link>
      </>}
      {user && <>
        <Link to="/dashboard" style={{ marginRight: '10px', color: 'white' }}>Dashboard</Link>
        <Link to="/users" style={{ marginRight: '10px', color: 'white' }}>Usuarios</Link>
        {user.perfil?.nombre === 'ROLE_ADMON' &&
          <Link to="/admin/create" style={{ marginRight: '10px', color: 'white' }}>Crear usuario</Link>
        }
        <button onClick={logout}>Salir</button>
      </>}
    </nav>
  )
}
