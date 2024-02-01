import React from 'react';
import './RegisterForm.css'

const RegisterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    
    <div className="my-container">
      <div className="my-form-container">
        <form className="my-form" onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="my-form-group">
            <label className="my-label" htmlFor="Username">
              USERNAME
            </label>
            <input
              type="text"
              className="my-input"
              name="Username"
              value={formData.Username}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label className="my-label" htmlFor="Password">
              PASSWORD
            </label>
            <input
              type="password"
              className="my-input"
              name="Password"
              value={formData.Password}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label className="my-label" htmlFor="Email">
              EMAIL
            </label>
            <input
              type="email"
              className="my-input"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label className="my-label" htmlFor="DateOfBirth">
              DATE OF BIRTH
            </label>
            <input
              type="date"
              className="my-input"
              name="DateOfBirth"
              value={formData.DateOfBirth}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label className="my-label" htmlFor="PhoneNumber">
              PHONE NUMBER
            </label>
            <input
              type="tel"
              className="my-input"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label className="my-label" htmlFor="Image">
              IMAGES
            </label>
            <input
              type="file"
              className="my-input"
              id="inputGroupFile01"
              name="Image"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Enviar" className="my-button" />
        </form>
      </div>
    </div>

  );
};

export default RegisterForm;
