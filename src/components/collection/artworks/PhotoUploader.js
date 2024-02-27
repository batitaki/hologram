import React, { useState } from "react";
import { uploadMedia } from "../../../services/mediaAPI";

const PhotoUploader = ({ isLoggedIn, userData }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false); // Nuevo estado para controlar la edición del perfil

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Por favor selecciona un archivo");
      return;
    }

    const formData = new FormData();
    formData.append("Image", selectedFile);
    formData.append("UserID", userData ? userData.ID : null);

    try {
      const response = await uploadMedia(formData);
      if (response.success) {
        setUploadStatus("¡Foto subida exitosamente!");
      } else {
        setUploadStatus("Error al subir la foto");
      }
    } catch (error) {
      console.error("Error uploading photo:", error);
      setUploadStatus("Error al subir la foto");
    }
  };

  const handleShowFileInput = () => {
    setShowFileInput(true);
  };

  const handleEditProfile = () => {
    setIsEditingProfile(true); // Cambiar a true cuando se hace clic en "Editar perfil"
  };

  return (
    <div className="image-uploader">
      {uploadStatus ? (
        <p>{uploadStatus}</p>
      ) : (
        <div>
          {isLoggedIn && !showFileInput && (
            <div>
              <button className="button-edit-profile" onClick={handleEditProfile}>
                Editar perfil
              </button>
              {/* Renderizar iconos de lápiz cuando se está editando el perfil */}
              {isEditingProfile && (
                <div className="edit-icons">
                  <span className="edit-icon">✏️ Nombre</span>
                  <span className="edit-icon">✏️ Descripción</span>
                  {/* Agregar más campos editables según sea necesario */}
                </div>
              )}
            </div>
          )}
          {/* Renderizar campo de carga de foto cuando se está editando el perfil */}
          {showFileInput && (
            <div>
              <input className="input-image-uploader" type="file" onChange={handleFileChange} />
              <button className="button-image-uploader" onClick={handleUpload}>
                POST PHOTO
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoUploader;
