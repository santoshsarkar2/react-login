import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const handleAuth = () => {
        setIsLoggedIn(!isLoggedIn);
      };

      return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-md">
          <div className="container-fluid">
            <a className="navbar-brand" href="#">React-Login</a>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link className="nav-link active" to="/dashboard">Home</Link>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Analytics</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Reports</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#">Settings</a>
                </li>
                <li className="nav-item">
                  <button
                    className="nav-link btn btn-link text-white"
                    onClick={handleAuth}
                  >
                    {isLoggedIn ? 'Logout' : 'Login'}
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      );
    }
export default Navbar;    
