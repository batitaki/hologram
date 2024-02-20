import React from 'react';

function UserProfile({ isLoggedIn, handleLogout, userData }) {
  return (
    <div className="profile">
      {isLoggedIn && userData && (
        <>
          <span>Welcome, {userData.Username}</span>
          <img src={userData.Image} alt="Profile" className="profile-image" />
        </>
      )}
      {isLoggedIn && (
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      )}
    </div>
  );
}

export default UserProfile;
