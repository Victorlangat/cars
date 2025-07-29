import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaCar, FaUserCog, FaInfoCircle, FaCog, FaSignOutAlt, FaTimes, FaBars } from 'react-icons/fa';
import logoImage from '../layout/linkalogo.png';

const Sidebar = () => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const navItems = [
    { path: "/", label: "Home", icon: <FaHome /> },
    { path: "/inventory", label: "Browse Cars", icon: <FaCar /> },
    { path: "/admin", label: "Admin Dashboard", icon: <FaUserCog /> },
    { path: "/about", label: "About Us", icon: <FaInfoCircle /> }
  ];
  
  return (
    <>
      {/* Mobile menu button */}
      <button 
        className="mobile-menu-toggle"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        aria-label="Toggle menu"
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>
      
      <div className={`sidebar ${isMobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-icon">
              <img src={logoImage} alt="Linnka Motors Logo" className="logo-image" />
            </div>
            <h2>Linnka Motors</h2>
          </div>
          <p>Premium Auto Dealership</p>
        </div>
        
        <div className="sidebar-menu">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`menu-item ${isActive(item.path) ? 'active' : ''}`}
              onClick={() => setIsMobileOpen(false)}
            >
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-label">{item.label}</span>
            </Link>
          ))}
        </div>
        
        <div className="sidebar-footer">
          
        </div>
      </div>
    </>
  );
};

export default Sidebar;