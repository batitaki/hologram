import React from 'react';

const ArtistApplicationForm = ({ formData, handleChange, handleSubmit }) => {
  return (
    <div className="my-container-apply">
      <h3 className="form-title">APPLY</h3>
      <div className="my-container-form">
        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="my-form-group">
            <label htmlFor="Name" className="my-label-form">Name</label>
            <input
              type="text"
              aria-label="First name"
              className="my-input-form"
              name="Name"
              value={formData.Nombre}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label htmlFor="Email" className="my-label-form">Email</label>
            <input
              type="email"
              aria-label="First name"
              className="my-input-form"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label htmlFor="ArtistDescription" className="my-label-form">Description</label>
            <input
              type="text"
              aria-label="First name"
              className="my-input-form"
              name="ArtistDescription"
              value={formData.ArtistDescription}
              onChange={handleChange}
            />
          </div>
          <div className="my-form-group">
            <label htmlFor="Image" className="my-label-form">Images</label>
            <input
              type="file"
              className="my-input-form"
              id="inputGroupFile01"
              name="Image"
              onChange={handleChange}
            />
          </div>
          <input type="submit" value="Enviar" className="my-button-form"/>
        </form>
      </div>
    </div>
  );
};

export default ArtistApplicationForm;
