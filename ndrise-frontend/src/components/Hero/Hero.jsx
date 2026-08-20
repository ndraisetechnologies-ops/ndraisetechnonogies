import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Play, BookOpen, Code2, TrendingUp, Sparkles, Award, CheckCircle2 } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import './Hero.css';

export default function Hero({ onExploreClick, onVerifyClick, onSubmitTaskClick }) {
  const shouldReduceMotion = useReducedMotion();

  const phrases = [
    { prefix: 'Build ', highlight: 'Skills.' },
    { prefix: 'Build ', highlight: 'Projects.' },
    { prefix: 'Build Your ', highlight: 'Future.' }
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charCount, setCharCount] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  // Mouse tilt tracking for 3D stage
  const stageRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (shouldReduceMotion || window.innerWidth < 1024 || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 6; // max 6 deg
    const rotateX = -((e.clientY - centerY) / (rect.height / 2)) * 6; // max 6 deg
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  // Typewriter Loop
  useEffect(() => {
    if (shouldReduceMotion) return;

    const currentObj = phrases[phraseIndex];
    const fullText = `${currentObj.prefix}${currentObj.highlight}`;

    let speed = isDeleting ? 35 : 60; // 60ms reveal, 35ms delete

    if (!isDeleting && charCount === fullText.length) {
      // Pause after completing phrase: 2s for final phrase, 1.2s for others
      const pauseDuration = phraseIndex === phrases.length - 1 ? 2000 : 1200;
      const timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      return () => clearTimeout(timeout);
    } else if (isDeleting && charCount === 0) {
      setIsDeleting(false);
      setPhraseIndex((prev) => (prev + 1) % phrases.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharCount((prev) => prev + (isDeleting ? -1 : 1));
    }, speed);

    return () => clearTimeout(timer);
  }, [charCount, isDeleting, phraseIndex, shouldReduceMotion]);

  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // Helper to render typed text with gradient highlight on "Future."
  const renderTypedText = () => {
    const currentObj = phrases[phraseIndex];
    const fullText = `${currentObj.prefix}${currentObj.highlight}`;
    const visibleSub = fullText.slice(0, charCount);

    const prefixLen = currentObj.prefix.length;

    if (visibleSub.length <= prefixLen) {
      return (
        <>
          <span>{visibleSub}</span>
          <span className="typewriter-cursor" aria-hidden="true" />
        </>
      );
    }

    const typedPrefix = visibleSub.slice(0, prefixLen);
    const typedHighlight = visibleSub.slice(prefixLen);
    const isFinalWord = phraseIndex === 2;

    return (
      <>
        <span>{typedPrefix}</span>
        <span className={isFinalWord ? 'hero-gradient-future' : 'hero-highlight-word'}>
          {typedHighlight}
        </span>
        <span className="typewriter-cursor" aria-hidden="true" />
      </>
    );
  };

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
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const floatingAnimation = (yOffset = -8, duration = 4, delay = 0) => {
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
      {/* Background Ambient Spotlights */}
      <div className="hero-ambient-bg">
        <div className="ambient-spotlight spotlight-blue" />
        <div className="ambient-spotlight spotlight-purple" />
        <div className="ambient-spotlight spotlight-cyan" />
      </div>

      {/* Left Content Column */}
      <motion.div 
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Top Badge Pill */}
        <motion.div variants={itemVariants} className="hero-badge-tag">
          <Sparkles size={14} className="sparkle-icon" />
          <span>LEARN • BUILD • GROW</span>
        </motion.div>

        {/* Headline Title with Continuous Typewriter Animation */}
        <motion.h1 variants={itemVariants} className="hero-title hero-title-animated">
          {shouldReduceMotion ? (
            <>
              <span className="title-static">Build Skills. Build Projects. </span>
              <span className="hero-gradient-future">Build Your Future.</span>
            </>
          ) : (
            <span className="typewriter-line">
              {renderTypedText()}
            </span>
          )}
        </motion.h1>

        {/* Description */}
        <motion.p variants={itemVariants} className="hero-description">
          ND Raise Technologies helps engineering and tech students gain practical experience through structured virtual internships, real-world industry projects, and verifiable credentials.
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

      {/* Right Side 3D Visual Stage with Parallax Tilt */}
      <motion.div 
        ref={stageRef}
        className="hero-visual-3d-stage"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, scale: 0.95, y: 25 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* 3D Container with Dynamic Tilt */}
        <div 
          className="hero-3d-card-wrapper"
          style={{
            transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
        >
          {/* Main IDE Window Layer */}
          <div className="hero-3d-ide-window glass-panel">
            {/* Header bar */}
            <div className="ide-header-bar">
              <div className="ide-dots">
                <span className="ide-dot dot-close"></span>
                <span className="ide-dot dot-min"></span>
                <span className="ide-dot dot-max"></span>
              </div>
              <div className="ide-url-pill">
                <span>ndraisetechnologies.com/internships</span>
              </div>
              <div className="ide-live-badge">
                <span className="pulse-green-dot"></span> LIVE TRACK
              </div>
            </div>

            {/* IDE Workspace Inner Content */}
            <div className="ide-body-content">
              {/* Logo Banner Container */}
              <div className="ide-logo-header">
                <div className="ide-logo-badge">
                  <img src="/logo.jpg" alt="ND Raise Technologies" className="ide-logo-img" />
                </div>
                <div className="ide-logo-text">
                  <span className="ide-logo-title">ND Raise Technologies</span>
                  <span className="ide-logo-sub">Virtual Tech Platform</span>
                </div>
              </div>

              {/* Code Snippet Block */}
              <div className="ide-code-block">
                <div className="code-line">
                  <span className="code-keyword">const</span> <span className="code-var">internship</span> = <span className="code-function">await</span> <span className="code-var">ndraise</span>.<span className="code-method">enroll</span>(&#123;
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

          {/* Micro Floating Badges */}
          <motion.div 
            className="hero-3d-micro-chip chip-certificate"
            {...floatingAnimation(-7, 4.2, 0)}
          >
            <CheckCircle2 size={16} className="chip-icon green" />
            <div className="chip-text">
              <strong>Verifiable Certificate</strong>
              <span>Instant QR Verification</span>
            </div>
          </motion.div>

          <motion.div 
            className="hero-3d-micro-chip chip-rating"
            {...floatingAnimation(-6, 4.8, 0.4)}
          >
            <Award size={16} className="chip-icon amber" />
            <div className="chip-text">
              <strong>100% Free Virtual Track</strong>
              <span>No Hidden Charges</span>
            </div>
          </motion.div>

          {/* Floating Action Pill Badges: LEARN, BUILD, GROW */}
          <motion.div 
            className="hero-pill-badge-3d pill-learn-3d"
            {...floatingAnimation(-5, 3.8, 0.1)}
          >
            <BookOpen size={16} className="pill-icon-3d cyan" />
            <span>LEARN</span>
          </motion.div>

          <motion.div 
            className="hero-pill-badge-3d pill-build-3d"
            {...floatingAnimation(-6, 4.2, 0.6)}
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
