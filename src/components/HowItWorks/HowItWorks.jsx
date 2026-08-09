import React from 'react';
import { UserPlus, FileCheck, Code2, Award, ArrowRight } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks({ onApplyClick, onVerifyClick, onSubmitTaskClick }) {
  const steps = [
    {
      num: '01',
      icon: UserPlus,
      title: 'Apply & Choose Domain',
      desc: 'Select your preferred 4-week virtual domain track (Web Dev, Python, Data Science, AI/ML, App Dev, Cyber Security).',
      actionText: 'Browse Domains',
      actionFn: onApplyClick,
      color: '#38bdf8'
    },
    {
      num: '02',
      icon: FileCheck,
      title: 'Get Official Offer Letter',
      desc: 'Receive your official offer letter and task guidelines to kickstart your 1-month virtual internship journey.',
      actionText: 'View Sample Offer',
      actionFn: () => {},
      color: '#818cf8'
    },
    {
      num: '03',
      icon: Code2,
      title: 'Complete & Share Tasks',
      desc: 'Build 2–3 assigned project tasks, upload code to GitHub, and share video demo on LinkedIn tagging #ndraisetechnologies.',
      actionText: 'Task Submission',
      actionFn: onSubmitTaskClick,
      color: '#c084fc'
    },
    {
      num: '04',
      icon: Award,
      title: 'Earn Verifiable Certificate & LOR',
      desc: 'Receive your ISO 9001:2015 verifiable certificate with unique QR code and Letter of Recommendation (LOR).',
      actionText: 'Verify Credentials',
      actionFn: onVerifyClick,
      color: '#34d399'
    }
  ];

  return (
    <section className="how-it-works-section" id="how-it-works">
      <div className="how-it-works-container">
        <div className="how-it-works-header">
          <div className="section-badge">
            <Code2 size={16} />
            <span>ND RAISE VIRTUAL INTERNSHIP PROCESS</span>
          </div>
          <h2 className="section-title">
            How The <span>Virtual Internship</span> Works
          </h2>
          <p className="section-desc">
            A simple 4-step self-paced virtual process designed to equip engineering and tech students with real project experience.
          </p>
        </div>

        <div className="steps-grid">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div key={s.num} className="step-card glass-panel animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="step-top">
                  <span className="step-num">{s.num}</span>
                  <div className="step-icon-wrap" style={{ background: `rgba(${s.color === '#38bdf8' ? '56,189,248' : s.color === '#818cf8' ? '129,140,248' : s.color === '#c084fc' ? '192,132,252' : '52,211,153'}, 0.12)`, color: s.color }}>
                    <Icon size={26} />
                  </div>
                </div>

                <h3 className="step-card-title">{s.title}</h3>
                <p className="step-card-desc">{s.desc}</p>

                {s.actionText && (
                  <button 
                    className="step-action-btn"
                    onClick={s.actionFn}
                  >
                    <span>{s.actionText}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
