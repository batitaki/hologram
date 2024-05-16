import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchUsersByUsername } from "../../../../services/usersAPI";

const SearchProfile = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const response = await fetchUsersByUsername(username);
        console.log("Respuesta del servidor:", response);
        if (response.user) {
          setUser(response.user);
        } else if (response.error) {
          console.error("Error fetching user profile:", response.error);
          setUser(null);
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
        {user && (
          <Link to={`/creatives/${user.ID}`} className="user-preview-link">
            <div className="user-preview">
              <img
                src={user.Image}
                alt="Profile"
                className="profile-preview-image"
              />

              <p className="username-preview">{user.Username}</p>
            </div>
          </Link>
        )}
      </div>
    </>
  );
};

export default SearchProfile;
