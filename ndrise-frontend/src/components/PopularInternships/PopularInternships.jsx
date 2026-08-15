import React from 'react';
import { ArrowRight, Clock, Target, Layers, Code, Sparkles } from 'lucide-react';
import { motion, useReducedMotion } from 'framer-motion';
import { ALL_INTERNSHIPS } from '../../pages/Internships/InternshipsPage';
import { FadeIn, StaggerContainer, StaggerItem } from '../Motion/MotionUtils';
import './PopularInternships.css';

export default function PopularInternships({ onSelectInternship, onViewAllClick, onOpenTasksModal }) {
  const featured = ALL_INTERNSHIPS.slice(0, 4);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="popular-section">
      <FadeIn direction="up">
        <div className="popular-header">
          <div>
            <div className="popular-subtitle-tag">
              <Sparkles size={14} /> FEATURED VIRTUAL TRACKS
            </div>
            <h2 className="popular-title">Explore <span>Featured Domains</span></h2>
          </div>
          <motion.span 
            className="view-all-link" 
            onClick={onViewAllClick}
            whileHover={shouldReduceMotion ? {} : { x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <span>View All 8 Domains</span> <ArrowRight size={16} />
          </motion.span>
        </div>
      </FadeIn>

      <StaggerContainer className="internships-grid" staggerChildren={0.1}>
        {featured.map((item) => {
          const Icon = item.icon || Code;
          const iconColor = item.iconColor || '#3b82f6';
          const glowColor = item.glowColor || 'rgba(59, 130, 246, 0.15)';

          return (
            <StaggerItem key={item.id}>
              <motion.div 
                className="internship-card"
                style={{
                  '--accent-color': iconColor,
                  '--glow-color': glowColor,
                }}
                whileHover={
                  shouldReduceMotion
                    ? {}
                    : {
                        y: -4,
                        scale: 1.01,
                        transition: { duration: 0.25, ease: 'easeOut' },
                      }
                }
                whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
              >
                {/* Top Header: Icon + Badges */}
                <div className="card-header-row">
                  <div 
                    className="card-icon-box"
                    style={{ 
                      background: glowColor, 
                      color: iconColor 
                    }}
                  >
                    <Icon size={26} />
                  </div>

                  <div className="card-badge-column">
                    <span className="badge-4weeks">
                      <Clock size={11} /> 4-Week Track
                    </span>
                    <span className="badge-tasks">
                      <Layers size={11} /> {item.tasksCount || 3} Tasks
                    </span>
                  </div>
                </div>

                {/* Card Title */}
                <h3 className="card-title">{item.title}</h3>

                {/* Meta Chips */}
                <div className="card-meta-chips">
                  <span className="meta-chip">
                    <Clock size={12} className="meta-icon" /> {item.duration}
                  </span>
                  <span className="meta-chip">
                    <Target size={12} className="meta-icon" /> {item.level}
                  </span>
                </div>

                {/* Description */}
                <p className="card-desc">{item.description}</p>

                {/* Action Button */}
                <motion.button 
                  className="btn-card-primary"
                  onClick={() => onSelectInternship && onSelectInternship(item)}
                  whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
                  whileTap={shouldReduceMotion ? {} : { scale: 0.98 }}
                >
                  <span>Apply Now</span>
                  <ArrowRight size={16} className="btn-arrow" />
                </motion.button>
              </motion.div>
            </StaggerItem>
          );
        })}
      </StaggerContainer>
    </section>
  );
}
