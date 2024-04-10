import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo2 from "../../../assets/logoNegroHolo.PNG";
import logo1 from "../../../assets/logoko.PNG";
import { useTranslation } from "react-i18next";

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
      <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
        <Link className="navbar-brand">
          {isClosed ? (
            <img className="logo1" src={logo1} alt="" /> 
          ) : (
            <img
              className="logo2"
              src={logo2}
              alt=""

            />
          )}
        </Link>
      </div>
      <div className="navbar-nav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <div
              className={`art-options ${
                isClosed ? "art-options-closed" : ""
              }`}
              id="artOptions"
            >
              <Link
                to="/hologramassa/"
                className={`nav-link ${
                  selectedView === "/hologramassa/" ? "selected" : ""
                }`}
                onClick={() => {
                  openNavbar();
                  setSelectedView("/hologramassa/");
                }}
              >
                {t("home")}
              </Link>
              {!isLoggedIn && (
                <>
                  <Link
                    to="/login"
                    className={`nav-link ${
                      selectedView === "/login" ? "selected" : ""
                    }`}
                    onClick={() => {
                      openNavbar();
                      setSelectedView("/login");
                    }}
                  >
                    {t("signIn")}
                  </Link>
                  <Link
                    to="/register"
                    className={`nav-link ${
                      selectedView === "/register" ? "selected" : ""
                    }`}
                    onClick={() => {
                      openNavbar();
                      setSelectedView("/register");
                    }}
                  >
                    {t("signUp")}
                  </Link>
                </>
              )}

              <Link
                to="/artists"
                className={`nav-link ${
                  selectedView === "/artists" ? "selected" : ""
                }`}
                onClick={() => {
                  openNavbar();
                  setSelectedView("/artists");
                }}
              >
                {t("artists")}
              </Link>

              <Link
                to="/collection"
                className={`nav-link ${
                  selectedView === "/collection" ? "selected" : ""
                }`}
                onClick={() => {
                  openNavbar();
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
                  openNavbar();
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
                  openNavbar();
                  setSelectedView("/SketchList");
                }}
              >
                {t("SketchList")}
              </Link>
              {isLoggedIn && (
                <Link to="/profile" className="nav-link">
                  {t("profile")}
                </Link>
              )}
              {isLoggedIn && (
                <Link to="/hologramassa/" className="nav-link" onClick={handleLogout}>
                  {t("logout")}
                </Link>
              )}
            </div>
          </li>
        </ul>
      </div>
      <div className={`class-lang ${isClosed ? "class-lang-closed" : ""}`}>
        <div className="nav-lang">
          <button
            className={`language-button ${
              selectedLanguage === "en" ? "selected" : ""
            }`}
            onClick={() => changeLanguage("en")}
          >
            ENGLISH
          </button>
          <span className="language-separator"></span>
          <button
            className={`language-button ${
              selectedLanguage === "es" ? "selected" : ""
            }`}
            onClick={() => changeLanguage("es")}
          >
            SPANISH
          </button>
        </div>
        {!isClosed && (
          <button className="open-button" onClick={toggleNavbarAndOptions}>
            x
          </button>
        )}

        {isClosed && (
          <button className="close-button" onClick={openNavbar}>
            =
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
