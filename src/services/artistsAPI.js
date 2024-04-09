const getArtists = async () => {
  try {
    const artistAnswer = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/artists/artists`);
    const data = await artistAnswer.json();
    return data;
  } catch (error) {
    console.error('Error at getting artists');
    return [];
  }
};

const getArtistDetails = async (artistId) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_ENDPOINT}/artists/artistDetail/${artistId}`);
    if (response.ok) {
      const artistData = await response.json();
      return artistData;
    } else {
      console.error('Error fetching artist details');
      return null;
    }
  } catch (error) {
    console.error('Error fetching artist details', error);
    return null;
  }
};

const sendArtistApplication = async (formData) => {
  try {
    const apiEndpoint = `${process.env.REACT_APP_API_ENDPOINT}/artists/artistRequest`;
    const form = new FormData();

    for (const key in formData) {
      form.append(key, formData[key]);
    }

    const response = await fetch(apiEndpoint, {
      method: 'POST',
      body: form,
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Solicitud creada:', data);
      return { success: true, data };
    } else {
      console.error('Error al crear la solicitud');
      return { success: false, error: 'Error al crear la solicitud' };
    }
  } catch (error) {
    console.error('Error en la solicitud:', error);
    return { success: false, error: 'Error en la solicitud' };
  }
};

export { getArtists, getArtistDetails, sendArtistApplication };
