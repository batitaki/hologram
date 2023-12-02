import React, { useState } from 'react';
import { createUser } from '../../services/fetchUsers';
import '../collection/CreateArtWork.css'; 

export const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    FirstName: '',
    LastName: '',
    DateOfBirth: '',
    Address: '',
    PhoneNumber: '',
    ProfileImageURL: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await createUser(formData);
      if (result.success) {
        console.log('Usuario creado exitosamente:', result.message);
      } else {
        console.error('Error al crear usuario:', result.error);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="my-container">
      <form onSubmit={handleSubmit} className="my-form">
        <label htmlFor="Username" className="my-label">
          Username:
        </label>
        <input
          type="text"
          id="Username"
          name="Username"
          value={formData.Username}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="Email" className="my-label">
          Email:
        </label>
        <input
          type="email"
          id="Email"
          name="Email"
          value={formData.Email}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="Password" className="my-label">
          Password:
        </label>
        <input
          type="password"
          id="Password"
          name="Password"
          value={formData.Password}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="FirstName" className="my-label">
          First Name:
        </label>
        <input
          type="text"
          id="FirstName"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="LastName" className="my-label">
          Last Name:
        </label>
        <input
          type="text"
          id="LastName"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="DateOfBirth" className="my-label">
          Date of Birth:
        </label>
        <input
          type="date"
          id="DateOfBirth"
          name="DateOfBirth"
          value={formData.DateOfBirth}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="Address" className="my-label">
          Address:
        </label>
        <input
          type="text"
          id="Address"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="PhoneNumber" className="my-label">
          Phone Number:
        </label>
        <input
          type="tel"
          id="PhoneNumber"
          name="PhoneNumber"
          value={formData.PhoneNumber}
          onChange={handleChange}
          required
          className="my-input"
        />

        <label htmlFor="ProfileImageURL" className="my-label">
          Profile Image URL:
        </label>
        <input
          type="text"
          id="ProfileImageURL"
          name="ProfileImageURL"
          value={formData.ProfileImageURL}
          onChange={handleChange}
          className="my-input"
        />

        <button type="submit" className="my-button">
          Register
        </button>
      </form>
    </div>
  );
};
