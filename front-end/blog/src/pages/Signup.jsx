import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Trim inputs
    const trimmedUsername = formData.username.trim();
    const trimmedPassword = formData.password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setError("Username and password are required!");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        {
          username: trimmedUsername,
          password: trimmedPassword
        }
      );

      if (response.status === 201) {
        navigate("/login", { 
          state: { success: "Registration successful! Please login." } 
        });
      }
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="container py-5" style={{ maxWidth: "500px" }}>
      <h2 className="mb-4">Sign Up</h2>
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
          Sign Up
        </button>
      </form>

      <div className="mt-3 text-center">
        Already have an account?{" "}
        <a href="/login" className="text-decoration-none">
          Login here
        </a>
      </div>
    </div>
  );
}