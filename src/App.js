import React, { useState, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "./components/layout/navbar/i18n";
import "./styles/FormStyles.css"
import AuthRouter from "./AuthRouter";
import { Foot } from "./components/layout/foot/Foot";

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
      <AuthRouter
        isLoggedIn={isLoggedIn}
        handleLogin={handleLogin}
        handleLogout={handleLogout}
        userData={userData}
        setUserData={setUserData} // Pass setUserData as prop
      />
      <Foot />
    </I18nextProvider>
  );
}

export default App;
