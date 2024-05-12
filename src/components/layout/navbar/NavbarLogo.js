import React from "react";
import { Link } from "react-router-dom";

function NavbarLogo({ isClosed, logo1, logo2 }) {
  return (
    <div className={`logo-class ${isClosed ? "logo-class-closed" : ""}`}>
      <Link to="/" className="navbar-brand">
        {isClosed ? (
          <img className="logo1" src={logo1} alt="" />
        ) : (
          <img className="logo2" src={logo2} alt="" />
        )}
      </Link>
    </div>
  );
}

export default NavbarLogo;
