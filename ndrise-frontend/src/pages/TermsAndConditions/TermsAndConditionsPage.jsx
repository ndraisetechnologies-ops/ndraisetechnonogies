import React, { useState, useEffect, useRef } from 'react';
import { 
  FileText, Info, Briefcase, UserCheck, ShieldAlert, CreditCard, 
  RotateCcw, Award, Scale, Lock, Activity, Layers, Gavel, 
  RefreshCw, Mail, Printer, MessageCircle, ArrowUpRight, ArrowUp, CheckCircle2 
} from 'lucide-react';
import './TermsAndConditionsPage.css';

export default function TermsAndConditionsPage({ setCurrentView }) {
  const [activeSection, setActiveSection] = useState('introduction');
  const isManualScrollRef = useRef(false);
  const tocNavRef = useRef(null);

  const sections = [
    { id: 'introduction', label: 'Introduction' },
    { id: 'services-offered', label: 'Services Offered' },
    { id: 'eligibility', label: 'Eligibility' },
    { id: 'user-responsibilities', label: 'User Responsibilities' },
    { id: 'fees-payments', label: 'Internship Fees & Payments' },
    { id: 'refund-policy', label: 'Refund Policy' },
    { id: 'certificates', label: 'Certificates & Deliverables' },
    { id: 'intellectual-property', label: 'Intellectual Property' },
    { id: 'confidentiality', label: 'Confidentiality' },
    { id: 'liability', label: 'Limitation of Liability' },
    { id: 'third-party-tools', label: 'Third-Party Tools' },
    { id: 'governing-law', label: 'Governing Law' },
    { id: 'updates', label: 'Updates to Terms' },
    { id: 'contact', label: 'Contact' }
  ];

  // Always scroll page to top when Terms & Conditions opens
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
    <div className="terms-page">
      <div className="terms-container">
        
        {/* Main Document Area */}
        <main className="terms-content">
          
          {/* Header Card */}
          <div className="terms-document-header">
            <div className="header-title-row">
              <div className="document-icon-badge">
                <FileText size={26} color="#2563eb" />
              </div>
              <div className="header-meta">
                <div className="title-row">
                  <h1 className="document-title">Terms & Conditions</h1>
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

          <div className="terms-body">
            
            {/* 1. Introduction */}
            <section id="introduction" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Info size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Introduction</h2>
              </div>
              <p className="section-text">
                By using ND RAISE Technologies' website, internships, training programs, or services, you agree to these terms and conditions.
              </p>
            </section>

            {/* 2. Services Offered */}
            <section id="services-offered" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Briefcase size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Services Offered</h2>
              </div>
              <p className="section-text">
                ND RAISE Technologies provides a wide range of digital and educational services:
              </p>
              <ul className="section-list">
                <li><strong>Internships and training programs</strong> for students and professionals</li>
                <li><strong>Software and app development</strong> services for businesses</li>
                <li><strong>AI automation solutions</strong> and digital transformation</li>
                <li><strong>Digital products and tools</strong> for developers</li>
                <li><strong>Hackathons, workshops, and educational programs</strong></li>
              </ul>
              <p className="section-footnote">
                Please note that services may change or be updated anytime to ensure the best experience.
              </p>
            </section>

            {/* 3. Eligibility */}
            <section id="eligibility" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <UserCheck size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Eligibility</h2>
              </div>
              <p className="section-text">
                Users must provide correct information and use the platform honestly. You are responsible for maintaining the confidentiality of any account details.
              </p>
            </section>

            {/* 4. User Responsibilities */}
            <section id="user-responsibilities" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <ShieldAlert size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">User Responsibilities</h2>
              </div>
              <p className="section-text">
                To maintain a fair and safe environment, users must:
              </p>
              <ul className="section-list">
                <li><strong>Avoid plagiarism or cheating</strong> in any submitted tasks</li>
                <li>Use all services legally and ethically</li>
                <li>Not misuse or redistribute platform content</li>
                <li>Not attempt hacking, copying, or reverse-engineering</li>
              </ul>
              <div className="warning-text-red">
                Violation of these responsibilities may lead to immediate suspension or termination of services.
              </div>
            </section>

            {/* 5. Internship Fees & Payments */}
            <section id="fees-payments" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <CreditCard size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Internship Fees & Payments</h2>
              </div>
              <p className="section-text">
                Internship participation requires a small <strong>task submission fee</strong> to cover administrative costs:
              </p>

              {/* Fee Box */}
              <div className="fee-card-box">
                <div className="fee-box-header">
                  <CreditCard size={18} color="#2563eb" />
                  <span className="fee-box-title">Internship Task Submission Fee</span>
                </div>
                <div className="fee-cards-grid">
                  <div className="fee-pricing-card">
                    <span className="fee-card-label">1 MONTH INTERNSHIP</span>
                    <span className="fee-card-price">₹149</span>
                  </div>
                  <div className="fee-pricing-card">
                    <span className="fee-card-label">3 MONTH INTERNSHIP</span>
                    <span className="fee-card-price">₹249</span>
                  </div>
                </div>
                <p className="fee-box-quote">
                  "These are task review charges, <strong>not hidden fees</strong>, and help maintain platform operations, servers, and mentorship support."
                </p>
              </div>

              <p className="section-text" style={{ marginTop: '1rem' }}>
                These charges help support servers, mentors, and platform operations. They are charged only for managing and reviewing tasks. No personal profit or unnecessary fees are collected.
              </p>
            </section>

            {/* 6. Refund Policy */}
            <section id="refund-policy" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Info size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Refund Policy</h2>
              </div>

              <div className="warning-alert-box">
                <Info size={18} color="#f59e0b" className="warning-icon" />
                <span>
                  All payments are <strong>non-refundable</strong> unless ND RAISE Technologies cancels the program itself.
                </span>
              </div>

              <p className="section-text">
                Please ensure you are committed to the program before making any payment. Refunds are issued only in the rare event that ND RAISE Technologies cancels the specific program you enrolled in.
              </p>
            </section>

            {/* 7. Certificates & Deliverables */}
            <section id="certificates" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Award size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Certificates & Deliverables</h2>
              </div>
              <p className="section-text">
                Certificates are issued only after <strong>successful completion of tasks</strong> and a positive performance evaluation by our mentors.
              </p>
            </section>

            {/* 8. Intellectual Property */}
            <section id="intellectual-property" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Scale size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Intellectual Property</h2>
              </div>
              <p className="section-text">
                All content, code, branding, and materials belong to ND RAISE Technologies and cannot be copied, resold, or redistributed without explicit written permission.
              </p>
            </section>

            {/* 9. Confidentiality */}
            <section id="confidentiality" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Lock size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Confidentiality</h2>
              </div>
              <p className="section-text">
                Any project data or client information shared with ND RAISE Technologies is treated with strict confidentiality and is protected by our internal security protocols.
              </p>
            </section>

            {/* 10. Limitation of Liability */}
            <section id="liability" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Activity size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Limitation of Liability</h2>
              </div>
              <p className="section-text">
                ND RAISE Technologies is not responsible for:
              </p>
              <ul className="section-list">
                <li>Internet or technical issues on the user's end</li>
                <li>Data loss due to user mistakes or negligence</li>
                <li>Third-party payment failures or delays</li>
                <li>External tool downtime or API failures</li>
              </ul>
            </section>

            {/* 11. Third-Party Tools */}
            <section id="third-party-tools" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Layers size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Third-Party Tools</h2>
              </div>
              <p className="section-text">
                Some services may use payment gateways, APIs, or hosting providers beyond ND RAISE Technologies' control. Usage of these tools is subject to their respective terms.
              </p>
            </section>

            {/* 12. Governing Law */}
            <section id="governing-law" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Gavel size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Governing Law</h2>
              </div>
              <p className="section-text">
                These terms are governed by and construed in accordance with the <strong>laws of India</strong>.
              </p>
            </section>

            {/* 13. Updates to Terms */}
            <section id="updates" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <RefreshCw size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Updates to Terms</h2>
              </div>
              <p className="section-text">
                Terms may change anytime to reflect changes in our services or legal requirements. Continued use of the platform means acceptance of the updated terms.
              </p>
            </section>

            {/* 14. Contact */}
            <section id="contact" className="terms-section">
              <div className="section-header">
                <div className="section-icon-badge">
                  <Mail size={16} color="#2563eb" />
                </div>
                <h2 className="section-title">Contact</h2>
              </div>
              <p className="section-text">
                If you have any questions, feel free to reach out:
              </p>
              <div className="contact-links-list">
                <a href="mailto:support@ndraisetechnologies.com" className="contact-item-link">
                  <Mail size={16} />
                  <span>support@ndraisetechnologies.com</span>
                </a>
                <a href="https://www.ndraisetechnologies.com" target="_blank" rel="noreferrer" className="contact-item-link">
                  <RefreshCw size={16} />
                  <span>www.ndraisetechnologies.com</span>
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
            <div className="terms-document-footer">
              <div className="footer-policy-tags">
                <span>TERMS</span>
                <span className="dot">•</span>
                <span>PRIVACY</span>
                <span className="dot">•</span>
                <span>COOKIES</span>
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
