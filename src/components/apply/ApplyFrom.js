import React from 'react';

const ArtistApplicationForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <>
      <div className="aplicacion-artistas">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <br />
          <br />
          <br />
          Name
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            name="Name"
            value={formData.Nombre}
            onChange={handleChange}
          />
          <br />
          Email
          <input
            type="email"
            aria-label="First name"
            className="form-control"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
          <br />
          Description
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            name="ArtistDescription"
            value={formData.ArtistDescription}
            onChange={handleChange}
          />
          <br />
          Imagaes
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            name="Image"
            onChange={handleChange}
          />
          <input type="submit" value="Enviar" className="boton-submit" />
        </form>
      </div>
    </>
  );
};

export default ArtistApplicationForm;
