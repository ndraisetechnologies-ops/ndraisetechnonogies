import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import './CTA.css';

export default function CTA({ onGetStarted }) {
  return (
    <section className="cta-section">
      <div className="cta-card">
        <div className="cta-left">
          <div className="cta-icon-box">
            <GraduationCap size={36} />
          </div>

          <div className="cta-text-content">
            <h3 className="cta-title">Start Your Learning Journey Today!</h3>
            <p className="cta-subtitle">Join thousands of students and build your future with ND Raise Technologies.</p>
          </div>
        </div>

        <div className="cta-button">
          <button className="btn-cta-start" onClick={onGetStarted}>
            <span>Get Started Now</span>
            <ArrowRight size={20} className="cta-arrow-icon" />
          </button>
        </div>
      </div>
    </section>
  );
}
