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
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await loginUser(credentials);
    
      if (response.token) {
        localStorage.setItem("token", response.token);
        handleLogin(response.user); 
        return <Navigate to="/profile" />;
      } else {

        setError(t("loginError"));
      }
    } catch (error) {
      setError(t("loginError")); 
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
        {error && <div style={{ color: "red" }}>{error}</div>}
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
