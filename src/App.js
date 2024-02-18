import React from 'react';
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
import useLogin from './functions/LoginFunctions';
import Login from './components/user/Login';
import Register from './components/user/Register';
import SketchList from './components/sketch/list/SketchList';

function App() {
  const { isLoggedIn, handleLogin, handleLogout } = useLogin();

  return (
    <I18nextProvider i18n={i18n}>
      <Router>
        <div className="App">
          <div className='headerParent'>
            <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
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
              <Route path='/SketchList' element={isLoggedIn ? <SketchList /> : <Navigate to="/login" />}/>
              <Route path='/login' element={isLoggedIn ? <Navigate to="/" /> : <Login handleLogin={handleLogin} />}/>
            </Routes>
          </div>
        </div>
      </Router>
      <Foot />
    </I18nextProvider>
  );
}

export default App;
