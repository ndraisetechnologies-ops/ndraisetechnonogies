import React, { useState, useEffect } from 'react';
import { X, Send, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
  const shouldReduceMotion = useReducedMotion();

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
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="modal-overlay" 
          onClick={handleReset}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '520px' }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={handleReset}>
              <X size={18} />
            </button>

            <div className="modal-header">
              <div className="badge badge-purple" style={{ marginBottom: '0.5rem' }}>
                SUBMIT ASSIGNED TASK
              </div>
              <h3 className="modal-title">Project Submission Portal</h3>
              <p className="modal-subtitle">
                Submit your GitHub repository or video demo link for verification
              </p>
            </div>

            {errorMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                style={{
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
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {submitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '1.5rem 0' }}
              >
                <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎉</div>
                <h4 style={{ color: 'var(--text-main)', fontSize: '1.2rem', marginBottom: '0.5rem' }}>Submission Received!</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                  Your project link has been saved directly to Neon Cloud PostgreSQL database. Our team will review your work shortly.
                </p>
                <motion.button 
                  className="btn-primary" 
                  onClick={handleReset}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                >
                  Done
                </motion.button>
              </motion.div>
            ) : (
              <form className="modal-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Project Title</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.projectTitle}
                    onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Domain Track</label>
                  <input
                    type="text"
                    className="form-input"
                    value={formData.domain}
                    onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">GitHub Repository / Submission URL</label>
                  <input
                    type="url"
                    className="form-input"
                    placeholder="https://github.com/username/project-repo"
                    value={formData.fileUrl}
                    onChange={(e) => setFormData({ ...formData, fileUrl: e.target.value })}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Notes / Instructions (Optional)</label>
                  <textarea
                    className="form-input"
                    rows="3"
                    placeholder="Provide any additional deployment or access notes..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </div>

                <motion.button 
                  type="submit" 
                  className="btn-primary form-submit-btn" 
                  disabled={isSubmitting}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <Send size={18} />
                  <span>{isSubmitting ? 'Submitting to Database...' : 'Submit Task for Review'}</span>
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
