import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import CommentSection from "../components/CommentSection";

export default function SinglePost() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data);
        setError("");
      } catch (err) {
        setError("Failed to load post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/comments/${id}`);
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    };
    fetchComments();
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-4">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <article className="card shadow-lg animate__animated animate__fadeIn">
        <div className="card-body">
          <h1 className="card-title display-4 mb-4">{post.title}</h1>
          <div className="text-muted mb-4 d-flex gap-3 align-items-center">
            <span>By {post.author?.username}</span>
            <span>•</span>
            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          </div>
          <div 
            className="card-text fs-5 lh-base" 
            style={{ whiteSpace: "pre-wrap" }}
          >
            {post.content}
          </div>
        </div>
      </article>

      {/* Add CommentSection after post content */}
      <CommentSection 
        comments={comments}
        postId={id}
        onCommentAdded={(newComment) => setComments([...comments, newComment])}
      />
    </div>
  );
}
