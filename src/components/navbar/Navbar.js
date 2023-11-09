// Navbar.js
import React, { useState } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.jpg'

function Navbar({ onEscuelaClick, onProductClick, onFotosClick}) {
  const [isExpanded, setExpanded] = useState(false);


  const toggleNavbarAndOptions = (e) => {
    e.preventDefault();
    setExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'navbar-expanded' : ''}`}>
      <nav className="navbar">
        <a className="navbar-brand" href="/">
          <img src={logo} alt="" width="50" height="44" style={{ margin: '1px' }} />
        </a>
        <div className="navbar-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link"
                href="#"
                id="artistasDropdown"
                onClick={toggleNavbarAndOptions}
              >
                ||||||||||
              </a>
              <div
                className={`art-options`}
                id="artOptions"
                style={{ display: isExpanded ? 'block' : 'none' }}
              >
                <a className="nav-link" href="#" onClick={onProductClick}>
              PRODUCTOS
                </a>
                <a className="nav-link" href="#" onClick={onEscuelaClick}>
              ESCUELAS
                </a>
                <a className="nav-link" href="#" onClick={onFotosClick}>
              FOTOS
                </a>

              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;



