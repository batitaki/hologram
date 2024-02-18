import React, { useState } from 'react';
import { sendArtistApplication } from '../../../services/artistsAPI';
import ArtistApplicationForm from './ApplyFrom';

const ApplyForm = () => {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
    ArtistDetail: '',
    Image: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Image') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.files[0],
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiResponse = await sendArtistApplication(formData);

    if (apiResponse.success) {
      alert('Request sent correctly');
      setFormData({
        Name: '',
        Email: '',
        ArtistDetail: '',
        Image: null,
      });
    } else {
      console.error(apiResponse.error);
    }
  };

  return (
    <ArtistApplicationForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default ApplyForm;
