import {
  getTrendingMovies,
  getMovieDetails,
  getMoviesBySearch,
  getUpcomingMovies,
} from "../services/movieDb.service.js";

export const fetchTrendingMovies = async (req, res) => {
  try {
    const data = await getTrendingMovies();
    return res.status(200).json({ success: true, results: data });
  } catch (error) {
    console.log("Error in fetchTrendingMovies controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const fetchUpcomingMovies = async (req, res) => {
  try {
    const data = await getUpcomingMovies();
    return res.status(200).json({ sucess: true, results: data });
  } catch (error) {
    console.log("Error in fetchUpcomingMovies controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const fetchMovieDetails = async (req, res) => {
  const { id } = req.params;

  try {
    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "Movie ID is required." });
    }

    const data = await getMovieDetails(id);
    return res.status(200).json({ sucess: true, results: data });
  } catch (error) {
    console.log("Error in fetchMovieDetails controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const fetchMoviesBySearch = async (req, res) => {
  const { query } = req.query;
  try {
    if (!query) {
      return res
        .status(400)
        .json({ success: false, message: "Query is required." });
    }

    const data = await getMoviesBySearch(query);
    return res.status(200).json({ sucess: true, results: data });
  } catch (error) {
    console.log("Error in fetchMovieDetails controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
