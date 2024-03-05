import React, { useState, useEffect } from "react";
import { searchUserProfile } from "../../services/usersAPI";
import { getMediaByUser } from "../../services/mediaAPI";
import MediaPhotos from "../collection/media/MediaPhotos";

const SearchUserProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [userMedia, setUserMedia] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUserProfile = async () => {
      setIsLoading(true);
      try {
        const response = await searchUserProfile(username);
        if (response.success) {
          setUserData(response.user);
          setError("");
          if (response.user && response.user.ID) {
            const mediaData = await getMediaByUser(response.user.ID);
            setUserMedia(mediaData);
          }
        } else {
          setUserData(null);
          setUserMedia([]);
          setError(response.error);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Error fetching user profile");
      }
      setIsLoading(false);
    };

    if (username.trim() !== "") {
      loadUserProfile();
    }
  }, [username]);

  return (
    <>
    <div className="search-input-container">
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="ENTER USERNAME"
        className="search-input-profile"
      />
      </div>
      <div className="search-profile-container">
        {userData && (
          <div className="bio-username">
            <div className="username-container">
              <p className="username">{userData.Username}</p>
            </div>
            <div className="bio-container">
              <p className="Bio">Bio: {userData.Bio}</p>
            </div>
          </div>
        )}
        <div className="profile-image-container">
          {userData && (
            <img
              src={userData.Image}
              alt="Profile"
              className="profile-image"
            />
          )}
        </div>
      </div>
      <div>
      {userData && (
  <div className="search-media-container">
    <MediaPhotos userId={userData.ID} />
  </div>
)}
      </div>
    </>
  );
};

export default SearchUserProfile;
