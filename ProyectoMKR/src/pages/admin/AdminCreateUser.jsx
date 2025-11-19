import React, { useState, useEffect } from 'react';
import api from '../../api/api';
import './AdminCreateUser.css';
import { useNavigate } from 'react-router-dom';

export default function AdminCreateUser() {
  const navigate = useNavigate();

  // Roles fijos con ID
  const roles = [
    { id: 1, nombre: 'Admin' },
    { id: 2, nombre: 'Cliente' },
    { id: 3, nombre: 'Trabajador' },
    { id: 4, nombre: 'Jefe' }
  ];

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    enabled: 1,
    fechaNacimiento: '',
    direccion: '',
    perfilId: '', // guardamos el id del rol seleccionado
  });

  const [perfiles, setPerfiles] = useState([]); // si quieres seguir cargando desde API, pero ya no lo necesitamos para el select fijo

  useEffect(() => {
    // Si quieres cargar perfiles reales además de los fijos, puedes dejarlo
    api.get('/perfiles')
      .then(res => setPerfiles(res.data))
      .catch(err => console.error('Error al cargar perfiles', err));
  }, []);

  // Maneja cambios en inputs y selects
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Construye el payload con el rol seleccionado
  function buildPayload() {
    const perfilId = formData.perfilId ? Number(formData.perfilId) : 2; // default Cliente
    return {
      username: formData.username,
      password: formData.password,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      enabled: Number(formData.enabled),
      fechaNacimiento: formData.fechaNacimiento || null,
      direccion: formData.direccion,
      perfil: { idPerfil: perfilId }
    };
  }

  // Enviar formulario
  function handleSubmit(e) {
    e.preventDefault();
    if (!formData.username || !formData.password) {
      alert('El username y la password son obligatorios');
      return;
    }

    const payload = buildPayload();
    console.log('Payload a enviar:', payload);

    api.post('/usuarios', payload)
      .then(res => {
        if (res.data === 1) {
          alert('Usuario creado correctamente');
          setFormData({
            username: '',
            password: '',
            nombre: '',
            apellidos: '',
            enabled: 1,
            fechaNacimiento: '',
            direccion: '',
            perfilId: '',
          });
        } else if (res.data === 0) {
          alert('Error al crear el usuario');
        } else if (res.data === -1) {
          alert('El usuario ya existe');
        }
      })
      .catch(err => console.error('Error al crear usuario', err));
  }

  return (
    <div className='cuerpo'>
      <div className="admin-create-user">
        <h1>Crear Usuario</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Username *</label>
            <input type="text" name="username" value={formData.username} onChange={handleChange} />
          </div>
          <div>
            <label>Password *</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} />
          </div>
          <div>
            <label>Nombre</label>
            <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
          </div>
          <div>
            <label>Apellidos</label>
            <input type="text" name="apellidos" value={formData.apellidos} onChange={handleChange} />
          </div>
          <div>
            <label>Enabled</label>
            <select name="enabled" value={formData.enabled} onChange={handleChange}>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </select>
          </div>
          <div>
            <label>Fecha de nacimiento</label>
            <input type="date" name="fechaNacimiento" value={formData.fechaNacimiento} onChange={handleChange} />
          </div>
          <div>
            <label>Dirección</label>
            <input type="text" name="direccion" value={formData.direccion} onChange={handleChange} />
          </div>
          <div>
            <label>Perfil</label>
            <select name="perfilId" value={formData.perfilId} onChange={handleChange}>
              <option value="">--Selecciona un perfil--</option>
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.nombre}</option>
              ))}
            </select>
            <small>Si no seleccionas perfil, se asignará automáticamente "Cliente"</small>
          </div>
          <button type="submit">Crear Usuario</button>
        </form>
        <button type="button" className="volver-btn" onClick={() => navigate('/admin')}>
          Volver a la lista de usuarios
        </button>
      </div>
    </div>
  );
}
