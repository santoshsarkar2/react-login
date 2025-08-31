import { Link, useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getProfile } from '../services/authService';
//import API from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {

        // const res = await API.get('/profile', {
        //   headers: { Authorization: `Bearer ${token}` }
        // });
        const res = await getProfile();
        setProfile(res.data);
      } catch (err) {
        console.error('Profile fetch error:', err);
        alert('Session expired or unauthorized');
      }
    };
    fetchProfile();
  }, []);

  if (!profile) return <div className="container mt-5">Loading profile...</div>;

  return (

    <>
    <div className="container mt-4">
          <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
          <div className="row">
            {/* Card 1 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <h5 className="card-title">Users</h5>
                  <p className="card-text">Total Users: 1,234</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
            {/* Card 2 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <h5 className="card-title">Revenue</h5>
                  <p className="card-text">$12,345</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
            {/* Card 3 */}
            <div className="col-md-4 mb-4">
              <div className="card shadow hover:shadow-lg transition-shadow">
                <div className="card-body">
                  <h5 className="card-title">Performance</h5>
                  <p className="card-text">Uptime: 99.9%</p>
                  <a href="#" className="btn btn-primary">View Details</a>
                </div>
              </div>
            </div>
          </div>
          </div>
    







    <div className="container mt-5">
      <h2>Welcome, {profile.first_name}!</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{profile.first_name} {profile.last_name}</h5>
          <p className="card-text"><strong>Email:</strong> {profile.email}</p>
          <p className="card-text"><strong>Phone:</strong> {profile.phone_number}</p>
          <p className="card-text"><strong>Role:</strong> {profile.role}</p>
        </div>
      </div>
      <Link className="btn btn-danger btn-sm" onClick={() => {
        localStorage.clear();
        //navigate("/");
        //window.location.href = "/login";    
        window.location.reload();

      }}>
        Logout
      </Link>
      <Link to="/" className="btn btn-success btn-sm">Home</Link>
    </div></>
  );
}