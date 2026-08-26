import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, ChevronDown, Sun, Moon, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  showToast
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const userMenuRef = useRef(null);
  const navMenuRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll listener for top vs compact floating navbar transition
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setUserMenuOpen(false);
      }
      if (navMenuRef.current && !navMenuRef.current.contains(event.target)) {
        setActiveDropdown(null);
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
      hasDropdown: false
    },
    {
      id: 'career-tools',
      label: 'Career Tools',
      hasDropdown: true,
      options: [
        { label: '🎯 Check ATS Score', actionType: 'ats-score' },
        { label: '🔍 AI Skill Job Finder', actionType: 'email-builder' },
        { label: '🧠 Interview Preparation', actionType: 'interview-prep' },
      ]
    },
    {
      id: 'more',
      label: 'More',
      hasDropdown: true,
      options: [
        { label: 'Student Reviews', actionType: 'reviews' },
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
    } else if (item.actionType === 'browse-courses' || item.id === 'skill-courses') {
      setCurrentView('browse-courses');
    } else if (item.actionType === 'ats-score') {
      setCurrentView('ats-score');
    } else if (item.actionType === 'email-builder') {
      setCurrentView('job-email-builder');
    } else if (item.actionType === 'interview-prep') {
      setCurrentView('interview-preparation');
    } else if (item.id === 'career-tools') {
      setCurrentView('ats-score');
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
    } else if (item.actionType === 'contact' || item.actionType === 'terms' || item.actionType === 'privacy' || item.actionType === 'cookies') {
      setCurrentView(item.actionType);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  const navDropdownVariants = {
    hidden: { opacity: 0, x: '-50%', y: shouldReduceMotion ? 0 : -8, scale: 0.97 },
    visible: { 
      opacity: 1, 
      x: '-50%',
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      x: '-50%',
      y: shouldReduceMotion ? 0 : -6, 
      scale: 0.97,
      transition: { duration: 0.15, ease: 'easeIn' } 
    }
  };

  const userDropdownVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : -8, scale: 0.97 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.2, ease: [0.22, 1, 0.36, 1] } 
    },
    exit: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : -6, 
      scale: 0.97,
      transition: { duration: 0.15, ease: 'easeIn' } 
    }
  };

  return (
    <motion.header 
      className={`navbar-container ${scrolled ? 'navbar-scrolled' : ''}`}
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* 1. Logo */}
      <div 
        className="nav-brand navbar-logo" 
        onClick={() => { setCurrentView('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} 
        style={{ cursor: 'pointer' }}
      >
        <div className="brand-logo-badge logo-badge">
          <img src="/logo.jpg" alt="ND Raise Technologies Logo" className="brand-logo-img logo-img" />
        </div>
        <div className="brand-text logo-text-group">
          <div className="brand-title logo-title">
            ND <span>Raise</span><span className="brand-tech-word"> Technologies</span>
          </div>
          <div className="brand-tagline logo-subtitle">LEARN • BUILD • GROW</div>
        </div>
      </div>

      {/* 2. Center Navigation Menu */}
      <nav ref={navMenuRef} className={`nav-pill-wrapper nav-menu ${mobileOpen ? 'mobile-open open' : ''}`}>
        <ul className="nav-pill-list nav-list">
          {menuItems.map((item) => {
            const isActive = currentView === item.id || (item.id === 'skill-courses' && currentView === 'browse-courses');
            return (
              <li
                key={item.id}
                className={`nav-pill-item nav-item ${item.hasDropdown ? 'has-dropdown' : ''}`}
                onMouseEnter={() => {
                  if (window.innerWidth > 1024 && item.hasDropdown) {
                    setActiveDropdown(item.id);
                  }
                }}
                onMouseLeave={() => {
                  if (window.innerWidth > 1024 && item.hasDropdown) {
                    setActiveDropdown(null);
                  }
                }}
              >
                <a
                  href={`#${item.id}`}
                  className={`nav-pill-link nav-link ${isActive ? 'active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.hasDropdown) {
                      if (window.innerWidth <= 1024) {
                        setActiveDropdown((prev) => (prev === item.id ? null : item.id));
                      } else {
                        handleNavClick(item);
                      }
                    } else {
                      handleNavClick(item);
                    }
                  }}
                >
                  <span>{item.label}</span>
                  {item.hasDropdown && (
                    <ChevronDown 
                      size={14} 
                      className={`chevron-icon dropdown-chevron ${activeDropdown === item.id ? 'rotate' : ''}`} 
                      style={{ transition: 'transform 0.2s ease' }}
                    />
                  )}

                  {/* Active Page Indicator */}
                  {isActive && (
                    <motion.span 
                      className="nav-active-indicator"
                      layoutId="navActiveIndicator"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </a>

                {/* Animated Dropdown Menu */}
                <AnimatePresence>
                  {item.hasDropdown && activeDropdown === item.id && (
                    <motion.div
                      key={`dropdown-${item.id}`}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      variants={navDropdownVariants}
                      className="nav-dropdown-menu dropdown-menu open"
                    >
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
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* 3. Right Action Items */}
      <div className="nav-actions">
        {/* Theme Switcher Button */}
        <motion.button
          className="theme-toggle-btn"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          aria-label="Toggle Theme"
          whileHover={shouldReduceMotion ? {} : { scale: 1.08 }}
          whileTap={shouldReduceMotion ? {} : { scale: 0.92 }}
        >
          {theme === 'dark' ? (
            <Sun size={19} className="theme-icon sun-icon" />
          ) : (
            <Moon size={19} className="theme-icon moon-icon" />
          )}
        </motion.button>

        {user ? (
          <div className="user-profile-wrapper" ref={userMenuRef}>
            <motion.button
              type="button"
              className="user-profile-pill"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
            >
              <div className="user-avatar-circle">
                <img src={user.avatar || (['admin', 'super_admin'].includes(user.role?.toLowerCase()) ? "/admin-avatar.svg" : "/student-avatar.svg")} alt="User Avatar" className="user-avatar-icon" />
              </div>
              <span className="user-profile-name">{user.name || 'User'}</span>
              <ChevronDown size={14} className={`user-chevron ${userMenuOpen ? 'open' : ''}`} style={{ transition: 'transform 0.2s ease' }} />
            </motion.button>

            <AnimatePresence>
              {userMenuOpen && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  variants={userDropdownVariants}
                  className="user-profile-dropdown"
                  style={{ display: 'block' }}
                >
                  <div className="dropdown-user-header">
                    <div className="user-avatar-circle header-avatar">
                      <img src={user.avatar || (['admin', 'super_admin'].includes(user.role?.toLowerCase()) ? "/admin-avatar.svg" : "/student-avatar.svg")} alt="User Avatar" className="user-avatar-icon" />
                    </div>
                    <div className="user-info-text">
                      <div className="info-name">{user.name || 'User'}</div>
                      <div className="info-email">{user.email || 'user@ndtech.com'}</div>
                    </div>
                  </div>

                  <div className="user-dropdown-divider" />

                  {['admin', 'super_admin'].includes(user.role?.toLowerCase()) ? (
                    <button
                      type="button"
                      className="user-dropdown-item"
                      style={{ color: '#38bdf8', fontWeight: '600' }}
                      onClick={() => {
                        setCurrentView('admin-dashboard');
                        setUserMenuOpen(false);
                      }}
                    >
                      <LayoutDashboard size={16} />
                      <span>Admin Dashboard</span>
                    </button>
                  ) : (
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
                  )}

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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ) : (
          <div className="auth-buttons-group">
            <motion.button 
              className="btn-secondary nav-login-btn" 
              onClick={() => openAuthModal('login')}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
            >
              Sign In
            </motion.button>
          </div>
        )}

        {/* Mobile Menu Toggle Button */}
        <button
          type="button"
          className="mobile-toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </motion.header>
  );
}
