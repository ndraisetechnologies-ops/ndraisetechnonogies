import React, { useState, useEffect, useRef } from 'react';
import { Users, Briefcase, RefreshCw, Award } from 'lucide-react';
import './Stats.css';

// Component for rolling numbers on page open/scroll and becoming static
function RollingNumber({ targetStr, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const elementRef = useRef(null);

  // Convert target string "12,540+" to numeric 12540
  const targetNum = parseInt(targetStr.replace(/[^0-9]/g, ''), 10) || 0;

  useEffect(() => {
    let animationFrameId;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTimestamp = null;
          const duration = 2200; // 2.2s smooth rolling duration

          const animateCount = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);

            // Smooth cubic ease-out calculation
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * targetNum);

            setCount(currentVal);

            if (progress < 1) {
              animationFrameId = window.requestAnimationFrame(animateCount);
            } else {
              setCount(targetNum);
              setIsFinished(true); // Numbers become completely static
            }
          };

          animationFrameId = window.requestAnimationFrame(animateCount);
          observer.disconnect(); // Trigger once on open/scroll
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (animationFrameId) window.cancelAnimationFrame(animationFrameId);
      observer.disconnect();
    };
  }, [targetNum]);

  return (
    <span 
      ref={elementRef} 
      className={`stat-number ${isFinished ? 'is-static' : 'is-rolling'}`}
    >
      {count.toLocaleString()}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const stats = [
    {
      id: 'students',
      icon: Users,
      number: '12,540+',
      label: 'Students Enrolled',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      iconColor: '#c084fc',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      id: 'internships',
      icon: Briefcase,
      number: '150+',
      label: 'Internships',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    {
      id: 'projects',
      icon: RefreshCw,
      number: '500+',
      label: 'Projects Completed',
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    {
      id: 'certificates',
      icon: Award,
      number: '7,950+',
      label: 'Certificates Issued',
      iconBg: 'rgba(52, 211, 153, 0.15)',
      iconColor: '#34d399',
      borderColor: 'rgba(52, 211, 153, 0.3)',
    },
  ];

  return (
    <section className="stats-section">
      <div className="stats-grid">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.id} className="glass-panel stat-card">
              <div 
                className="stat-icon-wrapper" 
                style={{ 
                  background: stat.iconBg, 
                  color: stat.iconColor,
                  borderColor: stat.borderColor 
                }}
              >
                <Icon size={24} />
              </div>
              <div className="stat-info">
                <RollingNumber targetStr={stat.number} suffix="+" />
                <span className="stat-label">{stat.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
