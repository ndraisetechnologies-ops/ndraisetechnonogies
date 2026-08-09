import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import './CTA.css';

export default function CTA({ onGetStarted }) {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <div className="cta-left">
          <div className="cta-icon-box">
            <GraduationCap size={32} />
          </div>

          <div className="cta-text-content">
            <h3 className="cta-title">Start Your Learning Journey Today!</h3>
            <p className="cta-subtitle">Join thousands of students and build your future with ND Raise Technologies.</p>
          </div>
        </div>

        <div className="cta-button">
          <button className="btn-primary" style={{ padding: '0.85rem 2rem', fontSize: '1rem' }} onClick={onGetStarted}>
            <span>Get Started Now</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}
