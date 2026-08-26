import React from 'react';
import { X, Shield, FileText, Cookie, Mail, Phone, MapPin } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

export default function PolicyModal({ isOpen, type, onClose }) {
  const shouldReduceMotion = useReducedMotion();

  const contentMap = {
    contact: {
      icon: Mail,
      title: 'Contact Support',
      subtitle: 'We are here to assist with your virtual internship, task submissions, & credentials.',
      body: (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-main)' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Mail size={18} /> Support Email
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>support@ndraisetechnologies.com</p>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>Average response time: 2-4 business hours</p>
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Phone size={18} /> Student Helpline
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>+91 98765 43210 (Mon - Sat, 10:00 AM - 6:00 PM IST)</p>
          </div>

          <div style={{ background: 'rgba(99, 102, 241, 0.06)', border: '1px solid var(--border-glow)', padding: '1.25rem', borderRadius: '12px' }}>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '0.5rem', color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <MapPin size={18} /> Head Office
            </h4>
            <p style={{ fontSize: '0.9rem', margin: 0 }}>ND Raise Technologies HQ, Cyber City, Tech Park, India</p>
          </div>
        </div>
      )
    },
    terms: {
      icon: FileText,
      title: 'Terms & Conditions',
      subtitle: 'Guidelines and terms governing ND Raise Technologies Virtual Internship Programs.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>1. Eligibility:</strong> The 4-Week Virtual Internship is open to engineering, computer science, and technology students worldwide.</p>
          <p><strong>2. Task Completion:</strong> Interns must complete at least 2 out of 3 assigned domain tasks to earn an official certificate & Letter of Recommendation (LOR).</p>
          <p><strong>3. Code Integrity:</strong> All project submissions must be original work pushed to public GitHub repositories and posted on LinkedIn.</p>
          <p><strong>4. Verification:</strong> Issued certificates bear a unique QR code and ID verifiable on our official verification portal indefinitely.</p>
        </div>
      )
    },
    privacy: {
      icon: Shield,
      title: 'Privacy Policy',
      subtitle: 'How ND Raise Technologies handles and protects your student data.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>Data Collection:</strong> We collect student contact details, college names, and project repository URLs solely for issuing internship credentials and certificates.</p>
          <p><strong>Data Protection:</strong> Your personal information is encrypted and never sold or shared with unauthorized third parties.</p>
          <p><strong>Public Verification:</strong> Verified certificate IDs display recipient name, domain track, and issue date on our public verifier tool for recruiters.</p>
        </div>
      )
    },
    cookies: {
      icon: Cookie,
      title: 'Cookies Policy',
      subtitle: 'Information on how we use essential browser cookies to personalize your session.',
      body: (
        <div style={{ fontSize: '0.88rem', lineHeight: '1.7', color: 'var(--text-muted)', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          <p><strong>Essential Cookies:</strong> ND Raise Technologies uses local storage and cookies to maintain your login session and dark/light theme preferences.</p>
          <p><strong>Analytics:</strong> Anonymous usage metrics are analyzed to enhance dashboard load speeds and certificate verification response times.</p>
        </div>
      )
    }
  };

  const currentPolicy = contentMap[type] || contentMap.terms;
  const Icon = currentPolicy.icon;

  return (
    <AnimatePresence>
      {isOpen && type && (
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
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: '640px' }}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={18} />
            </button>

            <div className="modal-header">
              <div className="badge badge-purple" style={{ marginBottom: '0.5rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                <Icon size={14} />
                <span>OFFICIAL PLATFORM POLICY</span>
              </div>
              <h3 className="modal-title">{currentPolicy.title}</h3>
              <p className="modal-subtitle">{currentPolicy.subtitle}</p>
            </div>

            <div className="modal-policy-body" style={{ margin: '1.5rem 0' }}>
              {currentPolicy.body}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1.5rem' }}>
              <motion.button 
                className="btn-primary" 
                onClick={onClose}
                whileHover={shouldReduceMotion ? {} : { scale: 1.03 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
              >
                Close
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
