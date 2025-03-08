import express from "express";
import Comment from "../models/Comment.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

// Add comment
router.post("/:postId", verifyToken, async (req, res) => {
  try {
    const comment = new Comment({
      text: req.body.text,
      author: req.user.id,
      post: req.params.postId
    });

    const savedComment = await comment.save();
    
    // Add comment to post
    await Post.findByIdAndUpdate(
      req.params.postId,
      { $push: { comments: savedComment._id } }
    );

    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get comments for post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId })
      .populate("author", "username");
    res.json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;