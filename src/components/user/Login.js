import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Cambiamos de Redirect a Navigate
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
      handleLogin(response.user); // Llama a la función handleLogin con los datos del usuario
      console.log('Datos del usuario logueado:', response.user);
    } catch (error) {
      // Manejo de errores
    }
  };

  useEffect(() => {
    // Esta función se ejecutará cada vez que isLoggedIn cambie
    console.log('isLoggedIn después del cambio:', isLoggedIn);
    if (isLoggedIn) {
      console.log('Usuario autenticado:', isLoggedIn);
      // Aquí podrías realizar acciones adicionales después del inicio de sesión
    }
  }, [isLoggedIn]); // Este efecto se activa cuando isLoggedIn cambia

  if (isLoggedIn) {
    return <Navigate to="/" />; // Cambiamos Redirect a Navigate
  }

  return (
    <div className="my-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label className='my-label'> Usuario:</label>
          <input  type="text" name="Username" value={credentials.Username} onChange={handleChange} />
        </div>
        <div>
          <label className='my-label'> Contraseña:</label>
          <input type="password" name="Password" value={credentials.Password} onChange={handleChange} />
        </div>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        <button className='my-button' type="submit">Iniciar sesión</button>
      </form>
    </div>
  );
};

export default Login;
