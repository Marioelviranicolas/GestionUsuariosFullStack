import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './UsersList.css';
import { Link, useNavigate } from "react-router-dom";


export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});
  const navigate = useNavigate();

  // Cargar usuarios al inicio
  useEffect(() => {
    api.get('/todos')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error al cargar usuarios', err));
  }, []);

  // Eliminar usuario
  const handleDelete = (username) => {
    if (window.confirm('¿Estás seguro que quieres eliminar este usuario?')) {
      api.delete(`/usuarios/${encodeURIComponent(username)}`)
        .then(res => {
          if (res.data === 1) {
            setUsers(prev => prev.filter(u => u.username !== username));
          } else {
            console.log('No se pudo eliminar el usuario');
          }
        })
        .catch(err => console.error('Error al eliminar usuario', err));
    }
  };

  // Preparar edición
  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setEditData({
      nombre: usuario.nombre || '',
      apellidos: usuario.apellidos || '',
      enabled: usuario.enabled ?? 1,
      perfilId: usuario.perfil?.id_perfil ??"",
      direccion: usuario.direccion  || '',
      fechaNacimiento: usuario.fechaNacimiento || ''
    });
  };

  // Actualizar valores del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  // Guardar cambios
  const handleSave = () => {
    if (!editingUser) return;

    const payload = {
      nombre: editData.nombre,
      apellidos: editData.apellidos,
      enabled: Number(editData.enabled),
      idPerfil: editData.perfilId ? Number(editData.perfilId) : null,
      direccion: editData.direccion,
      fechaNacimiento: editData.fechaNacimiento
    };
    console.log('Payload enviado al backend',payload);

    api.put(`/usuarios/${encodeURIComponent(editingUser.username)}`, payload)
    .then(res => {
      setUsers(prev =>
        prev.map(u =>
          u.username === editingUser.username
            ? { ...u, ...payload, perfil: payload.perfil || u.perfil }
            : u
        )
      );

      // Limpiamos el estado de edición
      setEditingUser(null);
      setEditData({});
    })
      .catch(err => console.error('Error al actualizar usuario', err));
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditData({});
  };

  const handleLogout = () => {
    navigate('/');  
  }

  return (
    <div className="users-page">

        
      <div className="users-list-container">
      <button className="logout-floating" onClick={handleLogout}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="40" 
            height="20" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="white" 
            strokeWidth="2"
            strokeLinecap="round" 
            strokeLinejoin="round"
            style={{ marginRight: "8px" }}
          >
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="6" y2="12" />
          </svg>
        </button>
        <h2 className="users-title">Lista de usuarios</h2>
  
        <div className="create-button">
          <Link to="/admin/create-user" className="btn-create">
            Crear usuario
          </Link>
        </div>

        <ul className="users-list">
          {users.map(u => (
            <li key={u.idUsuario ?? u.username} className="user-item">
  
              {/* MODO EDICIÓN */}
              {editingUser?.username === u.username ? (
                <div className="edit-form">
  
                  <input
                    type="text"
                    name="nombre"
                    className="edit-input"
                    value={editData.nombre}
                    onChange={handleChange}
                    placeholder="Nombre"
                  />
  
                  <input
                    type="text"
                    name="apellidos"
                    className="edit-input"
                    value={editData.apellidos}
                    onChange={handleChange}
                    placeholder="Apellidos"
                  />
  
                  <select
                    name="enabled"
                    className="edit-input"
                    value={editData.enabled ?? 1}
                    onChange={handleChange}
                  >
                    <option value={1}>Activo</option>
                    <option value={0}>Inactivo</option>
                  </select>
  
                  <input
                    type="text"
                    name="direccion"
                    className="edit-input"
                    value={editData.direccion}
                    onChange={handleChange}
                    placeholder="Dirección"
                  />
  
                  <input
                    type="date"
                    name="fechaNacimiento"
                    className="edit-input"
                    value={editData.fechaNacimiento}
                    onChange={handleChange}
                  />
  
                  <select
                    name="perfilId"
                    className="edit-input"
                    value={editData.perfilId ?? ''}
                    onChange={handleChange}
                  >
                    <option value="">Selecciona un perfil</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Cliente</option>
                    <option value={3}>Empleado</option>
                    <option value ={4}>Jefe</option>
                  </select>
  
                  <div className="edit-actions">
                    <button className="btn-save" onClick={handleSave}>Guardar</button>
                    <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
                  </div>
                </div>
  
              ) : (
  
                /* MODO NORMAL */
                <div className="user-card">
                  <div className="user-avatar">
                    {u.foto ? (
                      <img src={u.foto} alt={`${u.nombre} ${u.apellidos}`} className="avatar-image" />
                    ) : (
                      <div className="avatar-initials">
                        {u.nombre.charAt(0)}{u.apellidos.charAt(0)}
                      </div>
                    )}
                  </div>

                  <div className="user-info">
                    <p className="user-name">{u.nombre} {u.apellidos}</p>
                    <p className="user-role">{u.perfil?.nombre || "Cliente"}</p>
                  </div>

                  <div className="card-actions">
                    <button className="btn-edit" onClick={() => handleEdit(u)}>Editar</button>
                    <button className="btn-delete" onClick={() => handleDelete(u.username)}>Eliminar</button>
                  </div>

                </div>
              )}
  
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
  
}
