import { useState } from "react";
import axios from "axios";

export default function CommentSection({ comments, postId, onCommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5000/api/comments/${postId}`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      onCommentAdded(res.data);
      setNewComment("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };

  return (
    <div className="mt-5">
      <h3 className="mb-4">Comments ({comments.length})</h3>
      
      {token && (
        <form onSubmit={handleSubmit} className="mb-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="form-control mb-2"
            placeholder="Write a comment..."
            rows="3"
            required
          />
          <button type="submit" className="btn btn-primary">
            Post Comment
          </button>
        </form>
      )}

      <div className="comment-list">
        {comments.map(comment => (
          <div key={comment._id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex align-items-center gap-2 mb-2">
                <strong>{comment.author.username}</strong>
                <span className="text-muted small">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="mb-0">{comment.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}