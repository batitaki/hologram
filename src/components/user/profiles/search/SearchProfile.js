import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importa Link desde react-router-dom
import { searchUserProfile } from "../../../../services/usersAPI";
import { getMediaByUser } from "../../../../services/mediaAPI";
import MediaGallery from "../../../collection/media/photo/MediaGallery";

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
          // Guardar los datos del usuario en localStorage
          localStorage.setItem('searchedUserData', JSON.stringify(response.user));
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
              {/* Envuelve el nombre de usuario en un enlace */}
              <Link to={`/searched-user-profile/${userData.ID}`} className="username">{userData.Username}</Link>
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
        {/* Aquí puedes mostrar la galería de medios del usuario si lo deseas */}
        {/* <MediaGallery media={userMedia} /> */}
      </div>
    </>
  );
};

export default SearchUserProfile;
