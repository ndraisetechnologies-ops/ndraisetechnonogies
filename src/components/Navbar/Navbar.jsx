import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, ArrowRight, Sun, Moon, UserCheck, ShieldCheck, Send, Award, HelpCircle, BookOpen, LogOut, LayoutDashboard, FileText, Star } from 'lucide-react';
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
  onReviewsClick,
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
      ]
    },
    { 
      id: 'more', 
      label: 'More', 
      hasDropdown: true,
      options: [
        { label: '⭐ Student Reviews', actionType: 'reviews' },
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
      setCurrentView('browse-courses');
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
      if (onVerifyClick) onVerifyClick();
      else setCurrentView('verify');
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
        setCurrentView('my-certificates');
      }
    } else if (item.actionType === 'reviews') {
      if (onReviewsClick) {
        onReviewsClick();
      } else {
        setCurrentView('reviews');
      }
    } else if (item.actionType === 'contact') {
      setCurrentView('contact');
    } else if (item.actionType === 'terms') {
      setCurrentView('terms');
    } else if (item.actionType === 'privacy') {
      setCurrentView('privacy');
    } else if (item.actionType === 'cookies') {
      setCurrentView('cookies');
    } else if (item.id === 'skill-courses') {
      setCurrentView('browse-courses');
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
      {/* 1. Logo */}
      <div className="nav-brand" onClick={() => setCurrentView('home')}>
        <div className="brand-logo-badge">
          <img src="/logo.jpg" alt="ND Raise Technologies Logo" className="brand-logo-img" />
        </div>
        <div className="brand-text">
          <span className="brand-title">ND Raise <span>Technologies</span></span>
          <span className="brand-tagline">ISO 9001:2015 CERTIFIED</span>
        </div>
      </div>

      {/* 2. Desktop Navigation Menu */}
      <nav className={`nav-pill-wrapper ${mobileOpen ? 'mobile-open' : ''}`}>
        <ul className="nav-pill-list">
          {menuItems.map((item) => {
            const isActive = currentView === item.id;
            const isOpen = activeDropdown === item.id;
            return (
              <li 
                key={item.id} 
                className="nav-pill-item"
                onMouseEnter={() => item.hasDropdown && setActiveDropdown(item.id)}
                onMouseLeave={() => item.hasDropdown && setActiveDropdown(null)}
              >
                <a 
                  href={`#${item.id}`}
                  className={`nav-pill-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (!item.hasDropdown) {
                      handleNavClick(item);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={14} 
                      className={`chevron-icon ${isOpen ? 'rotate' : ''}`} 
                    />
                  )}
                </a>

                {/* Dropdown Menu */}
                {item.hasDropdown && (
                  <div className={`nav-dropdown-menu ${isOpen ? 'open' : ''}`}>
                    {item.options.map((opt, idx) => (
                      <a 
                        key={idx}
                        href="#option"
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
                    else setCurrentView('my-certificates');
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

                <button 
                  type="button"
                  className="user-dropdown-item" 
                  onClick={() => {
                    if (onReviewsClick) onReviewsClick();
                    else setCurrentView('reviews');
                    setUserMenuOpen(false);
                  }}
                >
                  <Star size={16} color="#f59e0b" />
                  <span>Student Reviews</span>
                </button>
                <div className="user-dropdown-divider" />

                <button 
                  type="button"
                  className="user-dropdown-item logout-btn" 
                  onClick={() => {
                    setUserMenuOpen(false);
                    onLogout();
                  }}
                >
                  <LogOut size={16} />
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="auth-buttons-group">
            <button className="btn-secondary nav-login-btn" onClick={() => openAuthModal('login')}>
              Sign In
            </button>
            <button className="btn-primary nav-register-btn" onClick={() => openAuthModal('register')}>
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* Mobile Hamburger Toggle */}
        <button 
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Mobile Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </header>
  );
}
