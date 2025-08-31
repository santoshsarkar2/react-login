import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" className="form-control mt-3" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mt-3" placeholder="Password" onChange={handleChange} required />
        <button className="btn btn-success mt-3">Login</button>
      </form>
    </div>
  );
}

export default Login;