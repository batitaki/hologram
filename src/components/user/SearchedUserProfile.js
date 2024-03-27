import React from "react";
import MediaPhotos from "../collection/media/MediaPhotos";

const SearchedUserProfile = ({ userData }) => {
  console.log("userData:", userData);

  if (!userData) {
    console.log("userData is null or undefined");
    return <p>Loading...</p>;
  }

  console.log("Rendering user profile with userData:", userData);

  return (
    <>
      <div className="full-profile-container">
        <div className="bio-username">
          <div className="username-container">
            <p className="username">{userData.Username}</p>
          </div>
          <div className="bio-container">
            <p className="Bio">Bio: {userData.Bio}</p>
          </div>
        </div>
        <div className="profile-image-container">
          <img src={userData.Image} alt="Profile" className="profile-image" />
        </div>
      </div>
      <div className="search-media-container">
        <MediaPhotos userId={userData.ID} />
      </div>
    </>
  );
};

export default SearchedUserProfile;
