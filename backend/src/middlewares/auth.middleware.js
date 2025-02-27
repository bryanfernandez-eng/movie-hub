import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token is required" });
    }

    let decodedToken;
    try {
      decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res
          .status(401)
          .json({ success: false, message: "Token has expired" });
      }
      return res
        .status(401)
        .json({ success: false, message: "Not authorized, token is invalid" });
    }

    const user = await User.findById(decodedToken.userId).select("-password");

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Not authorized, user not found" });
    }

    req.user = user;

    next();
  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
