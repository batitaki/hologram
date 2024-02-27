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

  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga

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

    setIsLoading(true); // Establecer isLoading en true al enviar la petición

    const apiResponse = await createUser(formData);

    setIsLoading(false); // Establecer isLoading en false al recibir la respuesta

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
      isLoading={isLoading} // Pasar isLoading al componente RegisterForm
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Register;
