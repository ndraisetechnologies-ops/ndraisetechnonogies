import React from 'react';
import { ArrowRight, Play, BookOpen, Code2, TrendingUp, Sparkles, Award, Send } from 'lucide-react';
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

      {/* Right Side Visual Component */}
      <div className="hero-visual">
        <div className="hero-bg-glow animate-pulse-glow"></div>

        <div className="hero-image-wrapper">
          {/* Tech Grid Backdrop & SVG Illustration */}
          <svg width="100%" height="100%" viewBox="0 0 540 440" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="540" height="440" fill="#050814" rx="20" />

            {/* Grid Line Network */}
            <g opacity="0.12" stroke="#38BDF8" strokeWidth="1">
              <path d="M0 60H540M0 120H540M0 180H540M0 240H540M0 300H540M0 360H540" />
              <path d="M60 0V440M120 0V440M180 0V440M240 0V440M300 0V440M360 0V440M420 0V440M480 0V440" />
            </g>

            {/* Glowing Center Radial */}
            <circle cx="230" cy="200" r="130" fill="url(#hero-orb-grad)" opacity="0.5" />

            {/* Central IDE/Browser Preview Window */}
            <rect x="60" y="75" width="310" height="195" rx="14" fill="#0D1427" stroke="url(#hero-window-border)" strokeWidth="1.8" />
            
            {/* Window Top Controls */}
            <rect x="68" y="83" width="294" height="24" rx="6" fill="#151D33" />
            <circle cx="82" cy="95" r="4" fill="#EF4444" />
            <circle cx="96" cy="95" r="4" fill="#F59E0B" />
            <circle cx="110" cy="95" r="4" fill="#10B981" />

            {/* Logo Display Header Inside Window */}
            <g transform="translate(155, 118)">
              <rect x="0" y="0" width="120" height="42" rx="8" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1" />
              <image href="/logo.jpg" x="4" y="4" width="112" height="34" preserveAspectRatio="xMidYMid meet" />
            </g>

            {/* Code / Content Highlight Lines */}
            <line x1="85" y1="180" x2="200" y2="180" stroke="#38BDF8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="85" y1="200" x2="280" y2="200" stroke="#818CF8" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="85" y1="220" x2="240" y2="220" stroke="#C084FC" strokeWidth="3.5" strokeLinecap="round" />
            <line x1="85" y1="240" x2="320" y2="240" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" />

            {/* Monitor Base Stand & Student Silhouette */}
            <path d="M180 300 C180 250 200 230 230 230 C260 230 280 250 280 300 Z" fill="url(#student-silhouette)" />
            <circle cx="230" cy="210" r="28" fill="#1A1848" stroke="#6366F1" strokeWidth="2" />

            <defs>
              <radialGradient id="hero-orb-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(230 200) rotate(90) scale(130)">
                <stop stopColor="#6366F1" stopOpacity="0.4" />
                <stop offset="1" stopColor="#06B6D4" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="hero-window-border" x1="60" y1="75" x2="370" y2="270" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8" />
                <stop offset="0.5" stopColor="#818CF8" />
                <stop offset="1" stopColor="#C084FC" />
              </linearGradient>
              <linearGradient id="student-silhouette" x1="230" y1="230" x2="230" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#2563EB" />
                <stop offset="1" stopColor="#050814" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>

          {/* Floating Action Pill Badges (Right Side Column) */}
          <div className="hero-pill-badge pill-learn animate-float">
            <BookOpen size={16} className="pill-icon" />
            <span>LEARN</span>
          </div>

          <div className="hero-pill-badge pill-build animate-float-delayed">
            <Code2 size={16} className="pill-icon" />
            <span>BUILD</span>
          </div>

          <div className="hero-pill-badge pill-grow animate-float">
            <TrendingUp size={16} className="pill-icon" />
            <span>GROW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
