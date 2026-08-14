import React, { useState, useEffect } from 'react';
import { X, Send, Github, Linkedin, CheckCircle2, AlertCircle, Link as LinkIcon } from 'lucide-react';
import { submissionAPI } from '../../services/apiClient';
import './Modals.css';

export default function TaskSubmissionModal({ isOpen, onClose, defaultDomain, user, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    projectTitle: defaultDomain?.title || 'Personal Portfolio Website',
    domain: defaultDomain?.domain || 'Frontend Development Internship',
    fileUrl: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (defaultDomain || user) {
      setFormData((prev) => ({
        ...prev,
        fullName: user?.name || prev.fullName,
        email: user?.email || prev.email,
        projectTitle: defaultDomain?.title || prev.projectTitle,
        domain: defaultDomain?.domain || prev.domain
      }));
    }
  }, [defaultDomain, user]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    try {
      const res = await submissionAPI.submitProject({
        projectTitle: formData.projectTitle,
        domain: formData.domain,
        fileUrl: formData.fileUrl,
        notes: formData.notes
      });

      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(`Task submission received for ${formData.projectTitle}! ID: ${res.submission?.id?.substring(0, 8) || 'SUB-2026'}`);
      }
    } catch (err) {
      setIsSubmitting(false);
      setErrorMsg(err.message || 'Submission failed. Please make sure you are signed in.');
    }
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content glass-panel" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.6rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Task Submitted Successfully!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Your project submission for <strong>{formData.projectTitle}</strong> has been stored live in <strong>Neon Cloud PostgreSQL</strong> with status <span style={{ color: '#fbbf24', fontWeight: '700' }}>PENDING</span>. An admin will review it shortly.
            </p>

            <button className="btn-primary" style={{ margin: '0 auto' }} onClick={handleReset}>
              Done & Return to Dashboard
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.78rem', fontWeight: '700', background: 'rgba(52, 211, 153, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', marginBottom: '0.75rem' }}>
              <Send size={14} />
              <span>PROJECT TASK SUBMISSION PORTAL</span>
            </div>

            <h2 className="modal-title" style={{ fontSize: '1.5rem', marginBottom: '0.35rem' }}>
              Submit Task: <span style={{ color: 'var(--primary, #2563eb)' }}>{formData.projectTitle}</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.86rem', marginBottom: '1.25rem' }}>
              Provide your project repository or hosted application link for review.
            </p>

            {errorMsg && (
              <div style={{
                background: 'rgba(239, 68, 68, 0.15)',
                border: '1px solid rgba(239, 68, 68, 0.4)',
                color: '#f87171',
                padding: '0.75rem 1rem',
                borderRadius: '8px',
                marginBottom: '1rem',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Project Title *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Track / Domain *</label>
                  <input 
                    type="text" 
                    required
                    className="form-input"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <LinkIcon size={15} color="#38bdf8" />
                  <span>Project Repository / Demo Link (GitHub, Vercel, Netlify) *</span>
                </label>
                <input 
                  type="url" 
                  required 
                  className="form-input" 
                  placeholder="https://github.com/username/project-repo or https://myproject.vercel.app"
                  value={formData.fileUrl}
                  onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Submission Notes & Feature Highlights (Optional)</label>
                <textarea 
                  className="form-input" 
                  rows={3} 
                  placeholder="Briefly describe what you built, key features, or any instructions for the reviewer..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting to Neon DB...' : 'Submit Project 🚀'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
