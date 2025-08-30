// Home.js
import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="container mt-5">
      <h1>Welcome</h1>
      <Link to="/signup" className="btn btn-primary me-2">Signup</Link>
      <Link to="/login" className="btn btn-success">Login</Link>
    </div>
  );
}
