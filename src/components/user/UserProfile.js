import React, { useState } from "react";
import "./UserProfile.css";
import pencilIcon from "../../assets/pencil-icon.png";
import PhotoUploader from "../collection/artworks/PhotoUploader";
import MediaPhotos from "../collection/artworks/MediaPhotos";

function UserProfile({ isLoggedIn, userData }) {
  const [isEditingPhoto, setIsEditingPhoto] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");

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
    setNewBio(event.target.value);
  };

  const handleSubmit = () => {
    setIsEditingPhoto(false);
    setIsEditingName(false);
    setIsEditingBio(false);
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
                  <>
                    <span className="bio">{userData.Bio}</span>
                  </>
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
            {/* <button onClick={handleSubmit}>Guardar cambios</button> */}
          </div>
        )}
        <PhotoUploader isLoggedIn={isLoggedIn} userData={userData} />
      </div>
      <MediaPhotos />
    </>
  );
}

export default UserProfile;
