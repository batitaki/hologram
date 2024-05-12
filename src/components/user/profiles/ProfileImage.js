import React from "react";
import pencilIcon from "../../../assets/pencil-icon.png";

function ProfileImage({
  isEditing,
  userData,
  newPhoto,
  handlePhotoChange,
  handleEdit,
}) {
  return (
    <div className="profile-image-container">
      {isEditing ? (
        <input
          className="input-edit"
          type="file"
          onChange={handlePhotoChange}
        />
      ) : (
        <img
          src={userData.Image}
          alt="Profile"
          className="profile-image"
        />
      )}
      <div
        className={`edit-icon-container ${isEditing ? "" : "hidden"}`}
        onClick={handleEdit}
      >
        <img src={pencilIcon} alt="Edit" className="edit-icon" />
      </div>
    </div>
  );
}

export default ProfileImage;