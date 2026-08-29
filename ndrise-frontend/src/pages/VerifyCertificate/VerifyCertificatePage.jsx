import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../../components/Motion/MotionUtils';
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
      <FadeIn direction="up">
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
                <Lock size={16} color="#3b82f6" />
                <span>Tamper-Proof QR Code Records</span>
              </div>
              <div className="trust-feature">
                <Award size={16} color="#a855f7" />
                <span>ISO 9001:2015 Quality Standards</span>
              </div>
            </div>
          </div>
        </div>
      </FadeIn>

      {/* Main Certificate Verifier Box */}
      <FadeIn direction="up" delay={0.15}>
        <div className="verify-content-container">
          <CertificateVerifier />
        </div>
      </FadeIn>

      {/* Trust & Employer Verification Info Section */}
      <div className="employer-trust-section">
        <div className="employer-trust-container">
          <FadeIn direction="up">
            <h2 className="employer-trust-title">Why Employers Trust ND Technologies Certificates</h2>
          </FadeIn>

          <StaggerContainer className="trust-cards-grid" staggerChildren={0.1}>
            <StaggerItem>
              <motion.div className="trust-card" whileHover={{ y: -6, scale: 1.015 }}>
                <div className="trust-icon-box">
                  <FileCheck size={24} />
                </div>
                <h3>Task-Based Proof</h3>
                <p>Every certificate is tied to 3 verified real-world project tasks pushed to GitHub repositories with code reviews.</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div className="trust-card" whileHover={{ y: -6, scale: 1.015 }}>
                <div className="trust-icon-box">
                  <ShieldCheck size={24} />
                </div>
                <h3>Unique Verification ID</h3>
                <p>Each candidate is issued a unique tracking ID and QR code stored permanently on our verification servers.</p>
              </motion.div>
            </StaggerItem>

            <StaggerItem>
              <motion.div className="trust-card" whileHover={{ y: -6, scale: 1.015 }}>
                <div className="trust-icon-box">
                  <Award size={24} />
                </div>
                <h3>Industry Accreditation</h3>
                <p>Our virtual internship programs adhere strictly to ISO 9001:2015 quality management standards for technical training.</p>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </div>

      {/* Verification FAQ Section */}
      <FAQ />
    </div>
  );
}
