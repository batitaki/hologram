import React, { useState } from 'react';
import './MovieForm.css';  // Asegúrate de tener estilos CSS para el formulario

const MovieForm = () => {
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({
    Title: '',
    Duration: '',
    Description: '',
    Director: '',
    ArtistID: '',
  });

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formDataWithFile = new FormData();
    formDataWithFile.append('VideoFile', file);
    formDataWithFile.append('Title', formData.Title);
    formDataWithFile.append('Duration', formData.Duration);
    formDataWithFile.append('Description', formData.Description);
    formDataWithFile.append('Director', formData.Director);
    formDataWithFile.append('ArtistID', formData.ArtistID);

    try {
      const response = await fetch('http://localhost:3002/movies/createMovie', {
        method: 'POST',
        body: formDataWithFile,
      });

      if (!response.ok) {
        throw new Error(`Error ${response.status} - ${response.statusText}`);
      }

      console.log('Video created successfully');
      // Puedes redirigir o realizar otras acciones después de crear el video
    } catch (error) {
      console.error('Error creating video:', error.message);
    }
  };

  return (
    <div>
      <h1>Create Video</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="file">Video File:</label>
          <input type="file" id="file" name="file" onChange={handleFileChange} />
        </div>
        <div>
          <label htmlFor="Title">Title:</label>
          <input type="text" id="Title" name="Title" value={formData.Title} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="Duration">Duration:</label>
          <input type="text" id="Duration" name="Duration" value={formData.Duration} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="Description">Description:</label>
          <textarea id="Description" name="Description" value={formData.Description} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="Director">Director:</label>
          <input type="text" id="Director" name="Director" value={formData.Director} onChange={handleInputChange} />
        </div>
        <div>
          <label htmlFor="ArtistID">Artist ID:</label>
          <input type="text" id="ArtistID" name="ArtistID" value={formData.ArtistID} onChange={handleInputChange} />
        </div>
        <button type="submit">Create Video</button>
      </form>
    </div>
  );
};

export default MovieForm;
