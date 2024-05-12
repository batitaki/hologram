import React, { useState, useEffect } from "react";
import "./UserProfile.css";
import { editUserProfile } from "../../../services/usersAPI";
import { getMediaByUser } from "../../../services/mediaAPI";
import PhotoUploader from "../../collection/media/photo/PhotoUploader";

import UserInfo from "./UserInfo";
import ProfileImage from "./ProfileImage";
import MediaGallery from "../../collection/media/photo/MediaGallery";
import EditProfileSection from "./EditProfileSection";

function UserProfile({ isLoggedIn, userData, setUserData }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newPhoto, setNewPhoto] = useState("");
  const [newName, setNewName] = useState("");
  const [newBio, setNewBio] = useState("");
  const [userMedia, setUserMedia] = useState([]);

  useEffect(() => {
    const loadUserMedia = async () => {
      try {
        if (userData && userData.ID) {
          const mediaDataByUser = await getMediaByUser(userData.ID);
          setUserMedia(mediaDataByUser);
        }
      } catch (error) {
        console.error("Error fetching user media", error);
      }
    };

    loadUserMedia();
  }, [userData]);

  const handleEdit = () => {
    setIsEditing(true);
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

  const handleSubmit = async () => {
    const userId = userData.ID;
    const token = localStorage.getItem("token");

    const formData = {
      Username: newName || userData.Username,
      Bio: newBio || userData.Bio,
      Image: newPhoto || userData.Image,
    };

    try {
      const response = await editUserProfile(userId, formData, token);
      if (response.success) {
        console.log("Perfil de usuario actualizado correctamente");
        setUserData((prevUserData) => ({ ...prevUserData, ...formData }));
        localStorage.setItem("userData", JSON.stringify(userData));
        setNewBio(formData.Bio);
      } else {
        console.error("Error al actualizar el perfil del usuario");
      }
    } catch (error) {
      console.error("Error al actualizar el perfil del usuario", error);
    }

    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div className="profile-container">
        {isLoggedIn && userData && (
          <>
            <UserInfo
              isEditing={isEditing}
              userData={userData}
              newName={newName}
              newBio={newBio}
              handleNameChange={handleNameChange}
              handleBioChange={handleBioChange}
            />
            <ProfileImage
              isEditing={isEditing}
              userData={userData}
              newPhoto={newPhoto}
              handlePhotoChange={handlePhotoChange}
              handleEdit={handleEdit}
            />
            <EditProfileSection
              isEditing={isEditing}
              handleEdit={handleEdit}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </div>
      <div className="edit-profile">
        {isLoggedIn && userData && (
          <button className="button-edit-profile" onClick={handleEdit}>
            EDIT PROFILE
          </button>
        )}
        <PhotoUploader isLoggedIn={isLoggedIn} userData={userData} />
      </div>
      <div className="user-media">
        <MediaGallery userMedia={userMedia} />
      </div>
    </div>
  );
}

export default UserProfile;