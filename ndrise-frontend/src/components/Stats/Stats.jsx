import React from 'react';
import { Users, Briefcase, RefreshCw, Award } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { AnimatedNumber, StaggerContainer, StaggerItem } from '../Motion/MotionUtils';
import './Stats.css';

export default function Stats() {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      id: 'students',
      icon: Users,
      value: 12540,
      suffix: '+',
      label: 'Students Enrolled',
      iconBg: 'rgba(168, 85, 247, 0.15)',
      iconColor: '#c084fc',
      borderColor: 'rgba(168, 85, 247, 0.3)',
    },
    {
      id: 'internships',
      icon: Briefcase,
      value: 150,
      suffix: '+',
      label: 'Internships',
      iconBg: 'rgba(99, 102, 241, 0.15)',
      iconColor: '#818cf8',
      borderColor: 'rgba(99, 102, 241, 0.3)',
    },
    {
      id: 'projects',
      icon: RefreshCw,
      value: 500,
      suffix: '+',
      label: 'Projects Completed',
      iconBg: 'rgba(56, 189, 248, 0.15)',
      iconColor: '#38bdf8',
      borderColor: 'rgba(56, 189, 248, 0.3)',
    },
    {
      id: 'certificates',
      icon: Award,
      value: 7950,
      suffix: '+',
      label: 'Certificates Issued',
      iconBg: 'rgba(52, 211, 153, 0.15)',
      iconColor: '#34d399',
      borderColor: 'rgba(52, 211, 153, 0.3)',
    },
  ];

  return (
    <section className="stats-section">
      <StaggerContainer className="stats-grid" staggerChildren={0.08}>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <StaggerItem key={stat.id}>
              <motion.div 
                className="glass-panel stat-card"
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -3,
                        scale: 1.015,
                        transition: { duration: 0.2 },
                      }
                }
              >
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
                  <span className="stat-number is-static">
                    <AnimatedNumber value={stat.value} suffix={stat.suffix} duration={1.5} />
                  </span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
