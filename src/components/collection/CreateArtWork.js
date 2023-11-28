import React, { useState, useEffect } from 'react';
import { fetchArtists, createArtWorkAPI } from '../../services/collectionAPI';

const CreateArtWork = () => {
  const [registeredArtists, setRegisteredArtists] = useState([]);
  const [formData, setFormData] = useState({
    ArtistID: '',
    Title: '',
    Description: '',
    CreationDate: '',
    Price: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const artistsData = await fetchArtists();
      setRegisteredArtists(artistsData);
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
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="mb-3">
          <label htmlFor="Artist" className="form-label">
          </label>
          <select
            className="form-select"
            name="ArtistID"
            value={formData.ArtistID}
            onChange={handleChange}
          >
          <option value="" disabled selected>
            select an artist
          </option>
          {registeredArtists.map((artist) => (
          <option key={artist.ID} value={artist.ID}>
          {artist.Name}
    </option>
  ))}
</select>
        </div>

        <div className="mb-3">
          <label htmlFor="Title" className="form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Description" className="form-label">
            Description
          </label>
          <textarea
            className="form-control"
            rows="3"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="CreationDate" className="form-label">
            Creation Date
          </label>
          <input
            type="date"
            className="form-control"
            name="CreationDate"
            value={formData.CreationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="Precio" className="form-label">
            Price
          </label>
          <input
            type="number"
            className="form-control"
            name="Price"
            value={formData.Price}
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
            name="Image"
            multiple
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Create Artwork 
        </button>
      </form>
    </div>
  );
};

export default CreateArtWork;
