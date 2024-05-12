import React from 'react';

const RegisterForm = ({ formData, isLoading, handleChange, handleSubmit }) => {
  return (
    <div className="my-container-register">
      <h3 className="form-title">SIGN UP</h3>
      <div className="my-form-container-form">
        {isLoading && <div className='loading-form'>LOADING...</div>}
        <form className="my-form-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Username">
              USERNAME
            </label>
            <input
              type="text"
              className="my-input-form"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Password">
              PASSWORD
            </label>
            <input
              type="password"
              className="my-input-form"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Email">
              EMAIL
            </label>
            <input
              type="email"
              className="my-input-form"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group-form">
            <label className="my-label-form" htmlFor="Image">
              IMAGES
            </label>
            <input
              type="file"
              className="my-input-form"
              id="inputGroupFile01"
              name="Image"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Enviar" className="my-button-form" />
        </form>
      </div>
    </div>

  );
};

export default RegisterForm;