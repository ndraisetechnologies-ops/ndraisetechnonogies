import React from 'react';
import { GraduationCap, ArrowRight } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './CTA.css';

export default function CTA({ onGetStarted }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="cta-section">
      <FadeIn direction="up">
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
            <motion.button 
              className="btn-cta-start" 
              onClick={onGetStarted}
              whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
              transition={{ duration: 0.2 }}
            >
              <span>Get Started Now</span>
              <ArrowRight size={20} className="cta-arrow-icon" />
            </motion.button>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
