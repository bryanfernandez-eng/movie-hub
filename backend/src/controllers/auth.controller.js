import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import { generateToken } from "../config/utils.js";

export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Check if all required fields are provided
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required." });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email is in a valid format
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid email." });
    }

    const existingUser = await User.findOne({ email });

    // Check if the user already exists
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ email, password: hashedPassword, name });

    // Save the new user to the database and generate a JWT token for authentication
    if (newUser) {
      await newUser.save();
      generateToken(newUser._id, res);
      res
        .status(201)
        .json({ success: true, message: "User created successfully." });
    } else {
      res.status(400).json({ success: false, message: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in signup controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "All fields required." });
    }

    const user = await User.findOne({ email });

    // Check if email exists
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Check if password is correct
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    generateToken(user._id, res);

    return res
      .status(200)
      .json({ success: true, message: "Login successful." });
  } catch (error) {
    console.log("Error in login controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const logout = async (req, res) => {
  console.log("logout");
  try {
    console.log("B4: ", req.cookies);
    res.cookie("jwt", "", {
      maxAge: 0,
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });
    console.log("Cookie cleared");
    console.log("After: ", req.cookies);
    return res
      .status(200)
      .json({ success: true, message: "Logout successful." });
  } catch (error) {
    console.log("Error in logout controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    await User.findByIdAndDelete(user._id);

    res.cookie("jwt", "", { maxAge: 0 });
    return res
      .status(200)
      .json({ success: true, message: "Account deleted successfully." });
  } catch (error) {
    console.log("Error in deleteAccount controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

export const checkAuth = async (req, res) => {
  try {
    return res.status(200).json({ success: true, user: req.user });
  } catch (error) {
    console.log("Error in checkAuth controller:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
