import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../services/usersAPI";

const Login = ({ handleLogin }) => {
  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(credentials);
      // Verificar si la respuesta incluye un token (indicativo de credenciales correctas)
      if (response.token) {
        localStorage.setItem("token", response.token);
        handleLogin(response.user); // Llama a la función handleLogin para actualizar el estado del usuario
        return <Navigate to="/profile" />;
      } else {
        // Si no hay token en la respuesta, muestra un mensaje de error
        setError(
          "Error al iniciar sesión. Por favor, verifica tus credenciales."
        );
      }
    } catch (error) {
      setError(
        "Error al iniciar sesión. Por favor, verifica tus credenciales."
      );
    }
  };

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
      <Link className="my-link-form" to="/Register">
        CREATE ACCOUNT
      </Link>
    </div>
  );
};

export default Login;
