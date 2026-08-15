import React, { useState } from 'react';
import { X, Send } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

export default function ApplyModal({ isOpen, internship, onClose, onSubmitSuccess }) {
  const [college, setCollege] = useState('IIT Madras');
  const [degree, setDegree] = useState('B.Tech Computer Science');
  const [phone, setPhone] = useState('+91 98765 43210');
  const shouldReduceMotion = useReducedMotion();

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitSuccess(`Successfully applied for ${internship?.title}! Check your email for details.`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && internship && (
        <motion.div 
          className="modal-overlay" 
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <motion.div 
            className="modal-content" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.button 
              className="modal-close" 
              onClick={onClose}
              whileHover={shouldReduceMotion ? {} : { scale: 1.1, rotate: 90 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <X size={18} />
            </motion.button>

            <div className="modal-header">
              <div className="badge badge-purple" style={{ marginBottom: '0.75rem' }}>
                Apply For Internship
              </div>
              <h3 className="modal-title">{internship.title}</h3>
              <p className="modal-subtitle">
                {internship.duration} | {internship.level}
              </p>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">College / University</label>
                <input
                  type="text"
                  className="form-input"
                  value={college}
                  onChange={(e) => setCollege(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Degree / Stream</label>
                <input
                  type="text"
                  className="form-input"
                  value={degree}
                  onChange={(e) => setDegree(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Phone Number</label>
                <input
                  type="text"
                  className="form-input"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>

              <motion.button 
                type="submit" 
                className="btn-primary form-submit-btn"
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Send size={18} />
                <span>Submit Application</span>
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
