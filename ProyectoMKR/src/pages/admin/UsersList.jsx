import React, { useEffect, useState } from 'react';
import api from '../../api/api';
import './UsersList.css';
import { Link } from "react-router-dom";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    api.get('/todos/exceptUsers')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Error al cargar usuarios', err));
  }, []);

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

  const handleEdit = (usuario) => {
    setEditingUser(usuario);
    setEditData({
      nombre: usuario.nombre || '',
      apellidos: usuario.apellidos || '',
      enabled: usuario.enabled || 1,
      perfilId: usuario.perfil?.id_perfil || ''
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
  if (!editingUser) return;

  const payload = {
    nombre: editData.nombre,
    apellidos: editData.apellidos,
    enabled: editData.enabled,
    perfil: editData.perfilId ? { idPerfil: Number(editData.perfilId) } : null
  };

  api.put(`/usuarios/${encodeURIComponent(editingUser.username)}`, payload)
    .then(res => {
      // Actualizamos la lista de usuarios localmente
      setUsers(prev =>
        prev.map(u =>
          u.username === editingUser.username
            ? { ...u, ...payload, perfil: payload.perfil ? { id_perfil: payload.perfil.idPerfil, nombre: res.data.perfilNombre || u.perfil?.nombre } : null }
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
    <div>
      <h2>Lista de usuarios</h2>
      <div className="create-button">
        <Link to="/admin/create-user" className="create-button">
          Crear usuario
        </Link>
      </div>
      <ul>
        {users.map(u => (
          <li key={u.idUsuario}>
            {editingUser?.username === u.username ? (
              <div className="edit-form">
                <input
                  type="text"
                  name="nombre"
                  value={editData.nombre}
                  onChange={handleChange}
                  placeholder="Nombre"
                />
                <input
                  type="text"
                  name="apellidos"
                  value={editData.apellidos}
                  onChange={handleChange}
                  placeholder="Apellidos"
                />
                <select name="enabled" value={editData.enabled} onChange={handleChange}>
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
                <select name="perfilId" value={editData.perfilId} onChange={handleChange}>
                  <option value="">--Selecciona un perfil--</option>
                  <option value={1}>Admin</option>
                  <option value={2}>Cliente</option>
                  <option value={3}>Empleado</option>
                </select>
                <button onClick={handleSave}>Guardar</button>
                <button onClick={handleCancel}>Cancelar</button>
              </div>
            ) : (
              <div className="user-info">
                {u.nombre} ({u.username}) - {u.perfil?.nombre || 'Cliente'}
                <div className="actions">
                  <button onClick={() => handleEdit(u)}>Editar</button>
                  <button onClick={() => handleDelete(u.username)}>Eliminar</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
