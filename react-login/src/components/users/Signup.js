import React, { useState } from 'react';
//import API from '../../services/api';
import {signup} from '../../services/authService';

function Signup() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', password: '', avatar: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      //await API.post('/signup', form);
        await signup(form.first_name, form.last_name, form.email, form.password, form.avatar);     

      alert('Signup successful!');
    } catch (err) {
      alert('Signup failed: ' + err.response.data.error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
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
    </div>
  );
}

export default Signup;