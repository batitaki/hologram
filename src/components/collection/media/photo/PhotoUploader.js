import React, { useState } from "react";
import { uploadMedia } from "../../../../services/mediaAPI";

const PhotoUploader = ({ isLoggedIn, userData, onPhotoUpload }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [showFileInput, setShowFileInput] = useState(false);

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
        window.location.reload(); // Recargar la página después de que se haya subido la foto
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

  return (
    <div className="image-uploader">
      {uploadStatus ? (
        <p>{uploadStatus}</p>
      ) : (
        <div>
          {isLoggedIn && !showFileInput && (
            <button className="button-image-uploader" onClick={handleShowFileInput}>
              POST PHOTO
            </button>
          )}
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