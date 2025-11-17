import React,{useState,useEffect} from 'react'
import api from '../../api/api'
import './AdminCreateUser.css'
import { useNavigate } from 'react-router-dom';

export default function AdminCreateUser(){
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    nombre: '',
    apellidos: '',
    enabled: 1,
    fechaNacimiento: '',
    direccion: '',
    perfilId: '',
  });
  
  const [perfiles, setPerfiles] = useState([]);

  // Cargar los perfiles para el dropdown
  useEffect(() => {
    api.get('/perfiles') // supongamos que esta ruta devuelve todos los perfiles
      .then(res => setPerfiles(res.data))
      .catch(err => console.error('Error al cargar perfiles', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!formData.username || !formData.password){
      alert('El username y la password son obligatorios');
      return;
    }
    // Ajustar enabled a número
    const payload = {
      username: formData.username,
      password: formData.password,
      nombre: formData.nombre,
      apellidos: formData.apellidos,
      enabled: Number(formData.enabled),
      fechaNacimiento: formData.fechaNacimiento || null,
      direccion: formData.direccion,
      // Enviar perfil solo si se selecciona
      perfil: formData.perfilId ? { idPerfil: Number(formData.perfilId) } : null
    };
    api.post('/registro', payload)
      .then(res => {
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
      })
      .catch(err => console.error('Error al crear usuario', err));
  };
   return (
    <div className="admin-create-user">
      <h1>Crear Usuario</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username *</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange}  />
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
            {perfiles.map(p => (
              <option key={p.id_perfil} value={p.id_perfil}>{p.nombre}</option>
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
  );
}