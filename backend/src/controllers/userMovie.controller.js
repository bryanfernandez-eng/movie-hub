import { User } from "../models/user.model.js";

export const togglePlanToWatch = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing movieId parameter" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === parseInt(movieId)
    );

    if (movieIndex > -1) {
      user.movies[movieIndex].planToWatch =
        !user.movies[movieIndex].planToWatch;

      if (
        !user.movies[movieIndex].planToWatch &&
        !user.movies[movieIndex].hasWatched
      ) {
        user.movies.splice(movieIndex, 1);
      }
    } else {
      user.movies.push({
        movieId,
        planToWatch: true,
      });
    }

    await user.save();

    return res.status(200).json({ success: true, results: user });
  } catch (error) {
    console.log("Error in togglePlanToWatch controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const toggleWatched = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing movieId parameter" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === parseInt(movieId)
    );

    if (movieIndex > -1) {
      user.movies[movieIndex].hasWatched = !user.movies[movieIndex].hasWatched;

      if (
        !user.movies[movieIndex].hasWatched &&
        user.movies[movieIndex].rating
      ) {
        user.movies[movieIndex].rating = null;
      }

      if (
        !user.movies[movieIndex].planToWatch &&
        !user.movies[movieIndex].hasWatched
      ) {
        user.movies.splice(movieIndex, 1);
      }
    } else {
      user.movies.push({
        movieId,
        hasWatched: true,
      });
    }

    await user.save();

    return res.status(200).json({ success: true, results: user });
  } catch (error) {
    console.log("Error in toggleWatched controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const giveRating = async (req, res) => {
  const { rating } = req.query;
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing movieId parameter" });
    }

    if (
      !rating ||
      !Number.isInteger(parseInt(rating)) ||
      rating < 1 ||
      rating > 10
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid rating" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === parseInt(movieId)
    );

    if (movieIndex > -1 && user.movies[movieIndex].hasWatched) {
      user.movies[movieIndex].rating = parseInt(rating);
    } else {
      user.movies.push({
        movieId,
        hasWatched: true,
        rating: parseInt(rating),
      });
    }

    await user.save();

    return res.status(200).json({ success: true, results: user });
  } catch (error) {
    console.log("Error in rating controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const removeRating = async (req, res) => {
  const { movieId } = req.params;
  const userId = req.user._id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (!movieId) {
      return res
        .status(400)
        .json({ success: false, message: "Missing movieId parameter" });
    }

    const movieIndex = user.movies.findIndex(
      (movie) => movie.movieId === parseInt(movieId)
    );

    if (movieIndex > -1 && user.movies[movieIndex].hasWatched) {

      if(!user.movies[movieIndex].rating){
        return res.status(400).json({success: false, message: "Rating was already removed"});
      }

      user.movies[movieIndex].rating = null;
      await user.save();
      return res.status(200).json({ success: true, results: user });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "Movie not found or not watched" });
    }
  } catch (error) {
    console.log("Error in remove rating controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
