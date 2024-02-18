import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../../../services/collectionAPI';
import { createSketch } from '../../../services/fetchSketch.js';

const CreateSketch = () => {
  const [registeredArtists, setRegisteredArtists] = useState([]);
  const [formData, setFormData] = useState({
    ArtistID: '',
    Title: '',
    Image: '',
    Instructions: '',
    Description: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      const artistsData = await fetchArtists();
      setRegisteredArtists(artistsData);
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    if (e.target.type === 'file') {
      setFormData({
        ...formData,
        [e.target.name]: e.target.files[0],
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('formData before submission:', formData);
    const formDataToSubmit = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
      formDataToSubmit.append(key, value);
    });

    const apiResponse = await createSketch(formDataToSubmit);

    if (apiResponse.success) {
      console.log(apiResponse.message);
      alert('Sketch created');
    } else {
      console.error('Error creating sketch:', apiResponse.error);
    }
  };

  return (
    <div className="my-container-register">
      <h3 className="form-title"> CREATE SKETCH </h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="my-form-form">
        <div className="my-form-group-form">
          <label htmlFor="Artist" className="my-label-form">
            ARTIST
          </label>
          <select
            className="my-select-form"
            name="ArtistID"
            value={formData.ArtistID}
            onChange={handleChange}
          >
            <option value="" disabled defaultValue>
              SELECT AN ARTIST
            </option>
            {registeredArtists.map((artist) => (
              <option key={artist.ID} value={artist.ID}>
                {artist.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="my-form-group-form">
          <label htmlFor="Title" className="my-label-form">
            TITLE
          </label>
          <input
            type="text"
            className="my-input-form"
            name="Title"
            value={formData.Title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group-form">
          <label htmlFor="Instructions" className="my-label-form">
            INSTRUCTIONS
          </label>
          <textarea
            className="my-textarea-form"
            name="Instructions"
            value={formData.Instructions}
            onChange={handleChange}
          />
        </div>

        <div className="my-form-group-form">
          <label htmlFor="Description" className="my-label-form">
            DESCRIPTION
          </label>
          <textarea
            className="my-textarea-form"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
          />
        </div>

        <div className="my-form-group-form">
          <label className="my-label-form" htmlFor="Image">
            IMAGE
          </label>
          <input
            type="file"
            className="my-input-form"
            name="Image"
            accept="image/*"
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="my-button-form">
          CREATE SKETCH
        </button>
      </form>
    </div>
  );
};

export default CreateSketch;
