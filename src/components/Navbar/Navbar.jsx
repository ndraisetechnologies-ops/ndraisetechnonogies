import React, { useState } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, UserCheck, ShieldCheck, Send, Award, HelpCircle, BookOpen } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  openAuthModal, 
  user, 
  theme, 
  toggleTheme, 
  onVerifyClick, 
  onSubmitTaskClick,
  onOfferLetterClick,
  onCertificatesClick,
  onPolicyClick
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  const menuItems = [
    { 
      id: 'home', 
      label: 'Home', 
      hasDropdown: false 
    },
    { 
      id: 'internships-folder', 
      label: 'Internships', 
      hasDropdown: true,
      options: [
        { label: 'Apply Now', actionType: 'apply-now' },
        { label: 'Verify Certificate', actionType: 'verify' },
        { label: 'Download Offer Letter', actionType: 'offer-letter' },
        { label: 'My Certificates', actionType: 'certificates' }
      ]
    },
    { 
      id: 'virtual-domains', 
      label: 'Virtual Domains', 
      hasDropdown: true,
      options: [
        { label: 'Web Development (4-Week)', id: 'internships' },
        { label: 'Python Programming (4-Week)', id: 'internships' },
        { label: 'Data Science & Analytics', id: 'internships' },
        { label: 'AI & Machine Learning', id: 'internships' },
        { label: 'Mobile App Development', id: 'internships' },
        { label: 'Cybersecurity Analyst', id: 'internships' },
        { label: 'UI/UX Design', id: 'internships' },
        { label: 'Java Development', id: 'internships' }
      ]
    },
    {
      id: 'submit-tasks',
      label: 'Submit Tasks',
      hasDropdown: false,
      isSpecialAction: true,
      actionFn: () => {
        if (onSubmitTaskClick) onSubmitTaskClick();
      }
    },
    { 
      id: 'more', 
      label: 'More', 
      hasDropdown: true,
      options: [
        { label: 'Student Reviews', id: 'home', anchor: 'testimonials' },
        { label: 'Contact Support', actionType: 'contact' },
        { label: 'Terms & Conditions', actionType: 'terms' },
        { label: 'Privacy Policy', actionType: 'privacy' },
        { label: 'Cookies Policy', actionType: 'cookies' }
      ]
    }
  ];

  const handleNavClick = (item) => {
    if (item.isSpecialAction && item.actionFn) {
      item.actionFn();
    } else if (item.actionType === 'apply-now') {
      setCurrentView('internships');
    } else if (item.actionType === 'verify') {
      if (currentView !== 'home') setCurrentView('home');
      setTimeout(() => {
        const el = document.getElementById('verify-certificate');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        if (onVerifyClick) onVerifyClick();
      }, 100);
    } else if (item.actionType === 'offer-letter') {
      if (onOfferLetterClick) {
        onOfferLetterClick();
      } else {
        openAuthModal('login');
      }
    } else if (item.actionType === 'certificates') {
      if (onCertificatesClick) {
        onCertificatesClick();
      } else {
        if (currentView !== 'home') setCurrentView('home');
        setTimeout(() => {
          const el = document.getElementById('verify-certificate');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else if (item.actionType === 'contact' || item.actionType === 'terms' || item.actionType === 'privacy' || item.actionType === 'cookies') {
      if (onPolicyClick) onPolicyClick(item.actionType);
    } else if (item.id === 'internships' || item.id === 'virtual-domains') {
      setCurrentView('internships');
    } else {
      setCurrentView('home');
      if (item.anchor) {
        setTimeout(() => {
          const el = document.getElementById(item.anchor);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  return (
    <header className="navbar-container">
      {/* 1. Left Brand Logo Section */}
      <div className="nav-brand">
        <div className="brand-logo-badge">
          <img src="/logo.jpg" alt="ND Technologies Logo" className="brand-logo-img" />
        </div>
        <div className="brand-text">
          <div className="brand-title">
            ND <span>TECHNOLOGIES</span>
          </div>
          <div className="brand-tagline">LEARN • CODE • GROW</div>
        </div>
      </div>

      {/* 2. Center Floating Navigation Menu */}
      <nav className={`nav-pill-wrapper ${mobileOpen ? 'mobile-open' : ''}`}>
        <ul className="nav-pill-list">
          {menuItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'internships-folder' && currentView === 'internships');
            const isDropdownOpen = activeDropdown === item.id;

            return (
              <li 
                key={item.id} 
                className={`nav-pill-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <button
                  className={`nav-pill-link ${isActive ? 'active' : ''} ${isDropdownOpen ? 'dropdown-active' : ''}`}
                  onClick={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(isDropdownOpen ? null : item.id);
                    } else {
                      handleNavClick(item);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={15} 
                      className={`chevron-icon ${isDropdownOpen ? 'rotate' : ''}`} 
                    />
                  )}
                </button>

                {/* Dropdown Menu */}
                {item.hasDropdown && item.options && (
                  <div className={`nav-dropdown-menu ${isDropdownOpen ? 'open' : ''}`}>
                    {item.options.map((opt, idx) => (
                      <a
                        key={idx}
                        href="#"
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(opt);
                        }}
                      >
                        {opt.label}
                      </a>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 3. Right Action Items */}
      <div className="nav-actions">
        {/* Theme Switcher Button */}
        <button 
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun size={19} className="theme-icon sun-icon" />
          ) : (
            <Moon size={19} className="theme-icon moon-icon" />
          )}
        </button>

        {user ? (
          <button 
            className="btn-portal" 
            onClick={() => setCurrentView('student-dashboard')}
          >
            <UserCheck size={16} />
            <span>Student Dashboard</span>
          </button>
        ) : (
          <>
            <button 
              className="nav-login-btn" 
              onClick={() => openAuthModal('login')}
            >
              Login
            </button>

            <button 
              className="nav-join-btn" 
              onClick={() => openAuthModal('register')}
            >
              <span>Apply Now</span>
              <ArrowRight size={16} className="btn-arrow-icon" />
            </button>
          </>
        )}

        {/* Mobile Menu Toggle Button */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
