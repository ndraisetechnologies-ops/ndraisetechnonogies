import React, { useState } from 'react';
import { X, Send, Github, Linkedin, Video, CheckCircle2, AlertCircle } from 'lucide-react';
import './Modals.css';

export default function TaskSubmissionModal({ isOpen, onClose, defaultDomain, onSubmitSuccess }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    batchId: '',
    domain: defaultDomain ? defaultDomain.title : 'Web Development Virtual Internship',
    githubUrl: '',
    linkedinUrl: '',
    videoUrl: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      if (onSubmitSuccess) {
        onSubmitSuccess(`Task submission received for ${formData.fullName}! Verification ID: CA-2026-${Math.floor(1000 + Math.random() * 9000)}`);
      }
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content glass-panel" style={{ maxWidth: '650px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
              <CheckCircle2 size={36} />
            </div>
            <h3 style={{ fontSize: '1.75rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
              Task Submission Received!
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Thank you, <strong>{formData.fullName}</strong>. Your project task submission for <strong>{formData.domain}</strong> has been logged. Our evaluation team will review your GitHub code & LinkedIn post within 48 hours.
            </p>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--primary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '2rem', fontSize: '0.85rem', color: 'var(--text-main)' }}>
              Your Submission Reference ID: <strong>CA-2026-{Math.floor(1000 + Math.random() * 9000)}</strong>
            </div>

            <button className="btn-primary" style={{ margin: '0 auto' }} onClick={handleReset}>
              Done & Return to Site
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#34d399', fontSize: '0.78rem', fontWeight: '700', background: 'rgba(52, 211, 153, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', marginBottom: '0.75rem' }}>
              <Send size={14} />
              <span>ND RAISE TASK SUBMISSION PORTAL</span>
            </div>

            <h2 className="modal-title" style={{ fontSize: '1.6rem', marginBottom: '0.5rem' }}>
              Submit Your <span>Internship Tasks</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem' }}>
              Enter your project links below to trigger credential evaluation & certificate issuance.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Full Name *</label>
                  <input 
                    type="text" 
                    required 
                    className="form-input" 
                    placeholder="e.g. Nikhil Sharma"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Registered Email *</label>
                  <input 
                    type="email" 
                    required 
                    className="form-input" 
                    placeholder="e.g. nikhil@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Batch / Verification ID (Optional)</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. NDR-2026-1042"
                    value={formData.batchId}
                    onChange={(e) => setFormData({ ...formData, batchId: e.target.value })}
                  />
                </div>
                <div>
                  <label className="form-label">Internship Domain *</label>
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
                  <Github size={15} color="#38bdf8" />
                  <span>GitHub Repository Link (Public) *</span>
                </label>
                <input 
                  type="url" 
                  required 
                  className="form-input" 
                  placeholder="https://github.com/username/ndraise-task1"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Linkedin size={15} color="#0077b5" />
                  <span>LinkedIn Post Link (#ndraisetechnologies #internship) *</span>
                </label>
                <input 
                  type="url" 
                  required 
                  className="form-input" 
                  placeholder="https://linkedin.com/posts/username_ndraise_task-1"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <Video size={15} color="#c084fc" />
                  <span>Video Demo / Live Hosted Link (Optional)</span>
                </label>
                <input 
                  type="url" 
                  className="form-input" 
                  placeholder="https://youtube.com/watch?v=... or Vercel link"
                  value={formData.videoUrl}
                  onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                />
              </div>

              <div>
                <label className="form-label">Key Highlights / Learnings (Optional)</label>
                <textarea 
                  className="form-input" 
                  rows={2} 
                  placeholder="Share a brief summary of how you built your tasks..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                ></textarea>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="button" className="btn-secondary" onClick={onClose}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting Form...' : 'Submit Solutions'}
                </button>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
