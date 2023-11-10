const getArtists = async () => {
  try {
    const artistAnswer = await fetch('http://localhost:3002/artistas/artistas');
    const data = await artistAnswer.json();
    return data;
  } catch (error) {
    console.error('Error getting artists');
    return [];
  }
};

export { getArtists };
