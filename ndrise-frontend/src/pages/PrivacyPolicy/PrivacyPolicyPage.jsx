import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Info, Database, Activity, ShieldCheck, Share2, 
  UserCheck, Clock, Users, RefreshCw, Mail, Printer, 
  MessageCircle, ArrowUpRight, ArrowUp, CheckCircle2 
} from 'lucide-react';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage({ setCurrentView }) {
  const [activeSection, setActiveSection] = useState('info-collected');
  const isManualScrollRef = useRef(false);
  const tocNavRef = useRef(null);

  const sections = [
    { id: 'info-collected', label: 'Information Collected' },
    { id: 'how-data-used', label: 'How Data Is Used' },
    { id: 'data-protection', label: 'Data Protection' },
    { id: 'data-sharing', label: 'Data Sharing' },
    { id: 'user-rights', label: 'User Rights' },
    { id: 'data-retention', label: 'Data Retention' },
    { id: 'childrens-privacy', label: "Children's Privacy" },
    { id: 'updates', label: 'Updates' },
    { id: 'contact', label: 'Contact' }
  ];

  // Always scroll page to top when Privacy Policy opens
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
                <FileText size={26} color="#2563eb" />
              </div>
              <div className="header-meta">
                <div className="title-row">
                  <h1 className="document-title">Privacy Policy</h1>
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
                This page explains your rights, payments, and responsibilities clearly to ensure transparency and trust. We believe in transparent policies and fair usage.
              </span>
            </div>
          </div>

          <div className="policy-body">
            
            {/* 1. Information Collected */}
            <section id="info-collected" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Database size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Information Collected</h2>
              </div>
              <p className="section-text">
                We collect the following information to provide and improve our services:
              </p>
              <ul className="section-list">
                <li><strong>Name, email, and phone number</strong> for account creation and communication</li>
                <li><strong>Payment details</strong> processed securely through our payment partners</li>
                <li><strong>Internship activity</strong> including task submissions and performance data</li>
                <li><strong>Website usage analytics</strong> to understand how users interact with our platform</li>
              </ul>
            </section>

            {/* 2. How Data Is Used */}
            <section id="how-data-used" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Activity size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">How Data Is Used</h2>
              </div>
              <p className="section-text">
                Your data is used for the following purposes:
              </p>
              <ul className="section-list">
                <li><strong>Service delivery</strong> including internship management and training</li>
                <li><strong>Communication and support</strong> to assist you with any queries</li>
                <li><strong>Certificates and invoices</strong> generation upon completion</li>
                <li><strong>Platform improvement</strong> based on user feedback and usage patterns</li>
                <li><strong>Optional marketing updates</strong> about new opportunities (you can opt-out anytime)</li>
              </ul>
            </section>

            {/* 3. Data Protection */}
            <section id="data-protection" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <ShieldCheck size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Data Protection</h2>
              </div>
              <p className="section-text">
                ND RAISE Technologies uses <strong>industry-standard security practices</strong> and restricted access protocols to protect your personal data from unauthorized access, alteration, or disclosure.
              </p>
            </section>

            {/* 4. Data Sharing */}
            <section id="data-sharing" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Share2 size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Data Sharing</h2>
              </div>
              <p className="section-text">
                Your data is <strong>never sold to third parties</strong>. It may be shared only with trusted service providers like payment gateways or hosting partners strictly for the purpose of service delivery.
              </p>
            </section>

            {/* 5. User Rights */}
            <section id="user-rights" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <UserCheck size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">User Rights</h2>
              </div>
              <p className="section-text">
                You have the right to request <strong>correction, deletion, or access</strong> to your personal data. You may also opt-out of any marketing communications at any time.
              </p>
            </section>

            {/* 6. Data Retention */}
            <section id="data-retention" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Clock size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Data Retention</h2>
              </div>
              <p className="section-text">
                Data is stored only as long as needed for the fulfillment of our services and to comply with legal and regulatory requirements.
              </p>
            </section>

            {/* 7. Children's Privacy */}
            <section id="childrens-privacy" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Users size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Children's Privacy</h2>
              </div>
              <p className="section-text">
                Our services are intended for users <strong>above 13 years of age</strong>. We do not knowingly collect data from children under this age.
              </p>
            </section>

            {/* 8. Updates */}
            <section id="updates" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <RefreshCw size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Updates</h2>
              </div>
              <p className="section-text">
                This policy may change anytime to reflect changes in our data practices. Any updates will be posted on this page with a revised "Last Updated" date.
              </p>
            </section>

            {/* 9. Contact */}
            <section id="contact" className="policy-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Mail size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Contact</h2>
              </div>
              <p className="section-text">
                If you have any questions regarding your privacy, please contact us at:
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
                <span className="tag-link active">PRIVACY</span>
                <span className="dot">•</span>
                <span className="tag-link" onClick={() => setCurrentView && setCurrentView('cookies')}>COOKIES</span>
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
