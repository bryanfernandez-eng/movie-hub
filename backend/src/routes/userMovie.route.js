import express from "express";
import { protectRoute } from "../middlewares/auth.middleware.js";
import {
  togglePlanToWatch,
  giveRating,
  toggleWatched,
  removeRating,
} from "../controllers/userMovie.controller.js";

const router = express.Router();

router.post("/watchlist/:movieId", protectRoute, togglePlanToWatch);
router.post("/watched/:movieId", protectRoute, toggleWatched);
router.post("/rate/:movieId", protectRoute, giveRating);
router.delete("/rate/:movieId", protectRoute, removeRating);

export default router;
