import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { loginUser } from "../../services/usersAPI";
import { useTranslation } from "react-i18next"; 

const Login = ({ handleLogin }) => {
  const { t } = useTranslation(); 

  const [credentials, setCredentials] = useState({
    Username: "",
    Password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
    // Limpiar mensaje de error cuando se realiza un cambio en el campo
    setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let formIsValid = true;

    // Validar campo de nombre de usuario
    if (!credentials.Username) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        username: t("Username Required"),
      }));
      formIsValid = false;
    }

    // Validar campo de contraseña
    if (!credentials.Password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: t("Password Required"),
      }));
      formIsValid = false;
    }

    if (formIsValid) {
      try {
        const response = await loginUser(credentials);
      
        if (response.token) {
          localStorage.setItem("token", response.token);
          handleLogin(response.user); 
          // Devolver una redirección a la página de perfil
          return <Navigate to="/profile" />;
        } else {
          // Establecer mensaje de error si el inicio de sesión falla
          setErrors({ ...errors, general: t("loginError") });
        }
      } catch (error) {
        // Establecer mensaje de error si hay un error en la solicitud
        setErrors({ ...errors, general: t("loginError") }); 
      }
    }
  };

  return (
    <div className="my-container-login">
      <h3 className="form-title">{t("signIn")}</h3>
      <form onSubmit={handleSubmit}>
        <div className="my-input-container-form">
          <label className="my-label-form"> {t("username")}</label>
          <input
            type="text"
            className="my-input-form"
            name="Username"
            value={credentials.Username}
            onChange={handleChange}
          />
          {errors.username && <div style={{ color: "red" }}>{errors.username}</div>}
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
          {errors.password && <div style={{ color: "red" }}>{errors.password}</div>}
        </div>
        {errors.general && <div style={{ color: "red" }}>{errors.general}</div>}
        <button className="my-button-form" type="submit">
          {t("signIn")}
        </button>
      </form>
      <Link className="my-link-form" to="/Register">
        {t("signUp")}
      </Link>
    </div>
  );
};

export default Login;
