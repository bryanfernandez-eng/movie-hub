import express from "express";
import dotenv from "dotenv/config";
import { connectDB } from "./config/db.js";
import {
  getTrendingMovies,
  getMovieDetails,
  getMoviesBySearch,
  getUpcomingMovies,
} from "./services/movieDb.service.js";
import userRoute from "./routes/user.route.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
})); 

app.use("/api/auth/", userRoute);

app.listen(PORT, () => {
  console.log("Server is running: http://localhost:" + PORT);
  connectDB();
  //   getMovieDetails(4567);
  // getTrendingMovies()
  // getMoviesBySearch("transformers 2")
  // getUpcomingMovies();
});
