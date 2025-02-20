import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, "Please use a valid email address"],
    },
    password: {
      type: String,
      required: true,
    },
    movies: [
      {
        movieId: {
          type: Number,
          // required: true,
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
          min: 1,
          max: 10,
        },
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
