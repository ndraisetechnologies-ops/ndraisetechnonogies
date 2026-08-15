import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { FadeIn, StaggerContainer, StaggerItem } from '../Motion/MotionUtils';
import './CollegeSection.css';

export default function CollegeSection() {
  const shouldReduceMotion = useReducedMotion();

  const colleges = [
    { id: 'iitm', name: 'IIT Madras', initials: 'IIT' },
    { id: 'nitt', name: 'NIT Trichy', initials: 'NIT' },
    { id: 'vit', name: 'NIT Vellore', initials: 'NIT' },
    { id: 'srm', name: 'SRM Institute', initials: 'SRM' },
    { id: 'amrita', name: 'Amrita University', initials: 'AMR' },
    { id: 'manipal', name: 'Manipal University', initials: 'MAHE' }
  ];

  return (
    <section className="college-section">
      <FadeIn direction="up">
        <h3 className="college-title">Trusted by Students from Top Colleges</h3>
      </FadeIn>

      <StaggerContainer className="college-grid" staggerChildren={0.06}>
        {colleges.map((c) => (
          <StaggerItem key={c.id}>
            <motion.div 
              className="college-badge"
              whileHover={shouldReduceMotion ? {} : { scale: 1.05, y: -2 }}
              whileTap={shouldReduceMotion ? {} : { scale: 0.95 }}
            >
              <div className="college-icon-circle">
                {c.initials}
              </div>
              <span>{c.name}</span>
            </motion.div>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="college-pagination">
        <div className="pagination-dot"></div>
        <div className="pagination-dot active"></div>
        <div className="pagination-dot"></div>
        <div className="pagination-dot"></div>
      </div>
    </section>
  );
}
