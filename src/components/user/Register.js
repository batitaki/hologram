import React, { useState } from 'react';
import { createUser } from '../../services/usersAPI';
import RegisterForm from './RegisterForm';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

const Register = () => {
  const [formData, setFormData] = useState({
    Username: '',
    Password: '',
    Email: '',
    DateOfBirth:'',
    PhoneNumber:'',
    Image: null,
  });

  const [crop, setCrop] = useState({ aspect: 1, width: 100, height: 100 });
  const [croppedImage, setCroppedImage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'Image') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: event.target.files[0],
      }));
      // Open crop interface automatically
      setCrop({ aspect: 1, width: 100, height: 100 });
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleCropChange = (newCrop) => {
    setCrop(newCrop);
  };

  const handleCropComplete = (croppedArea, croppedAreaPixels) => {
    if (croppedAreaPixels.width && croppedAreaPixels.height) {
      getCroppedImage(croppedAreaPixels);
    }
  };

  const getCroppedImage = (croppedAreaPixels) => {
    if (formData.Image && crop.width && crop.height) {
      const image = new Image();
      image.src = URL.createObjectURL(formData.Image);
      const canvas = document.createElement('canvas');
      canvas.width = crop.width;
      canvas.height = crop.height;
      const ctx = canvas.getContext('2d');

      image.onload = () => {
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          crop.width,
          crop.height
        );

        canvas.toBlob((blob) => {
          setCroppedImage(blob);
        }, 'image/jpeg');
      };
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Here you can use the croppedImage blob instead of formData.Image
    const apiResponse = await createUser({ ...formData, Image: croppedImage });

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
      setCroppedImage(null);
    } else {
      console.error(apiResponse.error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto' }}>
      <RegisterForm
        formData={formData}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
      {formData.Image && (
        <ReactCrop
          src={URL.createObjectURL(formData.Image)}
          crop={crop}
          onChange={handleCropChange}
          onComplete={handleCropComplete}
          style={{ maxWidth: '100%', maxHeight: '50vh' }}
        />
      )}
    </div>
  );
};

export default Register;
