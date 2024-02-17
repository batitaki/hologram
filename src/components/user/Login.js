import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; // Cambiamos de Redirect a Navigate
import { loginUser } from '../../services/usersAPI';
import './RegisterForm.css';

const Login = () => {
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
      setIsLoggedIn(true); // Actualizar el estado a true después del inicio de sesión exitoso
      console.log('Datos del usuario logueado:', response.user);
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
      console.log('isLoggedIn después del intento de inicio de sesión:', isLoggedIn); // Verificar isLoggedIn en caso de error
      setError('Credenciales inválidas. Por favor, inténtelo de nuevo.');
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
