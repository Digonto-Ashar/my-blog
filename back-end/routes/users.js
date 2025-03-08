import express from "express";
import User from "../models/User.js";
import Post from "../models/Post.js";

const router = express.Router();

// Get user profile
router.get("/:userId", async (req, res) => {
  try {
    console.log("[Backend] Fetching user:", req.params.userId);
    
    const user = await User.findById(req.params.userId).select("-password");
    if (!user) {
      console.log("[Backend] User not found");
      return res.status(404).json("User not found");
    }

    const posts = await Post.find({ author: user._id });
    console.log("[Backend] Found posts:", posts.length);
    
    res.json({ user, posts });
  } catch (err) {
    console.error("[Backend] Profile Error:", err);
    res.status(500).json(err);
  }
});

export default router;