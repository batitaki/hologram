export const getMovies = async () => {
  try {
    const response = await fetch("http://localhost:3002/movies/movies");
    return response;
  } catch (error) {
    console.error("Error getting movies", error);
    return [];
  }
};

export const fetchMovies = async () => {
  try {
    const response = await fetch("http://localhost:3002/movies/createMovie");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al obtener artistas:", error);
    return [];
  }
};

export const createMovieAPI = async (formData) => {
  try {
    const response = await fetch("http://localhost:3002/movies/createMovie", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      // If the response is not OK, handle the error here
      const errorData = await response.text();
      console.error("Error creating the movie:", errorData);
      return { success: false, error: errorData };
    }

    // If the response is OK, parse the JSON
    const responseData = await response.json();
    return { success: true, message: responseData.message };
  } catch (error) {
    console.error("Error creating the movie:", error);
    return { success: false, error: "Error creating the movie" };
  }
};

export const getMovieById = async (movieId) => {
  try {
    const response = await fetch(
      `http://localhost:3002/movies/movies/${movieId}`
    );
    return response;
  } catch (error) {
    console.error(`Error fetching movie with ID ${movieId}:`, error);
    return null;
  }
};
