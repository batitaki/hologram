import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../../services/usersAPI";
import { useTranslation } from "react-i18next"; // Importa la función useTranslation

const Login = ({ handleLogin }) => {
  const { t } = useTranslation(); // Obtiene las funciones de traducción

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
        setError(t("loginError")); // Utiliza la función t para obtener la traducción del mensaje de error
      }
    } catch (error) {
      setError(t("loginError")); // Utiliza la función t para obtener la traducción del mensaje de error
    }
  };

  return (
    <>

    <div className="my-container-login">
      <div className="my-form-items">
        <form className="my-form" onSubmit={handleSubmit}>
          <div className="my-input-container-form">
            <label className="my-label-form"> {t("username")}</label>
            <input
              type="text"
              className="my-input-form"
              name="Username"
              value={credentials.Username}
              onChange={handleChange}
            />
          </div>
          <div className="my-input-container-form">
            <label className="my-label-form"> {t("password")}</label>
            <input
              className="my-input-form"
              type="password"
              name="Password"
              value={credentials.Password}
              onChange={handleChange}
            />
          </div>
          <div className="my-input-container-form">
            {error && <div style={{ color: "red" }}>{error}</div>}
            <button className="my-button-form" type="submit">
              {t("signIn")}
            </button>
          </div>
          <div className="my-input-container-form">
            <Link className="my-link-form" to="/Register">
              {t("signUp")}
            </Link>
          </div>
        </form>
      </div>
    </div>
    </>
  );
};

export default Login;
