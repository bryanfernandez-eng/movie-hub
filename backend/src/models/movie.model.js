import mongoose from "mongoose";

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: null,
  },
  description: {
    type: String,
    required: true,
    default: null,
  },
  posterImage: {
    type: String,
    required: true,
    default: null,
  },
  releaseDate: {
    type: Number,
    required: true,
    default: null,
  },
  hasWatched: {
    type: Boolean,
    default: false,
  },
  planToWatch: {
    type: Boolean,
    default: false,
  },
  rating: {
    type: Number,
    default: null,
    min: 0,
    max: 10,
  },
});

export const Movie = mongoose.model("Movie", movieSchema);
