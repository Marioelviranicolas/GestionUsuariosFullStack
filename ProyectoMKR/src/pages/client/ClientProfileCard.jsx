import React, { useState, useEffect } from 'react';
import './ClientProfileCard.css';
import { uploadProfilePhoto } from '../../api/api';


export default function ClientProfileCard() {
  const [userData, setUserData] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);

 useEffect(() => {
  const savedUser = localStorage.getItem("user");

  if (savedUser) {
    try {
      const parsed = JSON.parse(savedUser);

      // Evitar {} vacío
      if (parsed && Object.keys(parsed).length > 0) {
        setUserData(parsed);
        setProfileImage(parsed.foto || null);
      }
    } catch (err) {
      console.error("Error parsing user:", err);
    }
  }
}, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  //  NUEVO  — Botón para subir foto al backend
  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Selecciona una imagen primero");
      return;
    }

    try {
      const response = await uploadProfilePhoto(selectedFile, userData.username);

      // Actualizar tarjeta en pantalla
      setProfileImage(response.foto);

      // Guardar también en localStorage
      const updatedUser = { ...userData, foto: response.foto };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUserData(updatedUser);

      alert("Foto actualizada correctamente");
    } catch (e) {
      console.error("Error subiendo imagen:", e);
      alert("Hubo un error al subir la foto");
    }
  };

  if (!userData || Object.keys(userData).length === 0) {
  return <div className="loading">Cargando datos...</div>;
}

  // Obtener iniciales para el avatar por defecto
  const getInitials = () => {
    const nombre = userData.nombre || '';
    const apellidos = userData.apellidos || '';
    return `${nombre.charAt(0)}${apellidos.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="profile-card">
      <div className="profile-header">
        <div className="profile-image-container">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="profile-image" />
          ) : (
            <div className="profile-avatar">
              {getInitials()}
            </div>
          )}
          <label htmlFor="upload-photo" className="upload-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
              <circle cx="12" cy="13" r="4"></circle>
            </svg>
          </label>
          <input
            id="upload-photo"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }}
          />
        </div>
        
        <div className="profile-name">
          <h2>{userData.nombre} {userData.apellidos}</h2>
          <span className="profile-badge">Cliente</span>
        </div>
      </div>

      <div className="profile-divider"></div>

      <div className="profile-info">
        <div className="info-group">
          <label>Correo electrónico</label>
          <p>{userData.username}</p>
        </div>

        <div className="info-group">
          <label>Fecha de nacimiento</label>
          <p>{userData.fechaNacimiento || 'No especificada'}</p>
        </div>

        <div className="info-group">
          <label>Dirección</label>
          <p>{userData.direccion}</p>
        </div>
      </div>

      {/*  BOTÓN NUEVO  */}
      {selectedFile && (
          <button className="save-photo-btn" onClick={handleUpload}>
            Editar Perfil
          </button>
        )}
    </div>
  );
}