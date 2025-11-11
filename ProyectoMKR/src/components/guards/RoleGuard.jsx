import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../../Context/AuthContext'

export default function RoleGuard({ expectedRole, children }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" />
  if (user.perfil?.nombre !== expectedRole) return <Navigate to="/" />
  return children
}
