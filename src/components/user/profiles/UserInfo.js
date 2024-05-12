import React from "react";

function UserInfo({
  isEditing,
  userData,
  newName,
  newBio,
  handleNameChange,
  handleBioChange,
}) {
  return (
    <div className="bio-username">
      <div className="username-container">
        {isEditing ? (
          <input
            className="input-edit-username"
            type="text"
            value={newName || userData.Username}
            onChange={handleNameChange}
          />
        ) : (
          <span className="username">{userData.Username}</span>
        )}
      </div>
      <div className="bio-container">
        {isEditing ? (
          <textarea
            value={newBio || userData.Bio}
            onChange={handleBioChange}
            className="input-edit-bio"
            rows={4}
          />
        ) : (
          <span className="bio">{userData.Bio}</span>
        )}
      </div>
    </div>
  );
}

export default UserInfo;