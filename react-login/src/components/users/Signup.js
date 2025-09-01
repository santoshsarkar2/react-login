import React, { useState } from 'react';
//import API from '../../services/api';
import {signup} from '../../services/authService';
import { Link, useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '', avatar: ''
  });
  const navigate = useNavigate();

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      //await API.post('/signup', form);
        await signup(form.first_name, form.last_name, form.email, form.password, form.avatar);    
      alert('Signup successful!');
      navigate('/login');
    } catch (err) {
      alert('Signup failed: ' + err.response.data.error);
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">      
      <div className="card p-4 shadow-lg">        
        <h2 className="text-2xl font-bold mb-4 text-center">Signup</h2>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col">
            <input name="first_name" className="form-control" placeholder="First Name" onChange={handleChange} required />
          </div>
          <div className="col">
            <input name="last_name" className="form-control" placeholder="Last Name" onChange={handleChange} required />
          </div>
        </div>
        <input name="email" type="email" className="form-control mt-3" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" className="form-control mt-3" placeholder="Password" onChange={handleChange} required />
        <input name="avatar" className="form-control mt-3" placeholder="Avatar URL" onChange={handleChange} />
        <button className="btn btn-primary mt-3">Signup</button>
      </form>
      <p className="mt-3 text-center">
            Already have an account?{' '}
            <Link to="/login" className="text-primary">
              Login
            </Link>
          </p>
    </div></div>
  );
}

export default Signup;