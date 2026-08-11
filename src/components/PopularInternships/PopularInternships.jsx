import React from 'react';
import { ArrowRight, Clock, Target, Layers, Code, Sparkles } from 'lucide-react';
import { ALL_INTERNSHIPS } from '../../pages/Internships/InternshipsPage';
import './PopularInternships.css';

export default function PopularInternships({ onSelectInternship, onViewAllClick, onOpenTasksModal }) {
  const featured = ALL_INTERNSHIPS.slice(0, 4);

  return (
    <section className="popular-section">
      <div className="popular-header">
        <div>
          <div className="popular-subtitle-tag">
            <Sparkles size={14} /> FEATURED VIRTUAL TRACKS
          </div>
          <h2 className="popular-title">Explore <span>Featured Domains</span></h2>
        </div>
        <span className="view-all-link" onClick={onViewAllClick}>
          <span>View All 8 Domains</span> <ArrowRight size={16} />
        </span>
      </div>

      <div className="internships-grid">
        {featured.map((item) => {
          const Icon = item.icon || Code;
          const iconColor = item.iconColor || '#3b82f6';
          const glowColor = item.glowColor || 'rgba(59, 130, 246, 0.15)';

          return (
            <div 
              key={item.id} 
              className="internship-card"
              style={{
                '--accent-color': iconColor,
                '--glow-color': glowColor,
              }}
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
              <button 
                className="btn-card-primary"
                onClick={() => onSelectInternship && onSelectInternship(item)}
              >
                <span>Apply Now</span>
                <ArrowRight size={16} className="btn-arrow" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}

