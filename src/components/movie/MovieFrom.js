import React, { useState, useEffect } from "react";
import { createMovieAPI, fetchMovies } from "../../services/movieAPI";
import "./Movie.css";
import { useTranslation } from "react-i18next";

const MovieForm = () => {
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    Title: "",
    Description: "",
    ReleaseDate: "",
    Genre: "",
    ArtistID: "",
    Duration: "",
    ThumbnailURL: "",
    VideoURL: null,
  });

  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const fetchArtistsData = async () => {
      try {
        const artistsData = await fetchMovies();
        setArtists(artistsData);
      } catch (error) {
        console.error("Error fetching artists", error);
      }
    };

    fetchArtistsData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const response = await createMovieAPI(formDataToSend);

      if (response.success) {
        console.log("Movie created successfully!");
      } else {
        console.error("Error creating the movie:", response.error);
      }
    } catch (error) {
      console.error("Error creating the movie", error);
    }
  };

  return (
    <form
      className="movie-form"
      onSubmit={handleSubmit}
      encType="multipart/form-data"
    >
      <label>
        {t("Title")}
        <input
          type="text"
          name="Title"
          value={formData.Title}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Description")}
        <textarea
          name="Description"
          value={formData.Description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Release Date")}
        <input
          type="date"
          name="ReleaseDate"
          value={formData.ReleaseDate}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Genre")}
        <input
          type="text"
          name="Genre"
          value={formData.Genre}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Artist")}
        <select
          name="ArtistID"
          value={formData.ArtistID}
          onChange={handleInputChange}
        >
          <option value="" disabled>
            Select an artist
          </option>
          {artists.map((artist) => (
            <option key={artist.ID} value={artist.ID}>
              {artist.Name}
            </option>
          ))}
        </select>
      </label>
      <label>
        {t("Duration")}
        <input
          type="text"
          name="Duration"
          value={formData.Duration}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Thumbnail URL")}
        <input
          type="text"
          name="ThumbnailURL"
          value={formData.ThumbnailURL}
          onChange={handleInputChange}
        />
      </label>
      <label>
        {t("Video File")}
        <input type="file" className="my-input" name="VideoURL" multiple />
      </label>
      <button type="submit">{t("Upload Movie")}</button>
    </form>
  );
};

export default MovieForm;
