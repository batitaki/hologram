import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const SearchedUserProfile = () => {
  const { userId } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        // Obtener los datos del usuario del localStorage
        const userDataFromStorage = localStorage.getItem('searchedUserData');
        if (userDataFromStorage) {
          setUserData(JSON.parse(userDataFromStorage));
          setIsLoading(false);
          setError("");
        } else {
          setError("User data not found in localStorage");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Error fetching user data");
      }
    };

    fetchUserData();
  }, [userId]);

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : userData ? (
        <div>
          <p>Username: {userData.Username}</p>
          <p>Bio: {userData.Bio}</p>
          <img src={userData.Image} alt="Profile" />
        </div>
      ) : (
        <p>No user found</p>
      )}
    </div>
  );
};

export default SearchedUserProfile;
