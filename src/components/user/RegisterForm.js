import React from 'react';

const RegisterForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    
    <div className="my-container-register">
      <h3 className="form-title">SIGN UP</h3>
      <div className="my-form-container-form">
        <form className="my-form-form" onSubmit={handleSubmit} encType="multipart/form-data">
          {/* Aquí van los otros campos del formulario */}
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
          {/* Aquí muestra la imagen recortada si está disponible */}
          {formData.Image && (
            <img
              src={URL.createObjectURL(formData.Image)}
              alt="Cropped"
              className="cropped-image"
            />
          )}
          <input type="submit" value="Enviar" className="my-button-form" />
        </form>
      </div>
    </div>

  );
};

export default RegisterForm;
