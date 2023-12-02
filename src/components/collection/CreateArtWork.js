import React, { useState, useEffect } from 'react';
import { fetchArtists, createArtWorkAPI } from '../../services/collectionAPI';
import './CreateArtWork.css';

const CreateArtWork = () => {
  const [registeredArtists, setRegisteredArtists] = useState([]);
  const [formData, setFormData] = useState({
    ArtistID: '',
    Title: '',
    Description: '',
    Materials: '',
    Dimensions: '',
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
    console.log([...formDataToSubmit.entries()]); 
  
    const apiResponse = await createArtWorkAPI(formDataToSubmit);
  
    if (apiResponse.success) {
      console.log(apiResponse.message);
      alert('Art Work created');
    } else {
      console.error('Error al crear la obra:', apiResponse.error);
    }
  };
  
  return (
    <div className="my-container">
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-form">
        <div className="my-form-group">
          <label htmlFor="Artist" className="my-label">
            ARTIST
          </label>
          <select
            className="my-select"
            name="ArtistID"
            value={formData.ArtistID}
            onChange={handleChange}
          >
            <option value="" disabled defaultValue>
              Select an artist
            </option>
            {registeredArtists.map((artist) => (
              <option key={artist.ID} value={artist.ID}>
                {artist.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="my-form-group">
          <label htmlFor="Title" className="my-label">
            TITLE
          </label>
          <input
            type="text"
            className="my-input"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-form-group">
          <label htmlFor="Materials" className="my-label">
           MATERIALS
          </label>
          <input
            type="text"
            className="my-input"
            name="Materials"
            value={formData.Materials}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-form-group">
          <label htmlFor="Dimensions" className="my-label">
            DIMENSIONS
          </label>
          <input
            type="text"
            className="my-input"
            name="Dimensions"
            value={formData.Dimensions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label htmlFor="Description" className="my-label">
            DESCRIPTION
          </label>
          <textarea
            className="my-textarea"
            rows="3"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="my-form-group">
          <label htmlFor="CreationDate" className="my-label">
            CREATION DATE
          </label>
          <input
            type="date"
            className="my-input"
            name="CreationDate"
            value={formData.CreationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label htmlFor="Price" className="my-label">
            PRICE
          </label>
          <input
            type="number"
            className="my-input"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label className="my-label" htmlFor="inputGroupFile01">
            UPLOAD
          </label>
          <input type="file" className="my-input" name="Image" multiple />
        </div>

        <button type="submit" className="my-button">
          CREATE ARTWORK
        </button>
      </form>
    </div>
  );
};

export default CreateArtWork;
