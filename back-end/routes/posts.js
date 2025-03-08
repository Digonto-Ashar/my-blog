import { Router } from "express";
import Post from "../models/Post.js";
import verifyToken from "../middleware/verifyToken.js"; // Middleware to check JWT

const router = Router();

// Create a post (protected route)
router.post("/", verifyToken, async (req, res) => {
  try {
    const post = new Post({ ...req.body, author: req.user.id });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate("author", "username");
    res.json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get single post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username") // Include author details
      .exec();

    if (!post) {
      return res.status(404).json({ message: "Post not found!" });
    }

    res.json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
