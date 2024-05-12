import React from "react";
import { Link } from "react-router-dom";

function NavbarLinks({
  isClosed,
  isLoggedIn,
  selectedView,
  openNavbar,
  setSelectedView,
  handleLogout,
  t,
}) {
  return (
    <div className="navbar-nav">
      <div
        className={`art-options ${isClosed ? "art-options-closed" : ""}`}
        id="artOptions"
      >
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
          </>
        )}

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
          to="/creatives"
          className={`nav-link ${
            selectedView === "/creatives" ? "selected" : ""
          }`}
          onClick={() => {
            openNavbar();
            setSelectedView("/creatives");
          }}
        >
          {t("creatives")}
        </Link>

        <Link
          to="/SketchVideoList"
          className={`nav-link ${
            selectedView === "/SketchVideoList" ? "selected" : ""
          }`}
          onClick={() => {
            openNavbar();
            setSelectedView("/SketchVideoList");
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
          <Link to="/" className="nav-link" onClick={handleLogout}>
            {t("logout")}
          </Link>
        )}
      </div>
    </div>
  );
}

export default NavbarLinks;
