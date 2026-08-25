import React, { useRef } from 'react';
import { UserPlus, FileCheck, Code2, Award, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import { FadeIn } from '../Motion/MotionUtils';
import './HowItWorks.css';

export default function HowItWorks({ onApplyClick, onVerifyClick, onSubmitTaskClick }) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Scroll Progress binding for connecting line animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 75%', 'end 50%']
  });

  const progressLineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = [
    {
      stepNum: '01',
      icon: UserPlus,
      title: 'Apply & Choose Domain',
      desc: 'Select your preferred 4-week virtual domain track (Web Dev, Python, Data Science, AI/ML, App Dev, Cyber Security).',
      actionText: 'Browse Domains',
      actionFn: onApplyClick,
      color: '#38bdf8'
    },
    {
      stepNum: '02',
      icon: FileCheck,
      title: 'Get Official Offer Letter',
      desc: 'Receive your official offer letter and task guidelines to kickstart your 1-month virtual internship journey.',
      actionText: 'View Sample Offer',
      actionFn: () => {},
      color: '#818cf8'
    },
    {
      stepNum: '03',
      icon: Code2,
      title: 'Complete & Share Tasks',
      desc: 'Build 2–3 assigned project tasks, upload code to GitHub, and share video demo on LinkedIn tagging #ndraisetechnologies.',
      actionText: 'Task Submission',
      actionFn: onSubmitTaskClick,
      color: '#c084fc'
    },
    {
      stepNum: '04',
      icon: Award,
      title: 'Earn Verifiable Certificate & LOR',
      desc: 'Receive your ISO 9001:2015 verifiable certificate with unique QR code and Letter of Recommendation (LOR).',
      actionText: 'Verify Credentials',
      actionFn: onVerifyClick,
      color: '#34d399'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works" ref={containerRef}>
      <div className="how-it-works-container">
        <FadeIn direction="up">
          <div className="how-it-works-header">
            <div className="section-badge badge badge-blue">
              <Code2 size={15} />
              <span>ND RAISE VIRTUAL INTERNSHIP PROCESS</span>
            </div>
            <h2 className="section-title">
              How The <span>Virtual Internship</span> Works
            </h2>
            <p className="section-desc">
              A simple 4-step self-paced virtual process designed to equip engineering and tech students with real project experience.
            </p>
          </div>
        </FadeIn>

        {/* Interactive Step Journey Wrapper */}
        <div className="journey-wrapper">
          {/* Connecting Progress Line (Desktop Horizontal, Mobile Vertical) */}
          <div className="connecting-line-bg">
            <motion.div 
              className="connecting-line-fill"
              style={
                shouldReduceMotion
                  ? { scaleX: 1, scaleY: 1 }
                  : { scaleX: progressLineScale, transformOrigin: 'left center' }
              }
            />
          </div>

          <div className="steps-journey-grid">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={s.stepNum}
                  className="step-journey-card glass-panel"
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  whileHover={
                    shouldReduceMotion
                      ? {}
                      : {
                          y: -6,
                          scale: 1.015,
                          transition: { duration: 0.25, ease: 'easeOut' },
                        }
                  }
                >
                  {/* Step Number Bubble Node */}
                  <div className="step-node-header">
                    <div 
                      className="step-number-pill" 
                      style={{ borderColor: s.color, color: s.color }}
                    >
                      {s.stepNum}
                    </div>
                    <div 
                      className="step-icon-wrap" 
                      style={{ 
                        background: `rgba(${s.color === '#38bdf8' ? '56,189,248' : s.color === '#818cf8' ? '129,140,248' : s.color === '#c084fc' ? '192,132,252' : '52,211,153'}, 0.14)`, 
                        color: s.color 
                      }}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  <h3 className="step-card-title">{s.title}</h3>
                  <p className="step-card-desc">{s.desc}</p>

                  {s.actionText && (
                    <motion.button 
                      className="step-action-btn"
                      onClick={s.actionFn}
                      whileHover={shouldReduceMotion ? {} : { x: 3 }}
                      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
                    >
                      <span>{s.actionText}</span>
                      <ArrowRight size={14} />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
