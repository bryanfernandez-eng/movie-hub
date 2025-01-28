import express from "express";
import dotenv from "dotenv/config";
import { connectDB } from "./config/db.js";
import authRoute from "./routes/auth.route.js";
import movieRoute from "./routes/movie.route.js";
import userMovieRoute from "./routes/userMovie.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth/", authRoute);
app.use("/api/movies/", movieRoute);
app.use("/api/user-movie/", userMovieRoute);

app.listen(PORT, () => {
  console.log("Server is running: http://localhost:" + PORT);
  connectDB();
});
