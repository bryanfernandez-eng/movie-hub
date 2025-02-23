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
router.get("/search", fetchMoviesBySearch);

router.get("/:id", fetchMovieDetails);

export default router;
