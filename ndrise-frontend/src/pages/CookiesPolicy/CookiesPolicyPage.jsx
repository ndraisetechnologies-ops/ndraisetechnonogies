import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Info, Cookie, Settings, Sliders, Shield, 
  Layers, RefreshCw, Mail, Printer, MessageCircle, ArrowUpRight, 
  ArrowUp, CheckCircle2 
} from 'lucide-react';
import './CookiesPolicyPage.css';

export default function CookiesPolicyPage({ setCurrentView }) {
  const [activeSection, setActiveSection] = useState('what-are-cookies');
  const isManualScrollRef = useRef(false);
  const tocNavRef = useRef(null);

  const sections = [
    { id: 'what-are-cookies', label: 'What Are Cookies' },
    { id: 'how-we-use-cookies', label: 'How We Use Cookies' },
    { id: 'types-of-cookies', label: 'Types of Cookies Used' },
    { id: 'managing-cookies', label: 'Managing & Disabling' },
    { id: 'third-party-cookies', label: 'Third-Party Cookies' },
    { id: 'updates', label: 'Updates to Policy' },
    { id: 'contact', label: 'Contact Us' }
  ];

  // Always scroll page to top when Cookies Policy opens
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Scrollspy: Automatically detect active section as page scrolls
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const scrollPosition = window.scrollY + 140;
      const sectionElements = sections.map((sec) => document.getElementById(sec.id)).filter(Boolean);

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const section = sectionElements[i];
        if (section.offsetTop <= scrollPosition) {
          setActiveSection(section.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll the active TOC item inside the CONTENTS sidebar container only
  useEffect(() => {
    if (tocNavRef.current) {
      const activeLink = tocNavRef.current.querySelector('.toc-link.active');
      if (activeLink) {
        const container = tocNavRef.current;
        const linkTop = activeLink.offsetTop;
        const linkHeight = activeLink.offsetHeight;
        const containerHeight = container.clientHeight;
        const containerScroll = container.scrollTop;

        if (linkTop < containerScroll || (linkTop + linkHeight) > (containerScroll + containerHeight)) {
          container.scrollTop = linkTop - containerHeight / 2 + linkHeight / 2;
        }
      }
    }
  }, [activeSection]);

  const scrollToSection = (id) => {
    setActiveSection(id);
    isManualScrollRef.current = true;

    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }

    setTimeout(() => {
      isManualScrollRef.current = false;
    }, 800);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="policy-page">
      <div className="policy-container">
        
        {/* Main Document Area */}
        <main className="policy-content">
          
          {/* Header Card */}
          <div className="policy-document-header">
            <div className="header-title-row">
              <div className="document-icon-badge">
                <Cookie size={26} color="#2563eb" />
              </div>
              <div className="header-meta">
                <div className="title-row">
                  <h1 className="document-title">Cookies Policy</h1>
                </div>
                <div className="badge-row">
                  <span className="official-badge">OFFICIAL POLICY</span>
                  <span className="updated-date">Updated: February 27, 2026</span>
                </div>
              </div>
            </div>

            {/* Info Notice Box */}
            <div className="info-notice-box">
              <Info size={18} className="notice-icon" />
              <span>
                This page explains how ND RAISE Technologies uses cookies and tracking technologies to ensure a seamless, personalized experience.
              </span>
            </div>
          </div>

          <div className="policy-body">
            
            {/* 1. What Are Cookies */}
            <section id="what-are-cookies" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Cookie size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">What Are Cookies</h2>
              </div>
              <p className="section-text">
                Cookies are small text files stored on your browser or device when you visit websites. They help remember your preferences, keep you logged in securely, and improve site performance.
              </p>
            </section>

            {/* 2. How We Use Cookies */}
            <section id="how-we-use-cookies" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Settings size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">How We Use Cookies</h2>
              </div>
              <p className="section-text">
                We use cookies for the following essential purposes:
              </p>
              <ul className="section-list">
                <li><strong>Authentication & Security</strong>: Keeping you securely signed in to your student dashboard</li>
                <li><strong>Preferences & Theme</strong>: Remembering your preferred dark/light theme choices</li>
                <li><strong>Performance Analytics</strong>: Analyzing page load speeds and overall platform health</li>
                <li><strong>Session State</strong>: Saving progress during task submissions and form entries</li>
              </ul>
            </section>

            {/* 3. Types of Cookies Used */}
            <section id="types-of-cookies" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Sliders size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Types of Cookies Used</h2>
              </div>
              <p className="section-text">
                Our platform uses two primary types of cookies:
              </p>
              <ul className="section-list">
                <li><strong>Session Cookies</strong>: Temporary cookies deleted automatically when you close your browser</li>
                <li><strong>Persistent Cookies</strong>: Saved on your device for a set period to remember your login & theme settings</li>
              </ul>
            </section>

            {/* 4. Managing & Disabling */}
            <section id="managing-cookies" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Shield size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Managing & Disabling Cookies</h2>
              </div>
              <p className="section-text">
                You can manage or disable cookies at any time through your browser settings. Please note that disabling essential cookies may impact certain platform features like student authentication.
              </p>
            </section>

            {/* 5. Third-Party Cookies */}
            <section id="third-party-cookies" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Layers size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Third-Party Cookies</h2>
              </div>
              <p className="section-text">
                Some third-party tools integrated into our platform (such as payment gateways or analytics services) may issue their own cookies governed by their respective privacy policies.
              </p>
            </section>

            {/* 6. Updates to Policy */}
            <section id="updates" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <RefreshCw size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Updates to Policy</h2>
              </div>
              <p className="section-text">
                We may update our Cookies Policy periodically. Any modifications will be updated on this page with a revised date.
              </p>
            </section>

            {/* 7. Contact Us */}
            <section id="contact" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Mail size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Contact Us</h2>
              </div>
              <p className="section-text">
                If you have questions regarding our cookie practices, please contact our support team at:
              </p>
              <div className="contact-links-list">
                <a href="mailto:support@ndraisetechnologies.com" className="contact-item-link">
                  <Mail size={16} />
                  <span>support@ndraisetechnologies.com</span>
                </a>
              </div>
            </section>

            {/* Bottom Support Callout */}
            <div className="still-questions-box">
              <div className="chat-bubble-badge">
                <MessageCircle size={22} color="#2563eb" />
              </div>
              <h3 className="questions-title">Still have questions?</h3>
              <p className="questions-desc">
                Our team is happy to help clarify anything regarding our policies or services.
              </p>
              <button 
                className="contact-support-btn"
                onClick={() => {
                  if (typeof setCurrentView === 'function') {
                    setCurrentView('contact');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }
                }}
              >
                <span>Contact Support</span>
                <ArrowUpRight size={16} />
              </button>
            </div>

            {/* Footer Links & Back to Top */}
            <div className="policy-document-footer">
              <div className="footer-policy-tags">
                <span className="tag-link" onClick={() => setCurrentView && setCurrentView('terms')}>TERMS</span>
                <span className="dot">•</span>
                <span className="tag-link" onClick={() => setCurrentView && setCurrentView('privacy')}>PRIVACY</span>
                <span className="dot">•</span>
                <span className="tag-link active">COOKIES</span>
              </div>

              <div className="footer-transparency-note">
                <CheckCircle2 size={15} color="#10b981" />
                <span>We believe in transparent policies and fair usage.</span>
              </div>

              <div className="footer-email-ref">
                <Mail size={14} />
                <span>support@ndraisetechnologies.com</span>
              </div>

              <button onClick={handleScrollToTop} className="back-to-top-btn">
                <span>Back to Top</span>
                <ArrowUp size={14} />
              </button>
            </div>

          </div>

        </main>

      </div>
    </div>
  );
}
