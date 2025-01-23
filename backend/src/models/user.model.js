import mongoose from "mongoose";
import { Movie } from "./movie.model.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  movies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
  }],
});

export const User = mongoose.model("User", userSchema);
