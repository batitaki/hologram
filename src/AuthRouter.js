import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ComponentRoutes from "./ComponentRoutes";
import Navbar from "./components/layout/navbar/Navbar";
import Home from "./components/layout/home/Home";
import Login from "./components/user/form/Login";
import Register from "./components/user/form/Register";
import UserProfile from "./components/user/profiles/UserProfile";
import PhotoUploader from "./components/collection/media/photo/PhotoUploader";
import Creatives from "./components/user/profiles/creatives/Creatives";
import SearchedUserProfile from "./components/user/profiles/search/SearchedUserProfile";
import SearchUserProfile from "./components/user/profiles/search/SearchProfile";

const AuthRouter = ({ isLoggedIn, handleLogout, handleLogin, userData, setUserData }) => {
  return (
    <Router basename="/hologramassa">
      <div className="App">
        <div className="header-parent">
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userData={userData} />
          <Routes>
            <Route path="/" element={<Home />} />
            {ComponentRoutes.map((route, index) => (
              <Route key={index} path={route.path} element={route.element} />
            ))}
            <Route path="/register" element={isLoggedIn ? <Navigate to="/" /> : <Register />} />
            <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />} />
            <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} handleLogout={handleLogout} userData={userData} setUserData={setUserData} />} />
            <Route path="/upload-photo" element={<PhotoUploader isLoggedIn={isLoggedIn} userData={userData} />} />
            <Route path="/creatives" element={<Creatives />} />
            <Route path="/search-profile" element={<SearchUserProfile />} />
            <Route path="/searched-user-profile/:userId" element={<SearchedUserProfile profileData={userData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AuthRouter;
