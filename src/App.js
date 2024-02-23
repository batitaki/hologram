import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './styles/FormStyles.css';

import Navbar from './components/layout/navbar/Navbar';
import i18n from './components/layout/navbar/i18n';
import ComponentRoutes from './ComponentRoutes';
import { Foot } from './components/layout/foot/Foot';
import { Home } from './components/layout/home/Home';
import Login from './components/user/Login';
import Register from './components/user/Register';
import UserProfile from './components/user/UserProfile'; 

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = async (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('isLoggedIn', 'true');
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    const storedIsLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedUserData && storedIsLoggedIn === 'true') {
      setIsLoggedIn(true);
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('userData');
    localStorage.removeItem('isLoggedIn');
    setUserData(null);
  };

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <div className='headerParent'>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} userData={userData} />
            <Routes>
              <Route path="/" element={<Home />} />
              {ComponentRoutes.map((route, index) => (
                <Route
                  key={index}
                  path={route.path}
                  element={route.element}
                />
              ))}
              <Route path='/register' element={isLoggedIn ? <Navigate to="/" /> : <Register />}/>
              <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />}/>
              <Route path="/profile" element={<UserProfile isLoggedIn={isLoggedIn} handleLogout={handleLogout} userData={userData} />} />
            </Routes>
          </div>
        </div>
      </Router>
      <Foot />
    </I18nextProvider>
  );
}

export default App;
