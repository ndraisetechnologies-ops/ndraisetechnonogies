import React from 'react';
import { ArrowRight, Play, BookOpen, Code2, TrendingUp, Sparkles, Award, CheckCircle2, Send } from 'lucide-react';
import './Hero.css';

export default function Hero({ onExploreClick, onVerifyClick, onSubmitTaskClick }) {
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="hero-section">
      <div className="hero-content">
        {/* Top Tag Pill */}
        <div className="hero-badge-tag">
          <Sparkles size={14} className="sparkle-icon" />
          <span>LEARN • BUILD • GROW</span>
        </div>

        {/* 3-Line Headline Title */}
        <h1 className="hero-title">
          <span className="title-line title-line-1">Build Skills.</span>
          <span className="title-line title-line-2">Build Projects.</span>
          <span className="title-line title-line-3">Build Your Future.</span>
        </h1>

        {/* Subdescription */}
        <p className="hero-description">
          ND Raise Technologies helps students gain practical experience through structured internships, real-world projects and industry-focused learning.
        </p>

        {/* Action Buttons */}
        <div className="hero-buttons">
          <button className="btn-primary hero-btn-main" onClick={onExploreClick}>
            <span>Explore Internships</span>
            <ArrowRight size={18} />
          </button>

          <button className="btn-secondary hero-btn-sub" onClick={scrollToHowItWorks}>
            <span>How It Works</span>
            <Play size={13} fill="currentColor" style={{ marginLeft: '2px' }} />
          </button>
        </div>

        {/* Feature Highlights Strip */}
        <div className="hero-features-strip">
          <div className="strip-item">
            <span className="strip-dot green"></span>
            <span>100% Free Virtual Tracks</span>
          </div>
          <div className="strip-item">
            <span className="strip-dot blue"></span>
            <span>Offer Letter in 24 Hrs</span>
          </div>
          <div className="strip-item">
            <span className="strip-dot purple"></span>
            <span>Verifiable QR Certificate & LOR</span>
          </div>
        </div>
      </div>

      {/* Right Side 3D Visual Stage */}
      <div className="hero-visual-3d-stage">
        {/* Multi-layered background ambient glow spotlights */}
        <div className="hero-3d-spotlight spotlight-cyan"></div>
        <div className="hero-3d-spotlight spotlight-purple"></div>

        {/* 3D Tilted Card Wrapper */}
        <div className="hero-3d-card-wrapper">
          
          {/* Main IDE / Workspace Card (Middle 3D Layer) */}
          <div className="hero-3d-ide-window">
            
            {/* Header bar with controls & live URL */}
            <div className="ide-header-bar">
              <div className="ide-dots">
                <span className="ide-dot dot-close"></span>
                <span className="ide-dot dot-min"></span>
                <span className="ide-dot dot-max"></span>
              </div>
              <div className="ide-url-pill">
                <span>ndrise.tech/internships</span>
              </div>
              <div className="ide-live-badge">
                <span className="pulse-green-dot"></span> LIVE TRACK
              </div>
            </div>

            {/* IDE Workspace Inner */}
            <div className="ide-body-content">
              {/* Logo Banner Container */}
              <div className="ide-logo-header">
                <img src="/logo.jpg" alt="NDRaise Technologies" className="ide-logo-img" />
                <div className="ide-logo-text">
                  <span className="ide-logo-title">NDRaise Technologies</span>
                  <span className="ide-logo-sub">Virtual Career Accelerator</span>
                </div>
              </div>

              {/* Simulated Code & Progress Block */}
              <div className="ide-code-block">
                <div className="code-line">
                  <span className="code-keyword">const</span> <span className="code-var">internship</span> = <span className="code-function">await</span> <span className="code-var">ndrise</span>.<span className="code-method">enroll</span>(&#123;
                </div>
                <div className="code-line code-indent">
                  <span className="code-prop">track</span>: <span className="code-string">"Full Stack Development"</span>,
                </div>
                <div className="code-line code-indent">
                  <span className="code-prop">duration</span>: <span className="code-string">"4 Weeks"</span>,
                </div>
                <div className="code-line code-indent">
                  <span className="code-prop">tasks</span>: <span className="code-number">3</span>,
                </div>
                <div className="code-line code-indent">
                  <span className="code-prop">certificate</span>: <span className="code-boolean">true</span>
                </div>
                <div className="code-line">&#125;);</div>
              </div>
            </div>

          </div>

          {/* Floating 3D Micro Chips */}
          <div className="hero-3d-micro-chip chip-certificate animate-float-slow">
            <CheckCircle2 size={16} className="chip-icon green" />
            <div className="chip-text">
              <strong>Verifiable Certificate</strong>
              <span>Instant QR Verification</span>
            </div>
          </div>

          <div className="hero-3d-micro-chip chip-rating animate-float-delayed-slow">
            <Award size={16} className="chip-icon amber" />
            <div className="chip-text">
              <strong>100% Free Virtual Track</strong>
              <span>No Hidden Charges</span>
            </div>
          </div>

          {/* Floating Action Pill Badges (Front 3D Layer) */}
          <div className="hero-pill-badge-3d pill-learn-3d animate-float">
            <BookOpen size={16} className="pill-icon-3d cyan" />
            <span>LEARN</span>
          </div>

          <div className="hero-pill-badge-3d pill-build-3d animate-float-delayed">
            <Code2 size={16} className="pill-icon-3d purple" />
            <span>BUILD</span>
          </div>

          <div className="hero-pill-badge-3d pill-grow-3d animate-float">
            <TrendingUp size={16} className="pill-icon-3d emerald" />
            <span>GROW</span>
          </div>

        </div>
      </div>
    </section>
  );
}
