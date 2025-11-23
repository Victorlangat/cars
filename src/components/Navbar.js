import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { FaCar } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock authentication state
  const isAuthenticated = false;
  const user = isAuthenticated ? { name: 'John Doe' } : null;

  const handleLogout = () => {
    console.log('Logging out...');
    setIsUserMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo and Brand */}
        <RouterLink to="/" className="navbar-brand" onClick={closeMenus}>
          <FaCar className="brand-logo" />
          <span className="brand-text">AutoMarket</span>
        </RouterLink>

        {/* Desktop Navigation */}
        <div className="nav-links">
          <RouterLink to="/" className="nav-link">Home</RouterLink>
          <RouterLink to="/search" className="nav-link">Browse Cars</RouterLink>
          <RouterLink to="/sell" className="nav-link">Sell Your Car</RouterLink>
          
          {isAuthenticated ? (
            <>
              <RouterLink to="/inbox" className="nav-link">Inbox</RouterLink>
              <div className="user-menu">
                <div className="user-avatar" onClick={toggleUserMenu}>
                  {user?.name?.charAt(0)}
                </div>
                {isUserMenuOpen && (
                  <div className="user-dropdown">
                    <RouterLink 
                      to="/profile" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Profile
                    </RouterLink>
                    <RouterLink 
                      to="/my-listings" 
                      className="dropdown-item"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      My Listings
                    </RouterLink>
                    <button 
                      className="dropdown-item" 
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <RouterLink to="/login" className="nav-button nav-button-ghost">
                Login
              </RouterLink>
              <RouterLink to="/register" className="nav-button nav-button-solid">
                Sign Up
              </RouterLink>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-button"
          onClick={toggleMobileMenu}
        >
          ☰
        </button>
      </div>

      {/* Mobile Navigation */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <RouterLink to="/" className="nav-link" onClick={closeMenus}>Home</RouterLink>
          <RouterLink to="/search" className="nav-link" onClick={closeMenus}>Browse Cars</RouterLink>
          <RouterLink to="/sell" className="nav-link" onClick={closeMenus}>Sell Your Car</RouterLink>
          
          {isAuthenticated ? (
            <>
              <RouterLink to="/inbox" className="nav-link" onClick={closeMenus}>Inbox</RouterLink>
              <RouterLink to="/profile" className="nav-link" onClick={closeMenus}>My Profile</RouterLink>
              <RouterLink to="/my-listings" className="nav-link" onClick={closeMenus}>My Listings</RouterLink>
              <button 
                className="nav-button" 
                onClick={handleLogout}
                style={{ background: '#e53e3e', color: 'white' }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <RouterLink to="/login" className="nav-link" onClick={closeMenus}>Login</RouterLink>
              <RouterLink to="/register" className="nav-button nav-button-solid" onClick={closeMenus}>
                Sign Up
              </RouterLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;