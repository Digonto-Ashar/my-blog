import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  // Get success message from signup redirect
  const successMessage = location.state?.success;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { username: trimmedUsername, password: trimmedPassword }
      );
  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        // Fix: Store userId directly without JSON.stringify
        localStorage.setItem("userId", response.data.user.id);
        console.log("Stored User ID:", response.data.user.id);
        
        // Fix: Force component refresh
        window.location.href = "/"; // Temporary fix until state management is added
      }
    } catch (err) {
      setError(err.response?.data?.message || "Invalid username or password!");
    }
  };
  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Login</h2>
      {successMessage && (
        <div className="alert alert-success">{successMessage}</div>
      )}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={formData.username}
            onChange={(e) => 
              setFormData({ ...formData, username: e.target.value })
            }
            required
          />
        </div>

        <div className="mb-4">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={formData.password}
            onChange={(e) => 
              setFormData({ ...formData, password: e.target.value })
            }
            required
          />
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Login
        </button>
      </form>
    </div>
  );
}