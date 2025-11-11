import React, { useEffect, useState } from 'react'
import api from '../../api/api'

export default function UsersList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/todos').then(res => setUsers(res.data))
  }, [])

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <ul>
        {users.map(u => (
          <li key={u.idUsuario}>
            {u.nombre} ({u.username}) - {u.perfil?.nombre}
          </li>
        ))}
      </ul>
    </div>
  )
}
