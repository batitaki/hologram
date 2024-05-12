import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { I18nextProvider } from "react-i18next";
import "./styles/FormStyles.css";
import Navbar from "./components/layout/navbar/Navbar";
import i18n from "./components/layout/navbar/i18n";
import ComponentRoutes from "./ComponentRoutes";
import { Foot } from "./components/layout/foot/Foot";
import  Home  from "./components/layout/home/Home";
import Login from "./components/user/form/Login";
import Register from "./components/user/form/Register";
import UserProfile from "./components/user/profiles/UserProfile";
import PhotoUploader from "./components/collection/media/PhotoUploader";
import SearchProfile from "./components/user/profiles/search/SearchProfile";
import SearchedUserProfile from "./components/user/profiles/search/SearchedUserProfile";

function App() {

  const initialUserData = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData"))
    : null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(initialUserData);

  const handleLogin = async (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("isLoggedIn", "true");
  };

  useEffect(() => {
    const storedIsLoggedIn = localStorage.getItem("isLoggedIn");
    if (storedIsLoggedIn === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("userData");
    localStorage.removeItem("isLoggedIn");
    setUserData(null);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router basename="/hologramassa">

        <div className="App">
          <div className="header-parent">
            <Navbar
              isLoggedIn={isLoggedIn}
              handleLogout={handleLogout}
              userData={userData}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              {ComponentRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
              <Route
                path="/register"
                element={isLoggedIn ? <Navigate to="/" /> : <Register />}
              />
              <Route
                path="/login"
                element={
                  isLoggedIn ? (
                    <Navigate to="/" />

                  ) : (
                    <Login handleLogin={handleLogin} />
                  )
                }
              />
              <Route
                path="/profile"
                element={
                  <UserProfile
                    isLoggedIn={isLoggedIn}
                    handleLogout={handleLogout}
                    userData={userData}
                    setUserData={setUserData}
                  />
                }
              />

              <Route path="/search-profile" element={<SearchProfile />} />

              <Route path="/searched-profile/:userId" element={<SearchedUserProfile userData={userData} />} />

              <Route
                path="/upload-photo"
                element={
                  <PhotoUploader isLoggedIn={isLoggedIn} userData={userData} />
                }
              />     
            </Routes>
          </div>
        </div>
      </Router>
      <Foot />
    </I18nextProvider>
  );
}

export default App;