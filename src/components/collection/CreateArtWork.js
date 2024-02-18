import React, { useState, useEffect } from "react";
import { fetchArtists, createArtWorkAPI } from "../../services/collectionAPI";
import { useTranslation } from "react-i18next";

const CreateArtWork = () => {
  const [registeredArtists, setRegisteredArtists] = useState([]);
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    ArtistID: "",
    Title: "",
    Description: "",
    Materials: "",
    Dimensions: "",
    CreationDate: "",
    Price: "",
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
      alert("Art Work created");
    } else {
      console.error("Error al crear la obra:", apiResponse.error);
    }
  };

  return (
    <div className="my-container-artwork">
            <h3 className="form-title">CREATE ARTWORK</h3>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="my-form"
      >
        <div className="my-form-group">
          <label htmlFor="Artist" className="my-label-form">
            {t("artists")}
          </label>
          <select
            className="my-select-form"
            name="ArtistID"
            value={formData.ArtistID}
            onChange={handleChange}
          >
            <option value="" disabled defaultValue>
              {t("selectArtist")}
            </option>
            {registeredArtists.map((artist) => (
              <option key={artist.ID} value={artist.ID}>
                {artist.Name}
              </option>
            ))}
          </select>
        </div>

        <div className="my-form-group">
          <label htmlFor="Title" className="my-label-form">
            {t("title")}
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
        <div className="my-form-group">
          <label htmlFor="Materials" className="my-label-form">
            {t("materials")}
          </label>
          <input
            type="text"
            className="my-input-form"
            name="Materials"
            value={formData.Materials}
            onChange={handleChange}
            required
          />
        </div>
        <div className="my-form-group">
          <label htmlFor="Dimensions" className="my-label-form">
            {t("dimensions")}
          </label>
          <input
            type="text"
            className="my-input-form"
            name="Dimensions"
            value={formData.Dimensions}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label htmlFor="Description" className="my-label-form">
            {t("description")}
          </label>
          <textarea
            className="my-textarea-form"
            rows="3"
            name="Description"
            value={formData.Description}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="my-form-group">
          <label htmlFor="CreationDate" className="my-label-form">
            {t("creationDate")}
          </label>
          <input
            type="date"
            className="my-input-form"
            name="CreationDate"
            value={formData.CreationDate}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label htmlFor="Price" className="my-label-form">
            {t("price")}
          </label>
          <input
            type="number"
            className="my-input-form"
            name="Price"
            value={formData.Price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="my-form-group">
          <label className="my-label-form" htmlFor="inputGroupFile01">
            {t("upload")}
          </label>
          <input type="file" className="my-input-form" name="Image" multiple />
        </div>

        <button type="submit" className="my-button-form">
          {t("createArt")}
        </button>
      </form>
    </div>
  );
};

export default CreateArtWork;
