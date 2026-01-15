// Footer Component - Site footer
import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Brand Section */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="logo-text">Direct</span>
              <span className="logo-accent">Property</span>
            </Link>
            <p className="footer-description">
              Your trusted partner in finding the perfect property. 
              We connect buyers and sellers for seamless real estate transactions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/buyer">Buy Property</Link></li>
              <li><Link to="/seller">Sell Property</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          {/* Property Types */}
          <div className="footer-links">
            <h4>Property Types</h4>
            <ul>
              <li><Link to="/buyer">Agricultural Land</Link></li>
              <li><Link to="/buyer">Residential Land</Link></li>
              <li><Link to="/buyer">Industrial Land</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-contact">
            <h4>Contact Us</h4>
            <ul>
              <li>
                KIT - Coimbatore
              </li>
              <li>
                kit28.24bad049@gmail.com
              </li>
              <li>
                8015450751
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <p>&copy; {currentYear} Direct Property. All rights reserved.</p>
          <div className="footer-developer">
            <span>Developed by </span>
            <span className="developer-credit">GowthamGowri M</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
