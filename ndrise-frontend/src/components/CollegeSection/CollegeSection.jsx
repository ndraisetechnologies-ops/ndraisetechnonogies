import React from 'react';
import { Building2, GraduationCap } from 'lucide-react';
import { FadeIn } from '../Motion/MotionUtils';
import './CollegeSection.css';

const COLLEGES = [
  { id: 'iitm', name: 'IIT Madras', tag: 'IIT' },
  { id: 'bits', name: 'BITS Pilani', tag: 'BITS' },
  { id: 'dtu', name: 'DTU Delhi', tag: 'DTU' },
  { id: 'vjti', name: 'VJTI Mumbai', tag: 'VJTI' },
  { id: 'iitb', name: 'IIT Bombay', tag: 'IIT' },
  { id: 'srm', name: 'SRM Institute', tag: 'SRM' },
  { id: 'nitt', name: 'NIT Trichy', tag: 'NIT' },
  { id: 'nift', name: 'NIFT Delhi', tag: 'NIFT' },
  { id: 'amrita', name: 'Amrita University', tag: 'AMR' },
  { id: 'manipal', name: 'MAHE Manipal', tag: 'MAHE' }
];

export default function CollegeSection() {
  return (
    <section className="college-section">
      <div className="college-container">
        <FadeIn direction="up">
          <div className="college-header">
            <div className="college-subtitle-badge badge-blue">
              <GraduationCap size={14} /> UNIVERSITY NETWORK
            </div>
            <h3 className="college-title">Trusted by 50,000+ Students From Top Colleges</h3>
          </div>
        </FadeIn>

        {/* Infinite Horizontal College Marquee */}
        <div className="college-marquee-wrapper">
          <div className="college-marquee-track">
            {[...COLLEGES, ...COLLEGES].map((c, idx) => (
              <div key={idx} className="college-marquee-card glass-panel">
                <div className="college-tag-icon">{c.tag}</div>
                <span className="college-name-text">{c.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
