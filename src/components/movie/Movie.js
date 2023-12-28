import React, { useState, useEffect } from "react";
import { getMovies } from "../../services/movieAPI"; 

export const Movie = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMoviesData = async () => {
      try {
        const response = await getMovies();
        const moviesData = await response.json();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMoviesData();
  }, []); 

  return (
    <div>
      <h1>All Movies</h1>
      {movies.map((movie) => (
        <div key={movie.id}>
          <h3>{movie.Title}</h3>
          <p>Description: {movie.Description}</p>
          <p>Release Date: {movie.ReleaseDate}</p>
          <p>Genre: {movie.Genre}</p>
          <video width="320" height="240" controls>
            <source src={movie.VideoURL} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <hr />
        </div>
      ))}
    </div>
  );
};
