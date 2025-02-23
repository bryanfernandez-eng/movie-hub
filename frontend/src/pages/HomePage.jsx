import React, { useState, useEffect } from "react";
import { getTrendingMovies, searchMovies } from "../services/movieApi";
import MovieList from "../components/MovieList";
import Loader from "../components/Loader"
function HomePage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null); 
  

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
  }, []); 

  const onSearch = async () => {
    try {
      console.log(searchQuery)
      setLoading(true)
      const data = await searchMovies(searchQuery)
      setMovies(data); 
    } catch (error) {
      setError(error); 
    }
    finally{
      setLoading(false)
    }
  } 


  if (loading) return <div className="flex justify-center items-center h-screen"><Loader/></div>;
  if (error) return <div className="text-white">Error: {error}</div>;

  return (
    <div className="text-slate-200 w-full flex justify-center items-center my-10">
      <div className="max-w-4xl flex flex-col gap-6 justify-center items-center">
      <div className="flex gap-1 outline-slate-300 outline-1 rounded-md w-72">
        
        <input type="text" className="rounded-md w-72 px-2 py-0.5 text-sm focus:outline-none" placeholder="Search for movie" value={searchQuery} onChange={(e)=>{setSearchQuery(e.target.value)}}/>
        <button className="rounded bg-slate-700 py-0.5 px-2 cursor-pointer hover:bg-slate-800" onClick={()=>onSearch()}>Search</button>
      </div>

        {/* <p className="text-center font-bold text-xl underline">Trending Movies</p> */}
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default HomePage;
