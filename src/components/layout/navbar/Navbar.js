import React, { useState, useEffect } from "react";
import "./Navbar.css";
import logo2 from "../../../assets/logoNegroHolo.PNG";
import logo1 from "../../../assets/logoko.PNG";
import botonHamburguesa from "../../../assets/boton-hamburguesa.png";

import { useTranslation } from "react-i18next";
import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarLanguage from "./NavbarLanguage";

function Navbar({ isLoggedIn, handleLogout }) {
  const { t, i18n } = useTranslation();
  const [isClosed, setIsClosed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const openNavbar = () => {
    setIsClosed(false);
  };

  const toggleNavbarAndOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsClosed(!isClosed);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector(".navbar");
      if (navbar && !navbar.contains(event.target)) {
        openNavbar();
      }
    };

    if (isClosed) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isClosed]);

  return (
    <div className={`sidebar ${isClosed ? "navbar-closed" : ""}`}>
      <NavbarLogo isClosed={isClosed} logo1={logo1} logo2={logo2} />
      <NavbarLinks
        isClosed={isClosed}
        isLoggedIn={isLoggedIn}
        selectedView={selectedView}
        openNavbar={openNavbar}
        setSelectedView={setSelectedView}
        handleLogout={handleLogout}
        t={t}
      />
      <NavbarLanguage
        isClosed={isClosed}
        selectedLanguage={selectedLanguage}
        changeLanguage={changeLanguage}
        toggleNavbarAndOptions={toggleNavbarAndOptions}
        botonHamburguesa={botonHamburguesa}
        openNavbar={openNavbar}
      />
    </div>
  );
}

export default Navbar;
