import React, { useState, useEffect } from "react";
import { searchUserProfile } from "../../services/usersAPI";
import MediaPhotos from "../collection/media/MediaPhotos";

const SearchProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [showFullProfile, setShowFullProfile] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await searchUserProfile(username);
        if (response.success) {
          setUserData(response.user);
        } else {
          setUserData(null);
        }
        // Reset showFullProfile to false after each search
        setShowFullProfile(false);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    if (username.trim() !== "") {
      loadUserProfile();
    }
  }, [username]);

  const handleShowFullProfile = () => {
    setShowFullProfile(true);
  };

  return (
    <>
      <div className="search-input-container">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="SEARCH PROFILE"
          className="search-input-profile"
        />
       {userData && !showFullProfile && (
          <div className="user-preview" onClick={handleShowFullProfile}>
            <img
              src={userData.Image}
              alt="Profile"
              className="profile-preview-image"
            />
            <p className="username-preview">{userData.Username}</p>
          </div>
        )}
      </div>
      {showFullProfile && userData && (
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
            <img
              src={userData.Image}
              alt="Profile"
              className="profile-image"
            />
          </div>
        </div>
            <div className="search-media-container">
            <MediaPhotos userId={userData.ID} />
          </div>
          </>
      )}
    </>
  );
};

export default SearchProfile;