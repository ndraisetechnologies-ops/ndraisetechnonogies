import React, { useState } from 'react';
import { X, Download, Printer, Award, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

export default function OfferLetterModal({ isOpen, onClose, user, domainName }) {
  const [emailInput, setEmailInput] = useState(user ? user.email : '');
  const [selectedDomain, setSelectedDomain] = useState(domainName || '');
  const [isGenerated, setIsGenerated] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const shouldReduceMotion = useReducedMotion();

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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div 
            className="modal-content modal-large glass-panel" 
            style={{ 
              maxWidth: isGenerated ? '820px' : '780px', 
              background: isGenerated ? '#0b1120' : '#f8fafc', 
              border: '1px solid var(--border-glow)',
              color: isGenerated ? '#ffffff' : '#0f172a',
              padding: '2.5rem 2rem'
            }} 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose} style={{ color: isGenerated ? '#ffffff' : '#64748b' }}>
              <X size={20} />
            </button>

            {!isGenerated ? (
              <div className="modal-body-container">
                <div className="modal-header">
                  <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
                    OFFICIAL DOCUMENT ISSUANCE
                  </div>
                  <h3 className="modal-title" style={{ color: '#0f172a' }}>Download Offer Letter</h3>
                  <p className="modal-subtitle" style={{ color: '#64748b' }}>
                    Enter your details to generate & download your 4-week virtual internship offer letter
                  </p>
                </div>

                {errorMsg && (
                  <div style={{ background: '#fee2e2', border: '1px solid #f87171', color: '#991b1b', padding: '0.65rem 1rem', borderRadius: '8px', marginBottom: '1rem', fontSize: '0.85rem' }}>
                    {errorMsg}
                  </div>
                )}

                <form className="modal-form" onSubmit={handleGenerate}>
                  <div className="form-group">
                    <label className="form-label" style={{ color: '#334155' }}>Registered Email Address</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="student@example.com" 
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label" style={{ color: '#334155' }}>Select Internship Domain Track</label>
                    <select 
                      className="form-input" 
                      value={selectedDomain} 
                      onChange={(e) => setSelectedDomain(e.target.value)}
                      style={{ background: '#ffffff', color: '#0f172a', borderColor: '#cbd5e1' }}
                      required
                    >
                      <option value="" disabled>-- Select Track --</option>
                      {domainOptions.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  </div>

                  <motion.button 
                    type="submit" 
                    className="btn-primary form-submit-btn" 
                    style={{ background: '#2563eb', color: '#ffffff', marginTop: '1rem' }}
                    whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                    whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                  >
                    <span>Generate Offer Letter</span>
                  </motion.button>
                </form>
              </div>
            ) : (
              <div className="offer-letter-document">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
                  <button 
                    onClick={() => setIsGenerated(false)} 
                    style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.85rem' }}
                  >
                    <ArrowLeft size={16} /> Back to Editor
                  </button>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <motion.button 
                      onClick={() => window.print()} 
                      className="btn-secondary" 
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    >
                      <Printer size={15} /> Print
                    </motion.button>
                    <motion.button 
                      onClick={() => window.print()} 
                      className="btn-primary" 
                      style={{ padding: '0.4rem 0.85rem', fontSize: '0.82rem' }}
                      whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    >
                      <Download size={15} /> Download PDF
                    </motion.button>
                  </div>
                </div>

                <div style={{ background: '#ffffff', color: '#0f172a', padding: '2rem', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src="/logo.jpg" alt="ND Raise Logo" style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
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

                  <div style={{ marginBottom: '1.25rem', fontSize: '0.9rem', color: '#334155' }}>
                    <div><strong>To:</strong></div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#1e1b4b' }}>{studentName}</div>
                    <div>Registered Email: <strong>{emailInput}</strong></div>
                    <div>Subject: <strong>Offer Letter for Virtual Internship Program</strong></div>
                  </div>

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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
