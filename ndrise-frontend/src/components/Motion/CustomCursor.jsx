import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import './CustomCursor.css';

export default function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [theme, setTheme] = useState('dark');
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'button' | 'link' | 'card' | 'hero' | 'input'
  const [isVisible, setIsVisible] = useState(false);

  const dotDomRef = useRef(null);
  const ringDomRef = useRef(null);

  // Position references for 60fps interpolation
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotPosRef = useRef({ x: -100, y: -100 });
  const ringPosRef = useRef({ x: -100, y: -100 });

  // Track active magnetic element and card spotlight element
  const activeBtnRef = useRef(null);
  const activeCardRef = useRef(null);
  const rafIdRef = useRef(null);

  // 1. Detect Theme Changes via MutationObserver
  useEffect(() => {
    const updateTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      setTheme(currentTheme);
    };

    updateTheme();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-theme') {
          updateTheme();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // 2. Main Cursor Motion & Interaction Loop
  useEffect(() => {
    // Disable custom cursor on touch/mobile devices or reduced motion
    const isTouchDevice = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    if (shouldReduceMotion || isTouchDevice) {
      return;
    }

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      mouseRef.current = { x, y };

      if (!isVisible) {
        setIsVisible(true);
      }

      // --- CARD RADIAL SPOTLIGHT LOGIC ---
      const cardEl = e.target.closest(
        '.internship-card, .stat-card, .project-card, .certificate-card, .testimonial-card, .glass-panel, .info-card, .contact-form-card, .hero-card, .step-journey-card, .hero-3d-ide-window, [data-cursor-card]'
      );

      if (cardEl) {
        const rect = cardEl.getBoundingClientRect();
        const cardX = x - rect.left;
        const cardY = y - rect.top;

        cardEl.style.setProperty('--mouse-x', `${cardX}px`);
        cardEl.style.setProperty('--mouse-y', `${cardY}px`);
        cardEl.style.setProperty('--mouse-opacity', '1');

        if (activeCardRef.current && activeCardRef.current !== cardEl) {
          activeCardRef.current.style.setProperty('--mouse-opacity', '0');
        }
        activeCardRef.current = cardEl;
      } else if (activeCardRef.current) {
        activeCardRef.current.style.setProperty('--mouse-opacity', '0');
        activeCardRef.current = null;
      }

      // --- MAGNETIC BUTTON EFFECT LOGIC ---
      const btnEl = e.target.closest('button, .btn-primary, .btn-secondary, .auth-primary-btn, .btn-google-auth-pill, .auth-floating-back-btn, [role="button"]');

      if (btnEl) {
        const rect = btnEl.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = x - centerX;
        const dy = y - centerY;

        // Subtle 2-4px max magnetic movement
        const moveX = Math.min(Math.max(dx * 0.15, -4), 4);
        const moveY = Math.min(Math.max(dy * 0.15, -4), 4);

        btnEl.style.transform = `translate3d(${moveX}px, ${moveY}px, 0)`;

        // Move child icon ~4px to right if present
        const iconEl = btnEl.querySelector('svg, .sparkle-icon, [data-lucide]');
        if (iconEl) {
          iconEl.style.transform = `translate3d(4px, 0, 0)`;
        }

        if (activeBtnRef.current && activeBtnRef.current !== btnEl) {
          activeBtnRef.current.style.transform = '';
          const oldIcon = activeBtnRef.current.querySelector('svg, .sparkle-icon, [data-lucide]');
          if (oldIcon) oldIcon.style.transform = '';
        }
        activeBtnRef.current = btnEl;
      } else if (activeBtnRef.current) {
        activeBtnRef.current.style.transform = '';
        const oldIcon = activeBtnRef.current.querySelector('svg, .sparkle-icon, [data-lucide]');
        if (oldIcon) oldIcon.style.transform = '';
        activeBtnRef.current = null;
      }

      // --- HERO PARALLAX LOGIC ---
      const heroSection = e.target.closest('.hero-section');
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect();
        const normX = (x - rect.left - rect.width / 2) / (rect.width / 2);
        const normY = (y - rect.top - rect.height / 2) / (rect.height / 2);

        // Hero visual stage: ~8-12px
        const stageEl = heroSection.querySelector('.hero-visual-3d-stage, .hero-3d-card-wrapper');
        if (stageEl) {
          stageEl.style.transform = `translate3d(${normX * 10}px, ${normY * 8}px, 0)`;
        }

        // Floating badges: ~4-8px
        const badges = heroSection.querySelectorAll('.hero-badge-tag, .floating-badge, .strip-item');
        badges.forEach((badge) => {
          badge.style.transform = `translate3d(${normX * 6}px, ${normY * 5}px, 0)`;
        });

        // Hero text: ~2-4px
        const heroText = heroSection.querySelector('.hero-title, .hero-description');
        if (heroText) {
          heroText.style.transform = `translate3d(${normX * 3}px, ${normY * 2}px, 0)`;
        }
      } else {
        // Reset hero parallax elements when cursor leaves hero section
        const lastHeroStage = document.querySelector('.hero-visual-3d-stage, .hero-3d-card-wrapper');
        if (lastHeroStage && lastHeroStage.style.transform) lastHeroStage.style.transform = '';
      }

      // --- STATE DETECTION ---
      const inputEl = e.target.closest('input, textarea, select, [contenteditable], .auth-field-input');
      const linkEl = e.target.closest('a, .nav-link, .auth-forgot-link, .auth-action-link, .footer-link');

      if (inputEl) {
        setCursorState('input');
      } else if (btnEl) {
        setCursorState('button');
      } else if (linkEl) {
        setCursorState('link');
      } else if (heroSection) {
        setCursorState('hero');
      } else if (cardEl) {
        setCursorState('card');
      } else {
        setCursorState('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      if (activeCardRef.current) {
        activeCardRef.current.style.setProperty('--mouse-opacity', '0');
        activeCardRef.current = null;
      }
      if (activeBtnRef.current) {
        activeBtnRef.current.style.transform = '';
        const oldIcon = activeBtnRef.current.querySelector('svg, .sparkle-icon, [data-lucide]');
        if (oldIcon) oldIcon.style.transform = '';
        activeBtnRef.current = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    // --- 60 FPS rAF INTERPOLATION LOOP ---
    const renderLoop = () => {
      const mouse = mouseRef.current;
      const dot = dotPosRef.current;
      const ring = ringPosRef.current;

      // High precision lerp: dot = fast 0.55, ring = smooth 0.22
      dot.x += (mouse.x - dot.x) * 0.55;
      dot.y += (mouse.y - dot.y) * 0.55;

      ring.x += (mouse.x - ring.x) * 0.22;
      ring.y += (mouse.y - ring.y) * 0.22;

      if (dotDomRef.current) {
        dotDomRef.current.style.transform = `translate3d(${dot.x}px, ${dot.y}px, 0)`;
      }

      if (ringDomRef.current) {
        ringDomRef.current.style.transform = `translate3d(${ring.x}px, ${ring.y}px, 0)`;
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [shouldReduceMotion, isVisible]);

  const isTouchDevice = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
  if (shouldReduceMotion || isTouchDevice || !isVisible) return null;

  return (
    <div className={`custom-cursor-container state-${cursorState}`} data-cursor-theme={theme}>
      <div ref={dotDomRef} className="custom-cursor-dot" />
      <div ref={ringDomRef} className="custom-cursor-ring" />
    </div>
  );
}
