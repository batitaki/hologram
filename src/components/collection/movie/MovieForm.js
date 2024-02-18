import React, { useState, useEffect } from 'react';
import { fetchArtists } from '../../../services/collectionAPI';
import { createMovie } from '../../../services/movieAPI';


const MovieForm = () => {
  const [videoFile, setVideoFile] = useState(null);
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

  const handleVideoFileChange = (event) => {
    setVideoFile(event.target.files[0]);
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

      const formDataWithFile = new FormData();
      formDataWithFile.append('VideoFile', videoFile);
      formDataWithFile.append('Title', formData.Title);
      formDataWithFile.append('Duration', formData.Duration);
      formDataWithFile.append('Description', formData.Description);
      formDataWithFile.append('Director', formData.Director);
      formDataWithFile.append('ArtistID', formData.ArtistID);

      const result = await createMovie(formDataWithFile);
      if (result.success) {
        showAlert('Video created successfully', 'success');
      } else {
        showAlert('Error creating video', 'error');
      }
    } catch (error) {
      console.error('Error creating video:', error.message);
      showAlert('Error creating video', 'error');
    } finally {
      setLoading(false);
      setProgress(0); 
    }
  };

  return (
    <div className="my-container-movie">
            <h3 className="form-title"> CREATE MOVIE </h3>
      {alert && (
        <div className={`alert ${alert.type}`}>
          {alert.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="my-container-form">
        <div className="my-form-group">
          <label htmlFor="Title" className="my-label-form">
            Title
          </label>
          <input type="text" id="Title" name="Title" value={formData.Title} onChange={handleInputChange} className="my-input-form" />
        </div>
        <div className="my-form-group">
          <label htmlFor="Duration" className="my-label-form">
            Duration
          </label>
          <input type="text" id="Duration" name="Duration" value={formData.Duration} onChange={handleInputChange} className="my-input-form" />
        </div>
        <div className="my-form-group">
          <label htmlFor="Description" className="my-label-form">
            Description
          </label>
          <textarea id="Description" name="Description" value={formData.Description} onChange={handleInputChange} className="my-textarea-form"></textarea>
        </div>
        <div className="my-form-group">
          <label htmlFor="Director" className="my-label-form">
            Director
          </label>
          <input type="text" id="Director" name="Director" value={formData.Director} onChange={handleInputChange} className="my-input-form" />
        </div>
        <div className="my-form-group">
          <label htmlFor="ArtistID" className="my-label-form">
            Artist:
          </label>
          <select id="ArtistID" name="ArtistID" value={formData.ArtistID} onChange={handleInputChange} className="my-select-form">
            <option value="" disabled>SELECT AN ARTIST</option>
            {artists.map(artist => (
              <option key={artist.ID} value={artist.ID}>
                {artist.Name}
              </option>
            ))}
          </select>
        </div>
        <div className="my-form-group">
          <label htmlFor="VideoFile" className="my-label-form">
            Video File
          </label>
          <input type="file" id="VideoFile" name="VideoFile" onChange={handleVideoFileChange} className="my-input-form" />
        </div>

        <button type="submit" className="my-button-form" disabled={loading}>
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
