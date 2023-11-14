import React, { useState } from 'react';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    Nombre: '',
    Email: '',
    DescripcionArtista: '',
    Imagen: null, // Assuming this field is for file upload
  });
  const handleChange = (event) => {
    const { name, value } = event.target;
  
    if (name === 'Imagen') {
      setFormData({
        ...formData,
        [name]: event.target.files[0],  // Usar files para el campo de imagen
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const apiEndpoint = 'http://localhost:3002/artistas/aplicacionArtistas';
      const form = new FormData();

      for (const key in formData) {
        form.append(key, formData[key]);
      }

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Solicitud creada:', data);
        // Perform actions on successful response
      } else {
        console.error('Error al crear la solicitud');
        // Handle error if the request is not successful
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      // Handle network or other errors
    }
  };

  return (
    <>
    <div className="aplicacion-artistas">
  <form onSubmit={handleSubmit} encType="multipart/form-data">
  {/* ... rest of your form code ... */}
  <br></br>
  <br></br>
  <br></br>
  Nombre
  <input
    type="text"
    aria-label="First name"
    className="form-control"
    name="Nombre"
    value={formData.Nombre}
    onChange={handleChange}
  />
  <br></br>
Email
    <input
    type="email"
    aria-label="First name"
    className="form-control"
    name="Email"
    value={formData.Email}
    onChange={handleChange}
  />
  <br></br>
  Descripcion
     <input
    type="text"
    aria-label="First name"
    className="form-control"
    name="DescripcionArtista"
    value={formData.DescripcionArtista}
    onChange={handleChange}
  />
  <br></br>
  Imagen
  {/* ... other form fields ... */}
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

export default ApplyForm;
