import { Link, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [authState, setAuthState] = useState({
    token: localStorage.getItem('token'),
    userId: localStorage.getItem('userId')
  });

  useEffect(() => {
    const handleStorageChange = () => {
      setAuthState({
        token: localStorage.getItem('token'),
        userId: localStorage.getItem('userId')
      });
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Update state immediately
    setAuthState({ token: null, userId: null });
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary shadow-sm">
      <div className="container">
        <Link to="/" className="navbar-brand">My Blog</Link>
        
        <div className="ms-auto">
          {authState.token ? (
            <>
              {authState.userId && (
                <Link to={`/profile/${authState.userId}`} className="btn btn-outline-primary me-2">
                  Profile
                </Link>
              )}
              <Link to="/create" className="btn btn-success me-2">New Post</Link>
              <Button variant="outline-danger" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
              <Link to="/signup" className="btn btn-primary">Signup</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}