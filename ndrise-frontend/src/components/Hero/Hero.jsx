import React from 'react';
import { ArrowRight, Play, BookOpen, Code2, TrendingUp, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

export default function Hero({ onExploreClick, onVerifyClick, onSubmitTaskClick }) {
  const shouldReduceMotion = useReducedMotion();

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Stagger container for text reveal sequence
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.1,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 20,
      scale: shouldReduceMotion ? 1 : 0.98
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: shouldReduceMotion ? 0.2 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const floatingAnimation = (yOffset = -6, duration = 3.5, delay = 0) => {
    if (shouldReduceMotion) return {};
    return {
      animate: {
        y: [0, yOffset, 0],
      },
      transition: {
        duration,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
        delay,
      },
    };
  };

  return (
    <section className="hero-section">
      {/* Left Column Staggered Entrance */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Tag Pill */}
        <motion.div variants={itemVariants} className="hero-badge-tag">
          <Sparkles size={14} className="sparkle-icon" />
          <span>LEARN • BUILD • GROW</span>
        </motion.div>

        {/* 3-Line Headline Title */}
        <motion.h1 variants={itemVariants} className="hero-title">
          <span className="title-line title-line-1">Build Skills.</span>{' '}
          <span className="title-line title-line-2">Build Projects.</span>{' '}
          <span className="title-line title-line-3">Build Your Future.</span>
        </motion.h1>

        {/* Subdescription */}
        <motion.p variants={itemVariants} className="hero-description">
          ND Raise Technologies helps students gain practical experience through structured internships, real-world projects and industry-focused learning.
        </motion.p>

        {/* Action Buttons */}
        <motion.div variants={itemVariants} className="hero-buttons">
          <motion.button 
            className="btn-primary hero-btn-main" 
            onClick={onExploreClick}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <span>Explore Internships</span>
            <ArrowRight size={18} />
          </motion.button>

          <motion.button 
            className="btn-secondary hero-btn-sub" 
            onClick={scrollToHowItWorks}
            whileHover={shouldReduceMotion ? {} : { scale: 1.03, y: -2 }}
            whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
            transition={{ duration: 0.2 }}
          >
            <span>How It Works</span>
            <Play size={13} fill="currentColor" style={{ marginLeft: '2px' }} />
          </motion.button>
        </motion.div>

        {/* Feature Highlights Strip */}
        <motion.div variants={itemVariants} className="hero-features-strip">
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
        </motion.div>
      </motion.div>

      {/* Right Side 3D Visual Stage */}
      <motion.div 
        className="hero-visual-3d-stage"
        initial={{ opacity: 0, scale: 0.94, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
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

          {/* Floating 3D Micro Chips with subtle independent motion */}
          <motion.div 
            className="hero-3d-micro-chip chip-certificate"
            {...floatingAnimation(-7, 4, 0)}
          >
            <CheckCircle2 size={16} className="chip-icon green" />
            <div className="chip-text">
              <strong>Verifiable Certificate</strong>
              <span>Instant QR Verification</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-3d-micro-chip chip-rating"
            {...floatingAnimation(-6, 4.5, 0.5)}
          >
            <Award size={16} className="chip-icon amber" />
            <div className="chip-text">
              <strong>100% Free Virtual Track</strong>
              <span>No Hidden Charges</span>
            </div>
          </motion.div>

          {/* Floating Action Pill Badges (Front 3D Layer) */}
          <motion.div 
            className="hero-pill-badge-3d pill-learn-3d"
            {...floatingAnimation(-5, 3.8, 0.2)}
          >
            <BookOpen size={16} className="pill-icon-3d cyan" />
            <span>LEARN</span>
          </motion.div>

          <motion.div 
            className="hero-pill-badge-3d pill-build-3d"
            {...floatingAnimation(-6, 4.2, 0.7)}
          >
            <Code2 size={16} className="pill-icon-3d purple" />
            <span>BUILD</span>
          </motion.div>

          <motion.div 
            className="hero-pill-badge-3d pill-grow-3d"
            {...floatingAnimation(-5, 3.6, 1.1)}
          >
            <TrendingUp size={16} className="pill-icon-3d emerald" />
            <span>GROW</span>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
