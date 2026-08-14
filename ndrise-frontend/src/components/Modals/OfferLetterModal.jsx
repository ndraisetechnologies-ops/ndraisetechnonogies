import React, { useState } from 'react';
import { X, Mail, Briefcase, Download, Printer, ShieldCheck, ChevronDown, Award, ArrowLeft } from 'lucide-react';
import './Modals.css';

export default function OfferLetterModal({ isOpen, onClose, user, domainName }) {
  const [emailInput, setEmailInput] = useState(user ? user.email : '');
  const [selectedDomain, setSelectedDomain] = useState(domainName || '');
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

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
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div 
        className="modal-content modal-large glass-panel" 
        style={{ 
          maxWidth: isGenerated ? '820px' : '780px', 
          background: isGenerated ? '#0b1120' : '#f8fafc', 
          border: '1px solid var(--border-glow)',
          color: isGenerated ? '#ffffff' : '#0f172a',
          padding: '2.5rem 2rem'
        }} 
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" onClick={onClose} style={{ color: isGenerated ? '#ffffff' : '#64748b' }}>
          <X size={20} />
        </button>

        {!isGenerated ? (
          /* FORM VIEW - MATCHING REFERENCE IMAGE 100% */
          <div className="offer-portal-view" style={{ textAlign: 'center' }}>
            {/* Header Badge */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '0.4rem', 
                color: '#0284c7', 
                fontSize: '0.78rem', 
                fontWeight: '700', 
                background: '#e0f2fe', 
                padding: '0.35rem 1.1rem', 
                borderRadius: '9999px', 
                marginBottom: '1rem',
                letterSpacing: '0.05em'
              }}
            >
              <span style={{ fontSize: '1.2rem', lineHeight: 0 }}>•</span>
              <span>OFFICIAL OFFER LETTER PORTAL</span>
            </div>

            {/* Title */}
            <h2 
              style={{ 
                fontSize: '2.4rem', 
                fontWeight: '800', 
                color: '#0f172a', 
                fontFamily: "'Georgia', serif", 
                marginBottom: '0.75rem',
                letterSpacing: '-0.02em'
              }}
            >
              Download Your Offer Letter
            </h2>

            {/* Subtitle */}
            <p 
              style={{ 
                color: '#475569', 
                fontSize: '0.95rem', 
                maxWidth: '560px', 
                margin: '0 auto 2.25rem', 
                lineHeight: '1.6' 
              }}
            >
              Enter your registered email and internship domain to instantly download your official ND Raise Technologies internship offer letter.
            </p>

            {/* White Rounded Form Box (Matching Reference Image) */}
            <div 
              style={{ 
                background: '#ffffff', 
                borderRadius: '24px', 
                padding: '2.5rem 2rem', 
                boxShadow: '0 15px 35px rgba(0, 0, 0, 0.06), 0 1px 3px rgba(0,0,0,0.04)',
                border: '1px solid #e2e8f0',
                textAlign: 'left'
              }}
            >
              <form onSubmit={handleGenerate}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                  {/* Email Address Field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.6rem' }}>
                      Email Address
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Mail size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <input 
                        type="email" 
                        required
                        placeholder="Enter registered email"
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.85rem 1rem 0.85rem 2.8rem', 
                          borderRadius: '12px', 
                          border: '1px solid #e2e8f0', 
                          background: '#f8fafc', 
                          fontSize: '0.9rem', 
                          color: '#0f172a',
                          outline: 'none',
                          boxSizing: 'border-box'
                        }}
                      />
                    </div>
                  </div>

                  {/* Internship Domain Select Field */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', color: '#1e293b', marginBottom: '0.6rem' }}>
                      Internship Domain
                    </label>
                    <div style={{ position: 'relative' }}>
                      <Briefcase size={18} color="#94a3b8" style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)' }} />
                      <select
                        required
                        value={selectedDomain}
                        onChange={(e) => setSelectedDomain(e.target.value)}
                        style={{ 
                          width: '100%', 
                          padding: '0.85rem 2.5rem 0.85rem 2.8rem', 
                          borderRadius: '12px', 
                          border: '1px solid #e2e8f0', 
                          background: '#f8fafc', 
                          fontSize: '0.9rem', 
                          color: selectedDomain ? '#0f172a' : '#94a3b8',
                          outline: 'none',
                          appearance: 'none',
                          cursor: 'pointer',
                          boxSizing: 'border-box'
                        }}
                      >
                        <option value="" disabled>Choose Internship Domain</option>
                        {domainOptions.map((dom, i) => (
                          <option key={i} value={dom} style={{ color: '#0f172a' }}>{dom}</option>
                        ))}
                      </select>
                      <ChevronDown size={18} color="#94a3b8" style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
                    </div>
                  </div>
                </div>

                {errorMsg && (
                  <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '1rem', textAlign: 'center' }}>
                    {errorMsg}
                  </div>
                )}

                {/* Big Center Download Button */}
                <div style={{ textAlign: 'center' }}>
                  <button 
                    type="submit" 
                    style={{ 
                      background: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)', 
                      color: '#ffffff', 
                      fontWeight: '800', 
                      fontSize: '1rem', 
                      padding: '0.9rem 2.5rem', 
                      borderRadius: '14px', 
                      border: 'none', 
                      cursor: 'pointer', 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '0.6rem',
                      boxShadow: '0 8px 25px rgba(2, 132, 199, 0.35)',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <span>Download Offer Letter</span>
                    <Download size={18} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* RESULT VIEW - PRINTABLE OFFER LETTER PREVIEW */
          <div className="offer-result-view">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '0.85rem' }}>
              <button 
                className="btn-secondary" 
                onClick={() => setIsGenerated(false)} 
                style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
              >
                <ArrowLeft size={14} />
                <span>Search Another</span>
              </button>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => window.print()}>
                  <Printer size={14} />
                  <span>Print Letter</span>
                </button>
                <button className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => alert(`Offer Letter PDF downloaded for ${studentName}`)}>
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>
              </div>
            </div>

            {/* Printable Offer Letter Paper Card */}
            <div style={{ background: '#ffffff', color: '#1e293b', padding: '2.5rem 3rem', borderRadius: '12px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)', fontFamily: "'Inter', sans-serif" }}>
              {/* Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #6366f1', paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <img src="/logo.jpg" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px' }} />
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1e1b4b', margin: 0 }}>ND Raise Technologies</h2>
                    <p style={{ fontSize: '0.78rem', color: '#64748b', margin: 0 }}>ISO 9001:2015 Certified Virtual Educational & Internship Platform</p>
                  </div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '0.78rem', color: '#475569' }}>
                  <div><strong>Ref No:</strong> {refNo}</div>
                  <div><strong>Date:</strong> August 09, 2026</div>
                </div>
              </div>

              {/* Recipient */}
              <div style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: '#334155' }}>
                <div><strong>To:</strong></div>
                <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e1b4b' }}>{studentName}</div>
                <div>Registered Email: <strong>{emailInput}</strong></div>
                <div>Subject: <strong>Offer Letter for Virtual Internship Program</strong></div>
              </div>

              {/* Letter Body */}
              <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
                <p>Dear <strong>{studentName}</strong>,</p>
                <p>
                  We are pleased to inform you that based on your application, you have been selected for the <strong>4-Week Virtual Internship Track</strong> in <strong>{selectedDomain}</strong> at ND Raise Technologies.
                </p>
                <p>
                  During this 1-month virtual tenure, you will work on assigned project tasks, gain practical domain exposure, and showcase your development skills. Upon successful submission and verification of your tasks, you will be awarded an official <strong>Verifiable Certificate</strong> and a <strong>Letter of Recommendation (LOR)</strong>.
                </p>

                <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.85rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem' }}>
                  <div style={{ fontWeight: '700', color: '#4338ca', marginBottom: '0.25rem' }}>Program Overview:</div>
                  <div>• <strong>Domain:</strong> {selectedDomain}</div>
                  <div>• <strong>Duration:</strong> 4 Weeks (Self-Paced / Virtual)</div>
                  <div>• <strong>Assigned Tasks:</strong> 3 Project Tasks</div>
                </div>
              </div>

              {/* Signatures & Seal */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: '1rem', borderTop: '1px stroke #e2e8f0' }}>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', fontWeight: '700', color: '#4338ca' }}>Authorized Signatory</div>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0f172a' }}>Director of Student Success</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>ND Raise Technologies</div>
                </div>

                <div style={{ textAlign: 'center', background: '#eff6ff', border: '1px dashed #3b82f6', padding: '0.5rem 1rem', borderRadius: '8px' }}>
                  <Award size={24} color="#2563eb" style={{ display: 'block', margin: '0 auto 0.2rem' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#1d4ed8' }}>VERIFIED OFFICIAL SEAL</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
