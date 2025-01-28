import express from "express";
import {
  fetchMoviesBySearch,
  fetchTrendingMovies,
  fetchUpcomingMovies,
  fetchMovieDetails,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/trending", fetchTrendingMovies);
router.get("/upcoming", fetchUpcomingMovies);
router.get("/:id", fetchMovieDetails);
router.get("/search", fetchMoviesBySearch);

export default router;
