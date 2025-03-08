import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Trim and validate username
    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      return res.status(400).json({ message: "Username and password required!" });
    }

    // Check existing user
    const existingUser = await User.findOne({ username: trimmedUsername });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists!" });
    }

    // Hash password
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Create user
    const newUser = new User({
      username: trimmedUsername,
      password: hashedPassword
    });
    
    await newUser.save();
    res.status(201).json({ message: "User created successfully!" });

  } catch (err) {
    console.error("Signup error:", err.message); // Log detailed error
    res.status(500).json({ 
      message: "Registration failed!",
      error: err.message // Send error details to frontend (for debugging)
    });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const trimmedUsername = username.trim();

    // Case-insensitive search
    const user = await User.findOne({ 
      username: { $regex: new RegExp(`^${trimmedUsername}$`, 'i') }
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Password validation
    const validPassword = bcrypt.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid credentials!" });
    }

    // Convert MongoDB ObjectId to string
    const userId = user._id.toString();

    // Generate JWT token
    const token = jwt.sign(
      { id: userId, username: user.username }, // Use string ID
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({ 
      token,
      user: { 
        id: userId, // Send string ID
        username: user.username 
      }
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Login failed",
      error: err.message 
    });
  }
});

export default router;
