import React from 'react';
import { Link } from 'react-router-dom';

export default function PostList({ posts }) {
  return (
    <div className="row g-4 mt-2">
      {posts.map(post => (
        <div className="col-md-6" key={post._id}>
          <div className="card h-100 shadow-sm">
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text text-muted">
                {post.content.substring(0, 100)}...
              </p>
              <Link to={`/posts/${post._id}`} className="btn btn-primary">
                Read More
              </Link>
            </div>
            <div className="card-footer text-muted">
              By {post.author?.username} • {new Date(post.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
