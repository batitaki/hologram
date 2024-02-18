import { useState, useEffect } from 'react';

const useLogin = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserData(userData);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
    setUserData(null); 
  };

  useEffect(() => {
    if (isLoggedIn && userData) {
      console.log('Datos del usuario logueado:', userData);
    }
  }, [isLoggedIn, userData]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return { isLoggedIn, handleLogin, handleLogout };
};

export default useLogin;
