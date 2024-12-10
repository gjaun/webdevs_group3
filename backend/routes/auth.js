const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { createToken } = require("../utils/utils");

// Registration Route
router.post("/registration", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    // Create a new user
    const user = await User.create({ username, password });

    // Generate a JWT
    const token = createToken(user._id);

    // Return the token in the response
    res.status(201).json({ token, message: "User registered successfully" });
  } catch (err) {
    console.error("Error during registration:", err.message);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    // Authenticate user
    const user = await User.login(username, password);

    // Generate a JWT
    const token = createToken(user._id);

    // Return the token in the response
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    if (
      err.message === "Incorrect username" ||
      err.message === "Incorrect password"
    ) {
      return res.status(401).json({ message: err.message });
    }

    console.error("Error during login:", err.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Logout Route
router.post("/logout", (req, res) => {
  res.status(200).json({ message: "Logged out successfully" });
});

// Check Authentication Status
router.get("/status", (req, res) => {
  const authHeader = req.headers.authorization; // check Authorization header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ authenticated: false, message: "Not logged in" });
  }

  const token = authHeader.split(" ")[1]; // only get token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // jwt verification
    res.status(200).json({ authenticated: true, userId: decoded.id });
  } catch (err) {
    console.error("Error verifying token:", err.message);
    res.status(401).json({ authenticated: false, message: "Invalid token" });
  }
});

module.exports = router;
