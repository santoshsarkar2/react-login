import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './components/users/Signup';
import Login from './components/users/Login';
import Dashboard from './pages/DashBoard';
import Home from './pages/Home';

const ProtectedRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />        
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />        
      </Routes>
    </Router>
  );
}

export default App;