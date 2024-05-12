import React from "react";

function EditProfileSection({ isEditing, handleEdit, handleSubmit }) {
  return (
    <div className="profile-container">
      {isEditing && <button onClick={handleSubmit}>SAVE</button>}
    </div>
  );
}

export default EditProfileSection;
