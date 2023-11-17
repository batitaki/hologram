export const getCollection = async () => {
  try {
    const collectionAwnser = await fetch('http://localhost:3002/obras/obras');
    const data = await collectionAwnser.json();
    return data;
  } catch (error) {
    console.error('Error getting collection', error);
    return [];
  } 
};

export const fetchArtistas = async () => {
  try {
    const response = await fetch('http://localhost:3002/obras/obraCreacion');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error al obtener artistas:', error);
    return [];
  }
};

export const createArtWorkAPI = async (formData) => {
  try {
    const response = await fetch('http://localhost:3002/obras/obraCreacion', {
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