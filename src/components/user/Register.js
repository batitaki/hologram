import React, { useState } from 'react';
import { createUser } from '../../services/usersAPI';
import RegisterForm from './RegisterForm';

const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    DateOfBirth:'',
    PhoneNumber:'',
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

    const apiResponse = await createUser (formData);

    if (apiResponse.success) {
      alert('Request sent correctly');
      setFormData({
        Username: '',
        Password: '',
        Email: '',
        DateOfBirth:'',
        PhoneNumber:'',
        Image: null,
      });
    } else {
      console.error(apiResponse.error);
    }
  };

  return (
    <RegisterForm
      formData={formData}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
