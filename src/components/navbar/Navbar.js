// Navbar.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../../assets/logoNegroH.PNG";
import logo2 from "../../assets/logoNegroHolo.PNG";
import { useTranslation } from "react-i18next";

function Navbar({ isLoggedIn, handleLogout }) {
  const { t, i18n } = useTranslation();
  const [isExpanded, setExpanded] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("en");
  const [selectedView, setSelectedView] = useState("/");

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setSelectedLanguage(lng);
  };

  const closeNavbar = () => {
    setExpanded(false);
  };

  const toggleNavbarAndOptions = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setExpanded(!isExpanded);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const navbar = document.querySelector(".navbar");
      if (navbar && !navbar.contains(event.target)) {
        closeNavbar();
      }
    };

    if (isExpanded) {
      document.addEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <div className={`sidebar ${isExpanded ? "navbar-expanded" : ""}`}>
      <div className={`logo-class ${isExpanded ? "logo-class-expanded" : ""}`}>
        <Link className="navbar-brand">
          {isExpanded ? (
            <img
              className="logo2"
              onClick={toggleNavbarAndOptions}
              src={logo2}
              alt=""
            />
          ) : (
            <img
              onClick={toggleNavbarAndOptions}
              src={logo}
              alt=""
              width="50"
              style={{ margin: "8px" }}
            />
          )}
        </Link>
      </div>
      <div className="navbar-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div
              className={`art-options`}
              id="artOptions"
              style={{ display: isExpanded ? "block" : "none" }}
            >
              <Link
                to="/"
                className={`nav-link ${selectedView === "/" ? "selected" : ""}`}
                onClick={() => {
                  closeNavbar();
                  setSelectedView("/");
                }}
              >
                {t("home")}
              </Link>

              <Link
                to="/artists"
                className={`nav-link ${
                  selectedView === "/artists" ? "selected" : ""
                }`}
                onClick={() => {
                  closeNavbar();
                  setSelectedView("/artists");
                }}
              >
                {t("artists")}
              </Link>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className={`nav-link ${
                      selectedView === "/login" ? "selected" : ""
                    }`}
                    onClick={() => {
                      closeNavbar();
                      setSelectedView("/login");
                    }}
                  >
                    LOG IN
                  </Link>
                  <Link
                    to="/register"
                    className={`nav-link ${
                      selectedView === "/register" ? "selected" : ""
                    }`}
                    onClick={() => {
                      closeNavbar();
                      setSelectedView("/register");
                    }}
                  >
                    {t("register")}
                  </Link>
                </>
              )}

              <Link
                to="/collection"
                className={`nav-link ${
                  selectedView === "/collection" ? "selected" : ""
                }`}
                onClick={() => {
                  closeNavbar();
                  setSelectedView("/collection");
                }}
              >
                {t("gallery")}
              </Link>

              <Link
                to="/magazine"
                className={`nav-link ${
                  selectedView === "/magazine" ? "selected" : ""
                }`}
                onClick={() => {
                  closeNavbar();
                  setSelectedView("/magazine");
                }}
              >
                {t("magazine")}
              </Link>

              <Link
                to="/SketchList"
                className={`nav-link ${
                  selectedView === "/SketchList" ? "selected" : ""
                }`}
                onClick={() => {
                  closeNavbar();
                  setSelectedView("/SketchList");
                  console.log(
                    "Estado de login al hacer clic en SketchList:",
                    isLoggedIn
                  );
                }}
              >
                {t("SketchList")}
              </Link>

            </div>
          </li>
        </ul>
        <div className="navbar-nav">
          {/* Otras opciones de navegación */}
          {isExpanded && isLoggedIn && (
            <li className="nav-item">
              <Link
                to="/login"
                className="log-out-button"
                onClick={handleLogout}
              >
                LOG OUT
              </Link>
            </li>
          )}
        </div>
      </div>
      <div className={`class-lang ${isExpanded ? "class-lang-expanded" : ""}`}>
        <div className="nav-lang">
          <button
            className={`language-button ${
              selectedLanguage === "en" ? "selected" : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            EN
          </button>
          <span className="language-separator"></span>
          <button
            className={`language-button ${
              selectedLanguage === "es" ? "selected" : ""
            }`}
            onClick={() => changeLanguage("es")}
          >
            ES
          </button>
        </div>
        {!isExpanded && (
          <button className="open-button" onClick={toggleNavbarAndOptions}>
            |||
          </button>
        )}

        {isExpanded && (
          <button className="close-button" onClick={closeNavbar}>
            x
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
