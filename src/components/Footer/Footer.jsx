import React from 'react';
import { Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

export default function Footer({ setCurrentView }) {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-brand">
          <div className="nav-brand" onClick={() => setCurrentView('home')}>
            <div className="brand-logo-badge">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 26V6L22 26V6" stroke="url(#foot-logo-grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 20L26 6" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round"/>
                <path d="M22 6H26V10" stroke="#38bdf8" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
                <defs>
                  <linearGradient id="foot-logo-grad" x1="6" y1="6" x2="22" y2="26" gradientUnits="userSpaceOnUse">
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
          
          <p className="footer-desc">
            Empowering students with practical skills, real-world projects and industry-ready learning.
          </p>
        </div>

        <div>
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a onClick={() => setCurrentView('internships')}>Internships</a></li>
            <li><a onClick={() => setCurrentView('home')}>How It Works</a></li>
            <li><a onClick={() => setCurrentView('home')}>For Colleges</a></li>
            <li><a onClick={() => setCurrentView('home')}>About Us</a></li>
            <li><a onClick={() => setCurrentView('home')}>Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Resources</h4>
          <ul className="footer-links">
            <li><a onClick={() => setCurrentView('home')}>Blog</a></li>
            <li><a onClick={() => setCurrentView('home')}>FAQ</a></li>
            <li><a onClick={() => setCurrentView('home')}>Privacy Policy</a></li>
            <li><a onClick={() => setCurrentView('home')}>Terms & Conditions</a></li>
          </ul>
        </div>

        <div>
          <h4 className="footer-heading">Follow Us</h4>
          <div className="social-icons">
            <div className="social-icon-btn"><Facebook size={18} /></div>
            <div className="social-icon-btn"><Twitter size={18} /></div>
            <div className="social-icon-btn"><Linkedin size={18} /></div>
            <div className="social-icon-btn"><Instagram size={18} /></div>
            <div className="social-icon-btn"><Youtube size={18} /></div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div>© 2025 ND Raise Technologies. All rights reserved.</div>
        <div>Designed with precision & glow aesthetics</div>
      </div>
    </footer>
  );
}
