import React, { useState } from 'react';
import { Menu, X, TrendingUp, Sparkles, UserCheck, ShieldCheck } from 'lucide-react';
import './Navbar.css';

export default function Navbar({ currentView, setCurrentView, openAuthModal, user }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'internships', label: 'Internships' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'for-colleges', label: 'For Colleges' },
    { id: 'about-us', label: 'About Us' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    if (id === 'home') setCurrentView('home');
    else if (id === 'internships') setCurrentView('internships');
    else {
      // scroll to section or switch to home view
      setCurrentView('home');
    }
    setMobileOpen(false);
  };

  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => setCurrentView('home')}>
        <div className="brand-logo-badge">
          <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 26V6L22 26V6" stroke="url(#nav-logo-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20L26 6" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round"/>
            <path d="M22 6H26V10" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
            <defs>
              <linearGradient id="nav-logo-grad" x1="6" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8"/>
                <stop offset="1" stopColor="#c084fc"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="brand-text">
          <div className="brand-title">
            ND <span>TECHNOLOGIES</span>
          </div>
          <div className="brand-tagline">LEARN • BUILD • GROW</div>
        </div>
      </div>

      <ul className={`nav-links ${mobileOpen ? 'mobile-open' : ''}`}>
        {navItems.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`nav-item ${currentView === item.id ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>

      <div className="nav-actions">
        {user ? (
          <button 
            className="btn-primary" 
            style={{ fontSize: '0.85rem', padding: '0.5rem 1.25rem' }}
            onClick={() => setCurrentView('student-dashboard')}
          >
            <UserCheck size={16} />
            My Portal
          </button>
        ) : (
          <>
            <button className="btn-outline" onClick={() => openAuthModal('login')}>
              Login
            </button>
            <button className="btn-primary" onClick={() => openAuthModal('register')}>
              Register
            </button>
          </>
        )}

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
