import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, UserCheck, ShieldCheck, Send, Award, HelpCircle, BookOpen, LogOut, LayoutDashboard, FileText } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ 
  currentView, 
  setCurrentView, 
  openAuthModal, 
  user, 
  onLogout,
  theme, 
  toggleTheme, 
  onVerifyClick, 
  onSubmitTaskClick,
  onOfferLetterClick,
  onCertificatesClick,
  onPolicyClick,
  showToast
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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
      id: 'skill-courses', 
      label: 'Skill Courses', 
      hasDropdown: true,
      options: [
        { label: '📚 Browse Courses', actionType: 'browse-courses' },
      ]
    },
    {
      id: 'career-tools',
      label: 'Career Tools',
      hasDropdown: true,
      options: [
        { label: '🎯 Check ATS Score', actionType: 'ats-score' },
        { label: '✉️ Job Email Builder', actionType: 'email-builder' },
        { label: '🧠 Interview Preparation', actionType: 'interview-prep' },
        // { label: '📤 Submit Tasks', actionType: 'submit-task' }
      ]
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
    } else if (item.actionType === 'browse-courses') {
      setCurrentView('internships');
    } else if (item.actionType === 'ats-score') {
      if (onSubmitTaskClick) {
        onSubmitTaskClick();
      } else {
        alert('🎯 Check ATS Score: Upload your resume to calculate score compatibility!');
      }
    } else if (item.actionType === 'email-builder') {
      alert('✉️ Job Email Builder: Generate HR cold emails & cover letters!');
    } else if (item.actionType === 'interview-prep') {
      alert('🧠 Interview Preparation: Technical questions & behavioral drills!');
    } else if (item.actionType === 'submit-task') {
      if (onSubmitTaskClick) onSubmitTaskClick();
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
    } else if (item.id === 'internships' || item.id === 'skill-courses' || item.id === 'virtual-domains') {
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
          <div className="user-profile-wrapper" ref={userMenuRef}>
            <button 
              type="button"
              className="user-profile-pill" 
              onClick={() => setUserMenuOpen(!userMenuOpen)}
            >
              <div className="user-avatar-circle">
                <span>{user.name ? user.name.charAt(0).toUpperCase() : 'D'}</span>
              </div>
              <span className="user-profile-name">{user.name || 'Divilash'}</span>
              <ChevronDown size={14} className={`user-chevron ${userMenuOpen ? 'open' : ''}`} />
            </button>

            {userMenuOpen && (
              <div className="user-profile-dropdown">
                <div className="dropdown-user-header">
                  <div className="user-avatar-circle header-avatar">
                    <span>{user.name ? user.name.charAt(0).toUpperCase() : 'D'}</span>
                  </div>
                  <div className="user-info-text">
                    <div className="info-name">{user.name || 'Divilash'}</div>
                    <div className="info-email">{user.email || 'student@ndtech.com'}</div>
                  </div>
                </div>

                <div className="user-dropdown-divider" />

                <button 
                  type="button"
                  className="user-dropdown-item" 
                  onClick={() => {
                    setCurrentView('student-dashboard');
                    setUserMenuOpen(false);
                  }}
                >
                  <LayoutDashboard size={16} />
                  <span>Student Dashboard</span>
                </button>

                <button 
                  type="button"
                  className="user-dropdown-item" 
                  onClick={() => {
                    if (onCertificatesClick) onCertificatesClick();
                    else setCurrentView('student-dashboard');
                    setUserMenuOpen(false);
                  }}
                >
                  <Award size={16} />
                  <span>My Certificates</span>
                </button>

                <button 
                  type="button"
                  className="user-dropdown-item" 
                  onClick={() => {
                    if (onOfferLetterClick) onOfferLetterClick();
                    setUserMenuOpen(false);
                  }}
                >
                  <FileText size={16} />
                  <span>Download Offer Letter</span>
                </button>

                <div className="user-dropdown-divider" />

                <button 
                  type="button"
                  className="user-dropdown-item logout-item" 
                  onClick={() => {
                    if (onLogout) onLogout();
                    setUserMenuOpen(false);
                  }}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
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
