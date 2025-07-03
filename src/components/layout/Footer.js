// src/components/layout/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <div className="footer-section">
          <h3>AutoElite</h3>
          <p>Your premier destination for luxury and performance vehicles. We offer exceptional quality and service for all automotive needs.</p>
          <div className="social-links">
            <a href="#"><i className="fab fa-facebook-f"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/inventory">Browse Inventory</Link></li>
            <li><Link to="/admin">Admin Dashboard</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="footer-links">
            <li><i className="fas fa-map-marker-alt"></i> 123 Auto Boulevard, Detroit, MI</li>
            <li><i className="fas fa-phone"></i> (555) 123-4567</li>
            <li><i className="fas fa-envelope"></i> info@autoelite.com</li>
            <li><i className="fas fa-clock"></i> Mon-Fri: 9AM - 7PM, Sat: 10AM - 5PM</li>
          </ul>
        </div>
      </div>
      
      <div className="copyright">
        <p>&copy; 2023 AutoElite Dealership. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;