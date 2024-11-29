import React, { useState } from "react";
import axios from "axios";
import "./styles.css";
import MovieList from "./components/MovieList";
import ErrorMessage from "./components/ErrorMessage";

const App = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    const API_KEY = "9858b7c4"; // Replace with your OMDb API key
    const URL = `https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`;

    try {
      const response = await axios.get(URL);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
        setError("");
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      fetchMovies();
    } else {
      setError("Please enter a valid movie/show name.");
    }
  };

  return (
    <div className="app">
      <header>
        <h1>🎥🍿 usePopcorn</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search for movies or shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </header>

      {error ? <ErrorMessage message={error} /> : <MovieList movies={movies} />}
    </div>
  );
};

export default App;
