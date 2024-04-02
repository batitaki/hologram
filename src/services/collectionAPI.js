export const getCollection = async () => {
  try {
    const collectionAwnser = await fetch('https://holograma-3.onrender.com/artworks/artworks');
    const data = await collectionAwnser.json();
    return data;
  } catch (error) {
    console.error('Error getting collection', error);
    return [];
  } 
};

export const fetchArtists = async () => {
  try {
    const response = await fetch('https://holograma-3.onrender.com/artists/artists');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener artistas:', error);
    return [];
  }
};

export const createArtWorkAPI = async (formData) => {
  try {
    const response = await fetch('https://holograma-3.onrender.com/artworks/createArtwork', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, message: responseData.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    return { success: false, error: 'Error al enviar la solicitud' };
  }
};

export const getArtworkById = async (artworkId) => {
  try {
    const response = await fetch(`https://holograma-3.onrender.com/artworks/artworks/${artworkId}`); 
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching artwork with ID ${artworkId}:`, error);
    return null; 
  }
};

export const getArtworksByArtist = async (artistId) => {
  try {
    const response = await fetch(`https://holograma-3.onrender.com/artworks/byArtist/${artistId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching artworks for artist with ID ${artistId}:`, error);
    return [];
  }
};

export const fetchSketchData = async () => {
  try {
    const response = await fetch('https://holograma-3.onrender.com/artworks/sketches');
    const data = await response.json();
    console.log('Sketch Data:', data);
    return data;
  } catch (error) {
    console.error('Error fetching sketch data:', error);
    return [];
  }
};



export const createSketch = async (formData) => {
  try {
    const response = await fetch('https://holograma-3.onrender.com/artworks/createSketch', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      return { success: true, message: responseData.message };
    } else {
      const errorData = await response.json();
      return { success: false, error: errorData.error };
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
    return { success: false, error: 'Error al enviar la solicitud' };
  }
};

