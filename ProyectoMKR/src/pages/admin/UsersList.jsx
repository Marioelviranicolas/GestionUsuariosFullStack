import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './UsersList.css';
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});

  // Cargar usuarios al inicio
  useEffect(() => {
    api.get('/todos/exceptUsers')
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
      perfilId: usuario.perfil?.id_perfil ?? null,
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
      perfil: editData.perfilId ? { idPerfil: Number(editData.perfilId) } : null,
      direccion: editData.direccion,
      fechaNacimiento: editData.fechaNacimiento
    };

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

  return (
    <div className="users-page">
      <div className="users-list-container">
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
                    <option value="">--Selecciona un perfil--</option>
                    <option value={1}>Admin</option>
                    <option value={2}>Cliente</option>
                    <option value={3}>Empleado</option>
                  </select>
  
                  <div className="edit-actions">
                    <button className="btn-save" onClick={handleSave}>Guardar</button>
                    <button className="btn-cancel" onClick={handleCancel}>Cancelar</button>
                  </div>
                </div>
  
              ) : (
  
                /* MODO NORMAL */
                <div className="user-info">
                  <span className="user-text">
                    {u.nombre} ({u.username}) — {u.perfil?.nombre || 'Cliente'}
                  </span>
  
                  <div className="actions">
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