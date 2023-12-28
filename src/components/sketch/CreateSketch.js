import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../../services/collectionAPI';
import { createSketch } from '../../services/fetchSketch.js';
import './CreateSketch.css';

const CreateSketch = () => {
  const [registeredArtists, setRegisteredArtists] = useState([]);
  const [formData, setFormData] = useState({
    ArtistID: '',
    Title: '',
    Image:'',   
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
  <label className="my-label" htmlFor="Image">
    IMAGE
  </label>
  <input type="file" className="my-input" name="Image" accept="image/*" onChange={handleChange} />
</div>



        <button type="submit" className="my-button">
          CREATE SKETCH
        </button>
      </form>
    </div>
  );
};

export default CreateSketch;
