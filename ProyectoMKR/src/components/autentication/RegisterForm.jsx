import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/AuthContext';

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useContext(AuthContext);

  // 🧠 Estado del formulario
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    nombre: '',
    apellidos: '',
    fechaNacimiento: '',
    direccion: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // 🔄 Manejar los cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 🚀 Enviar formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    const { username, password, confirmPassword, nombre, apellidos, fechaNacimiento, direccion } = formData;

    // ✅ Validaciones
    if (!username.includes('@') || !username.includes('.')) {
      setErrorMessage('El correo debe contener "@" y un punto.');
      return;
    }

    if (password.length < 4) {
      setErrorMessage('La contraseña debe tener al menos 4 caracteres.');
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage('Las contraseñas no coinciden.');
      return;
    }

    // 📦 Datos que espera tu backend (según UsuarioServiceImpl)
    const usuario = {
      username,
      password,
      nombre,
      apellidos,
      fechaNacimiento,
      direccion,
      perfil: { idPerfil: 2 } // ROLE_CLIENTE
    };


    try {
      setIsSubmitting(true);
      const { ok, data, error } = await register(usuario);
    
      if (data === 1) {
        alert('✅ Usuario registrado con éxito');
        console.log('📤 Enviando datos al backend:', usuario);

        navigate('/login');
        return;
      }
  
      if (data === -1) {
        setErrorMessage('⚠️ El usuario ya existe, prueba con otro correoo.');
        return;
      }
  
      setErrorMessage('❌ Error desconocido al registrar el usuario.');
    } catch (err) {
      console.error('❌ Error en la solicitud:', err);
      setErrorMessage('Error al comunicarse con el servidor.');
    } finally {
      setIsSubmitting(false);
    }
  };    

 return (
    <div className="register-form-container">
      <h2 className="register-form-title">Registro de Usuario</h2>

      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label className="form-label">Correo electrónico</label>
          <input
            className="form-input"
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Nombre</label>
          <input
            className="form-input"
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Apellidos</label>
          <input
            className="form-input"
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Fecha de nacimiento</label>
          <input
            className="form-input"
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Dirección</label>
          <input
            className="form-input"
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label className="form-label">Contraseña</label>
          <input
            className="form-input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label">Confirmar contraseña</label>
          <input
            className="form-input"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p className="form-error">{errorMessage}</p>}

        <button
          type="submit"
          className={`form-button ${isSubmitting ? 'form-button-disabled' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}
