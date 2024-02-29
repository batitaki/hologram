import React, { useState , useEffect} from "react";
import "./UserProfile.css";
import pencilIcon from "../../assets/pencil-icon.png";
import { editUserProfile } from "../../services/usersAPI"; // Importa la función para editar el perfil
import PhotoUploader from "../collection/media/PhotoUploader";
import MediaPhotos from "../collection/media/MediaPhotos";
import DragDrop from "../collection/media/dragAndDrop/DragDrop";
import DragAndDropProvider from "../collection/media/dragAndDrop/DragAndDropProvider";

function UserProfile({ isLoggedIn, userData, setUserData }) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");

  console.log(userData)

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem("userData", JSON.stringify(userData));
  }, [userData]);

  const handleEditPhoto = () => {
    setIsEditingPhoto(true);
  };

  const handleEditName = () => {
    setIsEditingName(true);
  };

  const handleEditBio = () => {
    setIsEditingBio(true);
  };

  const handlePhotoChange = (event) => {
    setNewPhoto(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleBioChange = (event) => {
    setNewBio(event.target.value); // Cambiar el valor de la biografía
  };

  const handleSubmit = async () => {
    const userId = userData.ID;
    const token = localStorage.getItem("token");
  
    const formData = {
      Username: newName || userData.Username,
      Bio: newBio || userData.Bio,
      Image: newPhoto || userData.Image,
    };
  
    const response = await editUserProfile(userId, formData, token);
    if (response.success) {
      console.log("Perfil de usuario actualizado correctamente");
      setUserData((prevUserData) => ({ ...prevUserData, ...formData }));
      localStorage.setItem("userData", JSON.stringify(userData));
      // Actualiza el estado de la bio
      setNewBio(formData.Bio);
    } else {
      console.error("Error al actualizar el perfil del usuario");
    }
    setIsEditingName(false);
    setIsEditingBio(false)
  };
  return (
    <>
      <div className="profile">
        {isLoggedIn && userData && (
          <div className="profile-container">
            <div className="bio-username">
              <div className="username-container">
                {isEditingName ? (
                  <input
                    type="text"
                    value={newName}
                    onChange={handleNameChange}
                  />
                ) : (
                  <>
                    <span className="username">{userData.Username}</span>
                  </>
                )}
                <div className="edit-icon-container" onClick={handleEditName}>
                  <img src={pencilIcon} alt="Edit" className="edit-icon" />
                </div>
              </div>
              <div className="bio-container">
                {isEditingBio ? (
                  <input
                    type="text"
                    value={newBio}
                    onChange={handleBioChange}
                  />
                ) : (
                  <span className="bio">{userData.Bio}</span>
                )}
                <div className="edit-icon-container" onClick={handleEditBio}>
                  <img src={pencilIcon} alt="Edit" className="edit-icon" />
                </div>
              </div>
            </div>
            <div className="profile-image-container">
              {isEditingPhoto ? (
                <input type="file" onChange={handlePhotoChange} />
              ) : (
                <img
                  src={userData.Image}
                  alt="Profile"
                  className="profile-image"
                />
              )}
              <div className="edit-icon-container" onClick={handleEditPhoto}>
                <img src={pencilIcon} alt="Edit" className="edit-icon" />
              </div>
            </div>
            <button onClick={handleSubmit}>SAVE</button>
          </div>
          
        )}
  <PhotoUploader isLoggedIn={isLoggedIn} userData={userData} />
      </div>
    
      <DragAndDropProvider>
                    <DragDrop />
                  </DragAndDropProvider>
    </>
  );
}

export default UserProfile;
