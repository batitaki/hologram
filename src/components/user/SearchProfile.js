import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { searchUserProfile } from "../../services/usersAPI";

const SearchProfile = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await searchUserProfile(username);
        if (response.success) {
          setUserData(response.user);
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
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
          placeholder="SEARCH PROFILE"
          className="search-input-profile"
        />
        {userData && (
          <Link to={`/searched-profile/${userData.ID}`} className="user-preview-link">
            <div className="user-preview">
              <img
                src={userData.Image}
                alt="Profile"
                className="profile-preview-image"
              />
              <p className="username-preview">{userData.Username}</p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default SearchProfile;
