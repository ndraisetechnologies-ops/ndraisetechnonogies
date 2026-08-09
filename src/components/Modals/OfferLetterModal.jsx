import React from 'react';
import { X, Printer, Download, CheckCircle2, Award, Calendar, Building2, ShieldCheck } from 'lucide-react';
import './Modals.css';

export default function OfferLetterModal({ isOpen, onClose, user, domainName }) {
  if (!isOpen) return null;

  const studentName = user ? user.name : 'Nikhil Sharma';
  const domain = domainName || 'Web Development Virtual Internship';
  const refNo = `CA/OFFER/2026/${Math.floor(10000 + Math.random() * 90000)}`;

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content modal-large glass-panel" style={{ maxWidth: '800px', background: '#0b1120', border: '1px solid var(--border-glow)' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="modal-header-actions" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-light)', paddingBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.82rem', fontWeight: '700' }}>
            <ShieldCheck size={18} />
            <span>OFFICIAL INTERNSHIP OFFER LETTER • ISO 9001:2015</span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => window.print()}>
              <Printer size={14} />
              <span>Print Letter</span>
            </button>
            <button className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => alert('Offer Letter downloaded as PDF')}>
              <Download size={14} />
              <span>Download PDF</span>
            </button>
          </div>
        </div>

        {/* Printable Offer Letter Content */}
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
            <div>Subject: <strong>Offer Letter for Virtual Internship Program</strong></div>
          </div>

          {/* Letter Body */}
          <div style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.7', display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '2rem' }}>
            <p>Dear <strong>{studentName}</strong>,</p>
            <p>
              We are pleased to inform you that based on your application, you have been selected for the <strong>4-Week Virtual Internship Track</strong> in <strong>{domain}</strong> at ND Raise Technologies.
            </p>
            <p>
              During this 1-month virtual tenure, you will work on assigned project tasks, gain practical domain exposure, and showcase your development skills. Upon successful submission and verification of your tasks, you will be awarded an official <strong>Verifiable Certificate</strong> and a <strong>Letter of Recommendation (LOR)</strong>.
            </p>

            <div style={{ background: '#f8fafc', border: '1px solid #cbd5e1', padding: '0.85rem 1.25rem', borderRadius: '8px', fontSize: '0.85rem' }}>
              <div style={{ fontWeight: '700', color: '#4338ca', marginBottom: '0.25rem' }}>Program Overview:</div>
              <div>• <strong>Domain:</strong> {domain}</div>
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
    </div>
  );
}
