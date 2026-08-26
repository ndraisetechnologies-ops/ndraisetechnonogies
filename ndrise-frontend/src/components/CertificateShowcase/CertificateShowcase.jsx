import React, { useState } from 'react';
import { Award, ShieldCheck, QrCode, Search, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './CertificateShowcase.css';

export default function CertificateShowcase({ onVerifyClick }) {
  const shouldReduceMotion = useReducedMotion();
  const [certIdInput, setCertIdInput] = useState('');

  const handleVerifySubmit = (e) => {
    e.preventDefault();
    if (onVerifyClick) {
      onVerifyClick(certIdInput);
    }
  };

  return (
    <section className="cert-showcase-section" id="verify-credentials">
      <div className="cert-showcase-container">
        <FadeIn direction="up">
          <div className="cert-showcase-header">
            <div className="cert-badge badge-green">
              <ShieldCheck size={15} />
              <span>AUTHENTICATED DIGITAL CREDENTIALS</span>
            </div>
            <h2 className="cert-title">
              Tamper-Proof <span>Verifiable Certificates</span>
            </h2>
            <p className="cert-subtitle">
              Every certificate issued by ND Raise Technologies is backed by unique verification credentials, ISO 9001:2015 standards, and instant QR code verification.
            </p>
          </div>
        </FadeIn>

        <div className="cert-showcase-grid">
          {/* Left: Interactive Certificate Mockup with 3D Perspective Rotation on Scroll */}
          <motion.div 
            className="cert-mockup-wrapper"
            initial={{ opacity: 0, rotateY: shouldReduceMotion ? 0 : -8, scale: 0.94 }}
            whileInView={{ opacity: 1, rotateY: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Floating Verified Credential Badge */}
            <div className="cert-floating-verified-badge">
              <CheckCircle2 size={16} className="verified-check-icon" />
              <span>Verified Credential</span>
            </div>

            {/* Realistic Certificate Container */}
            <div className="cert-card-frame glass-panel">
              <div className="cert-card-inner">
                
                {/* Header */}
                <div className="cert-card-header">
                  <div className="cert-brand-logo">
                    <img src="/logo.jpg" alt="ND Raise Technologies" className="cert-logo-img" />
                    <div>
                      <div className="cert-brand-name">ND Raise Technologies</div>
                      <div className="cert-iso-tag">ISO 9001:2015 Certified Institution</div>
                    </div>
                  </div>
                  <div className="cert-id-badge">ID: NDR-2026-1042</div>
                </div>

                {/* Certificate Main Title */}
                <div className="cert-body">
                  <h3 className="cert-main-heading">CERTIFICATE OF COMPLETION</h3>
                  <p className="cert-given-to">This is proudly presented to</p>
                  <div className="cert-recipient-name">Siddharth Patel</div>
                  <p className="cert-reason">
                    for successfully completing the 4-week virtual internship track in <br />
                    <strong>Full Stack Development</strong> with distinction.
                  </p>
                </div>

                {/* Footer Metadata & QR Code */}
                <div className="cert-card-footer">
                  <div className="cert-meta-left">
                    <div className="cert-date">Issued: August 2026</div>
                    <div className="cert-issuer">ND Raise Verification Authority</div>
                  </div>

                  {/* Subtle Realistic QR Visual */}
                  <div className="cert-qr-box" title="Scan to verify certificate authenticity">
                    <QrCode size={42} className="qr-icon" />
                    <span className="qr-subtext">Scan to Verify</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>

          {/* Right: Verification Input & Trust Features */}
          <FadeIn direction="left" delay={0.2} className="cert-info-column">
            <div className="cert-trust-card glass-panel">
              <h3 className="trust-card-title">Instant Verification Portal</h3>
              <p className="trust-card-desc">
                Recruiters, HR managers, and universities can authenticate student credentials in real-time using our verification database.
              </p>

              {/* Direct Verification Form */}
              <form onSubmit={handleVerifySubmit} className="cert-verify-form">
                <div className="verify-input-wrap">
                  <Search size={18} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Enter Certificate ID (e.g. NDR-2026-1042)" 
                    value={certIdInput}
                    onChange={(e) => setCertIdInput(e.target.value)}
                    className="cert-input-field"
                  />
                </div>
                <button type="submit" className="btn-primary cert-verify-btn">
                  <span>Verify Now</span>
                  <ArrowRight size={16} />
                </button>
              </form>

              {/* Trust Badges List */}
              <div className="trust-features-list">
                <div className="trust-feature-item">
                  <CheckCircle2 size={16} className="feature-check green" />
                  <span>ISO 9001:2015 Quality Authenticated</span>
                </div>
                <div className="trust-feature-item">
                  <CheckCircle2 size={16} className="feature-check blue" />
                  <span>Encrypted Unique Hash Code</span>
                </div>
                <div className="trust-feature-item">
                  <CheckCircle2 size={16} className="feature-check purple" />
                  <span>LinkedIn & Resume Embeddable</span>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
