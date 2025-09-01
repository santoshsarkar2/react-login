import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../services/authService';

function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    console.log("Login submit called");
    console.log("Login :", form);
    e.preventDefault();
    try {
      //const res = await API.post('/login', form);
      const res = await login(form.email, form.password);
      localStorage.setItem('token', res.data.token);
      //alert('Login successful!');
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed: ' + err.response.data.error);
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