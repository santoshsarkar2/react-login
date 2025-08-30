import React, { useEffect, useState } from 'react';
import {getProfile} from '../services/authService';
//import API from '../api';

export default function Dashboard() {
  const [profile, setProfile] = useState(null);
  const token = localStorage.getItem('token');
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

    token && <div className="container mt-5">
      <h2>Welcome, {profile.first_name}!</h2>
      <div className="card mt-3">
        <div className="card-body">
          <h5 className="card-title">{profile.first_name} {profile.last_name}</h5>
          <p className="card-text"><strong>Email:</strong> {profile.email}</p>
          <p className="card-text"><strong>Phone:</strong> {profile.phone_number}</p>
          <p className="card-text"><strong>Role:</strong> {profile.role}</p>
        </div>
      </div>
    </div>
  );
}