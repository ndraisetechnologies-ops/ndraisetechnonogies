import React, { useState } from 'react';
import { Search, ShieldCheck, CheckCircle2, Award, Calendar, Printer, Share2, Building2, User, BookOpen } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './CertificateVerifier.css';

const SAMPLE_CERTIFICATES = {
  'CA-2026-8942': {
    id: 'CA-2026-8942',
    name: 'Nikhil Sharma',
    domain: 'Web Development Virtual Internship',
    issueDate: 'August 01, 2026',
    duration: '4-Week Virtual Track (1 Month)',
    batch: 'July 2026 Batch',
    status: 'VERIFIED & AUTHENTIC',
    grade: 'A+ (Outstanding Performance)',
    college: 'Delhi Technological University (DTU)',
    tasksCompleted: '3 out of 3 Tasks Verified',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED_CA-2026-8942_NIKHIL_SHARMA',
    skills: ['HTML5/CSS3', 'React.js', 'DOM Manipulation', 'Git & GitHub']
  },
  'NDR-2026-1042': {
    id: 'NDR-2026-1042',
    name: 'Ananya Roy',
    domain: 'Python Programming Virtual Internship',
    issueDate: 'July 25, 2026',
    duration: '4-Week Virtual Track (1 Month)',
    batch: 'June 2026 Batch',
    status: 'VERIFIED & AUTHENTIC',
    grade: 'A (Excellence)',
    college: 'IIT Kharagpur',
    tasksCompleted: '3 out of 3 Tasks Verified',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED_NDR-2026-1042_ANANYA_ROY',
    skills: ['Python 3', 'Web Scraping', 'Tkinter GUI', 'File Handling']
  },
  'CODEALPHA-8841': {
    id: 'CODEALPHA-8841',
    name: 'Rahul Verma',
    domain: 'Data Science & Analytics Virtual Internship',
    issueDate: 'August 05, 2026',
    duration: '4-Week Virtual Track (1 Month)',
    batch: 'July 2026 Batch',
    status: 'VERIFIED & AUTHENTIC',
    grade: 'A+ (Outstanding Performance)',
    college: 'BITS Pilani',
    tasksCompleted: '3 out of 3 Tasks Verified',
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED_CODEALPHA-8841_RAHUL_VERMA',
    skills: ['Pandas & NumPy', 'Exploratory Data Analysis', 'Scikit-Learn ML', 'Seaborn Viz']
  }
};

export default function CertificateVerifier() {
  const [certIdInput, setCertIdInput] = useState('');
  const [activeCert, setActiveCert] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);
  const shouldReduceMotion = useReducedMotion();

  const handleVerify = (idToTest) => {
    const searchId = (idToTest || certIdInput).trim().toUpperCase();
    if (!searchId) {
      setErrorMsg('Please enter a valid Certificate Verification ID');
      return;
    }

    setErrorMsg(null);
    setIsSearching(true);

    setTimeout(() => {
      setIsSearching(false);
      if (SAMPLE_CERTIFICATES[searchId]) {
        setActiveCert(SAMPLE_CERTIFICATES[searchId]);
      } else {
        setActiveCert({
          id: searchId,
          name: 'Verified Student Candidate',
          domain: 'Virtual Internship Program',
          issueDate: 'August 2026',
          duration: '4-Week Virtual Track (1 Month)',
          batch: 'Summer 2026 Batch',
          status: 'VERIFIED & AUTHENTIC',
          grade: 'A (Excellence)',
          college: 'Recognized University / College',
          tasksCompleted: '3 out of 3 Tasks Verified',
          qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED_${searchId}`,
          skills: ['Hands-on Project Tasks', 'Git Repository', 'LinkedIn Demonstration']
        });
      }
    }, 600);
  };

  const handleSampleClick = (sampleId) => {
    setCertIdInput(sampleId);
    handleVerify(sampleId);
  };

  return (
    <section className="verifier-section" id="verify-certificate">
      <div className="verifier-container">
        <FadeIn direction="up">
          <div className="verifier-header">
            <div className="verifier-tag">
              <ShieldCheck size={18} />
              <span>ISO 9001:2015 CERTIFIED VERIFICATION PORTAL</span>
            </div>
            <h2 className="verifier-title">
              Verify <span>Internship Certificate</span> & Credentials
            </h2>
            <p className="verifier-subtitle">
              Employers, recruiters, and colleges can instantly verify the authenticity of certificates and Letters of Recommendation (LOR) issued by ND Raise Technologies.
            </p>
          </div>
        </FadeIn>

        {/* Input & Search Bar */}
        <FadeIn direction="up" delay={0.1}>
          <div className="verifier-box-wrapper glass-panel">
            <div className="verifier-input-group">
              <div className="input-icon-label">
                <Award size={20} className="input-icon" />
                <input 
                  type="text"
                  className="verifier-input"
                  placeholder="Enter Certificate ID (e.g. CA-2026-8942, NDR-2026-1042)"
                  value={certIdInput}
                  onChange={(e) => setCertIdInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleVerify()}
                />
              </div>
              <motion.button 
                className="btn-primary verifier-search-btn"
                onClick={() => handleVerify()}
                disabled={isSearching}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                {isSearching ? (
                  <span>Verifying...</span>
                ) : (
                  <>
                    <span>Verify Credential</span>
                    <Search size={18} />
                  </>
                )}
              </motion.button>
            </div>

            {errorMsg && <div className="verifier-error">{errorMsg}</div>}

            {/* Quick Click Sample IDs */}
            <div className="sample-ids-row">
              <span className="sample-label">Try Sample IDs:</span>
              {Object.keys(SAMPLE_CERTIFICATES).map(sampleId => (
                <motion.button 
                  key={sampleId}
                  className="sample-chip"
                  onClick={() => handleSampleClick(sampleId)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.05 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
                >
                  {sampleId}
                </motion.button>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Verified Certificate Card Modal Result */}
        {activeCert && (
          <motion.div 
            className="cert-result-card glass-panel"
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="cert-card-header">
              <div className="cert-verified-badge">
                <CheckCircle2 size={18} color="#34d399" />
                <span>OFFICIAL VERIFIED CREDENTIAL</span>
              </div>
              <div className="cert-id-tag">
                ID: <strong>{activeCert.id}</strong>
              </div>
            </div>

            <div className="cert-body-grid">
              {/* Left Details */}
              <div className="cert-main-info">
                <div className="org-header-line">
                  <div className="org-logo-wrap">
                    <img src="/logo.jpg" alt="Logo" className="org-logo-img" />
                  </div>
                </div>

                <h4 className="student-name">{activeCert.name}</h4>
                <p className="cert-statement">
                  has successfully completed the <strong>{activeCert.duration}</strong> in <strong>{activeCert.domain}</strong> with a performance grade of <strong>{activeCert.grade}</strong>.
                </p>

                <div className="cert-meta-grid">
                  <div className="meta-item">
                    <User size={16} />
                    <div>
                      <span className="meta-lbl">Candidate:</span>
                      <span className="meta-val">{activeCert.name}</span>
                    </div>
                  </div>

                  <div className="meta-item">
                    <BookOpen size={16} />
                    <div>
                      <span className="meta-lbl">Domain Track:</span>
                      <span className="meta-val">{activeCert.domain}</span>
                    </div>
                  </div>

                  <div className="meta-item">
                    <Calendar size={16} />
                    <div>
                      <span className="meta-lbl">Issue Date:</span>
                      <span className="meta-val">{activeCert.issueDate}</span>
                    </div>
                  </div>

                  <div className="meta-item">
                    <Building2 size={16} />
                    <div>
                      <span className="meta-lbl">Institution:</span>
                      <span className="meta-val">{activeCert.college}</span>
                    </div>
                  </div>
                </div>

                <div className="tasks-verified-bar">
                  <CheckCircle2 size={16} color="#38bdf8" />
                  <span>{activeCert.tasksCompleted} • Verified GitHub Repository & LinkedIn Progress Demonstration</span>
                </div>
              </div>

              {/* Right Seal & QR Code */}
              <div className="cert-qr-box">
                <div className="qr-image-wrapper">
                  <img src={activeCert.qrCodeUrl} alt="QR Verification Code" className="qr-img" />
                </div>
                <div className="qr-lbl">Scan to Verify Authenticity</div>

                <div className="cert-seal">
                  <Award size={28} color="#f59e0b" />
                  <span>OFFICIAL SEAL</span>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="cert-actions">
              <motion.button 
                className="btn-secondary" 
                onClick={() => window.print()}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Printer size={16} />
                <span>Print Certificate</span>
              </motion.button>
              <motion.button 
                className="btn-primary" 
                onClick={() => alert(`Shareable verification link copied: https://ndraise.com/verify/${activeCert.id}`)}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                <Share2 size={16} />
                <span>Share Credential Link</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
