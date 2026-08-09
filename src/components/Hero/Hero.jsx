import React from 'react';
import { ArrowRight, Play, BookOpen, Code, TrendingUp, Sparkles } from 'lucide-react';
import './Hero.css';

export default function Hero({ onExploreClick, onHowItWorksClick }) {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-tag">
          <Sparkles size={16} />
          <span>LEARN • BUILD • GROW</span>
        </div>

        <h1 className="hero-title">
          <span className="title-line title-line-1">Build Skills.</span>
          <span className="title-line title-line-2">Build Projects.</span>
          <span className="title-line title-line-3">Build Your Future.</span>
        </h1>

        <p className="hero-description">
          ND Raise Technologies helps students gain practical experience through structured internships, real-world projects and industry-focused learning.
        </p>

        <div className="hero-buttons">
          <button className="btn-primary" onClick={onExploreClick}>
            <span>Explore Internships</span>
            <ArrowRight size={18} />
          </button>

          <button className="btn-secondary" onClick={onHowItWorksClick}>
            <span>How It Works</span>
            <Play size={16} fill="currentColor" />
          </button>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-bg-glow animate-pulse-glow"></div>

        <div className="hero-image-wrapper">
          {/* Custom Stylized Graphic SVG representing student with laptop & neon interface */}
          <svg width="100%" height="100%" viewBox="0 0 600 500" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="600" height="500" fill="#090D1A"/>
            
            {/* Background Grid Lines */}
            <g opacity="0.15" stroke="#6366F1" strokeWidth="1">
              <path d="M0 100H600M0 200H600M0 300H600M0 400H600"/>
              <path d="M100 0V500M200 0V500M300 0V500M400 0V500M500 0V500"/>
            </g>

            {/* Glowing Orb */}
            <circle cx="300" cy="220" r="140" fill="url(#hero-orb-grad)" opacity="0.6"/>
            
            {/* Holographic Coding Screen */}
            <rect x="140" y="100" width="320" height="200" rx="16" fill="#0F172A" stroke="url(#hero-stroke-grad)" strokeWidth="2"/>
            <rect x="150" y="110" width="300" height="24" rx="6" fill="#1E293B"/>
            <circle cx="165" cy="122" r="4" fill="#EF4444"/>
            <circle cx="180" cy="122" r="4" fill="#F59E0B"/>
            <circle cx="195" cy="122" r="4" fill="#10B981"/>
            
            {/* Brand Logo on Laptop Screen */}
            <g transform="translate(240, 145)">
              <rect x="0" y="0" width="120" height="42" rx="8" fill="#FFFFFF" stroke="#6366F1" strokeWidth="1.5"/>
              <image href="/logo.jpg" x="2" y="2" width="116" height="38" preserveAspectRatio="xMidYMid meet"/>
            </g>
            
            {/* Code Lines Visual */}
            <line x1="165" y1="200" x2="260" y2="200" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round"/>
            <line x1="165" y1="220" x2="340" y2="220" stroke="#818CF8" strokeWidth="4" strokeLinecap="round"/>
            <line x1="165" y1="240" x2="290" y2="240" stroke="#C084FC" strokeWidth="4" strokeLinecap="round"/>
            <line x1="165" y1="260" x2="380" y2="260" stroke="#34D399" strokeWidth="4" strokeLinecap="round"/>

            {/* Laptop Base */}
            <path d="M100 320 H500 L460 350 H140 Z" fill="url(#laptop-base-grad)"/>
            <rect x="260" y="325" width="80" height="6" rx="3" fill="#64748B"/>

            {/* Student Silhouette / Glow */}
            <path d="M220 480 C220 400 250 370 300 370 C350 370 380 400 380 480 Z" fill="url(#student-silhouette)"/>
            <circle cx="300" cy="330" r="32" fill="#1E1B4B" stroke="#6366F1" strokeWidth="2"/>

            <defs>
              <radialGradient id="hero-orb-grad" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(300 220) rotate(90) scale(140)">
                <stop stopColor="#6366F1" stopOpacity="0.4"/>
                <stop offset="1" stopColor="#06B6D4" stopOpacity="0"/>
              </radialGradient>
              <linearGradient id="hero-stroke-grad" x1="140" y1="100" x2="460" y2="300" gradientUnits="userSpaceOnUse">
                <stop stopColor="#38BDF8"/>
                <stop offset="0.5" stopColor="#818CF8"/>
                <stop offset="1" stopColor="#C084FC"/>
              </linearGradient>
              <linearGradient id="laptop-base-grad" x1="100" y1="320" x2="500" y2="350" gradientUnits="userSpaceOnUse">
                <stop stopColor="#1E293B"/>
                <stop offset="1" stopColor="#0F172A"/>
              </linearGradient>
              <linearGradient id="student-silhouette" x1="300" y1="370" x2="300" y2="480" gradientUnits="userSpaceOnUse">
                <stop stopColor="#312E81"/>
                <stop offset="1" stopColor="#0F172A" stopOpacity="0.8"/>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Orbit Badges Overlay matching the image */}
        <div className="orbit-container">
          <div className="orbit-ring animate-spin-slow"></div>

          <div className="floating-node node-learn animate-float" style={{ animationDelay: '0s' }}>
            <div className="node-icon-box" style={{ background: 'rgba(56, 189, 248, 0.2)', color: '#38bdf8' }}>
              <BookOpen size={18} />
            </div>
            <span>LEARN</span>
          </div>

          <div className="floating-node node-build animate-float" style={{ animationDelay: '1.2s' }}>
            <div className="node-icon-box" style={{ background: 'rgba(167, 139, 250, 0.2)', color: '#a78bfa' }}>
              <Code size={18} />
            </div>
            <span>BUILD</span>
          </div>

          <div className="floating-node node-grow animate-float" style={{ animationDelay: '2.4s' }}>
            <div className="node-icon-box" style={{ background: 'rgba(52, 211, 153, 0.2)', color: '#34d399' }}>
              <TrendingUp size={18} />
            </div>
            <span>GROW</span>
          </div>
        </div>
      </div>
    </section>
  );
}
