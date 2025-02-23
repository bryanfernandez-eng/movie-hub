import axios from "axios";

const options = {
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.MOVIEDB_ACCESS_TOKEN_AUTH}`,
  },
};

export const getTrendingMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
      options
    );
    const data = res.data["results"];
    return data;
  } catch (error) {
    console.log("Error in getTrendingMovies:", error.message);
  }
};

export const getMovieDetails = async (movieId) => {
  console.log(movieId);

  try {
    console.log("yooooooooooo")

    const res = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`,
      options
    );
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in getMovieDetails:", error.message);
  }
};

export const getMoviesBySearch = async (query) => {
  try {
    const res = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`,
      options
    );
    const data = res.data;
    return data["results"];
  } catch (error) {
    console.log("Error in getMoviesBySearch:", error.message);
  }
};

export const getUpcomingMovies = async () => {
  try {
    const res = await axios.get(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    );
    const data = res.data["results"];
    console.log(data);
    return data;
  } catch (error) {
    console.log("Error in getUpcomingMovies:", error.message);
  }
};
