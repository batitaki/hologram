const getArtists = async () => {
  try {
    const artistAnswer = await fetch('http://localhost:3002/artistas/artistas');
    const data = await artistAnswer.json();
    return data;
  } catch (error) {
    console.error('Error at getting artists');
    return [];
  }
};

const getArtistDetails = async (artistId) => {
  try {
      const response = await fetch(`http://localhost:3002/artistas/detalleArtista/${artistId}`);
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

export { getArtists, getArtistDetails };
