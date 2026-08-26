import React from 'react';
import { X, ArrowRight, Code2, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import './Modals.css';

export default function TaskGuidelinesModal({ isOpen, internship, onClose, onSubmitTaskClick, onOpenFullGuidelines }) {
  const shouldReduceMotion = useReducedMotion();

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
            className="modal-content modal-large glass-panel" 
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96, y: shouldReduceMotion ? 0 : 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button className="modal-close" onClick={onClose}>
              <X size={20} />
            </button>

            <div className="modal-header-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: '#38bdf8', fontSize: '0.78rem', fontWeight: '700', background: 'rgba(56, 189, 248, 0.1)', padding: '0.3rem 0.8rem', borderRadius: '20px', marginBottom: '0.75rem' }}>
              <Code2 size={15} />
              <span>ND RAISE VIRTUAL INTERNSHIP TRACK • 4 WEEKS</span>
            </div>

            <h2 className="modal-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
              {internship.title} <span>Assigned Tasks</span>
            </h2>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              To qualify for the verifiable internship certificate and Letter of Recommendation (LOR), complete at least 2 out of 3 tasks assigned below and submit your GitHub code links & LinkedIn video post.
            </p>

            {/* Rules Banner */}
            <div style={{ background: 'rgba(99, 102, 241, 0.08)', border: '1px solid var(--border-glow)', borderRadius: 'var(--radius-md)', padding: '1rem 1.25rem', marginBottom: '1.75rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.85rem', color: 'var(--primary)', marginBottom: '0.4rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <AlertCircle size={16} />
                <span>Submission Guidelines & Rules:</span>
              </div>
              <ul style={{ paddingLeft: '1.25rem', color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: '1.6' }}>
                <li>Upload all task project code to a public GitHub repository.</li>
                <li>Post project demonstration video / screenshots on LinkedIn tagging <strong>#ndraisetechnologies</strong> and <strong>#internship</strong>.</li>
                <li>Submit your project repository link in the Task Submission Portal before the batch deadline.</li>
              </ul>
            </div>

            {/* Task Cards List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              {internship.tasks ? internship.tasks.map((t) => (
                <div
                  key={t.id}
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-lg)', padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.65rem' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: '1rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      {t.title}
                    </div>
                    <span style={{ fontSize: '0.72rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '4px', background: t.difficulty === 'Easy' ? 'rgba(52, 211, 153, 0.15)' : t.difficulty === 'Medium' ? 'rgba(251, 191, 36, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: t.difficulty === 'Easy' ? '#34d399' : t.difficulty === 'Medium' ? '#fbbf24' : '#ef4444' }}>
                      {t.difficulty}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.86rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    {t.desc}
                  </p>

                  <motion.button
                    type="button"
                    style={{ alignSelf: 'flex-start', background: 'none', border: 'none', color: '#38bdf8', fontSize: '0.82rem', fontWeight: '600', cursor: 'pointer', padding: 0, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}
                    onClick={() => {
                      onClose();
                      if (onOpenFullGuidelines) onOpenFullGuidelines(t);
                    }}
                    whileHover={shouldReduceMotion ? {} : { x: 3 }}
                  >
                    <span>View Detailed Problem Statement & Requirements →</span>
                  </motion.button>
                </div>
              )) : (
                <p style={{ color: 'var(--text-muted)' }}>No tasks loaded for this domain.</p>
              )}
            </div>

            {/* Bottom Actions */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <motion.button 
                className="btn-secondary" 
                onClick={onClose}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                Close
              </motion.button>
              <motion.button
                className="btn-primary"
                onClick={() => {
                  onClose();
                  if (onSubmitTaskClick) onSubmitTaskClick();
                }}
                whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                <span>Submit Task Solution</span>
                <ArrowRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
