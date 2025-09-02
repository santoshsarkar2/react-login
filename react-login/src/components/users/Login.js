import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Validate form inputs
    if (!form.email || !form.password) {
      throw new Error('Email and password are required');
    }

    const res = await login(form.email, form.password);
    
    // Check if response exists
    if (!res) {
      throw new Error('No data returned from login');
    }

    console.log('Login response:', res); // Log the response (e.g., { token, user })
    localStorage.setItem('token', res.token); // Access token directly
    navigate('/dashboard');
  } catch (error) {
    // Safely handle errors
    const errorMessage = error.message || 'An unknown error occurred';
    console.error('Login failed:', errorMessage);
    alert(`Login failed: ${errorMessage}`);
  }
};

  return (
    
    <div className="d-flex justify-content-center mt-5 ">
    <div style={{ width: "25rem" }} className="card p-4 shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <div className="mb-3">
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" className="form-control mt-3" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mt-3" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success mt-3">Login</button>
      </form>
      <p className="mt-3 text-center">
            Don't have an account?{' '}
            <Link to="/signup"  className="text-primary">
              Sign up
            </Link>
          </p>
    </div>
    </div></div>
    /*
<div className="d-flex justify-content-center mt-5 ">
    <div style={{ width: "25rem" }} className="card p-4 shadow-lg"  >
          <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100 mt-3"
            onClick={handleSubmit}
          >
            Login
          </button>
          <p className="mt-3 text-center">
            Don't have an account?{' '}
            <Link to="/signup"  className="text-primary">
              Sign up
            </Link>
          </p>
        </div></div>
        */
    
   
  );
}

export default Login;