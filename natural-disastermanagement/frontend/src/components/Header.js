import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-brand">
          <Link to="/" className="brand-link">
            <div className="brand-logo">
              <div className="logo-icon">🛡️</div>
              <div className="brand-text">
                <h1>ResQNet</h1>
                <span className="brand-subtitle">Emergency Response System</span>
              </div>
            </div>
          </Link>
        </div>
        
        {isAuthenticated && (
          <>
            <nav className={`header-nav ${isMobileMenuOpen ? 'nav-open' : ''}`}>
              <Link to="/dashboard" className="nav-link">
                <span className="nav-icon">📊</span>
                Dashboard
              </Link>
              <Link to="/disasters" className="nav-link">
                <span className="nav-icon">🌪️</span>
                Active Disasters
              </Link>
              <Link to="/contribute" className="nav-link">
                <span className="nav-icon">🤝</span>
                Contribute
              </Link>
              <Link to="/disaster/report" className="nav-link">
                <span className="nav-icon">🚨</span>
                Report Disaster
              </Link>
              {user?.role === 'admin' && (
                <>
                  <Link to="/disaster/create" className="nav-link admin-link">
                    <span className="nav-icon">➕</span>
                    Create Disaster
                  </Link>
                  <Link to="/admin/rescue-teams" className="nav-link admin-link">
                    <span className="nav-icon">🚑</span>
                    Rescue Teams
                  </Link>
                  <Link to="/admin/contributions" className="nav-link admin-link">
                    <span className="nav-icon">🛡️</span>
                    Admin Panel
                  </Link>
                </>
              )}
            </nav>
            
            <button 
              className="mobile-menu-toggle"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </>
        )}
        
        <div className="header-user">
          {isAuthenticated ? (
            <div className="user-info">
              <div className="user-avatar">
                <span className="avatar-text">{user?.name?.charAt(0) || 'U'}</span>
              </div>
              <div className="user-details">
                <span className="user-name">{user?.name || 'User'}</span>
                <span className="user-role">{user?.role || 'User'}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                <span className="logout-icon">🚪</span>
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="login-btn">
              <span className="login-icon">🔐</span>
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
