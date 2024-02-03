import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../../services/collectionAPI';
import './MovieForm.css'
const MovieForm = () => {
  const [, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Duration: '',
    Description: '',
    Director: '',
    ArtistID: '',
  });
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const artistsData = await fetchArtists();
      setArtists(artistsData);
    };

    fetchData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => {
      setAlert(null);
    }, 5000);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    try {
      setLoading(true);

      showAlert('Video created successfully', 'success');
  
    } catch (error) {
      console.error('Error creating video:', error.message);
      showAlert('Error creating video', 'error');
    } finally {
      setLoading(false);
      setProgress(0); 
    }
  };

  return (
    <div className="my-container">
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="my-form">
        <div className="my-form-group">
          <label htmlFor="VideoFile" className="my-label">
            Video File:
          </label>
          <input type="file" id="file" name="VideoFile" onChange={handleFileChange} className="my-input" />
        </div>
        <div className="my-form-group">
          <label htmlFor="Title" className="my-label">
            Title:
          </label>
          <input type="text" id="Title" name="Title" value={formData.Title} onChange={handleInputChange} className="my-input" />
        </div>
        <div className="my-form-group">
          <label htmlFor="Duration" className="my-label">
            Duration:
          </label>
          <input type="text" id="Duration" name="Duration" value={formData.Duration} onChange={handleInputChange} className="my-input" />
        </div>
        <div className="my-form-group">
          <label htmlFor="Description" className="my-label">
            Description:
          </label>
          <textarea id="Description" name="Description" value={formData.Description} onChange={handleInputChange} className="my-textarea"></textarea>
        </div>
        <div className="my-form-group">
          <label htmlFor="Director" className="my-label">
            Director:
          </label>
          <input type="text" id="Director" name="Director" value={formData.Director} onChange={handleInputChange} className="my-input" />
        </div>
        <div className="my-form-group">
          <label htmlFor="ArtistID" className="my-label">
            Artist:
          </label>
          <select id="ArtistID" name="ArtistID" value={formData.ArtistID} onChange={handleInputChange} className="my-select">
            <option value="" disabled>Select an artist</option>
            {artists.map(artist => (
              <option key={artist.ID} value={artist.ID}>
                {artist.Name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="my-button" disabled={loading}>
          {loading ? `Uploading... ${progress}%` : 'Create Video'}
        </button>

        {loading && (
          <div className="my-progress">
            <progress value={progress} max={100} />
            <span>{progress}%</span>
          </div>
        )}
      </form>
    </div>
  );
};

export default MovieForm;
