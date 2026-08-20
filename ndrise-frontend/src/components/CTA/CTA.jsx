import React from 'react';
import { GraduationCap, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './CTA.css';

export default function CTA({ onGetStarted }) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="cta-section">
      <div className="cta-ambient-bg">
        <div className="cta-glow cta-glow-blue" />
        <div className="cta-glow cta-glow-purple" />
      </div>

      <div className="cta-container">
        <FadeIn direction="up">
          <div className="cta-card glass-panel">
            <div className="cta-content">
              <div className="cta-badge">
                <Sparkles size={14} />
                <span>READY TO LAUNCH YOUR TECH CAREER?</span>
              </div>

              <h2 className="cta-title">
                Your career doesn't start with a job. <br />
                <span>It starts with what you build.</span>
              </h2>

              <p className="cta-subtitle">
                Join 50,000+ engineering and technology students building real-world software, data, and AI projects.
              </p>

              <div className="cta-button-wrap">
                <motion.button 
                  className="btn-primary cta-btn-main" 
                  onClick={onGetStarted}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.04, y: -2 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.96 }}
                  transition={{ duration: 0.2 }}
                >
                  <span>Start Learning</span>
                  <ArrowRight size={18} />
                </motion.button>
              </div>

              <div className="cta-secondary-tags">
                <span>Internships</span> • <span>Projects</span> • <span>Skills</span> • <span>Credentials</span>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
