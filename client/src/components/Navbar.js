// Navbar Component - Site navigation
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ user, isAdmin, onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Direct</span>
          <span className="logo-accent">Property</span>
        </Link>

        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
          <span className={`hamburger ${menuOpen ? 'active' : ''}`}></span>
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li>
            <Link
              to="/"
              className={`nav-link ${isActive('/') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/buyer"
              className={`nav-link ${isActive('/buyer') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Buy Property
            </Link>
          </li>
          <li>
            <Link
              to="/seller"
              className={`nav-link ${isActive('/seller') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              Sell Property
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`nav-link ${isActive('/about') ? 'active' : ''}`}
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          {isAdmin && (
            <li>
              <Link
                to="/admin"
                className={`nav-link ${isActive('/admin') ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                Admin
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <div className="user-menu">
              {!isAdmin && (
                <Link to="/dashboard" className="btn btn-outline">
                  Dashboard
                </Link>
              )}
              <button className="btn btn-outline" onClick={onLogout}>
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
