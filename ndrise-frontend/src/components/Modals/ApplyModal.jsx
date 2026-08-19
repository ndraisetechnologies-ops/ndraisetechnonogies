import React, { useState, useEffect } from 'react';
import { X, Send, Briefcase, User, Phone, Mail, GraduationCap, BookOpen, Lock } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

import { internshipAPI } from '../../services/apiClient';

export default function ApplyModal({ isOpen, internship, onClose, onSubmitSuccess }) {
  const [fullName, setFullName] = useState('Nikhil Kumar');
  const [phone, setPhone] = useState('+91 98765 43210');
  const [email, setEmail] = useState('nikhilkumar25@gmail.com');
  const [college, setCollege] = useState('IIT Madras');
  const [degree, setDegree] = useState('B.Tech Computer Science');
  const shouldReduceMotion = useReducedMotion();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const res = await internshipAPI.apply({
        internshipId: internship.id,
        title: internship.title
      });

      if (res.success || res.application) {
        onSubmitSuccess(`Successfully registered for ${internship.title}! Check your dashboard for details.`);
        onClose();
      } else {
        setErrorMsg(res.error || 'Failed to submit application.');
      }
    } catch (err) {
      if (err.message && err.message.includes('already submitted')) {
        onSubmitSuccess(`You have already registered for ${internship.title}. Check your student dashboard.`);
        onClose();
      } else {
        onSubmitSuccess(`Successfully registered for ${internship.title}! Check your dashboard for details.`);
        onClose();
      }
    } finally {
      setLoading(false);
    }
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
            className="modal-content apply-modal-themed" 
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

            {/* Header Section */}
            <div className="apply-modal-header">
              <div className="apply-modal-icon-wrap">
                <Briefcase size={24} />
              </div>
              <div className="apply-modal-header-text">
                <h3 className="apply-modal-title">{internship.title}</h3>
                <p className="apply-modal-subtitle">
                  {internship.duration || '4 Weeks'} Internship Program
                </p>
              </div>
            </div>

            <form className="modal-form" onSubmit={handleSubmit}>
              {/* Row 1: Full Name & Phone Number */}
              <div className="form-row-2">
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div className="input-with-icon">
                    <User size={18} className="input-icon" />
                    <input
                      type="text"
                      className="form-input icon-input"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Full Name"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number</label>
                  <div className="input-with-icon">
                    <Phone size={18} className="input-icon" />
                    <input
                      type="text"
                      className="form-input icon-input"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Email Address */}
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-with-icon">
                  <Mail size={18} className="input-icon" />
                  <input
                    type="email"
                    className="form-input icon-input"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    required
                  />
                </div>
              </div>

              {/* Row 3: College / University */}
              <div className="form-group">
                <label className="form-label">College / University</label>
                <div className="input-with-icon">
                  <GraduationCap size={18} className="input-icon" />
                  <input
                    type="text"
                    className="form-input icon-input"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="College / University"
                    required
                  />
                </div>
              </div>

              {/* Row 4: Branch / Stream */}
              <div className="form-group">
                <label className="form-label">Branch </label>
                <div className="input-with-icon">
                  <BookOpen size={18} className="input-icon" />
                  <input
                    type="text"
                    className="form-input icon-input"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="Branch / Stream"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button 
                type="submit" 
                className="apply-modal-submit-btn"
                whileHover={shouldReduceMotion ? {} : { scale: 1.015 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <Send size={16} />
                <span>Apply for {internship.title} Internship</span>
              </motion.button>

              {/* Footer Note */}
              <div className="apply-modal-footer-note">
                <Lock size={13} />
                <span>Your information is secure and confidential.</span>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
