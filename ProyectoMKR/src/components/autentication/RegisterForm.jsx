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

        navigate('/LoginForm');
        return;
      }
  
      if (data === -1) {
        setErrorMessage('⚠️ El usuario ya existe, prueba con otro correo.');
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
    <div style={styles.container}>
      <h2 style={styles.title}>Registro de Usuario</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label style={styles.label}>Correo electrónico</label>
          <input
            style={styles.input}
            type="email"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Nombre</label>
          <input
            style={styles.input}
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Apellidos</label>
          <input
            style={styles.input}
            type="text"
            name="apellidos"
            value={formData.apellidos}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Fecha de nacimiento</label>
          <input
            style={styles.input}
            type="date"
            name="fechaNacimiento"
            value={formData.fechaNacimiento}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Dirección</label>
          <input
            style={styles.input}
            type="text"
            name="direccion"
            value={formData.direccion}
            onChange={handleChange}
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Contraseña</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label style={styles.label}>Confirmar contraseña</label>
          <input
            style={styles.input}
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </div>

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button
          type="submit"
          style={{
            ...styles.button,
            backgroundColor: isSubmitting ? '#999' : '#28a745',
            cursor: isSubmitting ? 'not-allowed' : 'pointer'
          }}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Registrando...' : 'Registrarse'}
        </button>
      </form>
    </div>
  );
}

// 🎨 Estilos limpios
const styles = {
  container: {
    maxWidth: '420px',
    margin: '60px auto',
    padding: '25px',
    backgroundColor: '#fff',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    marginBottom: '25px',
    color: '#333'
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  formGroup: {
    marginBottom: '15px'
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    display: 'block',
    color: '#444'
  },
  input: {
    width: '100%',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    fontSize: '14px'
  },
  error: {
    color: 'red',
    fontSize: '13px',
    textAlign: 'center',
    marginTop: '10px'
  },
  button: {
    border: 'none',
    color: 'white',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '5px',
    transition: 'background 0.3s'
  }
};
