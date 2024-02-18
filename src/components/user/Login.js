import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { loginUser } from "../../services/usersAPI";


const Login = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });
  const [error, setError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(credentials);
      localStorage.setItem("token", response.token);
      handleLogin(response.user);
      setIsLoggedIn(true);
      console.log("Datos del usuario logueado:", response.user);
    } catch (error) {
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

  useEffect(() => {
    console.log("isLoggedIn después del cambio:", isLoggedIn);
    if (isLoggedIn) {
      console.log("Usuario autenticado:", isLoggedIn);
    }
  }, [isLoggedIn]);

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="my-container-login">
      <h3 className="form-title">LOG IN</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-input-container-form">
          <label className="my-label-form"> USERNAME</label>
          <input
            style={{
              width: "350px",
              backgroundColor: "#ffffff",
              border: "1px solid #000000",
              borderRadius: "0",
              padding: "5px",
            }}
            type="text"
            className="my-input-form"
            name="Username"
            value={credentials.Username}
            onChange={handleChange}
          />
        </div>
        <div className="my-input-container-form">
          <label className="my-label-form"> PASSWORD</label>
          <input
            className="my-input-form"
            type="password"
            name="Password"
            value={credentials.Password}
            onChange={handleChange}
          />
        </div>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="my-button-form" type="submit">
          LOGIN
        </button>
      </form>
      <Link  className="my-link-form" to="/Register">CREATE ACOUNT</Link>
    </div>
  );
};

export default Login;
