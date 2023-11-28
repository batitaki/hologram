import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/traslo.png'


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
          <img  onClick={toggleNavbarAndOptions} src={logo} alt="" width="50"  style={{ margin: '12px' }} />
          
        </Link>
        <div className="navbar-nav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <div
                className={`art-options`}
                id="artOptions"
                style={{ display: isExpanded ? 'block' : 'none' }}
              >
              <Link
                 to ='/' className="nav-link">
              HOME
              </Link>
                <Link to='/artists' className="nav-link"  >
              ARTISTS
                </Link>
                <Link to='/collection' className="nav-link"  >
              COLLECTION
                </Link>
                <Link to='/sketch' className="nav-link" >
              SKETCHES
                </Link>
                <Link to='/createArt' className="nav-link" >
              CREATE ART
                </Link>
                <Link to='/apply' className="nav-link"  >
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



