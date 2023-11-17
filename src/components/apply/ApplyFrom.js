import React from 'react';

const ArtistApplicationForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <>
      <div className="aplicacion-artistas">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <br />
          <br />
          <br />
          Nombre
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            name="Nombre"
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
          Descripcion
          <input
            type="text"
            aria-label="First name"
            className="form-control"
            name="DescripcionArtista"
            value={formData.DescripcionArtista}
            onChange={handleChange}
          />
          <br />
          Imagen
          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            name="Imagen"
            onChange={handleChange}
          />
          <input type="submit" value="Enviar" className="boton-submit" />
        </form>
      </div>
    </>
  );
};

export default ArtistApplicationForm;
