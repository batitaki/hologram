// Navbar.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/logo.jpg'

function Navbar () {
  const [isExpanded, setExpanded] = useState(false);


  const toggleNavbarAndOptions = (e) => {
    e.preventDefault();
    setExpanded(!isExpanded);
  };

  return (
    <div className={`sidebar ${isExpanded ? 'navbar-expanded' : ''}`}>
      <nav className="navbar">
        <Link to ="/" className="navbar-brand" >
          <img src={logo} alt="" width="50" height="44" style={{ margin: '12px' }} />
        </Link>
        <div className="navbar-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                className="nav-link"
                href="#"
                id="artistasDropdown"
                onClick={toggleNavbarAndOptions}
              >
                |||||||||||||
              </Link>
              <div
                className={`art-options`}
                id="artOptions"
                style={{ display: isExpanded ? 'block' : 'none' }}
              >
                <Link to='/artists' className="nav-link"  >
              ARTISTS
                </Link>
                <Link to='/collection' className="nav-link"  >
              COLLECTION
                </Link>
                <Link to='/sketch' className="nav-link" >
              SKETCHES
                </Link>
                <Link className="nav-link" href="#">
              VIDEOS
                </Link>
                <Link className="nav-link" href="#" >
              ESSAYS
                </Link>
                <Link className="nav-link" href="#" >
              ABOUT
                </Link>
                <Link className="nav-link" href="#" >
              EXHIBITIONS
                </Link>
                <Link className="nav-link" href="#" >
              COMING SOON
                </Link>
                <Link className="nav-link" href="apply" >
              APPLY
                </Link>

              </div>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;



