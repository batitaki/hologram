import React, { useState, useEffect } from 'react';
import { fetchArtistas, createArtWorkAPI } from '../../services/collectionAPI';

const CreateArtWork = () => {
  const [artistasRegistrados, setArtistasRegistrados] = useState([]);
  const [formData, setFormData] = useState({
    IDArtista: '',
    Titulo: '',
    Descripcion: '',
    FechaCreacion: '',
    Precio: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const artistasData = await fetchArtistas();
      setArtistasRegistrados(artistasData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSubmit = new FormData(e.target);
    const apiResponse = await createArtWorkAPI(formDataToSubmit);

    if (apiResponse.success) {
      console.log(apiResponse.message);
      alert('Art Work created');
    } else {
      console.error('Error al crear la obra:', apiResponse.error);
    }
  };

  return (
    <div className="container">
      <h3 className="nuevaObra">New ARTWORK</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="Artista" className="form-label">
            Artista  
          </label>
          <select
            className="form-select"
            id="ArtistaId"
            name="IDArtista"
            value={formData.IDArtista}
            onChange={handleChange}
            required
          >
            <option value="" disabled selected>
              Selecciona un artista
            </option>
            {artistasRegistrados.map((artista) => (
              <option key={artista.ID} value={artista.ID}>
                {artista.Nombre}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="Titulo" className="form-label">
            Título
          </label>
          <input
            type="text"
            className="form-control"
            id="Titulo"
            name="Titulo"
            value={formData.Titulo}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Descripcion" className="form-label">
            Descripción
          </label>
          <textarea
            className="form-control"
            id="Descripcion"
            rows="3"
            name="Descripcion"
            value={formData.Descripcion}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="FechaCreacion" className="form-label">
            Fecha de Creación
          </label>
          <input
            type="date"
            className="form-control"
            id="FechaCreacion"
            name="FechaCreacion"
            value={formData.FechaCreacion}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Precio" className="form-label">
            Precio
          </label>
          <input
            type="number"
            className="form-control"
            id="Precio"
            name="Precio"
            value={formData.Precio}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group mb-3">
          <label className="input-group-text" htmlFor="inputGroupFile01">
            Upload
          </label>

          <input
            type="file"
            className="form-control"
            id="inputGroupFile01"
            name="Imagen"
            multiple
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Crear Obra de Arte
        </button>
      </form>
    </div>
  );
};

export default CreateArtWork;
