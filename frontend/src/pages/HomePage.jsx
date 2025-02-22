import React, { useState, useEffect } from "react";
import { getTrendingMovies } from "../services/movieApi";
import MovieList from "../components/MovieList";
function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const data = await getTrendingMovies();
        setMovies(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []); // Empty dependency array

  console.log("Movies -- ", movies);

  if (loading) return <div className="text-white">Loading...</div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-slate-200 w-full flex justify-center items-center my-10">
      <div className="max-w-4xl flex flex-col gap-4 ">
        <p className="text-center font-bold text-xl underline">Trending Movies</p>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default HomePage;
