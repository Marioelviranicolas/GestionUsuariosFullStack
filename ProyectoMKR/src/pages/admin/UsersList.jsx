import React, { useEffect, useState } from 'react'
import api from '../../api/api'
import './UsersList.css'
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    api.get('/todos/exceptUsers').
        then(res => setUsers(res.data)).
        catch(err => console.error('Error al cargar usuarios',err))
   }, [])

   const handleDelete = (username) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este usuario?')){
      api.delete(`/usuarios/${encodeURIComponent(username)}`)
      .then(res =>{
        console.log('Respuesta de la API:', res.data)
        if (res.data === 1) {
          console.log('Usuario eliminado correctamente')
          setUsers(prevUsers => prevUsers.filter(u => u.username !== username))
        } else {
          console.log('No se pudo eliminar el usuario')
        }
      })
      .catch(err => console.error('Error al eliminar usuario',err))
    }
   }
   const handleEdit = (usuario) => {
    console.log('de momento nada',usuario);

   }

  return (
    <div>
      <h2>Lista de usuarios</h2>
      <div className="create-button">
        <Link to="/admin/create-user">
            <button>Crear usuario</button>
        </Link>
      </div>
      <ul>
        {users.map(u => (
          <li key={u.idUsuario}>
            <div>
              {u.nombre} ({u.username}) - {u.perfil?.nombre}
            </div>
            <div className="actions">
              <button onClick={()=> handleEdit(u)}>Editar</button>
              <button onClick={()=> handleDelete(u.username)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
