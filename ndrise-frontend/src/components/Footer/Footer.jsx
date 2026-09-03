import React from 'react';
import { MapPin, Phone, Mail, Globe, Facebook, Twitter, Linkedin, Instagram, Youtube } from 'lucide-react';
import './Footer.css';

export default function Footer({ setCurrentView, user, onAuthClick }) {
  const handleNavigate = (view) => {
    if (typeof setCurrentView === 'function') {
      setCurrentView(view);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleDashboardNavigate = () => {
    if (user) {
      handleNavigate('student-dashboard');
    } else if (typeof onAuthClick === 'function') {
      onAuthClick('login');
    } else {
      handleNavigate('internships');
    }
  };

  return (
    <footer className="footer">
      
      {/* Top Footer Brand Row */}
      <div className="footer-top-brand">
        <div className="nav-brand">
          <div className="brand-logo-badge">
            <img src="/logo.jpg" alt="ND Raise Technologies Logo" className="brand-logo-img" />
          </div>
          <div className="brand-text">
            <div className="brand-title">
              ND <span>Raise Technologies</span>
            </div>
            <div className="brand-tagline">LEARN • CODE • GROW</div>
          </div>
        </div>

        <p className="footer-desc">
          Empowering students with practical skills, real-world projects and industry-ready learning.
        </p>

        <div className="social-icons">
          <div className="social-icon-btn"><Facebook size={17} /></div>
          <div className="social-icon-btn"><Twitter size={17} /></div>
          <div className="social-icon-btn"><Linkedin size={17} /></div>
          <div className="social-icon-btn"><Instagram size={17} /></div>
          <div className="social-icon-btn"><Youtube size={17} /></div>
        </div>
      </div>

      {/* Main 4-Column Grid matching reference screenshot */}
      <div className="footer-content">
        
        {/* Column 1: Explore */}
        <div>
          <h4 className="footer-heading explore-heading">Explore</h4>
          <ul className="footer-links">
            <li>
              <a className="cyan-highlight-link" onClick={handleDashboardNavigate}>
                Skill Course Dashboard
              </a>
            </li>
            <li><a onClick={() => handleNavigate('browse-courses')}>Skill Courses</a></li>
            <li><a onClick={() => handleNavigate('verify')}>Skill Certificate Verification</a></li>
            <li><a onClick={() => handleNavigate('internships')}>Internship Registration</a></li>
            <li><a onClick={() => handleNavigate('verify')}>Internship Certificate Verification</a></li>
            <li><a onClick={() => handleNavigate('offer-letter')}>Download Offer Letter</a></li>
          </ul>
        </div>

        {/* Column 2: Company */}
        <div>
          <h4 className="footer-heading company-heading">Company</h4>
          <ul className="footer-links">
            <li><a onClick={() => handleNavigate('home')}>About Us</a></li>
            <li><a onClick={() => handleNavigate('contact')}>Support Hub</a></li>
            <li><a onClick={() => handleNavigate('terms')}>Terms & Conditions</a></li>
            <li><a onClick={() => handleNavigate('privacy')}>Privacy Policy</a></li>
            <li><a onClick={() => handleNavigate('cookies')}>Cookies Policy</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h4 className="footer-heading resources-heading">Resources</h4>
          <ul className="footer-links">
            <li><a onClick={handleDashboardNavigate}>ATS Checker</a></li>
            <li><a onClick={() => handleNavigate('internships')}>Interview Preparation</a></li>
            <li><a onClick={handleDashboardNavigate}>Job Email Builder</a></li>
            <li><a onClick={() => handleNavigate('contact')}>Help Center</a></li>
          </ul>
        </div>

        {/* Column 4: Contact Us */}
        <div className="footer-contact-col">
          <h4 className="footer-heading contact-heading">Contact Us</h4>
          <ul className="footer-contact-list">
            <li>
              <div className="contact-icon-badge">
                <MapPin size={18} color="#00acc1" />
              </div>
              <span>Lucknow, Uttar Pradesh, India</span>
            </li>
            {/* <li>
              <div className="contact-icon-badge">
                <Phone size={18} color="#00acc1" />
              </div>
              <a href="tel:+915223369892">+91 522 3369892</a>
            </li> */}
            <li>
              <div className="contact-icon-badge">
                <Mail size={18} color="#00acc1" />
              </div>
              <a href="mailto:support@ndraisetechnologies.com">support@ndraisetechnologies.com</a>
            </li>
            <li>
              <div className="contact-icon-badge">
                <Globe size={18} color="#00acc1" />
              </div>
              <a href="https://www.ndraisetechnologies.com" target="_blank" rel="noreferrer">www.ndraisetechnologies.com</a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        <div>© 2025 ND Raise Technologies. All rights reserved.</div>
        <div>Designed with precision & glow aesthetics</div>
      </div>
    </footer>
  );
}
