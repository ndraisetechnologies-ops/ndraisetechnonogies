import React, { useState } from 'react';
import { ArrowLeft, Check, Share2, Clock, Target, Globe, BookOpen, Award, CheckCircle2 } from 'lucide-react';
import './InternshipDetailPage.css';

export default function InternshipDetailPage({ internship, onBack, onApplyClick, onShareClick }) {
  const [activeTab, setActiveTab] = useState('Overview');

  if (!internship) return null;

  const Icon = internship.icon;

  const tabs = ["Overview", "What You'll Learn", "Curriculum", "Projects", "FAQ"];

  const defaultSkills = [
    "HTML, CSS, JavaScript",
    "React.js & JSX",
    "Components & Props",
    "State & Hooks (useState, useEffect)",
    "React Router DOM",
    "REST API Integration",
    "Git & GitHub Workflow"
  ];

  const skillsToDisplay = internship.skills || defaultSkills;

  return (
    <div className="detail-page">
      <button className="btn-outline" style={{ marginBottom: '2rem', gap: '0.5rem' }} onClick={onBack}>
        <ArrowLeft size={16} />
        Back to Internships
      </button>

      {/* Course Banner */}
      <div className="detail-header-banner">
        <div className="detail-header-content">
          <h1 className="detail-title">{internship.title}</h1>

          <div className="detail-badges">
            <span className="badge badge-purple">⏱ {internship.duration}</span>
            <span className="badge badge-blue">🎯 {internship.level}</span>
            <span className="badge badge-cyan">🌐 {internship.mode || 'Online'}</span>
          </div>

          <p className="detail-header-desc">
            {internship.description} Build portfolio-ready projects and master industry standards under expert mentorship.
          </p>

          <div className="detail-actions">
            <button className="btn-primary" style={{ padding: '0.85rem 2rem' }} onClick={() => onApplyClick(internship)}>
              Apply Now
            </button>
            <button className="btn-secondary" onClick={onShareClick}>
              <Share2 size={16} />
              Share
            </button>
          </div>
        </div>

        <div className="detail-header-graphic">
          <Icon size={72} />
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs-bar">
        {tabs.map(tab => (
          <button
            key={tab}
            className={`detail-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Grid Content */}
      <div className="detail-layout">
        <div className="detail-main-content">
          <div className="glass-panel detail-section-card">
            <h2 className="detail-section-title">About this Internship</h2>
            <p className="detail-text-paragraph">
              This internship is designed for motivated students who want to learn practical web development and build real-world applications. You will work on production-level projects and assignments to strengthen your software engineering skill set.
            </p>
            <p className="detail-text-paragraph">
              Throughout the duration, you will gain hands-on experience with modern tools, version control, code reviews, and API integrations that mirror top technology firm workflows.
            </p>
          </div>

          <div className="glass-panel detail-section-card">
            <h2 className="detail-section-title">Curriculum Highlights</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#ffffff' }}>Module 1: Foundations & Architecture</strong>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.25rem' }}>Core concepts, component lifecycles, and environment setup.</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#ffffff' }}>Module 2: State Management & Async Operations</strong>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.25rem' }}>Handling global state, custom hooks, and fetching asynchronous data.</p>
              </div>
              <div style={{ padding: '1rem', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.06)' }}>
                <strong style={{ color: '#ffffff' }}>Module 3: Capstone Portfolio Building</strong>
                <p style={{ fontSize: '0.88rem', color: '#94a3b8', marginTop: '0.25rem' }}>Designing and deploying a production-grade full-stack web application.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-panel detail-section-card">
            <h3 className="detail-section-title" style={{ fontSize: '1.2rem' }}>Skills You'll Gain</h3>
            <div className="skills-list">
              {skillsToDisplay.map((s, idx) => (
                <div key={idx} className="skill-item">
                  <CheckCircle2 className="skill-check-icon" size={18} />
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel detail-section-card">
            <h3 className="detail-section-title" style={{ fontSize: '1.2rem' }}>Key Internship Details</h3>
            <div className="info-row">
              <span className="info-label">Duration</span>
              <span className="info-value">{internship.duration}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Level</span>
              <span className="info-value">{internship.level}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Mode</span>
              <span className="info-value">{internship.mode || 'Online'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Certificate</span>
              <span className="info-value" style={{ color: '#34d399' }}>Verified Included</span>
            </div>
            <div className="info-row">
              <span className="info-label">Start Date</span>
              <span className="info-value">Flexible / Immediate</span>
            </div>

            <button 
              className="btn-primary" 
              style={{ width: '100%', marginTop: '1.5rem', justifyContent: 'center' }}
              onClick={() => onApplyClick(internship)}
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
