const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const User = require("../models/user");
const { createToken } = require("../utils/utils");

// registration route
router.post("/registration", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // create a new user
    const user = await User.create({ username, password });

    // generate a token
    const token = createToken(user._id);

    // set cookie with JWT
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "Lax", // cross-site requests
    });

    res
      .status(201)
      .json({ message: "User registered successfully", userId: user._id });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: err.message });
  }
});

// login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // authenticate user
    const user = await User.login(username, password);

    // generate a token
    const token = createToken(user._id);

    // set cookie with JWT
    res.cookie("jwt", token, {
      httpOnly: true,
      secure: false,
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days
      sameSite: "Lax", // cross-site requests
    });

    res.status(200).json({ message: "Login successful", userId: user._id });
  } catch (err) {
    if (
      err.message === "Incorrect username" ||
      err.message === "Incorrect password"
    ) {
      return res.status(401).json({ message: err.message });
    }

    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

// logout route
router.post("/logout", (req, res) => {
  // Clear the JWT cookie
  res.cookie("jwt", "", { httpOnly: true, maxAge: 1 }); // Set cookie to expire immediately
  res.status(200).json({ message: "Logged out successfully" });
});

// check status route for check authenticated or not
router.get("/status", (req, res) => {
  const token = req.cookies.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ authenticated: false, message: "Not logged in" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ authenticated: true, userId: decoded.id });
  } catch (err) {
    console.log("Error verifying token:", err.message);
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
});

module.exports = router;
