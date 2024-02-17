import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../services/usersAPI';
import './RegisterForm.css';

const Login = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({ Username: '', Password: '' });
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(credentials);
      localStorage.setItem('token', response.token);
      handleLogin(response.user);
      setIsLoggedIn(true); // Set isLoggedIn to true upon successful login
      console.log('Datos del usuario logueado:', response.user);
    } catch (error) {
      setError('Error al iniciar sesión. Por favor, verifica tus credenciales.');
    }
  };

  useEffect(() => {
    console.log('isLoggedIn después del cambio:', isLoggedIn);
    if (isLoggedIn) {
      console.log('Usuario autenticado:', isLoggedIn);
      // Perform additional actions after login
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="my-container-login">
      <form onSubmit={handleSubmit}>
        <div>
          <label className='my-label'> Usuario:</label>
          <input type="text" name="Username" value={credentials.Username} onChange={handleChange} />
        </div>
        <div>
          <label className='my-label'> Contraseña:</label>
          <input type="password" name="Password" value={credentials.Password} onChange={handleChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='my-button' type="submit">LOGIN</button>
      </form>
    </div>
  );
};

export default Login;
