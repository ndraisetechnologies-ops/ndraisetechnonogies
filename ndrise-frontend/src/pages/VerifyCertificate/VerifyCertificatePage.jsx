import React, { useEffect } from 'react';
import CertificateVerifier from '../../components/CertificateVerifier/CertificateVerifier';
import FAQ from '../../components/FAQ/FAQ';
import { ShieldCheck, Award, CheckCircle2, Lock, FileCheck } from 'lucide-react';
import './VerifyCertificatePage.css';

export default function VerifyCertificatePage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="verify-page-wrapper">
      {/* Hero Banner Header */}
      <div className="verify-hero">
        <div className="verify-hero-container">
          <div className="verify-badge">
            <ShieldCheck size={16} />
            <span>OFFICIAL CERTIFICATE VERIFICATION PORTAL</span>
          </div>
          <h1 className="verify-hero-title">
            Verify Authentic <span>Internship Credentials</span>
          </h1>
          <p className="verify-hero-desc">
            Instantly validate certificates, completion badges, and Letters of Recommendation (LOR) issued by ND Raise Technologies. ISO 9001:2015 Certified and trusted by employers worldwide.
          </p>

          <div className="trust-features-row">
            <div className="trust-feature">
              <CheckCircle2 size={16} color="#34d399" />
              <span>100% Cryptographic Verification</span>
            </div>
            <div className="trust-feature">
              <Lock size={16} color="#38bdf8" />
              <span>Tamper-Proof QR Code Records</span>
            </div>
            <div className="trust-feature">
              <Award size={16} color="#a855f7" />
              <span>ISO 9001:2015 Quality Standards</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Certificate Verifier Box */}
      <div className="verify-content-container">
        <CertificateVerifier />
      </div>

      {/* Trust & Employer Verification Info Section */}
      <div className="employer-trust-section">
        <div className="employer-trust-container">
          <h2 className="employer-trust-title">Why Employers Trust ND Technologies Certificates</h2>
          <div className="trust-cards-grid">
            <div className="trust-card">
              <div className="trust-icon-box">
                <FileCheck size={24} />
              </div>
              <h3>Task-Based Proof</h3>
              <p>Every certificate is tied to 3 verified real-world project tasks pushed to GitHub repositories with code reviews.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <ShieldCheck size={24} />
              </div>
              <h3>Unique Verification ID</h3>
              <p>Each candidate is issued a unique tracking ID and QR code stored permanently on our verification servers.</p>
            </div>

            <div className="trust-card">
              <div className="trust-icon-box">
                <Award size={24} />
              </div>
              <h3>Industry Accreditation</h3>
              <p>Our virtual internship programs adhere strictly to ISO 9001:2015 quality management standards for technical training.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Verification FAQ Section */}
      <FAQ />
    </div>
  );
}
