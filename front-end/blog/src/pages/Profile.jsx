import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { Spinner, Alert } from "react-bootstrap";
import PostList from "../components/PostList";

export default function Profile() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/users/${userId}`);
        
        // Ensure response contains required data
        if (!res.data?.user) {
          throw new Error("Invalid profile data structure");
        }
        
        setProfileData({
          user: res.data.user,
          posts: res.data.posts || []
        });
        
      } catch (err) {
        console.error("Profile Error:", err);
        setError(err.response?.data?.message || "Failed to load profile");
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };
  
    if (userId && userId !== "null" && userId !== "undefined") {
      fetchProfile();
    } else {
      navigate("/login");
    }
  }, [userId, navigate]);

  if (loading) return <Spinner animation="border" className="d-block mx-auto mt-5" />;
  
  if (error) return (
    <div className="container mt-4">
      <Alert variant="danger">{error}</Alert>
      <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
    </div>
  );

  return (
    <div className="container py-5">
      {profileData?.user ? (
        <>
          {/* Profile Header */}
          <div className="card shadow-lg mb-5">
            <div className="card-body text-center">
              <h1 className="display-4 mb-4">{profileData.user.username}</h1>
              <p className="text-muted">
                Joined: {new Date(profileData.user.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Posts Section */}
          <h3 className="mb-4">Posts ({profileData.posts?.length || 0})</h3>
          {profileData.posts?.length > 0 ? (
            <PostList posts={profileData.posts} />
          ) : (
            <div className="alert alert-info">No posts found for this user</div>
          )}
        </>
      ) : (
        <div className="alert alert-warning">User data not available</div>
      )}
    </div>
  );
}
