import React, { useState } from 'react';
import { Mail, Briefcase, Download, Printer, ShieldCheck, ChevronDown, Award, ArrowLeft } from 'lucide-react';
import './OfferLetterPage.css';

export default function OfferLetterPage({ user }) {
  const [emailInput, setEmailInput] = useState(user ? user.email : '');
  const [selectedDomain, setSelectedDomain] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const domainOptions = [
    'Web Development (4-Week)',
    'Python Programming (4-Week)',
    'Data Science & Analytics',
    'AI & Machine Learning',
    'Mobile App Development',
    'Cybersecurity Analyst',
    'UI/UX Design',
    'Java Development',
    'C++ Programming'
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    if (!emailInput.trim()) {
      setErrorMsg('Please enter your registered email address.');
      return;
    }
    if (!selectedDomain) {
      setErrorMsg('Please select your internship domain.');
      return;
    }
    setErrorMsg('');
    setIsGenerated(true);
  };

  const studentName = user ? user.name : (emailInput.split('@')[0] || 'Nikhil Sharma');
  const refNo = `NDR/OFFER/2026/${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="offer-letter-page">
      <div className="offer-letter-container">
        {!isGenerated ? (
          /* FORM VIEW - FULL PAGE STANDALONE PORTAL (MATCHING REFERENCE IMAGE) */
          <div className="offer-portal-wrapper">
            <div className="offer-header">
              <div className="offer-badge">
                <span className="badge-dot">•</span>
                <span>OFFICIAL OFFER LETTER PORTAL</span>
              </div>

              <h1 className="offer-page-title">
                Download Your Offer Letter
              </h1>

              <p className="offer-page-subtitle">
                Enter your registered email and internship domain to instantly download your official ND Raise Technologies internship offer letter.
              </p>
            </div>

            {/* White Form Card */}
            <div className="offer-form-card">
              <form onSubmit={handleGenerate}>
                <div className="form-fields-grid">
                  {/* Email Input */}
                  <div className="field-group">
                    <label className="field-label">Email Address</label>
                    <div className="input-with-icon">
                      <Mail size={18} className="field-icon" />
                      <input 
                        type="email" 
                        required
                        className="field-input"
                        placeholder="Enter registered email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Domain Select */}
                  <div className="field-group">
                    <label className="field-label">Internship Domain</label>
                    <div className="input-with-icon">
                      <Briefcase size={18} className="field-icon" />
                      <select
                        required
                        className={`field-select ${selectedDomain ? 'has-value' : ''}`}
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                      >
                        <option value="" disabled>Choose Internship Domain</option>
                        {domainOptions.map((dom, idx) => (
                          <option key={idx} value={dom}>{dom}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} className="select-chevron" />
                    </div>
                  </div>
                </div>

                {errorMsg && <div className="form-error-msg">{errorMsg}</div>}

                {/* Download Action Button */}
                <div className="button-center-row">
                  <button type="submit" className="offer-download-btn">
                    <span>Download Offer Letter</span>
                    <Download size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* RESULT VIEW - FULL PAGE OFFER LETTER PREVIEW */
          <div className="offer-result-wrapper">
            <div className="result-top-bar">
              <button className="btn-secondary" onClick={() => setIsGenerated(false)}>
                <ArrowLeft size={16} />
                <span>Search Another</span>
              </button>

              <div className="action-buttons-group">
                <button className="btn-secondary" onClick={() => window.print()}>
                  <Printer size={16} />
                  <span>Print Letter</span>
                </button>
                <button className="btn-primary" onClick={() => alert(`Offer Letter PDF downloaded for ${studentName}`)}>
                  <Download size={16} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Printable ISO 9001:2015 Offer Letter Paper Card */}
            <div className="printable-paper-card">
              <div className="paper-header">
                <div className="org-brand">
                  <img src="/logo.jpg" alt="Logo" className="org-logo" />
                  <div>
                    <h2 className="org-title">ND Raise Technologies</h2>
                    <p className="org-subtitle">ISO 9001:2015 Certified Virtual Educational & Internship Platform</p>
                  </div>
                </div>
                <div className="ref-details">
                  <div><strong>Ref No:</strong> {refNo}</div>
                  <div><strong>Date:</strong> August 09, 2026</div>
                </div>
              </div>

              <div className="recipient-section">
                <div><strong>To:</strong></div>
                <div className="student-name">{studentName}</div>
                <div>Registered Email: <strong>{emailInput}</strong></div>
                <div>Subject: <strong>Offer Letter for Virtual Internship Program</strong></div>
              </div>

              <div className="letter-body">
                <p>Dear <strong>{studentName}</strong>,</p>
                <p>
                  We are pleased to inform you that based on your application, you have been selected for the <strong>4-Week Virtual Internship Track</strong> in <strong>{selectedDomain}</strong> at ND Raise Technologies.
                </p>
                <p>
                  During this 1-month virtual tenure, you will work on assigned project tasks, gain practical domain exposure, and showcase your development skills. Upon successful submission and verification of your tasks, you will be awarded an official <strong>Verifiable Certificate</strong> and a <strong>Letter of Recommendation (LOR)</strong>.
                </p>

                <div className="program-box">
                  <div className="program-title">Program Overview:</div>
                  <div>• <strong>Domain:</strong> {selectedDomain}</div>
                  <div>• <strong>Duration:</strong> 4 Weeks (Self-Paced / Virtual)</div>
                  <div>• <strong>Assigned Tasks:</strong> 3 Project Tasks</div>
                </div>
              </div>

              <div className="signatures-row">
                <div>
                  <div className="sig-text">Authorized Signatory</div>
                  <div className="sig-role">Director of Student Success</div>
                  <div className="sig-company">ND Raise Technologies</div>
                </div>

                <div className="seal-badge">
                  <Award size={26} color="#2563eb" style={{ display: 'block', margin: '0 auto 0.2rem' }} />
                  <span className="seal-text">VERIFIED OFFICIAL SEAL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
