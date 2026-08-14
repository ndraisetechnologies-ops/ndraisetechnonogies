import React, { useState } from 'react';
import { Award, CheckCircle2, Download, ExternalLink, Share2, Search, ArrowRight, ShieldCheck, Printer } from 'lucide-react';
import './MyCertificatesPage.css';

const MOCK_USER_CERTIFICATES = [
  {
    id: 'NDR-2026-1042',
    trackTitle: 'Web Development Virtual Internship',
    issueDate: 'August 05, 2026',
    duration: '4 Weeks (100 Hours)',
    grade: 'Grade A+ (Distinction)',
    skills: ['React.js', 'Node.js', 'CSS3', 'REST APIs', 'Git/GitHub'],
    verificationUrl: 'https://ndraisetechnologies.com/verify/NDR-2026-1042',
    isVerified: true
  },
  {
    id: 'NDR-2026-8942',
    trackTitle: 'Python Programming & Data Structures',
    issueDate: 'July 20, 2026',
    duration: '4 Weeks (80 Hours)',
    grade: 'Grade A (Excellent)',
    skills: ['Python 3', 'OOP', 'Data Structures', 'BeautifulSoup', 'Algorithms'],
    verificationUrl: 'https://ndraisetechnologies.com/verify/NDR-2026-8942',
    isVerified: true
  }
];

export default function MyCertificatesPage({ user, onExploreClick, onSubmitTasksClick }) {
  const [certificates, setCertificates] = useState(MOCK_USER_CERTIFICATES);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCertModal, setActiveCertModal] = useState(null);

  const filteredCerts = certificates.filter(c => 
    c.trackTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const studentName = user ? user.name : 'Nikhil Sharma';

  return (
    <div className="my-certificates-page">
      <div className="certificates-container">
        {/* Top Header & Stat Strip */}
        <div className="page-top-header">
          <div>
            <h1 className="my-certs-title">My Certificates</h1>
            <p className="my-certs-subtitle">
              View and manage all your verified professional certifications in one place.
            </p>
          </div>

          {/* Top Right Earned Badge Card (Matching Reference Image) */}
          <div className="earned-stat-card">
            <div>
              <div className="stat-card-label">CERTIFICATES EARNED</div>
              <div className="stat-card-number">{certificates.length}</div>
            </div>
            <div className="stat-card-icon">
              <Award size={26} color="#0284c7" />
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        {certificates.length > 0 && (
          <div className="certs-search-bar glass-panel">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input 
                type="text" 
                placeholder="Search certificate by ID or domain title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="certs-search-input"
              />
            </div>
            <div className="search-meta">
              Showing <strong>{filteredCerts.length}</strong> verified credentials
            </div>
          </div>
        )}

        {/* Content Section: Grid vs Empty State */}
        {certificates.length === 0 ? (
          /* EMPTY STATE - MATCHING REFERENCE IMAGE 100% */
          <div className="empty-certificates-card">
            <div className="empty-icon-circle">
              <Award size={36} color="#94a3b8" />
            </div>

            <h2 className="empty-title">No Certificates Yet</h2>

            <p className="empty-subtitle">
              Once you pass your assessment tests and complete the verification process, your certificates will appear here.
            </p>

            <button className="start-assessing-btn" onClick={onExploreClick}>
              <span>Start Assessing</span>
              <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* EARNED CERTIFICATES GRID */
          <div className="certificates-grid">
            {filteredCerts.map((cert) => (
              <div key={cert.id} className="certificate-card glass-panel">
                <div className="card-top-row">
                  <div className="verified-tag">
                    <CheckCircle2 size={15} color="#34d399" />
                    <span>ISO 9001:2015 VERIFIED</span>
                  </div>
                  <span className="cert-id-badge">ID: {cert.id}</span>
                </div>

                <h3 className="cert-track-title">{cert.trackTitle}</h3>
                
                <div className="cert-details-list">
                  <div>• <strong>Issued To:</strong> {studentName}</div>
                  <div>• <strong>Issue Date:</strong> {cert.issueDate}</div>
                  <div>• <strong>Duration:</strong> {cert.duration}</div>
                  <div>• <strong>Grade:</strong> {cert.grade}</div>
                </div>

                <div className="skills-chips">
                  {cert.skills.map((skill, idx) => (
                    <span key={idx} className="skill-chip">{skill}</span>
                  ))}
                </div>

                <div className="card-actions">
                  <button 
                    className="btn-primary flex-btn"
                    onClick={() => setActiveCertModal(cert)}
                  >
                    <Award size={16} />
                    <span>View Certificate</span>
                  </button>

                  <button 
                    className="btn-secondary flex-btn"
                    onClick={() => alert(`Downloaded Official PDF Certificate for ${cert.id}`)}
                  >
                    <Download size={16} />
                    <span>Download PDF</span>
                  </button>

                  <button 
                    className="btn-secondary flex-btn icon-only"
                    title="Share Verified Credential on LinkedIn"
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(cert.verificationUrl)}`, '_blank')}
                  >
                    <Share2 size={16} color="#0077b5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FULL CERTIFICATE MODAL VIEW */}
      {activeCertModal && (
        <div className="modal-overlay animate-fade-in" onClick={() => setActiveCertModal(null)}>
          <div className="modal-content modal-large glass-panel" style={{ maxWidth: '800px', background: '#0b1120' }} onClick={(e) => e.stopPropagation()}>
            <div className="result-top-bar" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#34d399', fontSize: '0.85rem', fontWeight: '700' }}>
                <ShieldCheck size={18} />
                <span>OFFICIAL VERIFIED CREDENTIAL • {activeCertModal.id}</span>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn-secondary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => window.print()}>
                  <Printer size={14} />
                  <span>Print</span>
                </button>
                <button className="btn-primary" style={{ padding: '0.4rem 0.85rem', fontSize: '0.8rem' }} onClick={() => setActiveCertModal(null)}>
                  Close
                </button>
              </div>
            </div>

            {/* Certificate Paper */}
            <div style={{ background: '#ffffff', color: '#1e293b', padding: '3rem', borderRadius: '12px', border: '8px solid #4338ca', textAlign: 'center', fontFamily: "'Inter', sans-serif" }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem' }}>
                <img src="/logo.jpg" alt="Logo" style={{ width: '50px', height: '50px', objectFit: 'contain' }} />
                <div>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '800', color: '#1e1b4b' }}>ND Raise Technologies</h3>
                  <p style={{ margin: 0, fontSize: '0.75rem', color: '#64748b' }}>ISO 9001:2015 Certified Educational Platform</p>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#475569', textAlign: 'right' }}>
                  <div>ID: <strong>{activeCertModal.id}</strong></div>
                  <div>Date: {activeCertModal.issueDate}</div>
                </div>
              </div>

              <h2 style={{ fontSize: '2rem', fontFamily: 'Georgia, serif', color: '#1e1b4b', marginBottom: '0.5rem' }}>CERTIFICATE OF COMPLETION</h2>
              <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.5rem' }}>THIS IS PROUDLY PRESENTED TO</p>

              <h1 style={{ fontSize: '2.2rem', color: '#2563eb', fontWeight: '800', marginBottom: '1rem', borderBottom: '2px solid #3b82f6', display: 'inline-block', paddingBottom: '0.25rem' }}>
                {studentName}
              </h1>

              <p style={{ fontSize: '0.92rem', color: '#334155', maxWidth: '600px', margin: '0 auto 1.5rem', lineHeight: '1.6' }}>
                for successfully completing the <strong>4-Week Virtual Internship Track</strong> in <strong>{activeCertModal.trackTitle}</strong> with <strong>{activeCertModal.grade}</strong>.
              </p>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: '2rem', paddingTop: '1rem', borderTop: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontFamily: 'cursive', fontSize: '1.2rem', color: '#4338ca', fontWeight: '700' }}>Authorized Signatory</div>
                  <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#0f172a' }}>Director of Training & Certification</div>
                </div>
                <div style={{ textAlign: 'center', background: '#f0fdf4', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #86efac' }}>
                  <Award size={24} color="#16a34a" style={{ display: 'block', margin: '0 auto 0.2rem' }} />
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: '#15803d' }}>QR VERIFIED CREDENTIAL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
