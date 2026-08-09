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
          <img src="/logo.jpg" alt="ND Technologies Logo" className="brand-logo-img" />
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
